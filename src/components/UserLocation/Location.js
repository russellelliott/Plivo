import {KEY} from "./GoogleMapsAPI"

import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";

export default function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: KEY // Add your API key
  });

  return isLoaded ? <Map /> : null;
}