import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useParams } from 'react-router-dom';
import Products from './components/products';
import NewProduct from './components/newProduct';
import EditProduct from './components/editProduct';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    dev: true,  //easiest for now for stackblitz
    error: null, 
    isFetching: false,
    products: [],
    currentProduct: {}
  };
  
  componentDidMount() {this.loadProductsFromDb();};

  // RETRIEVE
  loadProductsFromDb = () => {
    if (this.state.dev) {
      this.setState({ products: [
        { _id: "5e3615179d7a8e01d85147e1",
          imageURL: "http://localhost:3000/images/office_chair.jpg",
          description: "sit and stay a while",
          name: "Office Chair",
          price: 62.99},
        { _id: "5e3616e59d7a8e01d85147e3",
          imageURL: "http://localhost:3000/images/fidget_spinner.jpg",
          description: "Great for calming the nerves",
          name: "Fidget Ring 11",
          price: 4.99},
        { _id: "5e3617349d7a8e01d85147e4",
          imageURL: "http://localhost:3000/images/smart_plug.jpg",
          description: "connect iphone or android to any outlet",
          name: "Smart Plug",
          price: 24.5}
     ]});
    } else {
      this.setState({ isFetching: true })
      fetch('http://localhost:4200/api/products')
      .then(res => res.json())
      .then((data) => {
        this.setState({ isFetching: false })
        this.setState({ products: data});
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
    }
  }
  

  // CREATE
  handleNewProductSubmit = (formData) => {
    // convert form data to db column names
    const productData = {
      _id: formData.id,
      name: formData.productName,
      description: formData.productDescription,
      amount: formData.productPrice,
      imageURL: formData.productImageURL
    }
    // perform fetch(url, method: POST)
    fetch('http://localhost:4200/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    .then(res => res.json())
    .then((data) => {
      productData._id = data.id;
      this.setState({ products: [...this.state.products, productData ]}, this.loadProductsFromDb());
      document.location.replace('/');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } 

  // UPDATE
  handleProductUpdate = (formData) => {
    console.log('update', formData);
    console.log(Route);
    const productData = {
      _id: formData.productId,
      name: formData.productName,
      description: formData.productDescription,
      amount: formData.productPrice,
      imageURL: formData.productImageURL
    }
    // perform fetch(url, method: POST)
    fetch('http://localhost:4200/api/products/'+productData._id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    }).then(() => {
      this.setState({ products: [...this.state.products, productData ]}, this.loadProductsFromDb());
      document.location.replace('/');
    })
  }

  // DELETE
  handleProductDelete = (id) => {
    // perform fetch(url, method: POST)
    fetch(`http://localhost:4200/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      const products = this.state.products.filter( prod => prod._id !== id );
      this.setState( {products: products }, this.loadProductsFromDb() )
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  render() {
      return (
        <div className="container-fluid">
        <Router>
          <div className="row">
              <div className="col-md-6 col-sm-12" style={{backgroundColor: "#aab"}}>
                <h1><Link to="/">Browse Products</Link></h1>
              </div>
              <div className="col-md-6 col-sm-12" style={{backgroundColor: "#aba"}}>
                <h1><Link to="/add">Add A Product</Link></h1>
              </div>
          </div>

          <Switch>
            <Route exact path="/">
              <Products 
                products     = {this.state.products} 
                handleDelete = {this.handleProductDelete}  
                handleUpdate = {this.handleProductUpdate}
              />
            </Route>

            <Route exact path="/add">
              <NewProduct 
                handleSubmit = {this.handleNewProductSubmit} 
              />
            </Route>
            <Route path="/update/:id">
              <EditProduct 
                products     = {this.state.products} 
                handleSubmit = {this.handleProductUpdate} />
            </Route>
          </Switch>
        </Router>
      </div>
      )
  };
}

export default App;
