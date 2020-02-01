import React from 'react';
import Products from './components/products';
import NewProduct from './components/newProduct';
import './App.js'

class App extends React.Component {
  state = { 
    products: [] 
  };

  //fetch initial data from api
  componentDidMount() {
    fetch('http://localhost:4200/api/products')
    .then(res => res.json())
    .then((data) => {
      this.setState({ products: data});
      console.log(this.state.products);
    })
    .catch(console.log)
  }

  submitHandler = (form) => {console.log(form)} 
  render() {
      return (
        <div className="container-fluid">
        <div class="row">
          <div className="col-5">
          <Products products={this.state.products} />
          </div>
          <div className="col-5">
          <NewProduct submitHandler={this.submitHandler} />
          </div>
        </div>
        </div>
      )
  };
}

export default App;
