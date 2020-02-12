import React, { useState } from "react";
import { format } from "date-fns";

import NoteList from "./NoteList";

function Session({ notes, date, deleteNote }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p onClick={() => setIsOpen(!isOpen)}>
        {format(new Date(date), "LLL do, yyyy")}
      </p>
      {isOpen && <NoteList notes={notes} deleteNote={deleteNote} />}
    </div>
  );
}

export default Session;
