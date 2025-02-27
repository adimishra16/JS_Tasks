import React from "react";

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
        <h1>Stopwatch</h1>
        <h2>{this.formatTime(this.state.time)}</h2>
        <div>
          <button onClick={this.startTimer} style={styles.button}>Start</button>
          <button onClick={this.pauseTimer} style={styles.button}>Pause</button>
          <button onClick={this.stopTimer} style={styles.button}>Stop</button>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  button: {
    fontSize: "16px",
    margin: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default Stopwatch;
