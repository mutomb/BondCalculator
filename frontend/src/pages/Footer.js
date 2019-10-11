/**
 * created by: jeanluc mutomb
 * View for the footer component
 */

import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
        <MDBFooter color="red" className="font-small pt-4 mt-4">
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
             Bond Payment Calculator
            </MDBContainer>
          </div>
        </MDBFooter>
  );
};

export default Footer;
