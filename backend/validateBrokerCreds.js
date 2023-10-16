const puppeteer = require("puppeteer");
const totp = require("totp-generator");
const fyers = require("fyers-api-v2")
const KiteConnect = require("kiteconnect").KiteConnect;
const crypto = require('crypto');
const fs = require('fs');
const User = require("./models/userDetails"); // Import the user schema from userDetails.js

const zerodhaAccessTokenFilePath = './\\auth\\zerodha_access_token.json';
const fyersAccessTokenFilePath = './\\backend\\auth\\fyers_access_token.txt';


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function withTimeout(func, timeout) {
    return new Promise(async (resolve, reject) => {
        const timeoutId = setTimeout(function () {
        reject({ "validCreds": false, "broker": null });
        }, timeout);

        try {
        const result = await func();
        clearTimeout(timeoutId);
        resolve(result);
        } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
        }
    });
}
  
  
const zerodhaLoginValidator = (BrokerList,brokerDetails,email) => {
    console.log("first")
    return new Promise(async(resolve, reject) => {
        const user_id = brokerDetails.broker_user_id;
        const user_password = brokerDetails.broker_user_password;
        const api_key = brokerDetails.api_key;
        const api_secret = brokerDetails.api_secret;
        const totp_token = brokerDetails.totp_token;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const requestUrls = [];
        page.on('request', request => {
            requestUrls.push(request.url());
        });
        try{
            await page.goto(
                `https://kite.trade/connect/login?api_key=${api_key}&v=3`
                );
            await sleep(500);
            await page.type("input[type=text]", user_id),
            await page.type("input[type=password]", user_password),
            await page.keyboard.press("Enter"),
            await sleep(500),
            await page.focus("input[type=text]"),
            await page.keyboard.type(totp(totp_token)),
            await page.keyboard.press("Enter"),
            await page.waitForNavigation(),
            page.url();
            browser.close();
            const redirectURL = requestUrls.filter(element => {
                if (element.includes("request_token")) {
                    return true;
                }
            });
            const requestToken = new URL(redirectURL[0]).searchParams.get('request_token');
            try {
                const kite = new KiteConnect({ api_key: api_key });
                const response = await kite.generateSession(requestToken, api_secret);
                const accessToken = response.access_token;
                kite.setAccessToken(accessToken);
                const credentials = {
                    api_key: api_key,
                    access_token: accessToken.replace(/"/g, '')
                };


                try {
                    const userData = await User.findOne({ email });
                    console.log(userData);
                  
                    let isUpdated = false;
                  
                    if (userData && Array.isArray(userData.BrokerList)) {
                      for (const broker of userData.BrokerList) {
                        if (broker.broker === BrokerList.broker) {
                          console.log("con-1");
                          broker.accessToken = credentials.access_token;
                          isUpdated = true;
                          await User.findOneAndUpdate(
                            { email, "BrokerList.broker": BrokerList.broker },
                            {
                              $set: {
                                "BrokerList.$": broker,
                              },
                            },
                            { new: true, upsert: true }
                          );
                          console.log("Updated");
                        }
                      }
                    }
                  
                    if (!isUpdated) {
                      console.log("con-2");
                  
                      const updatedUserData = await User.findOneAndUpdate(
                        { email },
                        { $push: { BrokerList: { ...BrokerList, accessToken: credentials.access_token } } },
                        { new: true }
                      );
                      console.log("Updated");
                    }
                  } catch (error) {
                    console.error(error);
                    res.status(500).json({ status: "error", data: error });
                  }
                  


                // var isUpdated=false;
                // saving in database
        // User.findOne({ email }).then(async (userData) => {
        //     console.log(userData)
        //     await userData.BrokerList.map(async broker=>{
        //         if(broker.userId==BrokerList.userId){
        //             console.log("con-1")
        //             isUpdated=true
        //             // update existing
        //             await User.findOneAndUpdate(
        //                 { email , "BrokerList.broker": BrokerList.broker },
        //                 {
        //                 $setOnInsert: {
        //                     "BrokerList.$": { ...BrokerList, accessToken: credentials.access_token }
        //                 }
        //                 },
        //                 { new: true, upsert: true }
        //             )
        //             .then((userData) => {
        //                 console.log("Updated");
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //                 res.status(500).json({ status: "error", data: error });
        //             });
        //         }
        //     })
         
        //  if(!isUpdated){
        //     console.log("con-2")

        //     User.findOneAndUpdate(
        //         { email }, // Find the user by email
        //         { $push: { BrokerList:{ ...BrokerList, accessToken: credentials.access_token } } }, // Push the form data to the formData array
        //         { new: true } // Return the updated document
        //       )
        //         .then((userData) => {
        //           console.log("updated")
        //         })
        //         .catch((error) => {
        //           res.status(500).json({ status: "error", data: error });
        //         });
        //  }
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
        
 
                // fs.writeFile(zerodhaAccessTokenFilePath, JSON.stringify(credentials), (err) => {
                //     if (err){ throw err;}
                //     console.log(credentials,'Zerodha Access Token written to the file');
                    
                // });            
                console.log("Kite Instance Created Successfully");
                console.log(credentials.access_token)
                if(accessToken)
                    resolve({"validCreds": true, "broker": kite});
                return reject({"validCreds": false, "broker": null});
            } catch (e) {
                console.error("Failed to Create the Kite Instance", e);
                reject({"validCreds": false, "broker": null});
            }
        }catch(err){
            console.error("Failed to Create the Kite Instance", err);
            reject({"validCreds": false, "error": err});
        }finally {
            browser.close();
        }
    })
}

const fyersLoginValidator = (brokerDetails) =>{
    return new Promise(async(resolve, reject) => {
        const user_id = brokerDetails.broker_user_id;
        const user_password = brokerDetails.broker_user_password;
        const api_key = brokerDetails.api_key;
        const api_secret = brokerDetails.api_secret;
        const totp_token = brokerDetails.totp_token;
        const redirect_url = "http://127.0.0.1:5000/login";
        // const user_id = 'XD01152'
        // const sec = "0B59TZFBO8"
        // const api_key = "5PE335DK17-100"
        // const user_password = "3218"
        // const topt_token = "UQGU2JJ4MZAZWKASYGIHAORZ64IVUMKH"
        fyers.setAppId(api_key);
        fyers.setRedirectUrl(redirect_url);

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const requestUrls = [];
        page.on('request', request => {
            requestUrls.push(request.url());
        });
        await page.goto(
            `https://api.fyers.in/api/v2/generate-authcode?client_id=${api_key}&redirect_uri=${redirect_url}&response_type=code&state=sample_state`
        );

        await page.click('a.d-block#login_client_id');
        await sleep(500);
        await page.type("input[type=text]", user_id);
        await page.keyboard.press("Enter");
        await sleep(500);
        await page.focus("input[type=text]");
        await page.keyboard.type(totp(totp_token));
        await page.keyboard.press("Enter");
        await sleep(500);
        await page.focus("input[type=text]");
        await page.keyboard.type(user_password);
        await page.keyboard.press("Enter");
        await sleep(500);
        await page.waitForNavigation();
        page.url();
        const redirectURL = requestUrls.filter(element => {
            if (element.includes("auth_code")) {
                return true;
            }
        });
        const auth_code = new URL(redirectURL[0]).searchParams.get('auth_code');
        
        const sha256Hash = crypto.createHash('sha256').update(api_key+api_secret).digest('hex');
        const reqBody = {
            auth_code: auth_code,
            hash: sha256Hash,
            secret_key:api_secret
        }
        
        try{
            const response = await fyers.generate_access_token(reqBody).then((response)=>{
                return response;
            })
            fs.writeFile(fyersAccessTokenFilePath, response.access_token.replace(/"/g, ''), (err) => {
                if (err) throw err;
                console.log('Fyers Access Token written to the file');
            });
            fyers.setAccessToken(response.access_token);
            if(response.access_token){
                resolve({"validCreds": true, "broker": fyers});
            }
        }catch(err){
            reject({"validCreds": false, "broker": null});
        }finally{
            browser.close();
        }
    })
}

const validateBrokerCreds = async(BrokerList,brokerDetails,email) => {
    const timeout = 12000; 
    console.log(brokerDetails)
    if(brokerDetails.broker_name === "Zerodha"){
        console.log("first")
        return await withTimeout(() => zerodhaLoginValidator(BrokerList,brokerDetails,email), timeout)
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return error;
        }); 
    }
    if(brokerDetails.broker_name === 'Fyers'){
        return await withTimeout(() => fyersLoginValidator(brokerDetails), timeout)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            }); 
    }
}

module.exports = validateBrokerCreds