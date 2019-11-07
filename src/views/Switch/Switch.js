import React, {Component} from 'react';
import './Switch.css';

class Switch extends Component{
  render(){
    return (
      <>
        <input
          checked={this.props.isOn}
          onChange={this.props.handleToggle}
          className="react-switch-checkbox"
          id={this.props.id}
          type="checkbox"
        />
        <label
          style={{background: this.props.isOn && '#06D6A0'}}
          className="react-switch-label"
          htmlFor={this.props.id}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );

  }

}

export default Switch;