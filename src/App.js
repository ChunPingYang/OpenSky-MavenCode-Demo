import React, { Component } from 'react';
import './App.css';
import Login from './compopnents/Login';
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './main';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
       <div className="App">
       <header className="App-header">
           <div>
             <Route path="/Login" component={Login} />
             <Route path="/Dashboard" component={Main} />
          </div>
         </header>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
