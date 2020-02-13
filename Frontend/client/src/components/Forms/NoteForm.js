import React, { useState, useContext } from "react";
// import { getUserID } from "../../util/userInfo";
import { axiosWithAuth } from "../../util/axiosWithAuth";
import { UserContext } from "../../contexts/userContext";

function NoteForm({ locations, addNote, history }) {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState({
    is_quest: false,
    author_id: user.id,
    campaign_id: user.campaign_id
  });

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/notes", input)
      .then(res => {
        addNote(res.data);
        history.push("/notes");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={input.text}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="is_quest">Quest?</label>
        <input
          type="checkbox"
          checked={input["is_quest"]}
          name="is_quest"
          value={input["is_quest"]}
          onChange={() => setInput({ ...input, is_quest: !input["is_quest"] })}
        ></input>
        <select
          name="location_id"
          value={input["location_id"]}
          onChange={handleChange}
        >
          <option value="">Where are you?</option>
          {locations.map(loc => (
            <>
              {user.campaign_id === loc.campaign_id && (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              )}
            </>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NoteForm;
