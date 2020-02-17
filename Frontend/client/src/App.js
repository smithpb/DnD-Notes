import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "./util/axiosWithAuth.js";
import axios from "axios";
import { Route } from "react-router-dom";

import NavBar from "./components/Navigation/NavBar";

import NoteForm from "./components/Forms/NoteForm";
import LoginForm from "./components/Forms/LoginForm";
import CampaignForm from "./components/Forms/CampaignForm";

import SessionList from "./components/Notes/SessionList";
import CampaignList from "./components/Campaigns/CampaignList";
import LocationList from "./components/Locations/LocationList";

import { UserContext, FunctionContext } from "./contexts/userContext";

import { getFullUser, setUserInfo, setFullUser } from "./util/userInfo";
import { fetchData } from "./util/axiosRequests";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [npcs, setNPCs] = useState([]);
  const [kingdoms, setKingdoms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [user, setUser] = useState(getFullUser());

  const setFunctions = [
    setNotes,
    setNPCs,
    setKingdoms,
    setLocations,
    setCampaigns
  ];

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      getData();
    }
  }, []);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    const campaignNotes = notes.filter(
      note => note.campaign_id === user.campaign_id
    );
    setFilteredNotes(campaignNotes);
  }, [user.campaign_id, notes]);

  const getData = () => {
    fetchData().then(res => {
      res.forEach((data, i) => {
        setFunctions[i](data);
      });
    });
  };

  const testKing = () => {
    console.log("it totes worked!");
  };

  const createNote = note => {
    setNotes([...notes, note]);
  };

  const createNPC = char => {
    axiosWithAuth()
      .post("/npcs/new", char)
      .then(res => {
        console.log(res.data);
        setNPCs([...npcs, res.data]);
      });
  };

  const createKingdom = kingdom => {
    console.log(kingdom);
    axiosWithAuth()
      .post("/kingdoms", kingdom)
      .then(res => {
        res.data.locations = [];
        setKingdoms([...kingdoms, res.data]);
      });
  };

  const createLocation = location => {
    axiosWithAuth()
      .post("/locations", location)
      .then(res => {
        setLocations([...locations, res.data]);
        setKingdoms(prevState => {
          const updated = prevState.map(k => {
            if (k.id === res.data.kingdom_id) {
              k.locations.push(res.data);
            }
            return k;
          });
          return updated;
        });
      })
      .catch(err => console.log(err));
  };

  const deleteNote = noteID => {
    axiosWithAuth()
      .delete(`/notes/${noteID}`)
      .then(res => {
        const newList = notes.filter(note => note.id !== noteID);
        setNotes(newList);
      })
      .catch(err => console.log(err));
  };

  const createCampaign = campaign => {
    axiosWithAuth()
      .post("/campaigns", campaign)
      .then(res => {
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
      <UserContext.Provider value={{ user, setUser, kingdoms }}>
        <FunctionContext.Provider
          value={{ createNPC, createKingdom, createLocation }}
        >
          <NavBar />
          <Route
            path="/login"
            render={props => <LoginForm {...props} fetchData={getData} />}
          />
          <Route
            path="/notes/new"
            render={props => (
              <NoteForm {...props} locations={locations} addNote={createNote} />
            )}
          />
          <Route
            exact
            path="/notes"
            render={props => (
              <SessionList
                {...props}
                notes={filteredNotes}
                kingdoms={kingdoms}
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
              <CampaignForm {...props} addCampaign={createCampaign} />
            )}
          />
          <Route
            path="/manage/locations"
            render={props => <LocationList locations={locations} />}
          />
        </FunctionContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
