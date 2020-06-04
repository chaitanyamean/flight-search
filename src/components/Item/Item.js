
import React from 'react';
import './Item.css';

let Item = ({ item, children }) => (
  <div className="Item">
    <div className="Item-left">
        <h5>Rs. {item.price}</h5>
        <div>{item.flightNumber}</div>
        <div className="Item-price">{item.originCityCode} > {item.destCityCode} </div>
        <div className="Item-description">Depart: {item.deptDateTime}</div>
        <div className="Item-description">Arrive: {item.retDateTime}</div>
    </div>

    <div className="Item-right">
      
      <button className="Item-book" onClick={item.onClickHandler} type="submit">
        Book this flight
      </button>
      {children}
    </div>
  </div>
)

Item.onClickHandler =  (event) => {
  alert("Flight booked successfully :)")
  event.preventDefault();
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.node
};

export default Item;
