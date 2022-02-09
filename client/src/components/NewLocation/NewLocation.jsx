import React, { useState } from "react";
import { Popup } from "react-map-gl";
import axios from "axios";

import { URL } from "../../App";

const NewLocation = ({
  setNewPlace,
  newPlace,
  places,
  setPlaces,
  currentUser,
}) => {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const addNewPlaceHandler = async (e) => {
    e.preventDefault();
    const newPoint = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const sendPlace = await axios.post(`${URL}/api/places/`, newPoint);
      setPlaces([...places, sendPlace.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    newPlace && (
      <Popup
        latitude={newPlace.lat}
        longitude={newPlace.long}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={() => setNewPlace(null)}
      >
        <div>
          <form onSubmit={addNewPlaceHandler}>
            <label>Title</label>
            <input
              placeholder="Enter title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Review</label>
            <textarea
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              placeholder="Tell us about this place"
            ></textarea>
            <label>Rating</label>
            <select
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="submitButton" type="submit">
              Add Place
            </button>
          </form>
        </div>
      </Popup>
    )
  );
};

export default NewLocation;
