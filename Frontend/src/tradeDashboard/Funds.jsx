import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../dynamicRoutes';

const Funds = (props) => {
  return (
    // <div>{props.data&&props.data.equity.available.cash}</div>
    // console.log(props.data)
    // hell0
    <div className='w-full text-[#BABABA] text-lg'>
    <div  >
      <table >
        <thead className=' w-screen pt-4'>
          <tr className='pt-4'>
            <th className='w-1/12 text-center pt-4'>Available Cash</th>
            <th className='w-1/12 text-center'>Live balance</th>
            <th className='w-1/12 text-center'>Opening balance</th>
            <th className='w-1/12 text-center'>debits</th>
          </tr>
        </thead>
        <tbody className=''>
          {props.data&&
                  <tr>
                    <td className='text-center'>{props.data.equity.available.cash}</td>
                    <td className='text-center'>{props.data.equity.available.live_balance}</td>
                    <td className='text-center'>{props.data.equity.available.opening_balance}</td>
                    <td className='text-center'>{props.data.equity.utilised.debits}</td>
                  </tr>
                  }
        </tbody>
      </table>
    </div>
  </div>

  )
}

export default Funds