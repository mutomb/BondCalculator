/**
 * created by jeanluc mutomb
 * handles the display of the main website logo and the navigation bar
 */

import React from "react";
import './style.css'
class NavPage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);
  render() {
    return (
      <>
        <div className='editable wrapper'>
            <div className="clip-text clip-text_one">Bond Payment Calculator</div>
            <hr/>
            <div className="Subheading">
            This calculator should allow you to calculate your repayments on the bond.
            </div>
        </div>
      </>
    );
  }
}
export default NavPage;
