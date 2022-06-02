import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';

const Profil = () => {

    const uid = useContext(UidContext);
    
    return (
        <div className="profil-page">
            {uid ? (
                <h1>Update Page</h1>
            ) : (
                <div className="log-container">
                    <Log register={true} signIn={false}/>
                </div>
            )}
            
        </div>
    );
};

export default Profil;