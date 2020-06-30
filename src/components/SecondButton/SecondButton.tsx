/* ============================================================================= */
/* Renders information structured by a FieldGroup and an object holding the data */
/* use position: 'left' or position:'right' in FieldGroup to structure fields    */
/* All fields without a position attribute will be rendered after fields with    */
/* position attributes                                                           */
/* ============================================================================= */

import React, { Component } from 'react';

class SecondButton extends Component {
  /**
   * @type {Function}
   * @returns {void}
   */
  handleClick() {
    window.open('http://localhost:3000')
  }
  /**
   * @type {Function}
   * @returns {JSX.Element}
   */
  render() {
    const clickFunction = this.handleClick
    return (
      <button onClick={clickFunction}
       
      >
        {"Documentation"}
      </button>
    );
  }
}

export default SecondButton;
