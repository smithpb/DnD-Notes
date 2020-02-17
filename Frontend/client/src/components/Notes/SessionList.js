import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Session from "./Session";
import GeneralForm from "../Forms/GeneralForm";
import SelectInput from "../Forms/SelectInput";
import LocationSelect from "../Forms/LocationSelect";

import { UserContext, FunctionContext } from "../../contexts/userContext";

function SessionList({ notes, deleteNote, kingdoms }) {
  const [gameSessions, setGameSessions] = useState({});
  const [addKingdom, setAddKingdom] = useState(false);
  const [addNPC, setAddNPC] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const { setUser } = useContext(UserContext);
  const { createNPC, createKingdom, createLocation } = useContext(
    FunctionContext
  );

  useEffect(() => {
    const sessions = buildSessions();
    setGameSessions(sessions);
  }, [notes]);

  const test = item => {
    // console.log("Fired!", JSON.parse(item));
    if (JSON.parse(item) === "") {
      setUser(prevUser => {
        delete prevUser.currentLocation;
        return prevUser;
      });
    }
    const { id, name } = JSON.parse(item);
    setUser(prevUser => {
      return { ...prevUser, currentLocation: { id, name } };
    });
  };

  const buildSessions = () => {
    const sessions = {};

    notes.forEach(note => {
      // const date = note.created_at.split("T")[0];
      const date = format(new Date(note.created_at), "LLL d, yyyy");
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
      <Link to="/manage/locations">Locations</Link>
      <LocationSelect items={kingdoms} select={test} />
      <div onClick={() => setAddKingdom(!addKingdom)}>Add Kingdom</div>
      {addKingdom && (
        <GeneralForm add={createKingdom} type="Kingdom" reset={setAddKingdom} />
      )}

      <div onClick={() => setAddLocation(!addLocation)}>Add Location</div>
      {addLocation && (
        <GeneralForm
          add={createLocation}
          type="Location"
          reset={setAddLocation}
        />
      )}

      {/* <SelectInput items={kingdoms} select={test} /> */}
      <div onClick={() => setAddNPC(!addNPC)}>Add Character</div>
      {addNPC && (
        <GeneralForm
          add={createNPC}
          reset={setAddNPC}
          type="Non-Player Character"
        />
      )}
      {Object.keys(gameSessions).map(session => (
        <div key={session}>
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
