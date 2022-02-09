import React from "react";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import { Marker, Popup } from "react-map-gl";

const Locations = ({
  setCurrentPlaceId,
  places,
  currentUser,
  viewport,
  currentPlaceId,
  setViewport,
}) => {
  const markerHandler = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  return places.map((place, i) => (
    <>
      {currentUser && (
        <Marker
          key={i}
          latitude={place.lat}
          longitude={place.long}
          offsetLeft={-viewport.zoom * 2.5}
          offsetTop={-viewport.zoom * 5}
        >
          <Room
            style={{
              fontSize: viewport.zoom * 5,
              color: place.username === currentUser ? "red" : "purple",
              cursor: "pointer",
            }}
            onClick={() => markerHandler(place._id, place.lat, place.long)}
          />
        </Marker>
      )}
      {place._id === currentPlaceId && (
        <Popup
          latitude={place.lat}
          longitude={place.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setCurrentPlaceId(null)}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">{place.title}</h4>
            <label>Review</label>
            <p className="description">{place.desc}</p>
            <label>Rating</label>
            <div className="stars">
              {Array(place.rating).fill(<Star className="star" />)}
            </div>
            <label>Information</label>
            <span className="username">
              Created by:
              <b> {place.username === currentUser ? "You" : place.username} </b>
            </span>
            <span className="date"> {format(place.createdAt)} </span>
          </div>
        </Popup>
      )}
    </>
  ));
};

export default Locations;
