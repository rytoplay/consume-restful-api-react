import React from 'react';

const Products = ({ products }) => {
   return (
      <div>
      <center><h1>Product List</h1></center>
      {products.map((product) => 
         <div className="card" key={product._id} style={{marginTop: "10px", boxShadow: "2px 2px 2px rgba(0, 0, 0, .2)"}}>
            <div className="card-body">
               <h5 className="card-title">{product.name}</h5>
               <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
               <p className="card-text"></p>
            </div>
         </div>
      )}
      </div>
   )
};

export default Products;