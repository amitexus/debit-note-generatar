import React, { useState, useRef, useEffect } from 'react';
import { data } from './Home';

function Search({ selectedProducts, setSelectedProducts, showSearch, setShowSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const handleProductClick = (selectedItem) => {
    const productExist = selectedProducts.some(product => product.id === selectedItem.id);
    const productIndex = selectedProducts.findIndex(product => product.id === selectedItem.id);
    if (!productExist) {
      setSelectedProducts([...selectedProducts, selectedItem]);
    }
    if (productIndex !== -1) {
      const updatedProducts = selectedProducts.map((product, index) => {
        if (index === productIndex) {
          return {
            ...product,
            qty: product.qty + 1,
            discount: product.discount + product.discount,
          };
        };
        return product;
      });
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...selectedItem, qty: 1 }]);
    }
  };
  const filteredProducts = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const searchRef = useRef(null);
  useEffect(() => {
    const handleOutSide = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        console.log(window.addEventListener);
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
      <div ref={searchRef} className='w-[480px] h-[408px] bg-white rounded-[16px] z-99 px-[16px] pt-[16px] pb-[0px] absolute top-[350px]' >
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='outline-none border-none w-[448px] h-[40px] bg-[#f0f0f0] p-[12px] rounded-[8px]' placeholder='Search product' />
        <div className='w-[448px] h-[288px] overflow-y-auto my-2' >
          {filteredProducts.map((item) => (
            <div className='flex justify-between items-center w-[408px] mx-auto pb-[8px] border-b' key={item.id} onClick={() => handleProductClick(item)}>
              <span>
                <p className='text-[15px] font-medium'>{item.title}</p>
                <span className='flex gap-2'>
                  <p className='text-[11px] text-[#00A8E8]'>{item.tag}</p>
                  <p className='text-[11px]'>Batch: {item.batch}</p>
                </span>
              </span>
              <span className='text-[11px]'>Rs. {item.rate}</span>
            </div>
          ))}
        </div>
        <div className='w-[448px] h-[40px]'><p className='text-[12px] text-[#00A8E8] font-medium text-center cursor-pointer'>Add New</p></div>
      </div>
    </>
  )
}
export default Search
