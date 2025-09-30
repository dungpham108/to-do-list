import React, { useEffect, useState } from "react";
import API from "../api/api";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const nav = useNavigate();

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    let data = res.data;

    if (filter === "active") {
      data = data.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      data = data.filter((todo) => todo.completed);
    }

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const addTodo = async ({ title }) => {
    const res = await API.post("/todos", { title });
    setTodos((prev) => [res.data, ...prev]);
  };

  const toggle = async (id, completed) => {
    const res = await API.put(`/todos/${id}`, { completed });
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const remove = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const edit = async (id, payload) => {
    const res = await API.put(`/todos/${id}`, payload);
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <div className="min-h-screen p-2 sm:p-6 font-poppins overflow-hidden">
      <div className="sm:max-w-4xl w-full mx-auto">
        <header className="flex justify-end items-center mb-6 gap-3">
          <h1 className="text-base sm:text-lg md:text-xl text-black text-center sm:text-left">
            Welcome,{" "}
            <span className="text-red-600 font-semibold">
              {JSON.parse(localStorage.getItem("user") || "{}").name || "User"}
            </span>
          </h1>
          <button
            onClick={logout}
            className=" text-blue-600  text-sm sm:text-base"
          >
            Logout
          </button>
        </header>

        <div className="bg-white sm:p-6">
          <div className="text-center pb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#656477]">
              TODO LIST
            </h1>
          </div>

          <div className="mb-4 flex sm:flex-row flex-col gap-3">
            <AddTodo onAdd={addTodo} />
            <div className="flex justify-center sm:justify-end">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 rounded-md text-sm sm:text-base bg-[#cccddf] text-gray-700 border-none focus:outline-none focus:ring-0"
              >
                <option value="all" className="bg-white text-gray-700">
                  All
                </option>
                <option value="active" className="bg-white text-gray-700">
                  Active
                </option>
                <option value="completed" className="bg-white text-gray-700">
                  Completed
                </option>
              </select>
            </div>
          </div>

          <div className="w-full space-y-3 p-3 bg-[#eeecf4] rounded-md">
            {todos.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 italic">No tasks yet</p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={toggle}
                  onDelete={remove}
                  onEdit={edit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
