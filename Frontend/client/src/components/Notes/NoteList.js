import React from "react";
import { Link } from "react-router-dom";

function NoteList({ notes, deleteNote, history }) {
  return (
    <div>
      {notes.map(note => (
        <p key={note.id}>
          {note.text} <span onClick={() => deleteNote(note.id)}>X</span>
        </p>
      ))}
      {/* <button onClick={() => history.push("/notes/new")}>Add a new Note</button> */}
      <Link to="/notes/new">
        <button>Add a new Note</button>
      </Link>
    </div>
  );
}

export default NoteList;
