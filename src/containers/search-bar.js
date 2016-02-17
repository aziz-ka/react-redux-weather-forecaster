import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {query: ''};
  }

  onInputChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.fetchWeather(this.state.query);
    this.setState({
      query: ''
    });
  }

  render() {
    return (
      <form
        className='input-group'
        onSubmit={this.onSubmit}>
        <input
          placeholder='Enter city name'
          className='form-control'
          value={this.state.query}
          onChange={this.onInputChange} />
        <span className='input-group-btn'>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

// no need for SearchBar container to set global state, thus first argument is null
export default connect(null, mapDispatchToProps)(SearchBar);

