import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'icons-react/md'
import { AiOutlineDown, AiOutlineRight, AiOutlineCalendar } from 'icons-react/ai'
import Search from './Search';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


function Home() {
  const [showTable, setShowTable] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);




  useEffect(() => {
    const handleOutSide = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };


    if (showSearch) {
      window.addEventListener('mousedown', handleOutSide)
    }
    return () => {
      window.removeEventListener('mousedown', handleOutSide)
    };

  }, [showSearch]);
 
  
  return (
    <>
      <div className='flex justify-between items-center font-dm-sans px-[24px] py-[8px]' ref={searchRef}>
        <span className='font-bold text-[17px] leading-[22px]'>New debit note</span>
        <MdClose size={24} />
      </div>
      <form className='px-[24px] py-[8px] flex gap-4 justify-between items-center flex-wrap font-dm-sans'>
        <div className='flex flex-col w-[625px]'>
          <span className='font-normal text-[12px]'>Suppler name <span className='text-red-600 font-bold'>*</span></span>
          <span className='rounded-[8px] bg-[#F0F0F0] md:w-full h-[48px] py-[14px] px-[16px] flex justify-between items-center'>
            <input type='text' placeholder='Eg. Globex Corporation' className='bg-[#F0F0F0] py-[14px] px-[16px] outline-none border-none w-full text-[12px] leading-[16px]'/><AiOutlineDown className='cursor-pointer' />
          </span>


        </div>
        <div className='flex flex-col w-[625px]'>
          <span className='font-normal text-[12px]'>Date <span className='text-red-600 font-bold'>*</span></span>
          <span className='rounded-[8px] bg-[#F0F0F0] md:w-full h-[48px] py-[14px] px-[16px] flex justify-between items-center'>
            <input placeholder="dd/mm/yyyy" className='bg-[#F0F0F0] text-[12px] leading-[16px] outline-none border-none'/>
            <AiOutlineCalendar/>

          </span>


        </div>
        <div className='flex flex-col w-[625px]'>
          <span className='font-normal text-[12px]'>Reference <span className='text-red-600 font-bold'>*</span></span>
          <input type='text' placeholder='Enter reference' className='rounded-[8px] bg-[#F0F0F0] md:w-full h-[48px] py-[14px] px-[16px] text-[12px] leading-[16px] outline-none border-none' />
        </div>

        <div className='overflow-x-auto md:w-full'>
          <table className="table-auto min-w-full my-2 ">
            <thead>
              <tr className='border-t border-b text-[13px] font-medium'>
                <th className="text-start px-4 py-2">Item/product</th>
                <th className="pe-1 py-2">Batch</th>
                <th className="px-1 py-2">Warehouse</th>
                <th className="px-1 py-2">Qty</th>
                <th className="px-1 py-2">Rate</th>
                <th className="px-1 py-2">Discount</th>
                <th className="px-1 py-2">Tax</th>
                <th className="px-1 py-2">Amount</th>

              </tr>
            </thead>
            {!showTable && <tbody>
              <tr className='text-[12px] text-center'>
                <td className="px-4 py-2 text-start">
                  <p>Old durbar black chimeny 750ml</p><p className='border-b-2 border-dotted py-6 w-48'>Enter description</p></td>
                <td className="px-4 md:px-1 py-2">4324A</td>
                <td className="px-4 md:px-1 py-2 "><span className='flex items-center justify-center'>ktm1 <AiOutlineDown /></span></td>
                <td className="px-4 md:px-1 py-2 "><span className='flex items-center justify-center'>2btl <AiOutlineDown /></span></td>
                <td className="px-4 md:px-1 py-2">2,300</td>
                <td className="px-4 md:px-1 py-2">230</td>
                <td className="px-4 md:px-1 py-2">13% vat</td>
                <td className="px-4 md:px-1 py-2">4140.00</td>
                <td className="px-4 md:px-1 py-2"><MdClose size={24} className='hover:text-orange-400' onClick={() => setShowTable(true)} /></td>

              </tr>

            </tbody>}
            <tbody>
              <tr className='text-[12px] text-start border-b text-gray-400' onClick={() => setShowSearch(true)}>
                <td className="px-4 md:px-1 py-5 cursor-pointer">Add code or product</td>
              </tr>
              {showSearch && <Search setShowSearch={setShowSearch} />}

            </tbody>
          </table>
          {!showSearch && (
            <div className='flex flex-col-reverse md:flex-row justify-between items-start my-10 text-[#00171F]'>
              <div className='text-[12px] w-full my-4 md:w-1/2'>
                <p className='text-[12px] font-bold'>Note</p>
                <input type='text' placeholder='Enter notes' className='py-[15px] px-[16px] bg-[#f0f0f0] rounded-[8px] w-[440px] h-[72px]' />
                <p className='text-[11px] text-[#979797]'>*this will be appear on print</p>
              </div>
              <div className='flex flex-col gap-4 w-full md:w-1/2 text-[12px] text-[#00171F]'>
                <span className='flex justify-between'>
                  <p>Total</p>
                  <p>0</p>
                </span>

                <span className='flex justify-between'>
                  <p>Total Excise Duty</p>
                  <p>0</p>
                </span>
                <span className='flex justify-between'>
                  <p>Discount</p>
                  <p>0</p>
                </span>
                <span className='flex justify-between'>
                  <p>Non-Texable Total</p>
                  <p>0</p>
                </span>
                <span className='flex justify-between'>
                  <p>Texable Total</p>
                  <p>0</p>
                </span>
                <span className='border-b-2 border-[#00171F] pb-4 flex justify-between'>
                  <p>Vat</p>
                  <p>0</p>
                </span>
                <span className='flex justify-between'>
                  <p className='font-medium'>Grand Total</p>
                  <p>0</p>
                </span>
              </div>
            </div>
          )}

        </div>

        <div className='flex w-full items-center justify-between py-10 text-[15px] text-[#00171F] leading-[20px]'>
          <span className=''>Custom fields</span>
          <span className=''><AiOutlineRight /></span>
        </div>
        <div className='w-full py-10 text-[15px] text-[#00171F] leading-[20px]'>
          <p className='text-[12px] mb-4'>Terms & conditions</p>
          <input type='text' placeholder='Enter notes' className='py-[15px] px-[16px] bg-[#f0f0f0] rounded-[8px] w-full h-[72px]' />

        </div>

        <span className='flex w-full justify-end'>
          <button className={`bg-[#00A8E8] text-white rounded-[8px] py-[14px] px-[40px] w-[113px] h-[48px]`}>Save</button>
        </span>






      </form>

    </>

  )
}

export default Home
