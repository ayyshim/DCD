import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginScreen from './Components/Screens/Login';
import DashboardScreen from './Components/Screens/Dashboard';
class App extends Component {
 render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginScreen}/>
            <Route exact path="/dashboard" component={DashboardScreen}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
