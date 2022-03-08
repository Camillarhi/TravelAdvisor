import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
import CssBaseLine from '@material-ui/core/CssBaseline'
import Header from "./components/header/header";
import List from "./components/list/list";
import Map from "./components/map/map";
import { getPlacesData } from './api/index';
function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getPlacesData(bounds?.sw, bounds?.ne)
      .then((data) => {
        setPlaces(data?.data?.data)
        setIsLoading(false)
      })
  }, [bounds, coordinates])

  
  return (
    <>
      <CssBaseLine />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places}
           childClicked={childClicked}
           isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
