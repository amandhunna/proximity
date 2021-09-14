import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// import moment from 'moment';
import helper from './util/helper';

function CityWiseComparison({data}) {
  const [ chartData, setChartData] = useState({});
  const [ selectedCities, setSelectedCites] = useState([]);

  const setCityChart = () => {
      console.log("selectedCities", selectedCities, data)
    setChartData({
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: selectedCities.map((item,index) => {
        console.log("---",index, item, data[item].aqi)        
        return    {
                    label: `${item}`,
                    //barPercentage: 0.5,
                    //barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    data: [...data[item].aqi],
                    backgroundColor: data[item].aqi.map(aqi => helper.getAqiColor(aqi)),
                    borderColor: data[item].aqi.map(aqi => helper.getAqiColor(aqi)),
                    borderWidth: 1,
                }})
         });
    } 

  function onSelectClick(event) {
    const { options } = event.target;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
        
        setSelectedCites(value)
      }
    }
  }

  // chart data
    useEffect(() => {
        if(Object.keys(data).length) {
            setCityChart();
        }
      }, [data,selectedCities]);
 
  return (
    <section id="cityWiseComparison">
        <div id='citiesList'>
            <select name="cities" multiple size={10} onChange={onSelectClick}>{
              Object.keys(data).sort().map(item => (<option value={item}>{item}</option>))
            }</select>
            <p>use Ctrl + click or shift + click</p>
      </div>
      <div id='citiesComparisonChart' >
      <Bar
          className="chart"
	        data={chartData}
	        width={2}
	        height={2}
            //options={{
            //    scales: {
            //        x: { display: false}
            //    }
            //}}
	       // options={{ maintainAspectRatio: false }}
        />
        </div>
      </section>
  );
}

export default CityWiseComparison;
