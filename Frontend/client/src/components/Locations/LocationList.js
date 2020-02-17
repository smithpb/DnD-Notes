import React, { useContext } from "react";

import { UserContext } from "../../contexts/userContext";

function LocationList({ locations }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {locations.map(loc => (
        <>
          {user.campaign_id === loc.campaign_id && (
            <>
              <p>{loc.name}</p>
              <p>{loc.description}</p>
            </>
          )}
        </>
      ))}
    </div>
  );
}

export default LocationList;
