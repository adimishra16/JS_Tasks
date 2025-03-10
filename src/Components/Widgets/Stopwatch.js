import React from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa"; // Importing icons

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false,
    };
    this.timer = null;
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });

      const startTime = Date.now() - this.state.time;
      this.timer = setInterval(() => {
        this.setState({ time: Date.now() - startTime });
      }, 10);
    }
  };

  pauseTimer = () => {
    this.setState({ isRunning: false });
    clearInterval(this.timer);
  };

  stopTimer = () => {
    this.setState({ time: 0, isRunning: false });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millis = Math.floor((milliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(2, "0")}`;
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>⏱ Stopwatch</h1>
        <h2 style={styles.timer}>{this.formatTime(this.state.time)}</h2>
        <div style={styles.buttonContainer}>
          <button
            onClick={this.startTimer}
            style={{ ...styles.button, backgroundColor: "#4CAF50" }}
            disabled={this.state.isRunning}
          >
            <FaPlay /> Start
          </button>
          <button
            onClick={this.pauseTimer}
            style={{ ...styles.button, backgroundColor: "#FFA500" }}
            disabled={!this.state.isRunning}
          >
            <FaPause /> Pause
          </button>
          <button
            onClick={this.stopTimer}
            style={{ ...styles.button, backgroundColor: "#FF4D4D" }}
          >
            <FaStop /> Reset
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
  timer: {
    fontSize: "40px",
    fontWeight: "bold",
    margin: "20px 0",
    fontFamily: "monospace",
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

export default Stopwatch;
