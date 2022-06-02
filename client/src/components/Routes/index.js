import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Navbar';

const index = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/profil' element={<Profil />}></Route>
                <Route path='*' element={<Home />}></Route>
            </Routes>
        </Router>
    );
};

export default index;