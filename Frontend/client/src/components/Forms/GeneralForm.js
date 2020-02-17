import React, { useState, useContext } from "react";
import { FunctionContext, UserContext } from "../../contexts/userContext";

import SelectInput from "../Forms/SelectInput";

function GeneralForm({ add, type, reset }) {
  const { user, kingdoms } = useContext(UserContext);
  const [input, setInput] = useState({
    name: "",
    description: "",
    author_id: user.id,
    // location_id: user.currentLocation.id,
    campaign_id: user.campaign_id
  });
  const testKing = useContext(FunctionContext);

  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // testKing();
    if (type === "Non-Player Character") {
      input.location_id = user.currentLocation.id;
    }
    add(input);
    reset(false);
    setInput({ ...input, name: "", description: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type === "Location" && (
          <SelectInput
            name="kingdom_id"
            items={kingdoms}
            select={handleChange}
          />
        )}
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          placeholder="Name"
        ></input>
        <input
          type="text"
          name="description"
          value={input.description}
          onChange={handleChange}
          placeholder={`Describe the ${type}`}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default GeneralForm;
