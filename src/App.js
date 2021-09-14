import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import helper from './util/helper';
import './App.css';
const wsURL = 'ws://city-ws.herokuapp.com';

const rawData = [
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
  
]

function App() {
  const [ chartData, setChartData] = useState({});
  const [ data, setData] = useState([]);
  const [selectedCities, setSelectedCites] = useState([]);



  useEffect(() => {
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
  }, [])


  const getTableData = (data) => {
    const tableData = Object
      .entries(data)
      .map(([city, {aqi, lastUpdated }]) => {
      return { aqi: aqi[0], lastUpdated, city }
    })
    return tableData;
  }

  const setChart = () => {
    setChartData({
    labels: Object.keys(data),
    datasets: [{
                      label: 'Air quality index',
                      data: Object.values(data).map(item => item.aqi[0]),
                      backgroundColor: Object.values(data).map(item => helper.getAqiColor(item.aqi[0])),
                      borderColor: Object.values(data).map(item => helper.getAqiColor(item.aqi[0])),
                      borderWidth: 1
                  }]
           });
} 

  function onSelectClick(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
        console.log("-----",value)
        setSelectedCites(value)
      }
    }
  }

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
  
  // chart data
  useEffect(() => {
    if(Object.keys(data).length) {
      setChart();
    }
  }, [data]);
 
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
      <select name="citites" multiple size={10} onChange={onSelectClick}>{
        Object.keys(data).sort().map(item => (<option value={item}>{item}</option>))
      }</select>

        <table>
          <tr>
            <th>city</th>
            <th>Current AQI</th>
            <th>Last updated</th>
          </tr>
          {getTableData(data).map(item => {
            return (<>
              <tr style={{backgroundColor:helper.getAqiColor(item.aqi)}}>
                <td>{item.city}</td>
                <td>{helper.round(item.aqi)}</td>
                <td>{item.lastUpdated}</td>
              </tr>
              </>)
          })}
        </table>
        <section >
        <Bar
          className="chart"
	        data={chartData}
	        width={2}
	        height={2}
	        options={{ maintainAspectRatio: false }}
        />
        </section>
      </main>
    </div>
  );
}

export default App;
