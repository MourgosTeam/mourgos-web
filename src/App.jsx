import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CatalogueView from './components/CatalogueView.jsx'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      basketItems :  [{quantity : 2 , description : "To kalutero beef tis agoras", price : 214.5}]
    }

    // TO - DO
    //this.loadFromStorage();

    this.addBasketItem = this.addBasketItem.bind(this);
    this.removeBasketItem = this.removeBasketItem.bind(this);
  }

  addBasketItem(item){
    this.setState(prevState => ({
      basketItems: [...prevState.basketItems, item]
    }));
  }

  removeBasketItem(item){
    var array = this.state.basketItems;
    var index = array.indexOf(item);
    array.splice(index, 1);
    this.setState({basketItems: array });
  }


  render() {
    return (
      <div className="App">
        <header className="navbar navbar-default">
          <div className="container">
            <img src={logo} className="App-logo navbar-header" alt="logo" />
            
          </div>
        </header>
        <CatalogueView catalogue="1s"></CatalogueView>
      </div>
    );
  }
}

export default App;
