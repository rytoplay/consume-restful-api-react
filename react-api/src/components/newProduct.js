import React from 'react';

class NewProduct extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         productName: '',
         productDescription: '',
         productPrice: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
      console.log('submitting values');
      event.preventDefault();
   }

   handleChange(event) {
      const stateObj = {};
      this.setState({ [event.target.id]: event.target.value });
   }

   render() {
      return (
      <div>
      <h1>New Product</h1>
      <form onSubmit={this.handleSubmit}>
         <div className="form-group">
           <label htmlFor="productName">Product Name</label>
           <input type="text" className="form-control" id="productName" placeholder="Product Name" 
           value={this.state.productName} onChange={this.handleChange} />
           <small id="emailHelp" className="form-text text-muted">You have to power to invent and create</small>
         </div>
         <div className="form-group">
           <label htmlFor="description">Product Description</label>
           <textarea type="text" className="form-control" id="productDescription" 
           value={this.state.productDescription} onChange={this.handleChange}></textarea>
         </div>
         <div className="form-group">
           <label htmlFor="productPrice">Price</label>
           <input type="text" className="form-control" id="productPrice" placeholder="5.99"
           value={this.state.productPrice} onChange={this.handleChange} />
         </div>
         <button type="submit" className="btn btn-primary">Submit</button>
       </form>
       </div>
      )
   }
}

export default NewProduct;