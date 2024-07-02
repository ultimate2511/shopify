import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item' onClick={() => window.scrollTo(0, 0)}>
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="" />
        <p style={{color:'black'}} onClick={() => window.scrollTo(0, 0)}>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            ${props.new_price}
          </div>
          <div className="item-price-old">
            ${props.old_price}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Item