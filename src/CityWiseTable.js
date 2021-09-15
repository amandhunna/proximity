import React from 'react';
import moment from 'moment';
import helper from './util/helper';


function CityWiseTable({data}) {
    const getTableData = (data) => {
        const tableData = Object
          .entries(data)
          .map(([city, {aqi, lastUpdated }]) => {
          return { aqi: aqi[0], lastUpdated, city }
        })
        return tableData;
      }

    const time = (timeStamp) => {
        const difference = moment().unix() - timeStamp;
        if(difference === 0) {
            return "Just now"
        }

        return `${difference} seconds ago`;
    }
 
    return (
        <section id='cityWiseTable' >
            <table>
              <tr>
                <th>City</th>
                <th>Current AQI</th>
                <th>Last updated</th>
              </tr>
              {getTableData(data).map(item => {
                return (<>
                  <tr style={{backgroundColor:helper.getAqiColor(item.aqi)}}>
                    <td>{item.city}</td>
                    <td>{helper.round(item.aqi)}</td>
                   <td>{time(item.lastUpdated)}</td>
                  </tr>
                  </>)
              })}
            </table>
        </section>
  );
}

export default CityWiseTable;
