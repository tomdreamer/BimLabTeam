import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import "./App.scss";

import HomePage from './Components/HomePage';
import PostDetails from './Components/PostDetails';
import NotFound from './Components/NotFound';
import SignupPage from './Components/SignupPage';
import LoginPage from "./Components/LoginPage";

import { getLogOut } from "./api.js";

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

class App extends Component {
  constructor(props) {
    super(props);

    // get the initial value of currentUser from localStorage
    let userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      // turn the string back into an object if we are logged in
      userInfo = JSON.parse(userInfo);
    }
    this.state = {
      currentUser: userInfo
    };
  }

  updateUser(newUser) {
    if (newUser) {
      // save the user info in localStorage if we are logging IN
      // (turn it into a JSON string before we save)
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      // delete the user info from localStorage if we are logging OUT
      localStorage.removeItem("currentUser");
    }
    this.setState({ currentUser: newUser });
  }

  logoutClick() {
    getLogOut().then(response => {
      console.log("Log Out", response.data);
      // set the currentUser state to empty
      this.updateUser(null);
    });
  }
  render() {
  return (
    <div className="App">
     
    
    
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Platforme</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/post-details">Link</Nav.Link>
                {this.state.currentUser ? (
              <span>
                <b>{this.state.currentUser.email}</b>
                <button onClick={() => this.logoutClick()}>Log Out</button>
              </span>
            ) : (
                <span>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Log In</Nav.Link>
                </span>
                )}
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                
          </Navbar.Collapse>
        </Navbar>
      
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/post-details/:postId" component={PostDetails} />
      <Route
        path="/signup"
        render={() => {
          return (
            <SignupPage
              // send App's currentUser state as a prop to SignupPage
              currentUser={this.state.currentUser}
              // send App's updateUser() method as a prop for updating state
              signupSuccess={user => this.updateUser(user)}
            />
          );
        }}
      />
      <Route
        path="/login"
        render={() => {
          return (
            <LoginPage
              // send App's currentUser state as a prop to LoginPage
              currentUser={this.state.currentUser}
              // send App's updateUser() method as a prop for updating state
              loginSuccess={user => this.updateUser(user)}
            />
          );
        }}
      />
      <Route component={NotFound} />
      </Switch>
    </div>
  );
}
}

export default App;
