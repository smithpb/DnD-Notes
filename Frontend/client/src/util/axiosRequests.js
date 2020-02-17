import { axiosWithAuth } from "./axiosWithAuth";
import axios from "axios";

export const fetchData = async () => {
  const endpoints = ["notes", "npcs", "kingdoms", "locations", "campaigns"];
  const requests = endpoints.map(endpoint => axiosWithAuth().get(endpoint));

  return axios.all(requests).then(
    axios.spread(
      (
        { data: notesRes },
        { data: npcsRes },
        { data: kingdomsRes },
        { data: locationsRes },
        { data: campaignsRes }
      ) => {
        notesRes.sort(
          (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
        );

        kingdomsRes.forEach(kingdom => {
          const places = locationsRes.filter(
            loc => loc.kingdom_id === kingdom.id
          );
          kingdom.locations = places;
        });
        return [notesRes, npcsRes, kingdomsRes, locationsRes, campaignsRes];
      }
    )
  );
};
