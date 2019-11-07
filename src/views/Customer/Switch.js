import React, {Component} from 'react';
import './Switch.css';

class Switch extends Component{
  render(){
    return (
      <>
        <input
          onChange={this.props.handleToggle}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );

  }

}

export default Switch;