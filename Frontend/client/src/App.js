import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "./util/axiosWithAuth.js";
import axios from "axios";
import { Route } from "react-router-dom";

import NoteForm from "./components/Forms/NoteForm";
import LoginForm from "./components/Forms/LoginForm.js";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [npcs, setNPCs] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const noteReq = axiosWithAuth().get("notes");
    const npcReq = axiosWithAuth().get("npcs");
    const locationReq = axiosWithAuth().get("locations");
    axios.all([noteReq, npcReq, locationReq]).then(
      axios.spread((...res) => {
        setNotes(res[0].data);
        setNPCs(res[1].data);
        setLocations(res[2].data);
      })
    );
  }, []);

  return (
    <div className="App">
      {/* <p>This is here now</p>
      {notes.map(note => (
        <div key={note.id}>{note.text}</div>
      ))}
      <select>
        <option>Pick an character</option>
        {npcs.map(npc => (
          <option key={npc.id}>{npc.name}</option>
        ))}
      </select> */}
      <Route path="/login" component={LoginForm} />
      <NoteForm locations={locations} />
    </div>
  );
}

export default App;
