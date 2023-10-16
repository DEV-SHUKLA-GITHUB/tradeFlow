import React from 'react'

const Tradebook = (props) => {
    return (
        <div className="flex flex-col gap-4  text-white w-full h-full">
        {/* header - nifty time  */}
    
        <h2 className="font-bold text-2xl"></h2>
    
        {/* main area displays cards */}
        <div className="overflow-x-auto">
          <table className="table w-full text-white">
            {/* head */}
            <thead className="bg[#0A0A0C]">
              <tr className=" text-[#BABABA] text-lg">
                <th className="font-normal ">CE</th>
                <th className="font-normal ">Strikes</th>
                <th className="font-normal ">PE</th>
              </tr>
            </thead>
            <tbody className="">
              {/* use map here  */}
              {props.tradebook&&props.tradebook.map((item,index)=>{
                return (
                  <tr  className=" w-screen border-b  border-gray-500 " >
                    <div className=' flex items-center justify-center b '>
                  <th  className='m-4 border rounded-md p-4 w-full bg-black'>{item.tradingsymbol}</th>
                  </div>
                  <td className='mr-10 p-10'>{item.order_timestamp.split('T')[0]}</td>
                  <td className='mr-10 p-10'>{item.quantity}</td>
                  <td className='mr-10 p-10'>{item.order_type}</td>
                  <td className='mr-10 p-10'>{item.transaction_type}</td>
                  <td className='mr-10 p-10'>{item.status}</td>
                </tr>        
                )
              })}
            </tbody>
          </table>
          
        </div>
      </div>
      )
}

export default Tradebook