import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function MapKakao({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
  title: string;
}) {
  return (
    <Map center={{ lat, lng }} style={{ width: '100%', height: '360px' }}>
      <MapMarker position={{ lat, lng }}></MapMarker>
    </Map>
  );
}
