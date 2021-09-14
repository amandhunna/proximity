import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CityWiseChart from './CityWiseChart';
import CityWiseTable from './CityWiseTable';
import CityWiseComparison from './CityWiseComparison';
import './App.css';

const wsURL = 'ws://city-ws.herokuapp.com';

function App() {
  const [ data, setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(wsURL);

  // Listen for messages
  socket.addEventListener('message', function (event) {
   //   console.log('Message from server ', event.data);
  const rawData = [];
  const parsedData = JSON.parse(event.data) 
  rawData.unshift(parsedData);
  const aggregateData = rawData.reduce(( aggData, instance) => {
    instance.forEach(({city, aqi}) => {
      if(!!aggData[city]) {
          aggData[city].aqi.unshift(aqi);
          aggData[city].aqi.length = 10;
          aggData[city].lastUpdated =  moment().unix();
        } else {
          aggData[city] = { 
            aqi: [aqi],
            lastUpdated: moment().unix(),
          }
        }
      })
      return aggData;
    },{})
    setData(aggregateData);
    });

    return () => { }
  }, [])

 


  useEffect(() => {
//    const socket = new WebSocket(wsURL);

  // Listen for messages
  //socket.addEventListener('message', function (event) {
  //    console.log('Message from server ', event.data);
  //
  //});
  
  //() => {
    //  socket.off('message');
    //}
    
  }, [])
 
  return (
    <div className="App">
      <header>Tech Challenge</header>
      <main>
        <CityWiseChart data={data} />
        <CityWiseTable data={data} />
        <CityWiseComparison data={data} />
      </main>
      <footer>Build with React </footer>
    </div>
  );
}

export default App;


/* const setCityChart = () => {
  setChartData({
  labels: Object.keys(data),
  datasets: [{
                    label: 'Air quality index',
                    data: Object.values(data).map(item => item.aqi[0]),
                    backgroundColor: Object.values(data).map(item => helper.getAqiColor(item.aqi[0])),
                    borderColor: Object.values(data).map(item => helper.getAqiColor(item.aqi[0])),
                    borderWidth: 1
                },
                {
                  label: 'Air quality index2',
                  data: Object.values(data).map(item => item.aqi[0]),
                  backgroundColor: Object.values(data).map(item => helper.getAqiColor(item.aqi[0])),
                  borderColor: Object.values(data).map(item => helper.getAqiColor(item.aqi[0])),
                  borderWidth: 1
              }]
         });
} */