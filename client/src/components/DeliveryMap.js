import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {observer} from "mobx-react-lite";


const DeliveryMap = observer(({lat, lon}) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoicnRtY2hzIiwiYSI6ImNsaG8zODF4bTFzOWczZW51MjJsN3pkZXYifQ.kkFJcwzQs2OdJ6l_iEUdCw';

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [49.668023, 58.603595], // Центр карты - адрес магазина
            zoom: 13,
            language: 'ru'
        });

        const startCoordinates = [49.668023, 58.603595]; // Центр карты - адрес магазина
        const endCoordinates = [lon, lat]; // Назначение

        const routeRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/
        ${startCoordinates[0]},${startCoordinates[1]};
        ${endCoordinates[0]},${endCoordinates[1]}
        ?overview=full&geometries=geojson&access_token=${mapboxgl.accessToken}`;

        fetch(routeRequest)
            .then(response => response.json())
            .then(data => {
                const route = data.routes[0].geometry;

                map.on('load', () => {
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: route
                        }
                    });

                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        paint: {
                            'line-width': 2,
                            'line-color': '#0074D9'
                        }
                    });
                });
            });

        return () => {
            map.remove();
        };
    }, []);

    return <div ref={mapContainerRef} style={{ width: '100%', height: 400 }} />;
});
export default DeliveryMap;