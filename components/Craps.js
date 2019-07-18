import React, { Component } from "react";
import Board from "./Board";
import RollHistory from "./RollHistory";
import ActivityLog from "./ActivityLog";

class Craps extends Component {
  state = {
    playerCash: 100,
    die1: 0,
    die2: 0,
    point: 0,
    allRolls: [],
    bets: {
      pass: 0,
      come: 0,
      place4: 0,
      place5: 0,
      place6: 0,
      place8: 0,
      place9: 0,
      place10: 0,
      field: 0
    },
    comePoint: 0,
    activityLog: []
  };

  rollDice = () => {
    const die1 = Math.floor(Math.random() * 6 + 1);
    const die2 = Math.floor(Math.random() * 6 + 1);
    let newAllRolls = this.state.allRolls.slice();
    newAllRolls.unshift([die1, die2]);
    this.setState({
      die1: die1,
      die2: die2,
      allRolls: newAllRolls
    });
  };

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

  sumBets = bets => {
    let oldBets = { ...this.state.bets };
    let sum = 0;
    for (let el in bets) {
      sum += parseInt(bets[el] - oldBets[el]);
    }
    return sum;
  };

  addBetsToActivityLog = bets => {
    let newActivityLog = this.state.activityLog;
    let oldBets = { ...this.state.bets };
    for (let el in bets) {
      if (bets[el] !== oldBets[el]) {
        console.log(`old bet: ${bets[el]} new bet: ${oldBets[el]}`);
        let betName = this.cleanBetName(el);
        newActivityLog.unshift(`${betName} bet placed for $${bets[el]}`);
      }
    }
    return newActivityLog;
  };

  cleanBetName = bet => {
    return bet === "pass"
      ? "Pass"
      : bet === "come"
      ? "Come"
      : bet === "place4"
      ? "Place 4"
      : bet === "place5"
      ? "Place 5"
      : bet === "place6"
      ? "Place 6"
      : bet === "place8"
      ? "Place 8"
      : bet === "place9"
      ? "Place 9"
      : bet === "place10"
      ? "Place 10"
      : bet === "field"
      ? "Field"
      : bet;
  };

  cleanBetInputs = bets => {
    let newBets = { ...bets };
    for (let el in bets) {
      newBets[el] = parseInt(bets[el]);
    }
    return newBets;
  };

  acceptBets = bets => {
    let betSum = this.sumBets(bets);
    if (betSum > this.state.playerCash) {
      window.alert("Insufficient funds to complete bets, try again");
    } else {
      const activityLog = this.addBetsToActivityLog(bets);
      const cleanBets = this.cleanBetInputs(bets);
      this.setState({
        bets: cleanBets,
        playerCash: this.state.playerCash - betSum,
        activityLog
      });
    }
  };

  getResults = () => {
    let newState = { ...this.state };
    const diceSum = this.state.die1 + this.state.die2;
    switch (this.state.point) {
      case 0:
        //if the point is not set
        switch (diceSum) {
          case 2:
          case 3:
          case 12:
            //pass loses
            newState.activityLog.unshift(
              `${diceSum}: Pass bet of $${newState.bets.pass} loses`
            );
            newState.bets.pass = 0;
            break;
          case 7:
          case 11:
            //pass wins
            newState.activityLog.unshift(
              `${diceSum}: Pass bet of $${newState.bets.pass} wins`
            );
            newState.playerCash += newState.bets.pass;
            break;
          case 4:
          case 5:
          case 6:
          case 8:
          case 9:
          case 10:
            //set the point
            newState.activityLog.unshift(`${diceSum}: Point set at ${diceSum}`);
            newState.point = diceSum;
            break;
        }
        break;
      case 4:
      case 5:
      case 6:
      case 8:
      case 9:
      case 10:
        //if the point is set
        switch (diceSum) {
          case this.state.point:
            //pass wins
            newState.playerCash += newState.bets.pass;
            newState.activityLog.unshift(
              `${diceSum}: Pass bet of $${newState.bets.pass} wins`
            );
            break;
          case this.state.comePoint:
            //come wins
            newState.playerCash += newState.bets.come;
            newState.activityLog.unshift(
              `${diceSum}: Come bet of $${newState.bets.come} wins`
            );
            break;
          case 2:
            //come bet loses if come point is not set
            if (newState.bets.come > 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come bet of $${newState.bets.come} loses`
              );
              newState.bets.come = 0;
            }
            //field wins 2:1
            if (newState.bets.field > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Field bet of $${newState.bets.field} wins 2:1`
              );
              newState.playerCash += newState.bets.field * 2;
            }
            break;
          case 3:
            //come bet loses if come point is not set
            if (newState.bets.come > 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come bet of $${newState.bets.come} loses`
              );
              newState.bets.come = 0;
            }
            //field wins 1:1
            if (newState.bets.field > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Field bet of $${newState.bets.field} wins`
              );
              newState.playerCash += newState.bets.field;
            }
            break;
          case 4:
            //if theres a come bet, and a comePoint isn't set, set the comePoint
            if (newState.bets.come !== 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come point set at ${diceSum}`
              );
              newState.comePoint = diceSum;
            }
            //field wins 1:1
            if (newState.bets.field > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Field bet of $${newState.bets.field} wins`
              );
              newState.playerCash += newState.bets.field;
            }
            //place wins 9:5
            if (newState.bets.place4 > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Place 4 bet of $${newState.bets.place4} wins 9:5.`
              );
              newState.playerCash += newState.bets.place4 * 1.8;
            }
            break;
          case 5:
            //if theres a come bet, and a comePoint isn't set, set the comePoint
            if (newState.bets.come !== 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come point set at ${diceSum}`
              );
              newState.comePoint = diceSum;
            }
            //place wins 7:5
            if (newState.bets.place5 > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Place 5 bet of $${newState.bets.place5} wins 7:5`
              );
              newState.playerCash += newState.bets.place5 * 1.4;
            }
            break;
          case 6:
            //if theres a come bet, and a comePoint isn't set, set the comePoint
            if (newState.bets.come !== 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come point set at ${diceSum}`
              );
              newState.comePoint = diceSum;
            }
            //place wins 7:6
            if (newState.bets.place6 > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Place 6 bet of $${newState.bets.place6} wins 7:6`
              );
              newState.playerCash += newState.bets.place6 * (7 / 6);
            }
            break;
          case 7:
            //come wins if no come point is set, clear bets and reset points
            if (newState.bets.come > 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come bet of $${newState.bets.come} wins`
              );
              newState.playerCash += newState.bets.come * 2;
            }
            newState.activityLog.unshift(`${diceSum}: Board is cleared.`);
            newState.bets = {
              pass: 0,
              come: 0,
              place4: 0,
              place5: 0,
              place6: 0,
              place8: 0,
              place9: 0,
              place10: 0,
              field: 0
            };
            newState.point = 0;
            newState.comePoint = 0;
            break;
          case 8:
            //if theres a come bet, and a comePoint isn't set, set the comePoint
            if (newState.bets.come !== 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come point set at ${diceSum}`
              );
              newState.comePoint = diceSum;
            }
            //place wins 7:6
            if (newState.bets.place8 > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Place 8 bet of $${newState.bets.place8} wins 7:6`
              );
              newState.playerCash += newState.bets.place8 * (7 / 6);
            }
            break;
          case 9:
            //if theres a come bet, and a comePoint isn't set, set the comePoint
            if (newState.bets.come !== 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come point set at ${diceSum}`
              );
              newState.comePoint = diceSum;
            }
            //place wins 7:5
            if (newState.bets.place9 > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Place 9 bet of $${newState.bets.place9} wins 7:5`
              );
              newState.playerCash += newState.bets.place9 * 1.4;
            }
            break;
          case 10:
            //if theres a come bet, and a comePoint isn't set, set the comePoint
            if (newState.bets.come !== 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come point set at ${diceSum}`
              );
              newState.comePoint = diceSum;
            }
            //field wins 1:1
            if (newState.bets.field > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Field bet of $${newState.bets.field} wins`
              );
              newState.playerCash += newState.bets.field;
            }
            //place wins 9:5
            if (newState.bets.place10 > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Place 10 bet of $${newState.bets.place10} wins 9:5`
              );
              newState.playerCash += newState.bets.place10 * 1.8;
            }
            break;
          case 11:
            //come wins
            if (newState.bets.come > 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come bet of $${newState.bets.come} wins`
              );
              newState.playerCash += newState.bets.come;
            }
            //field wins 1:1
            if (newState.bets.field > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Field bet of $${newState.bets.field} wins`
              );
              newState.playerCash += newState.bets.field;
            }
            break;
          case 12:
            //come bet loses if come point is not set
            if (newState.bets.come > 0 && newState.comePoint === 0) {
              newState.activityLog.unshift(
                `${diceSum}: Come bet of $${newState.bets.come} loses`
              );
              newState.bets.come = 0;
            }
            //field wins 2:1
            if (newState.bets.field > 0) {
              newState.activityLog.unshift(
                `${diceSum}: Field bet of $${newState.bets.field} wins 2:1`
              );
              newState.playerCash += newState.bets.field * 2;
            }
            break;
        }
        break;
    }
    this.setState(newState);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("prevState", prevState, "current State", this.state);
    if (this.state.allRolls !== prevState.allRolls) {
      this.getResults();
    }
  };

  render() {
    // console.log(this.state);
    return (
      <div className="main">
        <div className="left-panel">
          <div className="points-window">
            <span>
              {!!this.state.point ? (
                <p>Point: {this.state.point}</p>
              ) : (
                <p>Point: Off</p>
              )}
            </span>
            <span>
              {!!this.state.comePoint ? (
                <p>Come Point: {this.state.comePoint}</p>
              ) : (
                <p>Come Point: Off</p>
              )}
            </span>
          </div>
          <Board
            acceptBets={bets => this.acceptBets(bets)}
            bets={this.state.bets}
            point={this.state.point}
            comePoint={this.state.comePoint}
          />
          <div className="player-funds-window">
            <h3>Cash: ${this.state.playerCash}</h3>
          </div>
        </div>
        <div className="right-panel">
          <div className="results-window">
            <h3>Results</h3>
            <ActivityLog activityLog={this.state.activityLog} />
          </div>
          <div className="previous-rolls-window">
            <h3>Previous Rolls</h3>
            <RollHistory prevRolls={this.state.allRolls} />
          </div>
          <div className="dice-results-window">
            <h1>
              {!!this.state.die1 ? (
                <span>{this.dieNumberToIcon(this.state.die1)} </span>
              ) : (
                <span>
                  <i class="fas fa-square" />
                  &nbsp;
                </span>
              )}
              {!!this.state.die2 ? (
                <span>{this.dieNumberToIcon(this.state.die2)}</span>
              ) : (
                <span>
                  <i class="fas fa-square" />
                </span>
              )}
            </h1>
          </div>
          <div className="die-roll-window">
            <button
              className="roll-button"
              type="button"
              disabled={this.state.bets.pass !== 0 ? false : true}
              onClick={() => this.rollDice()}
            >
              <i class="fas fa-dice" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Craps;
