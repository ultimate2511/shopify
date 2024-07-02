import React, { useEffect, useState } from "react";
import "./NewCollections.css";
 import new_collections from "../Assets/new_collections";
import Item from "../Item/Item";

const NewCollections = () => {

  const [new_collections,setNew_collections]=useState([]);

  useEffect(() => {
    fetch('https://shopify-backend-gezh.onrender.com/newCollections')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setNew_collections(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Optionally, you can set a default value or handle the error state here
      });
  }, []);
  

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item,i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;