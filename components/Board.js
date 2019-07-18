import React, { Component } from "react";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: this.props.bets
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    let newBets = { ...this.state.bets };
    const target = e.target;
    const value = target.value;
    const name = target.name;
    newBets[name] = value;
    this.setState({
      bets: newBets
    });
  };

  updateBet = (bet, interval) => {
    let newBets = { ...this.state.bets };
    newBets[bet] += parseInt(interval);
    this.setState({
      bets: newBets
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.bets !== this.props.bets) {
      this.setState({
        bets: this.props.bets
      });
    }
  };

  render() {
    return (
      <>
        <div className="board-window">
          <div className="place-bets-window">
            <div>
              <button
                className="place-button"
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place4", 5)}
              >
                <div>4</div>
                <input
                  className="place-input"
                  type="text"
                  name="place4"
                  onChange={this.handleChange}
                  value={this.state.bets.place4}
                  readOnly="true:"
                />
              </button>
            </div>
            <div>
              <button
                className="place-button"
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place5", 5)}
              >
                5
                <input
                  className="place-input"
                  type="text"
                  name="place5"
                  onChange={this.handleChange}
                  value={this.state.bets.place5}
                  readOnly="true"
                />
              </button>
            </div>
            <div>
              <button
                className="place-button"
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place6", 6)}
              >
                6
                <input
                  className="place-input"
                  type="text"
                  name="place6"
                  onChange={this.handleChange}
                  value={this.state.bets.place6}
                  readOnly="true:"
                />
              </button>
            </div>
            <div>
              <button
                className="place-button"
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place8", 6)}
              >
                8
                <input
                  className="place-input"
                  type="text"
                  name="place8"
                  onChange={this.handleChange}
                  value={this.state.bets.place8}
                  readOnly="true"
                />
              </button>
            </div>
            <div>
              <button
                className="place-button"
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place9", 5)}
              >
                9
                <input
                  className="place-input"
                  type="text"
                  name="place9"
                  onChange={this.handleChange}
                  value={this.state.bets.place9}
                  readOnly="true"
                />
              </button>
            </div>
            <div>
              <button
                className="place-button"
                disabled={this.props.point !== 0 ? false : true}
                onClick={() => this.updateBet("place10", 5)}
              >
                10
                <input
                  className="place-input"
                  type="text"
                  name="place10"
                  onChange={this.handleChange}
                  value={this.state.bets.place10}
                  readOnly="true"
                />
              </button>
            </div>
          </div>
          <div className="come-bet-window">
            <button
              className="bet-button"
              disabled={
                this.props.point !== 0 &&
                this.props.bets.come === 0 &&
                this.props.comePoint === 0
                  ? false
                  : true
              }
              onClick={() => this.updateBet("come", 5)}
            >
              Come:
              <input
                className="bet-input"
                type="text"
                name="come"
                onChange={this.handleChange}
                value={this.state.bets.come}
                readOnly="true"
              />
            </button>
          </div>
          <div className="field-bet-window">
            <button
              className="bet-button"
              disabled={this.props.point !== 0 ? false : true}
              onClick={() => this.updateBet("field", 2)}
            >
              Field:
              <input
                className="bet-input"
                type="text"
                name="field"
                onChange={this.handleChange}
                value={this.state.bets.field}
                readOnly="true"
              />
            </button>
          </div>
          <div className="pass-bet-window">
            <button
              className="bet-button"
              disabled={
                this.props.point === 0 && this.props.bets.pass === 0
                  ? false
                  : true
              }
              onClick={() => this.updateBet("pass", 5)}
            >
              Pass:
              <input
                className="bet-input"
                type="text"
                name="pass"
                onChange={this.handleChange}
                value={this.state.bets.pass}
                readOnly="true"
              />
            </button>
          </div>
        </div>
        <div className="accept-bets-window">
          <button
            className="bet-button"
            onClick={() => this.props.acceptBets(this.state.bets)}
          >
            Accept Bets
          </button>
        </div>
      </>
    );
  }
}

export default Board;
