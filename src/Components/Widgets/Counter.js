import React from "react";
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increase = () => {
    this.setState((prevState) => ({
      count: prevState.count < 5 ? prevState.count + 1 : 5,
    }));
  };

  decrease = () => {
    this.setState((prevState) => ({
      count: prevState.count > 0 ? prevState.count - 1 : 0,
    }));
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Counter App</h1>
        <h2>{this.state.count}</h2>
        <button onClick={this.decrease} disabled={this.state.count === 0}>
          Decrease
        </button>
        <button onClick={this.increase} disabled={this.state.count === 5}>
          Increase
        </button>
      </div>
      
    );
  }
}

export default Counter;
