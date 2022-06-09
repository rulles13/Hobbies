import React from 'react';
import Map from '../components/Leaflet/Map'
import { useSelector } from 'react-redux';

const Home = () => {
    const userData = useSelector((state) => state.userReducer);
    return (
        Object.keys(userData).length && <Map data={userData} />
    );
};

export default Home;