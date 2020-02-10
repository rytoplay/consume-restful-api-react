import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, useParams } from 'react-router-dom';
import Products from './components/products';
import NewProduct from './components/newProduct';
import EditProduct from './components/editProduct';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loadProductsFromDb();
  }
  state = {
    dev: true,  //easiest for now for stackblitz
    error: null, 
    isFetching: false,
    products: [],
    currentProductId: ''
  };
  
  componentDidMount() {};
  
  // RETRIEVE
  loadProductsFromDb = () => {
    // load mock data when dev is true
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
      // load data from api when dev is false
      this.setState({ isFetching: true })
      fetch('http://localhost:4200/api/products')
      .then(res => res.json())
      .then((data) => {
        this.setState({ isFetching: false })
        this.setState({ products: data});
        this.render(<p>Hello World</p>);
        if (document.location.href.match(/\/update\/(.+)/)) {
          this.setState({ currentProductId: RegExp.$1 });
        } else {
          this.setState({ currentProductId: 'did not match'})
        }
      },
      (error) => {
        this.setState({
          isFetching: false,
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
      price: formData.productPrice,
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
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } 

  // UPDATE
  handleProductUpdate = (id) => {
    const productData = this.state.products.filter( prod => prod._id === id );
    document.location.replace(`/update/${id}`);
    console.log('update', productData);

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
            {console.log('just before EditProduct', this.state)}
              <EditProduct 
                products     = {this.state.products} 
                handleSubmit = {this.handleNewProductSubmit} />
            </Route>
          </Switch>
        </Router>
      </div>
      )
  };
}

export default App;
