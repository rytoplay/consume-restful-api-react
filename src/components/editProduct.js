import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useParams, Redirect } from 'react-router-dom';


class EditProduct extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         productId: '',
         productName: '',
         productDescription: '',
         productPrice: '',
         productImageURL: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.products = this.props.products;
      console.log('newProduct', this.props);
   }

   componentDidMount() {
      console.log('component update ran');
      if (document.location.href.match(/([^\/]+)$/)) {
         const id = RegExp.$1;
         const currentProduct = this.props.products.filter( p => p._id === id );
         if (!currentProduct.length) {
            return (<Redirect to="/" />);
         }
         console.log('currentProduct', currentProduct);
         this.setState({ 
            productId: id,
            productName: currentProduct[0].name,
            productDescription: currentProduct[0].description,
            productPrice: currentProduct[0].price,
            productImageURL: currentProduct[0].imageURL,
         });
      }
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
};

export default EditProduct;