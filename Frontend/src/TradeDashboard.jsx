import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./basic components/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomCombobox from "./basic components/AutoCompleteInput";
import WatchList from "./watchList";
import Orderbook from "./tradeDashboard/Orderbook";
import Tradebook from "./tradeDashboard/Tradebook";
import Positions from "./tradeDashboard/Positions";
import Funds from "./tradeDashboard/Funds";
// import maindata from "../../backend/routes/data/instrument.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, SOCKET_API_URL } from "./dynamicRoutes";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

import Switch from "react-switch";
import bg from "./assets/tradebg.jpg";
import "react-toggle/style.css";
import Toggle from "react-toggle";
const TradeDashboard = () => {
  // var instrumentToken;
  const [errorMessage, setErrorMessage] = useState();
  const [instrumentToken, setInstrumentToken] = useState();
  const instrumentTokenRef = useRef(instrumentToken);
  useEffect(() => {
    // Whenever instrumentToken changes, update instrumentTokenRef.current
    instrumentTokenRef.current = instrumentToken;
  }, [instrumentToken]);
  const [ticksData, setTicksData] = useState();
  const [tickData, setTickData] = useState();
  const [pnl, setPnl] = useState("0");
  const [margin, setMargin] = useState();
  const option = ["option1", "option2", "option3", "option4"];
  const product = ["MIS", "Normal"];
  const optionList = option.map((value) => ({ value, text: value }));
  const productList = product.map((value) => ({ value, text: value }));
  const [selectedOption1, setSelectedOption1] = useState();
  const [selectedOption2, setSelectedOption2] = useState();
  const [atm, setAtm] = useState();
  const [sellltp, setSellltp] = useState();
  const [expiryList, setExpiryList] = useState();
  const [strikeList, setStrikeList] = useState();
  const [callType, setCallType] = useState("CE");
  const [selectedOption3, setSelectedOption3] = useState();
  const [selectedOption4, setSelectedOption4] = useState(optionList[0]);
  const [selectedOption5, setSelectedOption5] = useState(optionList[0]);
  const [selectedOption6, setSelectedOption6] = useState(0);
  const [selectedOption7, setSelectedOption7] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [positions, setPositions] = useState(false);
  const [funds, setFunds] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [orderBook, setOrderBook] = useState(false);
  const [TradeBook, setTradeBook] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [orderbook, setOrderbook] = useState();
  const [tradebook, setTradebook] = useState();
  const [fetchedPositions, setFetchedPositions] = useState();
  const [TotalStopLossFlag, setTotalStopLossFlag] = useState(false);
  const [TotalStopLoss, setTotalStopLoss] = useState({
    boolean: TotalStopLossFlag,
    mtm: "",
    stopLoss: "",
  });
  const [qty, setQty] = useState(false);
  const [enableClick, setEnableClick] = useState(false);
  const [callSymbol, setCallSymbol] = useState();
  const callSymbolRef = useRef(callSymbol);
  const [callLTP, setCallLTP] = useState();
  const [putSymbol, setPutSymbol] = useState();
  const putSymbolRef = useRef(putSymbol);
  const [putLTP, setPutLTP] = useState();
  const [putToken, setPutToken] = useState();
  const [callToken, setCallToken] = useState();
  const putTokenRef = useRef(putToken);
  const callTokenRef = useRef(callToken);

  const orderbookRef = useRef(orderbook);
  const tradebookRef = useRef(tradebook);
  const fetchedPositionsRef = useRef(fetchedPositions);
  useEffect(() => {
    // console.log(fetchedPositionsRef.current)
    orderbookRef.current = orderBook;
    tradebookRef.current = tradebook;
    fetchedPositionsRef.current = fetchedPositions;
  }, [orderBook, tradebook, fetchedPositions]);
  const [accountName, setAccountName] = useState("");
  const [customBuyCallKey, setCustomBuyCallKey] = useState(
    localStorage.getItem("customBuyCallKey") || ""
  );
  const [customSellCallKey, setCustomSellCallKey] = useState(
    localStorage.getItem("customSellCallKey") || ""
  );
  const [customBuyPutKey, setCustomBuyPutKey] = useState(
    localStorage.getItem("customBuyPutKey") || ""
  );
  const [customSellPutKey, setCustomSellPutKey] = useState(
    localStorage.getItem("customSellPutKey") || ""
  );
  const [positionButtonClicked, setPositionButtonClicked] = useState(false);
  const [orderBookButtonClicked, setOrderBookButtonClicked] = useState(false);
  const [tradeBookButtonClicked, setTradeBookButtonClicked] = useState(false);
  const [FundsButtonClicked, setFundsButtonClicked] = useState(false);
  const options = [
    { id: 1, name: "NIFTY" },
    { id: 2, name: "BANKNIFTY" },
    { id: 3, name: "FINNIFTY" },
  ];
  const products = [
    { id: 1, name: "MIS" },
    { id: 2, name: "NORMAL" },
  ];
  const [lotSize, setLotSize] = useState(50);
  const [stopLoss, setStopLoss] = useState({
    "": "",
  });
  const [trailingStopLoss, setTrailingStopLoss] = useState({
    "": "",
  });
  const trailingStopLossRef = useRef(trailingStopLoss);
  useEffect(() => {
    trailingStopLossRef.current = trailingStopLoss;
    // if(trailingStopLossRef.current[424961]&&Object.prototype.hasOwnProperty.call(trailingStopLossRef.current, 424961)&&trailingStopLossRef.current[424961].status){
    //   console.log(true)
    // }else{
    //   console.log(false)
    // }
  }, [trailingStopLoss]);
  const stopLossRef = useRef(stopLoss);
  useEffect(() => {
    stopLossRef.current = stopLoss;
  }, [stopLoss]);
  const [stopLossTSL, setStopLossTSL] = useState({
    "": "",
  });
  useEffect(() => {
    console.log(stopLossTSL);
  }, [stopLossTSL]);
  const stopLossTSLRef = useRef(stopLossTSL);
  useEffect(() => {
    stopLossTSLRef.current = stopLossTSL;
  }, [stopLossTSL]);


  const [arrayOfTokens, setArrayOfToken] = useState([
    { token: 8963586, ltp: 0, name: "BANKNIFTY" },
    { token: 8963842, ltp: 0, name: "NIFTY" },
    { token: 10227202, ltp: 0, name: "FINNIFTY" },
  ]);
  const changeArrayOfToken = (newArray) => {
    setArrayOfToken(newArray);
    console.log(arrayOfTokens);
    console.log(newArray);
  };

  // either change the fetchedPositions state itself or store the stoplosses of instruments into saperate state stopLoss

  const stopLossHandler = (token, stoploss) => {
    setFetchedPositions((prev) => {
      return {
        ...prev,
        day: fetchedPositions["day"].map((p) => {
          if (String(token) === String(p.instrument_token)) {
            return;
          }
        }),
      };
    });
  };

  function exit(symbol) {
    console.log(symbol);
    try {
      fetch(`${API_URL}/exit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          symbol,
        }),
      }).then((data) => {
        // if()
        // console.log(data)
        if (data.status) {
          toast.success("position squared off", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          updatePositions();
        } else {
          toast.error("error in closing the position", {
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
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log(typeof parseInt(inputValue));
    setSelectedOption6(parseInt(inputValue));

    if (qty === true && inputValue !== "") {
      const intValue = parseInt(inputValue);
      const isMultiple = intValue % lotSize === 0;
      const isInRange = intValue >= lotSize && intValue <= lotSize * 36;

      if (!(isMultiple && isInRange)) {
        setErrorMessage("Please provide a valid quantity.");
      } else {
        setErrorMessage("");
      }
    } else if (inputValue !== "") {
      const intValue = parseInt(inputValue);
      const isInRange = intValue >= 0 && intValue <= 36;

      if (!isInRange) {
        setErrorMessage("Please provide a valid quantity.");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  };

  const updatePositions = () => {
    fetch(`${API_URL}/updatePositions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.tradebook);
        setOrderbook(data.orderbook);
        setTradebook(data.tradebook);
        setFetchedPositions(data.positions);
      });
  };

  const exitAllHandler = () => {
    fetch(`${API_URL}/exitAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("closed all positions");
        // handleClick(selectedOption1)
        updatePositions();
      });
  };
  // const totalPnl=function( orderBook, ){
  //   return pnl
  // }

  const handleClick = (selected) => {
    console.log("selected", selected);
    setSelectedOption1(selected.name || selected);
    console.log(selectedOption1);

    fetch(`${API_URL}/instruments/getInstruments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        for (const instrument of data.instruments) {
          if ((selected.name || selected) === instrument.name) {
            console.log("This is my instrument token : ", instrumentToken);
            setInstrumentToken(instrument.instrument_token);
            break;
          } else {
            console.log("failed");
          }
        }

        console.log(data.margins, "data 133");
        console.log(data);
        setMargin(data.margins);
        setOrderbook(data.orderbook);
        setTradebook(data.tradebook);
        setFetchedPositions(data.positions);
        setAtm(data.atm);
        console.log(fetchedPositions);
        console.log(orderbook);
        console.log(data.positions);
        console.log("ATM", data.atm);
        // console.log(data.tradebook,"trade  book")
        // console.log(data.positions, "positions")
        setAccountName(data.accountName);
        if (data.uniqueExpiryDates && data.uniqueExpiryDates.length > 0) {
          setExpiryList(
            data.uniqueExpiryDates
              .map((value) => {
                const dateObject = new Date(value.split("T")[0]); // Convert the date string to a Date object
                const formattedDate = dateObject.toISOString().split("T")[0]; // Convert the Date object back to a formatted string
                return { value: formattedDate, text: formattedDate };
              })
              .sort((a, b) => new Date(a.value) - new Date(b.value))
          );
          console.log(expiryList);
          setSelectedOption3(data.uniqueExpiryDates[0]);
        } else {
          setExpiryList([]);
        }
        if (data.uniqueStrikes && data.uniqueStrikes.length > 0) {
          setStrikeList(
            data.uniqueStrikes.map((value) => ({ value, text: value }))
          );
          setSelectedOption4(data.uniqueStrikes[0]);
          setSelectedOption5(data.uniqueStrikes[0]);
        } else {
          setStrikeList([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    handleClick("NIFTY");
    setSelectedOption7(products[0]);
  }, []);

  const placeOrder = (orderType, callType) => {
    // console.log(selectedOption7,"test")
    // console.log("placedorder:",orderType);
    // console.log(selectedOption7.name)
    // console.log(lotSize)
    try {
      fetch(`${API_URL}/placeOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lotSize,
          token: window.localStorage.getItem("token"),
          symbol:
            (callType == "CE" && callSymbol) || (callType == "PE" && putSymbol),
          qty: selectedOption6,
          transaction_type: orderType,
          product: selectedOption7.name,
          variety: "regular",
          switchQty: qty,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status == true) {
            console.log("order placed");
            toast.success("Order Placed", {
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
          updatePositions();
        });
    } catch (err) {
      console.log("request error: " + err);
    }
  };

  const dateList = expiryList || [{}];
  const date = selectedOption3 ? selectedOption3 : "";
  const name = selectedOption1 || "";
  const price = selectedOption4;
  const type = callType;
  function formater(name, price, dateList, date, type) {
    let formatedName;
    //2023-07-27T00:00:00.000Z
    // console.log(
    const trimedDate = date.split("T")[0];
    const trimedDateList = dateList.map((item) => item.value && item.value);
    trimedDateList.map((date, index) => {
      if (date == trimedDate) {
        // console.log(trimedDateList[index+1])
        if (
          trimedDateList[index + 1] &&
          trimedDateList[index + 1].substring(5, 7) === date.substring(5, 7)
        ) {
          formatedName =
            name +
            trimedDate.substring(2, 4) +
            (trimedDate.substring(5, 6) === "0"
              ? trimedDate.substring(6, 7)
              : trimedDate.substring(5, 7)) +
            trimedDate.substring(8) +
            price +
            type;
        } else {
          function getShortMonth(monthNumber) {
            switch (monthNumber) {
              case "01":
                return "JAN";
              case "02":
                return "FEB";
              case "03":
                return "MAR";
              case "04":
                return "APR";
              case "05":
                return "MAY";
              case "06":
                return "JUN";
              case "07":
                return "JUL";
              case "08":
                return "AUG";
              case "09":
                return "SEP";
              case "10":
                return "OCT";
              case "11":
                return "NOV";
              case "12":
                return "DEC";
              default:
                return "Invalid month";
            }
          }
          formatedName =
            name +
            trimedDate.substring(2, 4) +
            getShortMonth(trimedDate.substring(5, 7)) +
            price +
            type;
        }
      }
    });

    return formatedName;
  }
  useEffect(() => {
    setCallSymbol(formater(name, price, dateList, date, type));
    setPutSymbol(formater(name, selectedOption5, dateList, date, "PE"));
  }, [selectedOption1, selectedOption4, selectedOption5, selectedOption3]);

  useEffect(() => {
    const socket = new WebSocket(`${SOCKET_API_URL}/instruments`);

    socket.onopen = () => {
      console.log("WebSocket connected test");
      console.log("array of token", arrayOfTokens);
      const initialData = {
        token: window.localStorage.getItem("token"),
        instrumentToken: arrayOfTokens,
      };
      console.log(initialData, "initialdata");
      socket.send(JSON.stringify(initialData));
    };

    socket.onmessage = (event) => {
      const ticks = JSON.parse(event.data);

      // console.log(ticks,"ticks")
      setArrayOfToken((prevArrayOfTokens) => {
        const watchList = [...prevArrayOfTokens];
        ticks.forEach((tick) => {
          if (tick.instrument_token == "424961") {
            console.log(tick);
          }
          //stop loss

          fetchedPositionsRef.current &&
            fetchedPositionsRef.current.day.map((p) => {
              const currentToken = p.instrument_token;
              // console.log(stopLossTSLRef.current, p)

              //trailing stop loss
              if (
                Object.prototype.hasOwnProperty.call(
                  trailingStopLossRef.current,
                  Number(p.instrument_token)
                ) &&
                trailingStopLossRef.current[currentToken].status
              ) {
                if (
                  String(p.instrument_token) === String(tick.instrument_token)
                ) {
                  console.log(stopLossTSLRef.current[currentToken]);
                  if (stopLossTSLRef.current[currentToken] == undefined) {
                    setStopLossTSL((prev) => {
                      return { ...prev, [currentToken]: "0" };
                    });
                  }
                  if (
                    Number(stopLossTSLRef.current[currentToken]) +
                      Number(trailingStopLossRef.current[currentToken].value) <
                      String(tick.last_price) &&
                    Number(trailingStopLossRef.current[currentToken].value) != 0
                  ) {
                    setStopLossTSL((prev) => {
                      return {
                        ...prev,
                        [currentToken]: String(
                          Number(tick.last_price) -
                            Number(
                              trailingStopLossRef.current[currentToken].value
                            )
                        ),
                      };
                    });
                  }
                }
              }

              if (
                Object.prototype.hasOwnProperty.call(
                  stopLossTSLRef.current,
                  Number(p.instrument_token)
                ) &&
                stopLossTSLRef.current[currentToken] != "0" &&
                !trailingStopLossRef.current[currentToken].closed
              ) {
                if (
                  String(p.instrument_token) === String(tick.instrument_token)
                ) {
                  if (p.quantity > 0) {
                    if (
                      Number(tick.last_price) <=
                      Number(stopLossTSLRef.current[Number(p.instrument_token)])
                    ) {
                      console.log("exited- sold");
                      console.log(
                        stopLossTSLRef.current[Number(p.instrument_token)]
                      );
                      // exit(p.tradingsymbol)
                      setStopLoss((prev) => {
                        return { ...prev, [currentToken]: "0" };
                      });
                      setTrailingStopLoss((prev) => {
                        return {
                          ...prev,
                          [currentToken]: {
                            value: "0",
                            status: false,
                            closed: true,
                          },
                        };
                      });
                    }
                  } else if (p.quantity < 0) {
                    console.log("exited - buy");

                    if (
                      Number(tick.last_price) >=
                      Number(stopLossTSLRef.current[Number(p.instrument_token)])
                    ) {
                      // exit(p.tradingsymbol)
                      setStopLoss((prev) => {
                        return { ...prev, [currentToken]: "0" };
                      });
                      setTrailingStopLoss((prev) => {
                        return {
                          ...prev,
                          [currentToken]: { value: "0", status: false },
                        };
                      });
                    }
                  }
                }
              }
            });

          //ltp and pnl of positions
          //   if(fetchedPositionsRef.current!=undefined){
          //     const obj={...fetchedPositionsRef.current, day:fetchedPositionsRef.current.day.map(p=>{
          //       // console.log(p.instrument_token)
          //       if(String(p.instrument_token)===String(tick.instrument_token)){
          //         console.log(fetchedPositionsRef.current.day[0].last_price, tick.last_price)
          //         return {...p,last_price:tick.last_price,pnl:(tick.last_price-p.average_price)*p.quantity}
          //       }
          //       return p;
          //     })}
          //     // console.log(obj)
          //   setFetchedPositions(obj)
          // }
          if (fetchedPositionsRef.current != undefined) {
            // console.log(fetchedPositionsRef)
            setFetchedPositions((prev) => {
              return {
                ...prev,
                day: prev.day.map((p) => {
                  if (
                    String(p.instrument_token) === String(tick.instrument_token)
                  ) {
                    return {
                      ...p,
                      last_price: tick.last_price,
                      pnl: (tick.last_price - p.average_price) * p.quantity,
                    };
                  }
                  return p;
                }),
              };
            });
          }

          if (String(tick.instrument_token) === String(callTokenRef.current)) {
            setCallLTP(tick.last_price);
          }
          if (String(tick.instrument_token) === String(putTokenRef.current)) {
            setPutLTP(tick.last_price);
          }
          watchList.forEach((item, index) => {
            if (String(tick.instrument_token) === String(item.token)) {
              watchList[index].ltp = tick.last_price;
            }
            if (
              String(tick.instrument_token) ===
              String(instrumentTokenRef.current)
            ) {
              setSelectedOption2(tick.last_price);
              setTickData(ticks);
            }
          });
        });
        // console.log(ticks,'TICKS')
        // console.log(arrayOfTokens,"array")
        setTicksData(ticks);
        ticks.map((tick) => {
          let buy = 0,
            sell = 0,
            temp = 0;

          // console.log(tradebookRef )
          tradebookRef.current &&
            tradebookRef.current.map((trade) => {
              if (trade.transaction_type === "BUY") {
                buy += trade.average_price * trade.quantity;
              } else {
                sell += trade.average_price * trade.quantity;
              }
            });
          fetchedPositionsRef.current &&
            fetchedPositionsRef.current["day"].map((p) => {
              if (
                String(p.instrument_token) === String(tick.instrument_token)
              ) {
                // console.log("sell=", sell)
                // console.log("buy=", buy)
                temp += tick.last_price * p.quantity;
                // console.log(p.quantity, tick.last_price, temp )
                // console.log(sell-buy+temp)
                setPnl(sell - buy + temp);
              }
            });
        });
        return watchList;
      });
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      console.log("useEffect has been deprecated");
      socket.close();
    };
  }, []);

  // console.log(fetchedPositions)
  const handlePositionClick = () => {
    setPositionButtonClicked(true);
    setOrderBookButtonClicked(false);
    setTradeBookButtonClicked(false);
    setFundsButtonClicked(false);
    setPositions(true);
    setOrderBook(false);
    setTradeBook(false);
    setFunds(false);
  };

  const handleOrderBookClick = () => {
    setOrderBookButtonClicked(true);
    setTradeBookButtonClicked(false);
    setPositionButtonClicked(false);
    setFundsButtonClicked(false);
    setOrderBook(true);
    setTradeBook(false);
    setPositions(false);
    setFunds(false);
  };

  const handleTradeBookClick = () => {
    setTradeBookButtonClicked(true);
    setOrderBookButtonClicked(false);
    setPositionButtonClicked(false);
    setFundsButtonClicked(false);
    setTradeBook(true);
    setOrderBook(false);
    setPositions(false);
    setFunds(false);
  };
  const handleFundsClick = () => {
    setTradeBookButtonClicked(false);
    setOrderBookButtonClicked(false);
    setPositionButtonClicked(false);
    setFundsButtonClicked(true);
    setTradeBook(false);
    setOrderBook(false);
    setPositions(false);
    setFunds(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (enableClick) {
        if (event.key === (customSellCallKey || "ArrowLeft")) {
          placeOrder("SELL", "CE"), setCallType("CE");
        }
        if (event.key === (customBuyCallKey || "ArrowUp")) {
          console.log("Buy call");
          placeOrder("BUY", "CE"), setCallType("CE");
        }
        if (event.key === (customBuyPutKey || "ArrowDown")) {
          console.log("buy put");
          placeOrder("BUY", "PE"), setCallType("PE");
        }
        if (event.key === (customSellPutKey || "ArrowRight")) {
          console.log("sell put");
          placeOrder("SELL", "PE"), setCallType("PE");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enableClick]);

  const handleCustomizeClick = () => {
    setCustomize(true);
  };

  const handleCustomizeClickSave = () => {
    localStorage.setItem("customBuyCallKey", customBuyCallKey);
    localStorage.setItem("customSellCallKey", customSellCallKey);
    localStorage.setItem("customBuyPutKey", customBuyPutKey);
    localStorage.setItem("customSellPutKey", customSellPutKey);
    setCustomize(false);
  };

  useEffect(() => {
    const customBuyCallKeyFromStorage =
      localStorage.getItem("customBuyCallKey");
    const customSellCallKeyFromStorage =
      localStorage.getItem("customSellCallKey");
    const customBuyPutKeyFromStorage = localStorage.getItem("customBuyPutKey");
    const customSellPutKeyFromStorage =
      localStorage.getItem("customSellPutKey");

    if (customBuyCallKeyFromStorage) {
      setCustomBuyCallKey(customBuyCallKeyFromStorage);
    }
    if (customSellCallKeyFromStorage) {
      setCustomSellCallKey(customSellCallKeyFromStorage);
    }
    if (customBuyPutKeyFromStorage) {
      setCustomBuyPutKey(customBuyPutKeyFromStorage);
    }
    if (customSellPutKeyFromStorage) {
      setCustomSellPutKey(customSellPutKeyFromStorage);
    }
  }, []);
  const handleQtyClick = () => {
    setQty(true);
    console.log(qty);
  };
  const handleLotClick = () => {
    setQty(false);
    console.log(qty);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", refresh);
    return () => {
      window.removeEventListener("beforeunload", refresh);
    };
  }, []);
  useEffect(() => {
    console.log(TotalStopLoss);
  }, [TotalStopLoss]);
  useEffect(() => {
    setTotalStopLoss({ ...TotalStopLoss, boolean: TotalStopLossFlag });
  }, [TotalStopLossFlag]);
  const refresh = (e) => {
    fetch(`${API_URL}/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="trade bg-[url('./assets/tradebg.jpg')] min-h-full w-full flex flex-col">
      {/* <div className="h-24 w-screen flex ">
        <div className="flex w-screen justify-center">
          <div
            // onClick={handleClick("FINNIFTY")}
            className=" p-2 h-20 m-4 bg-[#37203E] rounded-lg w-1/6 text-white "
          >
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">
                  F
                </div>
                <h4 className="pl-2">FINNIFTY</h4>
              </div>
              
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
          <div className=" p-2 h-20 m-4 bg-[#37203E] rounded-lg w-1/6 text-white ">
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">
                  N
                </div>
                <h4 className="pl-2">NIFTY</h4>
              </div>
              
              <h3>19873</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
          <div className=" p-2 h-20 m-4 bg-[#37203E] rounded-lg w-1/6 text-white ">
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">
                  B
                </div>
                <h4 className="pl-2">BANKNIFTY</h4>
              </div>
              
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
          <div className=" p-2 h-20 m-4 bg-[#37203E] rounded-lg w-1/6 text-white ">
            <div className="flex justify-around">
              <div className="flex">
                <div className="w-6 h-6 rounded-full border border-[#1D3758] bg-[#1D3758] text-[#0070E4] flex justify-center items-center">
                  S
                </div>
                <h4 className="pl-2">SENSEX</h4>
              </div>
              
              <h3>44989</h3>
            </div>
            <div className="pt-2 pl-8">
              <h3>4.5%</h3>
            </div>
          </div>
        </div>
      </div> */}
      <div className="h-full w-full flex flex-row p-2 gap-4 ">

        <div className="h-screen w-full  m-6">
          <div className="w-full border-b h-1/2 bg-[#1c1c1c] flex">
            <div className=" ml-10 w-11/12 bg-[#1c1c1c] h-2/4 shadow-inner rounded-lg">
              <div className=" w-full">
                <div className="flex p-8 justify-around">
                 <div className="flex justify-center">
          <div
            className=" p-2 pt-6 h-20 m-4 bg-[#37203E] rounded-lg w-full text-white "
          >
            <div className="flex w-full justify-around">
              <div className="flex">
                <h4 className="pl-2">BANKNIFTY</h4>
              </div>
              
              <h3 className="pl-6 pr-6">44989</h3>
              <h3>23-10-11</h3>
            </div>
          </div>
          </div>
                 <div className="flex justify-center">
          <div
            className=" p-2 pt-6 h-20 flex justify-evenly m-4 bg-[#37203E] rounded-lg w-full text-white items-center "
          >
                  <Toggle
                    id="cheese-status"
                    defaultChecked={TotalStopLossFlag}
                    icons={false}
                    onChange={() => setTotalStopLossFlag(!TotalStopLossFlag)}
                  />
                  <h1 className="text-xl text-white">Trailing Stop Loss</h1>
                  {/* <span className="border-2 w-1/6 p-2 rounded-3xl text-green-600 font-medium flex justify-center bg-green-800 bg-opacity-25"> 0 </span> */}
                  <input
                    className="border-2 w-1/6 p-2 rounded-3xl text-green-600 font-medium flex justify-center bg-green-800 bg-opacity-25"
                    placeholder="stopLoss"
                    type="text"
                    value={TotalStopLoss.stopLoss}
                    onChange={(e) =>
                      setTotalStopLoss({
                        ...TotalStopLoss,
                        stopLoss: e.target.value,
                      })
                    }
                  />
                  <h1 className="text-xl text-white"> Target MTM</h1>
                  {/* <span  className="border-2 w-1/6 p-2 rounded-3xl text-red-600 font-medium flex justify-center bg-red-800 bg-opacity-20">0</span> */}
                  <input
                    className="border-2 w-1/6 p-2 rounded-3xl text-red-600 font-medium flex justify-center bg-red-800 bg-opacity-20"
                    placeholder="mtm"
                    type="text"
                    value={TotalStopLoss.mtm}
                    onChange={(e) =>
                      setTotalStopLoss({
                        ...TotalStopLoss,
                        mtm: e.target.value,
                      })
                    }
                  />
          </div>
          </div>
                 <div className="flex justify-center">
          <div
            className=" p-2 pt-6 h-20 m-4 bg-[#37203E] rounded-lg w-full text-white items-center "
          >
            <div className="flex justify-between">
             <h3 className=" pr-6">Hide Zero Positions</h3>

                <Toggle
                    id="cheese-status"
                    defaultChecked={TotalStopLossFlag}
                    icons={false}
                    onChange={() => setTotalStopLossFlag(!TotalStopLossFlag)}
                  /></div>
          </div>
          </div>
                </div>


              </div>
            </div>
          </div>

         
         <div className="h-full flex">

         <div className="h-1/3 w-10/12 mt-4">
            <div className="flex bg-[#1c1c1c] rounded-lg p-4 h-full justify-contain w-full ">
              <div className="w-full">
                <div className="flex w-full ">
                  <button
                    className={`font-medium w-1/3 h-12 font-barlow-condensed font-sans border-0 text-white border-white rounded-3xl ${
                      positionButtonClicked
                        ? "bg-gradient-to-t from-black "
                        : ""
                    } button-animation`}
                    onClick={handlePositionClick}
                  >
                    Straddle
                  </button>
                  <button
                    className={`font-medium w-1/4 h-12 font-barlow-condensed font-sans border-0  text-white rounded-3xl ${
                      orderBookButtonClicked
                        ? "bg-gradient-to-t from-black"
                        : ""
                    } button-animation`}
                    onClick={handleOrderBookClick}
                  >
                    Strangle
                  </button>
                  <button
                    className={`font-medium w-1/4 h-12 font-barlow-condensed font-sans border-0 rounded-3xl text-white ${
                      tradeBookButtonClicked
                        ? "bg-gradient-to-t from-black"
                        : ""
                    } button-animation`}
                    onClick={handleTradeBookClick}
                  >
                    Option Chain
                  </button>
                  {/* <button
                    className={`font-medium w-1/4 h-12 text-white font-barlow-condensed font-sans border-0 rounded-3xl ${
                      FundsButtonClicked ? "bg-gradient-to-t from-black" : ""
                    } button-animation`}
                    onClick={handleFundsClick}
                  >
                    Funds
                  </button> */}
                </div>

                {orderBook && <Orderbook orderbook={orderbook} />}
                {TradeBook && <Tradebook tradebook={tradebook} />}
                {positions && (
                  <Positions
                    exit={handleClick}
                    setStopLossTSL={setStopLossTSL}
                    Positions={fetchedPositions && fetchedPositions}
                    stopLossValue={stopLoss}
                    setStopLossValue={setStopLoss}
                    trailingStopLoss={trailingStopLoss}
                    setTrailingStopLoss={setTrailingStopLoss}
                  />
                )}
                {funds && <Funds data={margin} />}
              </div>
            </div>
          </div>
          <div className="h-1/3 mt-4 ml-2 rounded w-2/12 bg-[#1c1c1c]">
          <div className="h-1/3 w-2/12 mt-6 ml-16">

          <div className="">
          <Dropdown
                      heading="strike prices"
                      downarrow={"true"}
                      itemList={strikeList}
                      value={selectedOption4}
                      onSelect={setSelectedOption4}
                    />
                  </div>
                    <div className="divide-x flex justify-between pt-2 mt-2 pb-2 h-10 w-32 bg-transparent text-white border-2 rounded border-white px-2 focus:outline-none focus:border-blue-500">
                      <span className=""><AiOutlineMinus/></span>
                      <span className="pl-4">50</span>
                      <span className="pl-4"><AiOutlinePlus/></span>
                    </div>
                    <div className="flex pt-5">
                      <button className="text-white p-2 pt-0">BUY</button>
                      <Toggle
                    id="cheese-status"
                    defaultChecked={TotalStopLossFlag}
                    icons={false}
                    onChange={() => setTotalStopLossFlag(!TotalStopLossFlag)}
                  />
                      <button className=" text-white p-2 pt-0">SELL</button>
                    </div>
                    <div className="text-white">
                      LTP    :    0
                    </div>
          </div>
          </div>

         </div>
         
         
         
                 </div>
      </div>
      //{" "}
    </div>
  );
};

export default TradeDashboard;
