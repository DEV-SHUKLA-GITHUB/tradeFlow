import React from 'react'

const Orderbook = (props) => {
  return (
    <div className="flex flex-col gap-4 bg-transparent text-white w-full h-full">
    {/* header - nifty time  */}

    <h2 className="font-bold text-2xl"></h2>

    {/* main area displays cards */}
    <div className="overflow-x-auto">
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
        <tbody className="">
          {/* use map here  */}
          {props.orderbook&&props.orderbook.map((item,index)=>{
            return (
              <tr  className="w-screen   p-4  border-b-2  border-gray-500 " >
                <div className='flex items-center w-full h-12 border border-white justify-center m-8 p-4 bg-black rounded-xl'>
              <th className="">{item.tradingsymbol}</th>
              </div>
             
           
              <td className='pl-24'>{item.order_timestamp.split('T')[0]}</td>
              
              <td className='mr-10 p-10'>{item.quantity}</td>
              <td className='mr-10 p-10'>{item.order_type}</td>
              <td className='mr-10 p-10'>{item.transaction_type}</td>
              <div className='border p-4 border-green-300  rounded-lg w-fit pr-8'>
              <td className='mr-8 p'>{item.status}</td>
              </div>
            </tr>        
            )
          })}
        </tbody>
      </table>
      
    </div>
  </div>
  )
}

export default Orderbook