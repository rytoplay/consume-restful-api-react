import React from 'react';

class NewProduct extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // productName: '',
         // productDescription: '',
         // productPrice: '',
         // productImageURL: '',
         productName: 'Fidget Ring',
         productDescription: 'Great for calming the nerves',
         productPrice: '2.99',
         productImageURL: 'http://localhost:3000/images/fidget_spinner.jpg',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      console.log('newProduct', this.props);
   }

   handleSubmit(event) {
      event.preventDefault();
      this.props.handleSubmit(this.state);
   }

   handleChange(event) {
      const stateObj = {};
      this.setState({ [event.target.id]: event.target.value });
   }

   render() {
      return (
      <div className="row justify-content-center">
      <form onSubmit={this.handleSubmit} className="col-md-6 col-sm-12">
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
         <div className="form-group">
           <label htmlFor="productImageURL">Image URL</label>
           <input type="text" className="form-control" id="productImageURL" placeholder="http://localhost:3000/images/foo.jpg"
           value={this.state.productImageURL} onChange={this.handleChange} />
         </div>
         <button type="submit" className="btn btn-primary">Submit</button>
       </form>
       </div>
      )
   }
}

export default NewProduct;