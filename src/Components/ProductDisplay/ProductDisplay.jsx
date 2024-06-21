import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import start_dull_icon from '../Assets/star_dull_icon.png';


const ProductDisplay = (props) => {

    const {product}=props;
  return (
    <div className='productdisplay'>
            
            <div className="productdisplay-left">
                     
                     <div className="productdisplay-image-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                     </div>
                     <div className="productdisplay-image">
                        <img className="productdisplay-main-img"src={product.image} alt="" />
                     </div>
            </div>
            <div className="productdisplay-right">
                   <h1>{product.name}</h1>
                   <div className="productdisplay-right-star">
                        
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={start_dull_icon} alt="" />
                        <p>122</p>
                   </div>
                   <div className="productdisplay-right-prices">
                    <div className="old-price"></div>
                    <div className="new-price"></div>
                   </div>
            </div>
    </div>
  )
}

export default ProductDisplay
