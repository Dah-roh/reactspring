import ReactDOM from 'react-dom';
import './index.css'; 
import React, {useState, useEffect}  from "react";

const Products = () => {
    const [products, setProducts] = useState({});
   async function fetchData() {
       const res = await fetch("http://localhost:8083/api/v1/1");
       const data = await res.json()
      setProducts(data);
      
   console.log(data);
   }
   useEffect(() => {
   fetchData()
}, []);

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
                    
                    <tr key ={1}>
                    <td>{Object.values(products)[0]}</td>
                <td>{Object.values(products)[1]}</td>
                <td>{Object.values(products)[2]}</td>
                <td>{Object.values(products)[3]}</td>
                </tr>
                </tbody>
            
        </div>
    </div>);
    };




ReactDOM.render(<Products/>, document.getElementById('root'));
