import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/map';

class WeatherList extends Component {
  renderWeather() {
    return this.props.weather.map((data) => {
      if (data.cod === '404') {
        return;
      }

      const cityName = data.city.name;
      const { lat, lon } = data.city.coord;
      // const lat = data.city.coord.lat;
      // const lon = data.city.coord.lon;

      const temps = data.list.map((weather) => {
        return weather.main.temp;
      });
      const pressures = data.list.map((weather) => {
        return weather.main.pressure;
      });
      const humids = data.list.map((weather) => {
        return weather.main.humidity;
      });

      return (
        <tr key={cityName}>
          <td><GoogleMap lat={lat} lon={lon} /></td>
          <td>
            <Chart data={temps} color='red' units='K' />
          </td>
          <td>
            <Chart data={pressures} color='green' units='hPa' />
          </td>
          <td>
            <Chart data={humids} color='blue' units='%' />
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature, K</th>
              <th>Pressure, hPa</th>
              <th>Humidity, %</th>
            </tr>
          </thead>
          <tbody>
            {this.renderWeather()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({weather}) {
  return {weather};
}

export default connect(mapStateToProps)(WeatherList);