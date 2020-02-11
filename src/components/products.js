import React from 'react';
import { Link } from 'react-router-dom';


class Products extends React.Component {
   constructor(props) {
      super(props);
      console.log(props);
   }
   render() {
      return (
         <div className="container">
         <div className="row justify-content-center">
         {this.props.products.map((product) => {
            console.log(product);
            return (
         
            <div className="card col-lg-6 col-sm-12" key={product._id} style={{marginTop: "10px", boxShadow: "2px 2px 2px rgba(0, 0, 0, .2)"}}>
               <div className="card-body">
                  <div className="row">
                     <img src={product.imageURL} width="100%" className="col-3" />
                     <div className="row col-9">
                        <h5 className="card-title col-12">{product.name} <small>{ product.price ? `$${product.price.toFixed(2)}` : ''}</small></h5>
                        <h6 className="card-subtitle mb-2 text-muted">{product.description}</h6>
                        <p className="card-text"></p>
                     </div>
                  </div>
               </div>
               <div className="row justify-content-center">
               <a href="#" id={product._id} onClick={() => {this.props.handleDelete(product._id)}} className="col col-4"><small>Delete Product</small></a>
               <Link to={`/update/${product._id}`} id={product._id} className="col col-4"><small>Update Product</small></Link>
               </div>
            </div>)}
         )}
         </div>
         </div>
      )
   }
};

export default Products;