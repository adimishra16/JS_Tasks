import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: #2c3e50;
    color: white;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
`;

const Heading = styled.h2`
    color: white;  // ✅ Fixed text color
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
`;

const Button = styled.button`
    background: ${(props) => (props.color ? props.color : "#4CAF50")};
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
    margin-left: ${(props) => (props.noMargin ? "0" : "10px")};

    &:hover {
        background: ${(props) => (props.color ? "#c0392b" : "#45a049")};
    }
`;

const TaskList = styled.ul`
    list-style: none;
    padding: 0;
`;

const Task = styled.li`
    background: #34495e;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim() === "") return;

        if (editIndex !== null) {
            const updatedTasks = tasks.map((task, index) =>
                index === editIndex ? newTask : task
            );
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, newTask]);
        }

        setNewTask("");
    };

    const editTask = (index) => {
        setNewTask(tasks[index]);
        setEditIndex(index);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <Container>
            <Heading>📝 To-Do List</Heading>
            <InputContainer>
                <Input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task..."
                />
                <Button onClick={addTask}>{editIndex !== null ? "Update" : "Add"}</Button>
            </InputContainer>

            <TaskList>
                {tasks.map((task, index) => (
                    <Task key={index}>
                        {task}
                        <div>
                            <Button noMargin onClick={() => editTask(index)}>✏️</Button>
                            <Button color="#e74c3c" onClick={() => deleteTask(index)}>❌</Button> 
                        </div>
                    </Task>
                ))}
            </TaskList>
        </Container>
    );
};

export default TodoList;
