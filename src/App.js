import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginScreen from './Components/Screens/Login';
import DashboardScreen from './Components/Screens/Dashboard';
import Test from './Components/Screens/test';
class App extends Component {
 render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginScreen}/>
            <Route exact path="/dashboard" component={DashboardScreen}/>
            <Route exact path="/test" component={Test}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
