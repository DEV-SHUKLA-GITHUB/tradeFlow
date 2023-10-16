const brokerValidator = require("./validateBrokerCreds")
const a=async ()=>{const obj={
    broker_user_id : "ET5487",
    broker_user_password : "Aizamk@77@beagle",
    api_key : "elrfps73mpn9aou4",
    api_secret : "jpsvy0sadh3xkgx74p2aswob9tcynqe5",
    totp_token : "3AB43VM2VKOFAD6ZP5YJOBPU5PU5HYPV",
    redirect_url : "http://localhost:8000",
    broker_name: "Zerodha"}
const response=await brokerValidator(obj)}
a()