import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {

  const [popular, setPopular] = useState([]);
  

  const fetchInfo = () => { 
    fetch('https://shopify-backend-gezh.onrender.com/popularinwomen') 
            .then((res) => res.json()) 
            .then((data) => setPopular(data));
   
    }

    useEffect(() => {
      fetchInfo();
    }, [])


  return (
    <div>
      <Hero/>
      <Popular data={popular}/>
      <Offers/>
      <NewCollections />
      <NewsLetter/>
    </div>
  )
}

export default Shop
