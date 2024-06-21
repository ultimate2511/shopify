import React, { createContext } from "react";
import all_products from '../Components/Assets/all_product'
import { useState } from 'react';

const getDefaultCart=()=>{

    let cart={};
    for(let i=0;i<all_products.length+1;i++){
        cart[i]=0;
    }
    return cart;
}


export const ShopContext=createContext(null);

const ShopContextProvider=(props)=>{
     
    const [cartItems,setCartItems]=useState(getDefaultCart());
   
    
   
   const addToCart=(itemId)=>{
     
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
   }
   const removeFromCart=(itemId)=>{
     
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
}

const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = all_products.find((product) => product.id === Number(item));
          totalItem += itemInfo ? cartItems[item] : 0 ;
        } catch (error) {}
      }
    }
    return totalItem;
  };

const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        try {
          let itemInfo = all_products.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        } catch (error) {}
      }
    }
    return totalAmount;
  };


const contextValue={all_products,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}



export default ShopContextProvider