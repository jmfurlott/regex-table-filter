'use strict';

import React from 'react';
const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
import Immutable from 'immutable';
import request from 'superagent';

export default class Table extends React.Component { 

  constructor() {
    this.state = { 
      data: Immutable.List(),
      filteredData: Immutable.List(),
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    
  }

  componentWillMount() {
    this.setState({ 
      data: Immutable.fromJS(this.props.data).toList(),
      filteredData: Immutable.fromJS(this.props.data).toList() 
    });
  }

  filterData(event) {
    event.preventDefault();
    const regex = new RegExp(event.target.value, 'i');
    const filtered = this.state.data.filter(function(datum) {
      return (datum.get('title').search(regex) > -1);
    });

    this.setState({
      filteredData: filtered,
    });
  }

  render() {
    const { filteredData } = this.state;
    const prettyRows = filteredData.map(function(datum) {
      return (
        <tr>
          <td>{ datum.get("id") }</td>
          <td>{ datum.get("title") }</td>
        </tr>
      );
    });
    
    return(
      <div className="Table container">
      <p style={{padding: "2rem 0 0 0"}}>This example shows how to search and filter any generic type of data.  It only matches a pattern using simple case insensitive regular expressions. Thanks to <a href="http://jsonplaceholder.typicode.com/posts">JSON Placeholder</a> for example data.</p>
      <p style={{padding: "0 0 2rem"}}>Please view the <a href="https://github.com/jmfurlott/regex-table-filter">Github</a> for more information.</p>
      
        <input
          type="text"
          className="form-control"
          onChange={ this.filterData.bind(this) }
          placeholder="Search" />
      
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Title</th>
          </thead>

          <tbody>
            { prettyRows }
          </tbody>
       </table>
     </div>);
   }
}
