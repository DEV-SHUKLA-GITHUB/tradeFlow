import React, { useState, useEffect } from 'react';
// import maindata from '../../backend/routes/data/instrument.json';
// import tradingsymbols from '../../backend/routes/data/instrumentTradingSymbol.json';
// import instruments from '../../backend/routes/data/instrument.json';
import CustomCombobox from './basic components/AutoCompleteInput';
import "./watchlist.css"
const WatchList = (props) => {
  const [data, setData] = useState([]);
  const [tokendata, setTokendata] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('watchlistData'));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    if (tokendata !== undefined && name !== undefined) {
      const updatedData = [...data, { token: tokendata, ltp: 0, name: name }];
      setData(updatedData);
      localStorage.setItem('watchlistData', JSON.stringify(updatedData));
      props.add(updatedData);
    }
  }, [tokendata, name]);

  const token = (selected) => {
    instruments.forEach((item) => {
      if (item.tradingsymbol === selected.replace(/\s/g, '')) {
        setTokendata(item.instrument_token);
        return;
      }
    });
  };

  const handleClick = (selected) => {
    if (!data.some(item => item.name === selected.name)) {
      if (selected.name.includes("CE") || selected.name.includes("PE") || selected.name.includes("FUT")) {
        setName(selected.name);
        token(selected.name);
      }
    }
  };

  const resetData = () => {
    setData([]);
    localStorage.removeItem('watchlistData');
  };

  const ceData = data.filter(value => !value.name.includes("PE"));
  const peData = data.filter(value => value.name.includes("PE"));

  return (
    <div className='w-full h-full bg-[#1C1C1C] bg-opacity-60 rounded-lg'>
      <div className=''>
        <CustomCombobox options={tradingsymbols} atm={props.atm} onChange={handleClick} />
        {/* <button className='ml-4 bg-blue-500 text-white py-2 px-4 rounded' onClick={resetData}>
          Reset
        </button> */}
      </div>
      <div className=' overflow-y-scroll h-1/3'>
 

  {ceData.map((value, index) => (
    <div
    key={index}
    className='flex w-full justify-between  text-white   h-12 '
  >
    <div className='  w-3/6  flex items-center justify-center'>
      {value.name}
    </div>
    <div className='  w-1/6 flex justify-center pt-2 text-green-400 font-semibold '>
      {value.ltp}
    </div>
    <div className='  w-1/6 flex justify-center pt-2 text-green-400 font-semibold '>
      4.5%
    </div>
  </div>
  ))}
  
 
</div>
<div className='m-16'>

</div>
<div className=' overflow-y-scroll h-1/3'>
 

  {peData.map((value, index) => (
    <div
      key={index}
      className='flex w-full justify-between  text-white   h-12 '
    >
      <div className='  w-3/6  flex items-center justify-center'>
        {value.name}
      </div>
      <div className=' w-1/6 pt-2 flex justify-center text-green-400 font-semibold '>
        {value.ltp}
      </div>
      <div className='  w-1/6 pt-2 flex justify-center text-green-400 font-semibold '>
        4.5%
      </div>
    </div>
  ))}
  
 
</div>


    </div>
  );
};

export default WatchList;
