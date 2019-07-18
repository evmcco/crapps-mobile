import React, { Component } from "react";

class RollHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevRolls: this.props.prevRolls
    };
  }

  dieNumberToIcon = num => {
    return num === 1 ? (
      <i className="fas fa-dice-one" />
    ) : num === 2 ? (
      <i className="fas fa-dice-two" />
    ) : num === 3 ? (
      <i className="fas fa-dice-three" />
    ) : num === 4 ? (
      <i className="fas fa-dice-four" />
    ) : num === 5 ? (
      <i className="fas fa-dice-five" />
    ) : num === 6 ? (
      <i className="fas fa-dice-six" />
    ) : null;
  };

  render() {
    const prevRolls = this.props.prevRolls;
    return !!prevRolls ? (
      <>
        <ul className="overflow-list dice-list">
          {prevRolls.map((roll, index) => {
            return (
              <li key={`${roll}, ${index}`}>
                {this.dieNumberToIcon(roll[0])} {this.dieNumberToIcon(roll[1])}
              </li>
            );
          })}
        </ul>
      </>
    ) : null;
  }
}

export default RollHistory;
