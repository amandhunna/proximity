import React, { useEffect, useState } from 'react';
import moment from 'moment';

import CityWiseChart from './CityWiseChart';
import CityWiseTable from './CityWiseTable';
import CityWiseComparison from './CityWiseComparison';
import './App.css';

const wsURL = 'ws://city-ws.herokuapp.com';

function App() {
  const [ data, setData] = useState({});
  const [ chunkData, setChunkData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(wsURL);
  // Listen for messages
  socket.addEventListener('message', function (event) {
      const parsedData = JSON.parse(event.data) 
      setChunkData(parsedData);
  });
    return () => {}
  }, [])

 


  useEffect(() => {
    const aggData = {...data};
    chunkData.forEach(function({city, aqi}) {
        if(!!aggData[city]) {
            aggData[city].aqi.unshift(aqi);
            aggData[city].aqi.length = 10;
            aggData[city].lastUpdated = moment().unix();
          } else {
            aggData[city] = { 
              aqi: [aqi],
              lastUpdated: moment().unix(),
        }
      }
    });
    setData(aggData);
  }, [chunkData])
 
  return (
    <div className="App">
      <header>Tech Challenge</header>
      <main>
        <div id='stats'>
          <CityWiseChart data={data} />
          <CityWiseTable data={data} />
        </div>
        <div id='comparison'>
          <CityWiseComparison data={data} />
        </div>
      </main>
      <footer>Build with React </footer>
    </div>
  );
}

export default App;
