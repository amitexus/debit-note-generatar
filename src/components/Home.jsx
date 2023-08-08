import React, { useEffect, useState } from 'react'
import { MdClose } from 'icons-react/md'
import { AiOutlineDown, AiOutlineUp, AiOutlineRight, AiOutlineCalendar } from 'icons-react/ai'
import Search from './Search';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

export const data = [
  { id: 1, tag: 23987, title: "Old durbar 750ml", batch: "4324A", wareHouse: "KTM", qty: 1, rate: 2300, discount: 230, tax: 13 },
  { id: 2, tag: 23983, title: "Old durbar 350ml", batch: "4324A", wareHouse: "BTk", qty: 1, rate: 1150, discount: 120, tax: 10 },
  { id: 3, tag: 23293, title: "signeture 750ml", batch: "2348A", wareHouse: "LIT", qty: 1, rate: 3300, discount: 330, tax: 11 },
  { id: 4, tag: 23193, title: "signeture 350ml", batch: "1224A", wareHouse: "Pokhara", qty: 1, rate: 1650, discount: 230, tax: 13 },
  { id: 5, tag: 22393, title: "Black Ok 750ml", batch: "3984A", wareHouse: "KTM", qty: 1, rate: 1060, discount: 230, tax: 13 },
  { id: 6, tag: 23393, title: "wine 350ml", batch: "0984A", wareHouse: "Pokhara", qty: 1, rate: 1700, discount: 90, tax: 13 },
  { id: 7, tag: 2093, title: "Royal Stag 450ml", batch: "6754A", wareHouse: "KTM", qty: 1, rate: 1900, discount: 160, tax: 13 },
  { id: 8, tag: 232293, title: "Russlan 350ml", batch: "1224A", wareHouse: "KTM", qty: 1, rate: 800, discount: 30, tax: 13 },
  { id: 9, tag: 23938, title: "Golden Ok 75ml", batch: "9874A", wareHouse: "Pokhara", qty: 1, rate: 280, discount: 60, tax: 13 },
  { id: 10, tag: 2337, title: "Golden Ok 750ml", batch: "0624A", wareHouse: "LIT", qty: 1, rate: 1120, discount: 110, tax: 13 }]

function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChange = date => {
    setDate(date);
  }
  const initialValue = {
    supplerName: '',
    date: '',
    reference: '',
    note: '',
    terms: '',
  }
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const removeProduct = (productId) => { setSelectedProducts(selectedProducts.filter(product => product.id !== productId)); };
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const handleIncrement = () => { if (discountPercentage < 100) { setDiscountPercentage(discountPercentage + 1); } };
  const handleDecrement = () => {
    if (discountPercentage > 0) {
      setDiscountPercentage(discountPercentage - 1);
    }
  };
  let [totalTaxable, setTotalTaxable] = useState(0);
  let [totalVat, setTotalVat] = useState(0);
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    let totalDiscount = 0;
    let totalExciseDuty = 0;
    selectedProducts.forEach((product) => {
      const amount =
        product.qty * product.rate;
        totalAmount += amount;
        totalTaxable += totalAmount - totalDiscount;
        if (discountPercentage === 0) {
        totalDiscount += product.discount
        } else {
        totalDiscount = totalAmount * discountPercentage/100;
        };
      totalTaxable = totalAmount + totalExciseDuty - totalDiscount;
      totalVat += (((product.qty * product.rate) - product.discount - totalExciseDuty) * product.tax) / 100;
    });
    return { totalAmount, totalDiscount, totalTaxable, totalVat}
  };

  const { totalAmount, totalDiscount } = calculateTotalAmount();
  const grandTotal = totalTaxable + totalVat;
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors])
  const validation = (values) => {
    const errors = {};
    if (!values.supplerName) {
      errors.supplerName = "filed is require"
    }
    if (!values.reference) {
      errors.reference = "filed is require"
    }
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  }
  return (
    <>
      <div className='flex justify-between items-center font-dm-sans px-[24px] py-[8px]' >
        <span className='font-bold text-[17px] leading-[22px]'>New debit note</span>
        <MdClose size={24} />
      </div>
      <form onSubmit={handleSubmit} className='px-[24px] py-[8px] flex gap-4 justify-between items-center flex-wrap font-dm-sans'>
        <div className='flex flex-col w-[625px]'>
          <span className=' flex gap-x-1 font-normal text-[12px]'>Suppler name<span className='text-red-600 font-bold'>*</span><p className='text-red-400'>{formErrors.supplerName}</p></span>
          <span className='rounded-[8px] bg-[#F0F0F0] md:w-full h-[48px] py-[14px] px-[16px] flex justify-between items-center'>
            <input type='text' name='supplerName' value={formValues.supplerName} onChange={handleChange} placeholder='Eg. Globex Corporation' className='bg-[#F0F0F0] py-[14px] px-[16px] outline-none border-none w-full text-[12px] leading-[16px]' /><AiOutlineDown className='cursor-pointer' />
          </span>
        </div>
        <div className='flex flex-col w-[625px]'>
          <span className=' flex gap-x-1 font-normal text-[12px]'>Date <span className='text-red-600 font-bold'>*</span><p className='text-red-400'>{formErrors.date}</p></span>
          <span className='rounded-[8px] bg-[#F0F0F0] md:w-full h-[48px] py-[14px] px-[16px] flex justify-between items-center'>
            <DatePicker
              selected={date}
              onChange={onChange}
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyyy"
              // value={formValues.date}
              className="bg-[#F0F0F0] text-[12px] leading-[16px] outline-none border-none w-full"
            /><AiOutlineCalendar />
          </span>
        </div>
        <div className='flex flex-col w-[625px]'>
          <span className='flex gap-x-1 font-normal text-[12px]'>Reference <span className='text-red-600 font-bold'>*</span><p className='text-red-400'>{formErrors.reference}</p></span>
          <input name='reference' value={formValues.reference} onChange={handleChange} type='text' placeholder='Enter reference'
            className='rounded-[8px] bg-[#F0F0F0] md:w-full h-[48px] py-[14px] px-[16px] text-[12px] leading-[16px] outline-none border-none' />
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
            {selectedProducts.map((product) => (
              <tbody key={product.id}>
                <tr className='text-[12px] text-center'>
                  <td className="px-4 py-2 text-start">
                  <td>{product.title}</td><p className='border-b-2 border-dotted py-6 w-48'>Enter description</p></td>
                  <td className="px-4 md:px-1 py-2">{product.tag}</td>
                  <td className="px-4 md:px-1 py-2 "><span className='flex items-center justify-center'>{product.wareHouse} <AiOutlineDown /></span></td>
                  <td className="px-4 md:px-1 py-2 "><span className='flex items-center justify-center'>{product.qty}btl <AiOutlineDown /></span></td>
                  <td className="px-4 md:px-1 py-2">{product.rate}</td>
                  <td className="px-4 md:px-1 py-2">{product.discount}</td>
                  <td className="px-4 md:px-1 py-2">{product.tax + '% vat'}</td>
                  <td className="px-4 md:px-1 py-2">{product.qty * product.rate}</td>
                  <td className="px-4 md:px-1 py-2"><MdClose size={24} className='hover:text-orange-400' onClick={() => removeProduct(product.id)} /></td>
                </tr>
              </tbody>))}
            <tbody>
              <tr className='text-[12px] text-start border-b text-gray-400' onClick={() => setShowSearch(true)}>
                <td className="px-4 md:px-1 py-5 cursor-pointer">Add code or product</td>
              </tr>
              <tr>{showSearch && <Search setSelectedProducts={setSelectedProducts} showSearch={showSearch} setShowSearch={setShowSearch} selectedProducts={selectedProducts} />}</tr>
            </tbody>
          </table>
          <div className='flex flex-col-reverse md:flex-row justify-between items-start my-10 text-[#00171F]'>
            <div className='text-[12px] w-full my-4 md:w-1/2'>
              <p className='text-[12px] font-bold'>Note</p>
              <input name='note' value={formValues.note} onChange={handleChange} type='text' placeholder='Enter notes' className='py-[15px] px-[16px] bg-[#f0f0f0] rounded-[8px] w-[440px] h-[72px]' />
              <p className='text-[11px] text-[#979797]'>*this will be appear on print</p>
            </div>
            <div className='flex flex-col gap-4 w-full md:w-1/2 text-[12px] text-[#00171F]'>
              <span className='flex justify-between'>
                <p>Total</p>
                <p>{totalAmount.toFixed(2)}</p>
              </span>
              <span className='flex justify-between'>
                <p>Total Excise Duty</p>
                <p>0</p>
              </span>
              <span className='flex justify-between'>
                <span className='flex items-center justify-between gap-x-4'>
                  <p>Discount</p>
                  <p className='bg-[#f0f0f0] w-[80px] h-[24px] p-1'>percent</p>
                  <span className=''>
                    <AiOutlineUp size={12} onClick={handleIncrement} />
                    <AiOutlineDown onClick={handleDecrement} /></span>
                  {discountPercentage > 0 && (
                    <span className='ps-3 border-b-2 border-dashed'>
                      {discountPercentage}%
                    </span>)}
                </span>
                <p className='border-b border-t border-[#979797] border-dashed'>{totalDiscount.toFixed(2)}</p>
              </span>
              <span className='flex justify-between'>
                <p>Non-Texable Total</p>
                <p>0</p>
              </span>
              <span className='flex justify-between'>
                <p>Texable Total</p>
                <p>{totalTaxable.toFixed(2)}</p>
              </span>
              <span className='border-b-2 border-[#00171F] pb-4 flex justify-between'>
                <p>Vat</p>
                <p>{totalVat.toFixed(2)}</p>
              </span>
              <span className='flex justify-between'>
                <p className='font-medium'>Grand Total</p>
                <p>{grandTotal.toFixed(2)}</p>
              </span>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-between py-10 text-[15px] text-[#00171F] leading-[20px]'>
          <span className=''>Custom fields</span>
          <span className=''><AiOutlineRight /></span>
        </div>
        <div className='w-full py-10 text-[15px] text-[#00171F] leading-[20px]'>
          <p className='text-[12px] mb-4'>Terms & conditions</p>
          <input name='terms' value={formValues.terms} onChange={handleChange} type='text' placeholder='Enter notes' className='py-[15px] px-[16px] bg-[#f0f0f0] rounded-[8px] w-full h-[72px]' />
        </div>
        <span className='flex w-full justify-end'>
          <button type='submit' className={`bg-[#00A8E8] text-white rounded-[8px] py-[14px] px-[40px] w-[113px] h-[48px]`}>Save</button>
        </span>
      </form>
    </>
  )
}


export default Home
