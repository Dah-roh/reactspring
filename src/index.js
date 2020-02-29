import ReactDOM from 'react-dom';
import './index.css'; 
import React, {useState, useEffect}  from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
   async function fetchData() {
       const res = await fetch("http://localhost:8083/api/v1/view");
       const data = await res.json()
      setProducts(data);
      
   console.log(data);
   }
   useEffect(() => {
   fetchData()
}, []);
const { productDetails } = products;
console.log(productDetails);
    return (<div className = "container">
        <h3 align = "center"> All Products</h3>
        <div className = "table" align = "center" >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Product Description</th>
                    <th>Quantity Avaliable</th>
                    <th>Quantity Sold</th>
                </tr>
                </thead>
                <tbody>

                    {products && products.map((products, index ) => (                    
                   
                   <tr key ={index}>
                    <td>{JSON.stringify(products.id)}</td>
                <td>{JSON.stringify(products.description).replace(/\"/g, "")}</td>
                <td>{JSON.stringify(products.available)}</td>
                    <td>{JSON.stringify(products.sold)}</td>
                </tr>
                ))}
                </tbody>
            
        </div>
    </div>);
    };




ReactDOM.render(<Products/>, document.getElementById('root'));
