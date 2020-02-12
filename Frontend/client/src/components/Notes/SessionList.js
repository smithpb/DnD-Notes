import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Session from "./Session";

function SessionList({ notes, deleteNote, history }) {
  const [gameSessions, setGameSessions] = useState({});

  useEffect(() => {
    const sessions = buildSessions();
    setGameSessions(sessions);
  }, [notes]);

  const buildSessions = () => {
    const sessions = {};

    notes.forEach(note => {
      const date = note.created_at.split("T")[0];
      if (date in sessions) {
        sessions[date].push(note);
      } else {
        sessions[date] = [note];
      }
    });

    return sessions;
  };

  return (
    <div>
      {Object.keys(gameSessions).map(session => (
        <div key={Date.parse(session)}>
          <Session
            date={session}
            notes={gameSessions[session]}
            deleteNote={deleteNote}
          />
        </div>
      ))}
      {/* <button onClick={() => history.push("/notes/new")}>Add a new Note</button> */}
      <Link to="/notes/new">
        <button>Add a new Note</button>
      </Link>
    </div>
  );
}

export default SessionList;
