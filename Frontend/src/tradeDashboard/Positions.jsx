import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../dynamicRoutes';

const Positions = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrumentToken, setSelectedInstrumentToken] = useState(null);
  const [tsl, setTsl] = useState(true);
  const [tslValue, setTslValue] = useState()
  const [val, setval] = useState(false);
  const [stoploss, setStoploss] = useState(false);
  const [trailingstoploss, setTrailingstoploss] = useState(false);
  const selectedInstrumentTokenRef = useRef(null);
  const [price, setPrice] = useState();
  const [trigger_price, setTrigger_price] = useState();
  const [tslRatio, setTslRatio] = useState();
  function exitHandler(symbol) {
    try {
      fetch(`${API_URL}/exit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: window.localStorage.getItem('token'),
          symbol,
        }),
      }).then((data) => {
        if (data.status) {
          toast.success('Position squared off', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else {
          toast.error('Error in closing the position', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    props.exit();
  }

  const handleClick = (instrumentToken) => {
    setSelectedInstrumentToken(instrumentToken);
    setStoploss(true)
    setIsModalOpen(true);
  };

  const handleTSLClick = (instrumentToken) => {
    setSelectedInstrumentToken(instrumentToken);
    setTrailingstoploss(true)
    setIsModalOpen(true);

  };
  useEffect(() => {
    // Update trailingStopLoss value when the tsl value changes
    // if (selectedInstrumentToken !== null && props.trailingStopLoss[selectedInstrumentToken]) {
      props.setTrailingStopLoss({
        ...props.trailingStopLoss,
        [selectedInstrumentToken]: {
          ...props.trailingStopLoss[selectedInstrumentToken],
          value: tslRatio,
        },
      });
    // }
  }, [tslRatio]);
  useEffect(()=>{
    console.log(props.trailingStopLoss)
  },[props.trailingStopLoss])

  useEffect(() => {
    // Toggle the tsl value and update trailingStopLoss when the Toggle TSL button is clicked
    // if (selectedInstrumentToken !== null && props.trailingStopLoss[selectedInstrumentToken]) {
      props.setTrailingStopLoss({
        ...props.trailingStopLoss,
        [selectedInstrumentTokenRef.current]: {
          ...props.trailingStopLoss[selectedInstrumentTokenRef.current],
          status:tsl,
        },
      });
    // }
  }, [tsl]);

  const stopLossOrder = (token, price, trigger_price) => {

    let symbol, qty, transaction_type, product, exchange;

    props.Positions['day'].map(item => {
      if (String(item.instrument_token) === String(token)) {
        symbol = item.tradingsymbol
        qty = item.quantity
        transaction_type = item.quantity > 0 ? "SELL" : "BUY"
        product = item.product
        exchange = item.exchange
      }
    })[0]





    try {
      fetch(`${API_URL}/stopLossOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          symbol,
          qty,
          transaction_type,
          product,
          variety: "regular",
          price,
          trigger_price,
          exchange

        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.status == true){
          props.setStopLossValue({
            ...props.stopLossValue,
            [selectedInstrumentToken]: { id: data.data.order_id },
          })
          toast.success("stop loss order Placed", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error(data.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        // handleClick(selectedOption1)
      })
    }
    catch (err) {
      console.log("request error: " + err)
    }
  }

  const handleModalConfirm = (instrumentToken) => {
    const stopLossValue = props.stopLossValue[instrumentToken];
    props.setStopLossValue({
      ...props.stopLossValue,
      [selectedInstrumentToken]: { price: price, trigger_price: trigger_price },//set price and trigger_price
    })
    stopLossOrder(selectedInstrumentToken,price,trigger_price)
     setval(true);

    if (stopLossValue) {
      setIsModalOpen(false);

      // Display a success message
      toast.success('Stop loss set successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      // Display an error message if the input value is empty
      toast.error('Please enter a valid stop loss value', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };



  const handleTslModalConfirm = (instrumentToken) => {
    props.setTrailingStopLoss({
      ...props.trailingStopLoss,
      [selectedInstrumentToken]: {
        value: tslRatio, status:"true", closed: false
      },
    });
    
    if (tslRatio) {
      setIsModalOpen(false);

      // Display a success message
      toast.success('Trailing Stop loss set successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      // Display an error message if the input value is empty
      toast.error('Please enter a valid Trailing stop loss value', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  const handletoggle = (instrumentToken) => {
    selectedInstrumentTokenRef.current = instrumentToken;
    setTsl(!tsl);
  };
  return (
    <div className='w-full bg-transparent text-[#BABABA] text-lg h-full'>
      <div className='flex justify-around mt-2'>
        {/* <h2 className='font-bold'>Net Qty: 0</h2>
        <h2 className='font-bold'>MTM: 32055.50</h2> */}
      </div>
      <div className='w-full border-t-2  '>
        <div>
          <table className='w-full'>
            <thead className='bg-transparent w-screen'>
              <tr >
                <th className='w-1/12 text-center'>DIFF</th>
                <th className='w-1/12 text-center'>CE Strike</th>
                <th className='w-1/12 text-center'>CE LTP</th>
                <th className='w-1/12 text-center'>CE QTY</th>
                <th className='w-1/12 text-center'>PE Strike</th>
                <th className='w-1/12 text-center'>PE LTP</th>
                <th className='w-1/12 text-center'>PE QTY</th>
                <th className='w-1/12 text-center'>Previous Close</th>
                <th className='w-1/12 text-center'>Today Open</th>
                <th className='w-1/12 text-center'>Combined LTP</th>
                <th className='w-1/12 text-center'>Action</th>
                {/* <th className='w-1/12 text-center'>Avg Price</th>
                <th className='w-1/12 text-center'>Exit</th> */}
              </tr>
            </thead>
            <tbody>
              {props.Positions &&
                props.Positions['day'].map((item, index) => {
                  if (item.quantity !== 0) {
                    return (
                      
                      <tr key={index}>
                        {/* {console.log(props.Positions,"pos")} */}
                        <td className='text-center'>{item.tradingsymbol}</td>
                        <td className='text-center'>{item.product}</td>
                        <td className='text-center'>{item.quantity}</td>
                        <td className='text-center'>
                          {/* {(val && props.stopLossValue[item.instrument_token].price)||""} */}
                        </td>
                        <td className='text-center'>
                        {/* {(val && props.stopLossValue[item.instrument_token].trigger_price)||""} */}
                        </td>
                        <td className='text-center'>
                          <button
                            onClick={() => handleClick(item.instrument_token)}
                            className='bg-blue-500 text-white px-2 py-1 rounded'
                          >
                            SL Button
                          </button>
                        </td>
                        <td className='text-center'>
  {tsl ? 'TSL Active' : 'TSL Inactive'}
</td>

                          <td className='text-center'>
                            <button
                              onClick={() => handletoggle(item.instrument_token)}
                              type='radio'
                            // className='bg-blue-500 text-white px-2 py-1 rounded'
                            >
                              Toggle TSL
                            </button>
                          </td>
                          <td className='text-center'>
                            <button
                              onClick={() => handleTSLClick(item.instrument_token)}
                              className='bg-blue-500 text-white px-2 py-1 rounded'
                            >
                              TSL Button
                            </button>
                          </td>
                          <td className='text-center'>{item.last_price}</td>
                          <td className='text-center'>{item.pnl}</td>
                          <td className='text-center'>{item.average_price}</td>
                          <td className='text-center'>
                            <button
                              onClick={() => exitHandler(item.tradingsymbol)}
                              className='bg-red-500 text-white px-2 py-1 rounded'
                            >
                              Exit
                            </button>
                          </td>
                        </tr>
                      )
                    }
                    else {
                      return (
                        // <tr key={index} className='h-full'>
                        //   <tr className='h-1/2 w-full border-2 border-white'>
                            // {(!item.tradingsymbol.includes("PE")) && (
                              <tr key={index} className='border-2 border-red-600'>
                                <td className='text-center'>{item.tradingsymbol}</td>
                                <td className='text-center'>{item.product}</td>
                                <td className='text-center'>{item.quantity}</td>
                                <td className='text-center'>
                                  {/* {(val && props.stopLossValue[item.instrument_token].price)||""} */}
                                </td>
                                <td className='text-center'>
                                  {/* {(val && props.stopLossValue[item.instrument_token].trigger_price)||""} */}
                                </td>
                                <td className='text-center'>
                                  <button
                                    onClick={() => handleClick(item.instrument_token)}
                                    className='bg-blue-500 text-white px-2 py-1 rounded'
                                  >
                                    SL Button
                                  </button>
                                </td>
                                <td className='text-center'>
                                  {/* {tsl ? 'TSL Active' : 'TSL Inactive'} */}
                                </td>

                                <td className='text-center'>
                                  <button
                                    onClick={() => handletoggle(item.instrument_token)}
                                    type='radio'
                                  // className='bg-blue-500 text-white px-2 py-1 rounded'
                                  >
                                    Toggle TSL
                                  </button>
                                </td>
                                <td className='text-center'>
                                  <button
                                    onClick={() => handleTSLClick(item.instrument_token)}
                                    className='bg-blue-500 text-white px-2 py-1 rounded'
                                  >
                                    TSL Button
                                  </button>
                                </td>
                                <td className='text-center'>{item.last_price}</td>
                                <td className='text-center'>{item.pnl}</td>
                                <td className='text-center'>{item.average_price}</td>
                                <td className='text-center'>
                                  <button
                                    onClick={() => exitHandler(item.tradingsymbol)}
                                    className='bg-red-500 text-white px-2 py-1 rounded'
                                  >
                                    Exit
                                  </button>
                                </td>
                              </tr>
                            )}
                          // </tr>
                          // <hr/>
                          // <tr className='h-1/2 border-2 border-white'>
                          //   {(item.tradingsymbol.includes("PE") && (
                          //     <tr key={index}>
                          //       <td className='text-center'>{item.tradingsymbol}</td>
                          //       <td className='text-center'>{item.product}</td>
                          //       <td className='text-center'>{item.quantity}</td>
                          //       <td className='text-center'>
                          //         {/* {(val && props.stopLossValue[item.instrument_token].price)||""} */}
                          //       </td>
                          //       <td className='text-center'>
                          //         {/* {(val && props.stopLossValue[item.instrument_token].trigger_price)||""} */}
                          //       </td>
                          //       <td className='text-center'>
                          //         <button
                          //           onClick={() => handleClick(item.instrument_token)}
                          //           className='bg-blue-500 text-white px-2 py-1 rounded'
                          //         >
                          //           SL Button
                          //         </button>
                          //       </td>
                          //       <td className='text-center'>
                          //         {/* {tsl ? 'TSL Active' : 'TSL Inactive'} */}
                          //       </td>

                          //       <td className='text-center'>
                          //         <button
                          //           onClick={() => handletoggle(item.instrument_token)}
                          //           type='radio'
                          //         // className='bg-blue-500 text-white px-2 py-1 rounded'
                          //         >
                          //           Toggle TSL
                          //         </button>
                          //       </td>
                          //       <td className='text-center'>
                          //         <button
                          //           onClick={() => handleTSLClick(item.instrument_token)}
                          //           className='bg-blue-500 text-white px-2 py-1 rounded'
                          //         >
                          //           TSL Button
                          //         </button>
                          //       </td>
                          //       <td className='text-center'>{item.last_price}</td>
                          //       <td className='text-center'>{item.pnl}</td>
                          //       <td className='text-center'>{item.average_price}</td>
                          //       <td className='text-center'>
                          //         <button
                          //           onClick={() => exitHandler(item.tradingsymbol)}
                          //           className='bg-red-500 text-white px-2 py-1 rounded'
                          //         >
                          //           Exit
                          //         </button>
                          //       </td>
                          //     </tr>

                            // ))}
                        //   </tr>
                        // </tr>
                      // )
                    // }

                  }
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedInstrumentToken && (

        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            {/* {console.log(selectedInstrumentToken,"selected instrument token")} */}
            {stoploss&&<div>
              <h2 className='text-lg font-semibold mb-4'>Set Stop Loss</h2>
              <label htmlFor='stopLossInput' className='block mb-2'>
                Stop Loss Value:
              </label>
              <input
                type='text'
                id='stopLossInput'
                // value={props.stopLossValue[selectedInstrumentToken] || ''}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
                className='w-full px-2 py-1 border rounded mb-4'
              />
              <label htmlFor='stopLossInput' className='block mb-2'>
                Stop Loss Trigger Value:
              </label>
              <input
                type='text'
                id='stopLossTriggerInput'
                // value={}
                onChange={(e) => {
                  setTrigger_price(e.target.value)
                }}
                className='w-full px-2 py-1 border rounded mb-4'
              />
              <div className='flex justify-end'>
                <button
                  onClick={() => handleModalConfirm(selectedInstrumentToken)}
                  className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                >
                  Confirm
                </button>
                <button
                  onClick={() => {

                    setIsModalOpen(false);
                    setStoploss(false)
                    setSelectedInstrumentToken(null);
                  }}
                  className='bg-gray-300 text-gray-700 px-4 py-2 rounded'
                >
                  Cancel
                </button>
              </div></div>}
            {trailingstoploss && <div>
              <h2 className='text-lg font-semibold mb-4'>Set Trailing Stop Loss</h2>
            <label htmlFor='stopLossInput' className='block mb-2'>
              Trailing Stop Loss Value:
            </label>
            <input
              type='text'
              id='trailingstopLossInput'
              // value={props.trailingStopLoss[selectedInstrumentToken] || ''}
              onChange={(e) => setTslRatio(e.target.value)}
              className='w-full px-2 py-1 border rounded mb-4'
            />
            {/* {console.log(props.trailingStopLoss,"tsl")} */}
            <div className='flex justify-end'>
              <button
                onClick={() => {
                   handleTslModalConfirm(selectedInstrumentToken)
            }}
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTrailingstoploss(false)
                  setSelectedInstrumentToken(null);
                }}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded'
              >
                Cancel
              </button>
            </div></div>}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Positions;