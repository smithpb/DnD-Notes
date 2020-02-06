import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "./util/axiosWithAuth.js";
import axios from "axios";
import { Route } from "react-router-dom";

import NoteForm from "./components/Forms/NoteForm";
import LoginForm from "./components/Forms/LoginForm";
import NoteList from "./components/Notes/NoteList";

import { UserContext } from "./contexts/userContext";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [npcs, setNPCs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState({});

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

  const addNote = note => {
    setNotes([...notes, note]);
  };

  const deleteNote = noteID => {
    axiosWithAuth()
      .delete(`/notes/${noteID}`)
      .then(res => {
        console.log(res.data);
        const newList = notes.filter(note => note.id !== noteID);
        setNotes(newList);
      })
      .catch(err => console.log(err));
  };

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
      <UserContext.Provider value={{ user, setUser }}>
        <Route path="/login" component={LoginForm} />
        <Route
          path="/notes/new"
          render={props => (
            <NoteForm {...props} locations={locations} addNote={addNote} />
          )}
        />
        <Route
          exact
          path="/notes"
          render={props => (
            <NoteList {...props} notes={notes} deleteNote={deleteNote} />
          )}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
