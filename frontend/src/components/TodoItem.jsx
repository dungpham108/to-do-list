import React, { useState } from "react";
import { MdDelete, MdOutlineEdit, MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(todo.title);

  const save = () => {
    onEdit(todo._id, { title: val });
    setEditing(false);
  };

  return (
    <div className="bg-white rounded shadow p-3 flex items-center">
      <div className="flex w-full flex-1 items-center sm:gap-3 gap-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          className="w-6 h-12 accent-blue-600 cursor-pointer"
        />
        {!editing ? (
          <div>
            <div
              className={`font-medium ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(todo.createdAt).toLocaleString()}
            </div>
          </div>
        ) : (
          <input
            className="p-1 mr-2 flex-1 border rounded"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        )}
      </div>
      <div className="flex overflow-hidden items-center gap-1 sm:gap-2">
        {editing ? (
          <>
            <button
              className="px-2 py-2 bg-green-500 text-white rounded"
              onClick={save}
            >
              <FaSave />
            </button>
            <button
              className="px-2 py-2 bg-gray-300 rounded"
              onClick={() => {
                setEditing(false);
                setVal(todo.title);
              }}
            >
              <MdOutlineCancel />
            </button>
          </>
        ) : (
          <>
            <button
              className="px-2 py-2 bg-[#dedfe1] text-white rounded"
              onClick={() => onDelete(todo._id)}
            >
              <MdDelete className="text-gray-500 text-lg" />
            </button>
            <button
              className="px-2 py-2 bg-[#dedfe1] rounded"
              onClick={() => setEditing(true)}
            >
              <MdOutlineEdit className="text-gray-500 text-lg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
