import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard/DashBoard"; 
import UserProfile from "./Components/UserProfile"; 
import ChangePassword from "./Components/ChangePassword";
import Stopwatch from "./Components/Widgets/Stopwatch";
import Counter from "./Components/Widgets/Counter";
import FormClass from "./Components/forms/FormClass";
import FormFunc from "./Components/forms/FormFunc";
import Calculator from "./Components/Widgets/Calculator";
import TodoList from "./Components/Widgets/TodoList";
import TodoListFunction from "./Components/Widgets/ToDoFunction";
import TodoListClass from "./Components/Widgets/ToDoClass";
import ManageRecord from "./Components/Crud/ManageRecord";
import ViewProduct from "./Components/API_CALL/ViewProduct";
import Movies from "./Components/API_CALL/Movies";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        <Route path="/UserProfile" element={<UserProfile/>} />
        <Route path="/stopwatch" element={<Stopwatch/>} />
        <Route path="/counter" element={<Counter/>} />
        <Route path="/formClass" element={<FormClass/>} />
        <Route path="/formFunc" element={<FormFunc/>} />
        <Route path="/calc" element={<Calculator/>} />
        <Route path="/todo" element={<TodoList/>} />
        <Route path="/TodoListFunction" element={<TodoListFunction/>}/>
        <Route path="/TodoListClass" element={<TodoListClass/>}/>
        <Route path="/ManageRecord" element={<ManageRecord/>}/> 
        <Route path="/viewProduct" element={<ViewProduct/>}/> 
        <Route path="/Movies" element={<Movies/>}/> 
      </Routes>
    </Router>
  );
};

export default App;
