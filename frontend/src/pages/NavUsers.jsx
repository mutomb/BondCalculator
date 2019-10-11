/**
 * created by: jeanluc mutomb
 * handles the main navigation bar
 * displays different components based on whether the user is logged in or not
 */

import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
} from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import { withRouter } from 'react-router';
import jwt_decode from 'jwt-decode';
class NavUsers extends Component {
  constructor(props){
    super(props);
    const token= localStorage.getItem('usertoken'); 
    if(token){
      const decoded= jwt_decode(token);
      this.state={
        organisation:{...decoded},
        token:true,
        collapseID: ""
      }
    }
    else{
      this.state={
        token:false,
        organisation:"",
        collapseID: ""
      }
    }
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  logOut=(e)=>{
    e.preventDefault()
    localStorage.removeItem('usertoken');
    this.props.history.push('/');
  }

    
  render() {
    const loginRegLink=(

      <SectionContainer >
            <MDBNavbar
            color="red"
            dark
            expand="md"
            >
            <MDBNavbarToggler
                onClick={this.toggleCollapse("navbarCollapse3")}
            />
            <MDBCollapse
                id="navbarCollapse3"
                isOpen={this.state.collapseID}
                navbar
            >
                <MDBNavbarNav left>
                <MDBNavItem active>
                    <MDBNavLink to="/">Social Issues</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/post">Post</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/event">Event</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/about">About</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  
                  <MDBNavItem>
                    <MDBNavLink to="/login">
                      <MDBIcon className="d-inline-inline fas fa-lock" />
                      <div className="d-none d-md-inline">Sign in</div>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/register">
                      <MDBIcon className="d-inline-inline fas fa-user-plus" />
                      <div className="d-none d-md-inline">Register</div>
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBNavbar>
    </SectionContainer>
    )
    
    const logoutUserLink=(
    
      <SectionContainer>
            <MDBNavbar
            color="green"
            dark
            expand="md"
            style={{ marginTop: "20px" }}
            >
            <MDBNavbarToggler
                onClick={this.toggleCollapse("navbarCollapse3")}
            />
            <MDBCollapse
                id="navbarCollapse3"
                isOpen={this.state.collapseID}
                navbar
            >
                <MDBNavbarNav left>
                <MDBNavItem>
                    <MDBNavLink  to="/">Social Issues</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/post">Post</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/event">Event</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/about">About</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavItem>
                    <MDBNavLink to="/organisation">
                      <MDBIcon className="d-inline-inline fas fa-user-circle" />
                      <div className="d-none d-md-inline">{this.state.organisation.name}</div>
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                   <MDBNavLink onClick={this.logOut.bind(this)}>
                      <MDBIcon className="d-inline-inline fas fa-power-off" />
                      <div className="d-none d-md-inline">Logout</div>
                    </MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBNavbar>
    </SectionContainer>
    )    




    return (
      <>
          {localStorage.usertoken?logoutUserLink:loginRegLink}
      </>
      
    );
  }
}
export default withRouter(NavUsers);







