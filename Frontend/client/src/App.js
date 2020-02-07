import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "./util/axiosWithAuth.js";
import axios from "axios";
import { Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBr";

import NoteForm from "./components/Forms/NoteForm";
import LoginForm from "./components/Forms/LoginForm";
import CampaignForm from "./components/Forms/CampaignForm";

import NoteList from "./components/Notes/NoteList";
import CampaignList from "./components/Campaigns/CampaignList";

import { UserContext } from "./contexts/userContext";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [npcs, setNPCs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [user, setUser] = useState({});
  // const [currentCampaign, setCurrentCampaign] = useState("");

  useEffect(() => {
    const noteReq = axiosWithAuth().get("notes");
    const npcReq = axiosWithAuth().get("npcs");
    const locationReq = axiosWithAuth().get("locations");
    const campaignReq = axiosWithAuth().get("campaigns");
    axios.all([noteReq, npcReq, locationReq, campaignReq]).then(
      axios.spread((...res) => {
        setNotes(res[0].data);
        setNPCs(res[1].data);
        setLocations(res[2].data);
        setCampaigns(res[3].data);
      })
    );
  }, []);

  useEffect(() => {
    const campaignNotes = notes.filter(
      note => note.campaign_id === user.campaign_id
    );
    setFilteredNotes(campaignNotes);
  }, [user.campaign_id]);

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

  const addCampaign = campaign => {
    axiosWithAuth()
      .post("/campaigns", campaign)
      .then(res => {
        console.log(res.data);
        setCampaigns([...campaigns, res.data]);
      })
      .catch(error => console.log(error));
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
        <NavBar />
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
            <NoteList
              {...props}
              notes={filteredNotes}
              deleteNote={deleteNote}
            />
          )}
        />
        <Route
          exact
          path="/campaigns"
          render={props => (
            <CampaignList {...props} campaigns={campaigns} select={setUser} />
          )}
        />
        <Route
          path="/campaigns/new"
          render={props => (
            <CampaignForm {...props} addCampaign={addCampaign} />
          )}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
