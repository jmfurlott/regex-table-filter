'use strict';
import React from 'react';

import Table from "./Table.js";
import request from 'superagent';

request
  .get('http://jsonplaceholder.typicode.com/posts')
  .end(function(err, res) { 
    React.render( 
        <Table data={res.body}/>, 
        document.getElementById("app")
    );
});

