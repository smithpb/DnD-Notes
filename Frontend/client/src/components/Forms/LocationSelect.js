import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext";

function LocationSelect({ items, select }) {
  const { user } = useContext(UserContext);
  return (
    <>
      <select onChange={e => select(e.target.value)}>
        <option value={JSON.stringify("")}>Select current location</option>
        {items.map(item => (
          <>
            {user.campaign_id === item.campaign_id && (
              <optgroup label={item.name}>
                {item.locations.map(loc => (
                  <option value={JSON.stringify(loc)}>{loc.name}</option>
                ))}
              </optgroup>
            )}
          </>
        ))}
      </select>
    </>
  );
}

export default LocationSelect;
