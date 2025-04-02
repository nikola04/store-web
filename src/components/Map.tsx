import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Loader from "./loader";

export const Map: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API
    });
    if (!isLoaded) return <div className="flex p-4">
        <Loader size="s" />
    </div>;
  
    return (
      <GoogleMap id="map" mapContainerStyle={{ width: '100%', height: '100%' }} center={{ lat, lng: lon }} zoom={7}>
        <Marker position={{ lat, lng: lon }} />
      </GoogleMap>
    );
  };
