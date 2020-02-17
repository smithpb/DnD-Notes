import React, { useState, useContext } from "react";

import { UserContext } from "../../contexts/userContext";

function SelectInput({ items, select, name }) {
  // const [input, setInput] = useState();
  const { user } = useContext(UserContext);

  return (
    <>
      <select name={name} onChange={e => select(e)}>
        <option>Select an option</option>
        {items.map(item => (
          <>
            {user.campaign_id === item.campaign_id && (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )}
          </>
        ))}
      </select>
    </>
  );
}

export default SelectInput;
