import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Locations from "./components/Locations/Locations";
import NewLocation from "./components/NewLocation/NewLocation";
import Legend from "./components/Legend/Legend";
import InOrOut from "./components/InOrOut/InOrOut";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

export const URL = "https://landmarksapp.herokuapp.com";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const storage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(storage.getItem("username"));

  console.log(currentUser);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 32.0853,
    longitude: 34.7818,
    zoom: 8,
  });

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const res = await axios.get(`${URL}/api/places`);
        setPlaces(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPlaces();
  }, []);
  console.log(currentUser);

  const addPlaceHandler = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const logoutHandler = () => {
    storage.removeItem("username");
    setCurrentUser(null);
    toast.warning("See you later, " + currentUser);
  };

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXTOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/es1860/cky7shdtsar4w14l55lz0hmqg"
        onClick={currentUser && addPlaceHandler}
        transitionDuration="200"
      >
        {currentUser && (
          <>
            <InOrOut currentUser={currentUser} /> <Legend />
          </>
        )}
        <Locations
          setViewport={setViewport}
          setCurrentPlaceId={setCurrentPlaceId}
          places={places}
          currentUser={currentUser}
          viewport={viewport}
          currentPlaceId={currentPlaceId}
        />
        <NewLocation
          setNewPlace={setNewPlace}
          newPlace={newPlace}
          places={places}
          setPlaces={setPlaces}
          currentUser={currentUser}
        />
        {currentUser ? (
          <button className="button logout" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => setShowLogin(!showLogin)}
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="button register"
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setCurrentUser={setCurrentUser}
            storage={storage}
            setShowLogin={setShowLogin}
            currentUser={currentUser}
          />
        )}
      </ReactMapGL>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
