
import React, {  ChangeEvent, useState } from 'react'
import Card from './Card'
import Data from '../Data/DataHairAcc'
import "../Styles/ClothingCss.css"
export default function HairAccessories() {
  const [filteredList, setFilteredList] = useState(Data);
  const itemList=Data
  const filterBySearch = (event:ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
      var updatedList = [...itemList];
     updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || item.brand.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };
  return (
    <>
    <div className="search-header">
    <div className="search-text">Search:</div>
    <input id="search-box"onChange={filterBySearch} />
</div>
    <div className="card-container">
      
  {filteredList.map((product,index) => {
        return (  
  <div  key ={index} className="card" >
      <Card  image={product.image} previous_price={product.previous_price} New_price={product.New_price} name={product.name} brand={product.brand}/>
      </div>
          )
          })}
          </div>
          </>
  );
}
