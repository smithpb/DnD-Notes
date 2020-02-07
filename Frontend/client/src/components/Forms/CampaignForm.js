import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";

function CampaignForm({ addCampaign, history }) {
  const { user, setuser } = useContext(UserContext);
  const [input, setInput] = useState({ author_id: user.id });

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addCampaign(input);
    history.push("/campaigns");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={input.name}
          onChange={handleChange}
          placeholder="Campaign Title"
        ></input>
        <input
          name="DM"
          type="text"
          value={input.DM}
          onChange={handleChange}
          placeholder="Dungeon Master"
        ></input>
        <textarea
          name="description"
          value={input.description}
          onChange={handleChange}
          placeholder="Describe the setting..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CampaignForm;
