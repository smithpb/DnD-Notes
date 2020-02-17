import React, { useState } from "react";
import { format } from "date-fns";

import NoteList from "./NoteList";

function Session({ notes, date, deleteNote }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p onClick={() => setIsOpen(!isOpen)}>{date}</p>
      {isOpen && <NoteList notes={notes} deleteNote={deleteNote} />}
    </>
  );
}

export default Session;
