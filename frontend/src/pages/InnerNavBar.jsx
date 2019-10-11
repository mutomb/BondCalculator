/**
 * created by: Jeanluc Mutomb
 * View/UI handles the navigation tabs for an organisation that is already logged in
 */

import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
 MDBTabPane, MDBTabContent, MDBNav, MDBNavItem,MDBNavLink

} from "mdbreact";
import SectionContainer from "../components/sectionContainer";
import "./InnerNavStyle.css";


class InnerNavBar extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    activeItemPills: "1", //
  }; 
/**
 * indicative of active and pressed tab
 */
  togglePills = tab => () => {
    if (this.state.activePills !== tab) {
      this.setState({
        activeItemPills: tab
      }); 
      
    } 
  };


  render(){
    return(
      <>  
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <SectionContainer>
                <MDBNav className="nav-pills">
                  <MDBNavItem>
                    <MDBNavLink  to="#" active={this.state.activeItemPills === "1"} onClick={this.togglePills("1")}>
                      Table
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#" active={this.state.activeItemPills === "2"} onClick={this.togglePills("2")}>
                      Bar Graph
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItemPills}>
                  <MDBTabPane tabId="1">
                  {this.props.table}   
                  </MDBTabPane>
                  <MDBTabPane tabId="2">
                  {this.props.bargraph}
                  </MDBTabPane>
                </MDBTabContent>
              </SectionContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    )
}
}
export default InnerNavBar;

















