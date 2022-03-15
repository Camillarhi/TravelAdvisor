import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline'
import Header from "./components/header/header";
import List from "./components/list/list";
import Map from "./components/map/map";
import { getPlacesData, getWeatherData } from './api/index';
import { getByPlaceholderText } from "@testing-library/react";
function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('')
  const [rating, setRating] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      getWeatherData(coordinates?.lat, coordinates?.lng)
      .then((data) => setWeatherData(data))
      getPlacesData(type, bounds?.sw, bounds?.ne)
        .then((data) => {
          setPlaces(data?.data?.data?.filter((place) => place.name && getByPlaceholderText.num_reviews > 0))
          setFilteredPlaces([])
          setIsLoading(false)
        })
    }
  }, [type, bounds])


  return (
    <>
      <CssBaseLine />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
