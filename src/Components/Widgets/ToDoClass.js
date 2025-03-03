import React, { Component } from 'react';

class TodoListClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
      editIndex: null,
    };
  }

  addTask = () => {
    const { newTask, tasks, editIndex } = this.state;

    if (newTask.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? newTask : task
      );
      this.setState({ tasks: updatedTasks, editIndex: null });
    } else {
      this.setState({ tasks: [...tasks, newTask] });
    }

    this.setState({ newTask: '' });
  };

  editTask = (index) => {
    this.setState({ newTask: this.state.tasks[index], editIndex: index });
  };

  deleteTask = (index) => {
    this.setState({ tasks: this.state.tasks.filter((_, i) => i !== index) });
  };

  handleChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>To-Do List (Class Component)</h2>
        <input
          type="text"
          value={this.state.newTask}
          onChange={this.handleChange}
          placeholder="Enter task..."
        />
        <button onClick={this.addTask}>
          {this.state.editIndex !== null ? 'Update' : 'Add'}
        </button>
        
        <ul>
          {this.state.tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => this.editTask(index)}>Edit</button>
              <button onClick={() => this.deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoListClass;
