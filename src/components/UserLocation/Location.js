import {KEY} from "./GoogleMapsAPI"

import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
import Geolocation from "./Geolocation"

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: KEY // Add your API key
  });

  return(
    isLoaded ? <Map /> : null
    //<div><Geolocation/></div>
  );
}