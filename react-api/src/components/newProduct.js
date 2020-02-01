import React from 'react';

class NewProduct extends React.Component {
   render() {
      return (
      <div>
      <h1>New Product</h1>
      <form>
         <div className="form-group">
           <label for="productName">Product Name</label>
           <input type="text" className="form-control" id="productName" placeholder="Product Name" />
           <small id="emailHelp" className="form-text text-muted">You have to power to invent and create</small>
         </div>
         <div className="form-group">
           <label for="description">Product Description</label>
           <textarea type="text" className="form-control" id="productDescription" ></textarea>
         </div>
         <div className="form-group">
           <label for="productPrice">Price</label>
           <input type="text" className="form-control" id="productPrice" placeholder="5.99" />
         </div>
         <button type="submit" className="btn btn-primary">Submit</button>
       </form>
       </div>
      )
   }
}

export default NewProduct;