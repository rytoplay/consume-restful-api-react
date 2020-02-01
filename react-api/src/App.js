import React from 'react';
import Products from './components/products';
import NewProduct from './components/newProduct';

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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

  handleSubmit = (event) => {console.log(event); } 
  render() {
      return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-5">
          <Products products={this.state.products} />
          </div>
          <div className="col-5">
          <NewProduct handleSubmit={this.handleSubmit} />
          </div>
        </div>
        </div>
      )
  };
}

export default App;
