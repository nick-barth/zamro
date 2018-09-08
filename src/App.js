import React, { Component } from 'react';
import Spinner from './components/spinner';
import Compare from './components/compare';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      products: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('https://www.zamro.nl/actions/ViewProduct-ProductCompare?SKU=115E19,11545A,115E1A,115576')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.setState({products: data.products, isLoading: false});
    });

  }

  render() {
    const { products, isLoading } = this.state;

    return (
      <div className="App">
        {isLoading ? (
          <Spinner />
        ) : (
          <Compare products={products} />
        )}
      </div>
    );
  }
}

export default App;
