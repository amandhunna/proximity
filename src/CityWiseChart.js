import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import helper from './util/helper';

function CityWiseChart({data}) {
  const [ chartData, setChartData] = useState({});

  function setChart() {
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

  // chart data
  useEffect(() => {
    if(Object.keys(data).length) {
      setChart();
    }
  }, [data]);
 
  return (
        <section id='cityWiseChart'>
        <Bar
          className="chart"
	        data={chartData}
	        width={2}
	        height={2}
	       // options={{ maintainAspectRatio: false }}
        />
        </section>
  );
}

export default CityWiseChart;
