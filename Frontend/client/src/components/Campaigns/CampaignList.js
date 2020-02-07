import React from "react";

function CampaignList({ campaigns, select, history }) {
  const selectCampaign = id => {
    select(prevUser => {
      return { ...prevUser, campaign_id: id };
    });
    // history.push("/notes");
  };

  return (
    <div>
      {campaigns.map(cam => (
        <div key={cam.id} onClick={() => selectCampaign(cam.id)}>
          {cam.name}
        </div>
      ))}
      <button onClick={() => history.push("/campaigns/new")}>
        Start new campaign
      </button>
    </div>
  );
}

export default CampaignList;
