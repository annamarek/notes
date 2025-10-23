import React, { useState } from "react";
import "./App.css";
 
interface Note {
    id: number;
    title: string;
    text: string;
    completed: boolean;
}
 
const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");
 
    const addNote = () => {
      if (!title.trim() || !text.trim()) return;

      const newNote: Note = {
        id: Date.now(),
        title,
        text,
        completed: false,
      };

      setNotes((items) => [...items, newNote]);
      setTitle("");
      setText("");
    };
 
    const deleteNote = (id: number) => {
        setNotes( (item) => item.filter( (note) => note.id !== id));
    }

    const toggleComplete = (id: number) => {
      setNotes((items) =>
        items.map((note) =>
          note.id === id ? { ...note, completed: !note.completed } : note
        )
      );
    };

    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
 
    return (
        <div className="notes-container">
            <h1>Notes</h1>

            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
 
            <div className="input-block">
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={ (e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter note"
                    value={text}
                    onChange={ (e) => setText(e.target.value)}
                />
                <button onClick={addNote}> + </button>
            </div>
 
            <ul className="notes-list">
                {filteredNotes.map((item) => (
                  <li
                    key={item.id}
                    className={`note-item ${item.completed ? "completed" : ""}`}
                  >
                    <div className="note-content" onClick={() => toggleComplete(item.id)}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>

                    <button
                      className={`complete-btn ${item.completed ? "done" : ""}`}
                      onClick={() => toggleComplete(item.id)}
                    >
                      {item.completed ? "✔" : "○"}
                    </button>

                    <button className="delete-btn" onClick={() => deleteNote(item.id)}>
                      X
                    </button>
                  </li>
                ))}
            </ul>
        </div>
    );
};
 
export default App;