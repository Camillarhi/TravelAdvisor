import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

export default function Map({ setCoordinates, setBounds, coordinates, places,setChildClicked }) {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)')
  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDblVd5bEc4hI55-6Gm5OZr1erw9t0rZ9k' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          console.log("e",e)
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child)=> setChildClicked(child)}
      >
        {places?.map((place, i)=> (
          <div className={classes.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}>
{!isDesktop ? (
  <LocationOnOutlinedIcon color="primary" fontSize="large" />
): (
  <Paper elevation={3} className={classes.paper}>
    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
     {place?.name}
      </Typography>
      <img 
      className={classes.pointer}
      src={place?.photo ? place?.photo?.images?.large?.url : 'data:image/jpeg;base64,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'}
      alt={place?.name}
      />
      <Rating size="small" value={Number(place?.rating)} readOnly />
    </Paper>
)}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}
