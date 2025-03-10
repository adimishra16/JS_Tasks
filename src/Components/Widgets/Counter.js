import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Importing icons

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
      <div style={styles.container}>
        <h1 style={styles.title}>Counter App</h1>
        <h2 style={styles.count}>{this.state.count}</h2>
        <div style={styles.buttonContainer}>
          <button
            onClick={this.decrease}
            disabled={this.state.count === 0}
            style={{
              ...styles.button,
              backgroundColor: this.state.count === 0 ? "#ccc" : "#ff4d4d",
            }}
          >
            <FaMinus /> Decrease
          </button>
          <button
            onClick={this.increase}
            disabled={this.state.count === 5}
            style={{
              ...styles.button,
              backgroundColor: this.state.count === 5 ? "#ccc" : "#4CAF50",
            }}
          >
            <FaPlus /> Increase
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "30px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #f3a683, #786fa6)",
    color: "white",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  count: {
    fontSize: "40px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
    transition: "background 0.3s",
  },
};

export default Counter;
