import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import helper from './util/helper';
import CityWiseChart from './CityWiseChart';
import CityWiseTable from './CityWiseTable';
import CityWiseComparison from './CityWiseComparison';
import './App.css';
const wsURL = 'ws://city-ws.herokuapp.com';
/* const rawData = [
  [{
      "city": "Mumbai",
      "aqi": 1.81924858030655
  },
  {
      "city": "Bengaluru",
      "aqi": 51.8838321151786
  },
  {
      "city": "Bhubaneswar",
      "aqi": 101.3350977070403
  },
  {
      "city": "Chennai",
      "aqi": 201.7359490450136
  },
  {
      "city": "Pune",
      "aqi": 301.16419123475634
  },
  {
      "city": "Hyderabad",
      "aqi": 401.50146920449862
  },
  {
      "city": "Indore",
      "aqi": 49.37286964715687
  },
  {
      "city": "Jaipur",
      "aqi": 140.36779460387638
  },
  {
      "city": "Chandigarh",
      "aqi": 45.22870326184643
  },],
  [{
    "city": "Bengaluru",
    "aqi": 189.92555920412994
    },
    {
        "city": "Delhi",
        "aqi": 302.8811511182542
    },
    {
        "city": "Indore",
        "aqi": 52.339025424679626
    },
    {
        "city": "Jaipur",
        "aqi": 143.17414262974276
    },
    {
        "city": "Chandigarh",
        "aqi": 46.440103982989804
    }]
  
] */

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
  console.log("----------------", rawData)
  const aggregateData = rawData.reduce(( aggData, instance) => {
    console.log("--instance-----",instance)
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

    return () => { socket.off('message'); }
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