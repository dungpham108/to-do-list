import React, { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const handle = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title });
    setTitle("");
  };
  return (
    <form onSubmit={handle} className="flex w-full gap-2">
      <input
        className="flex-1 p-2 border focus:outline-none focus:ring-0 rounded"
        placeholder="Add task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded">
        Add Task
      </button>
    </form>
  );
}
