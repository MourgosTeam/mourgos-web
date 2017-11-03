import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Catalogue from './components/Catalogue.jsx'
import Basket from './components/Basket.jsx'


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
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
              <Catalogue id="1" mode="normal" onAddItem={this.addBasketItem}></Catalogue>
            </div>
            <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">
              <Basket items={this.state.basketItems} onRemoveItem={this.removeBasketItem}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
