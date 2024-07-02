import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
// import { backend_url } from "../../App";

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const addProduct = async () => {

     let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch(`https://shopify-backend-gezh.onrender.com/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      await fetch(`https://shopify-backend-gezh.onrender.com/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => { data.success ? alert("Product Added") : alert("Failed") });

    }
  
   }

   const imageHandler=(e)=>{
    setImage(e.target.files[0]);
   }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  
  }

 

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name"   placeholder="Type here"  value={productDetails.name} onChange={changeHandler}/>
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input type="text" name="description"  placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="number" name="old_price" placeholder="Type here" value={productDetails.old_price} onChange={changeHandler}/>
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="number" name="new_price" placeholder="Type here" value={productDetails.new_price} onChange={changeHandler}/>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select  name="category" className="add-product-selector" value={productDetails.category} onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input  type="file" name="image" id="file-input" accept="image/*" hidden onChange={imageHandler} />
      </div>
      <button onClick={()=>{addProduct()}}className="addproduct-btn" >ADD</button>
    </div>
  );
};

export default AddProduct;
