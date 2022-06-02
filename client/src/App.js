import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from './components/Routes';
import axios from 'axios';

const App = () => {
  const [uid,SetUid] = useState(null);

  useEffect(()=> {
    const fetchToken = async() => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then((res) => SetUid(res.data))
      .catch((err) => console.log('no token'))
    }
    fetchToken();
  }, []);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;