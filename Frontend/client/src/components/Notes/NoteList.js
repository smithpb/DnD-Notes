import React from "react";

function NoteList({ notes, deleteNote }) {
  return (
    <div>
      {notes.map(note => (
        <p>
          {note.text} <span onClick={() => deleteNote(note.id)}>X</span>
        </p>
      ))}
    </div>
  );
}

export default NoteList;
