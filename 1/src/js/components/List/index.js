"use strict";

import React from "react";
import _ from 'lodash';
import classnames from 'classnames';

// Require our specific list styles
require('./styles.scss');

const List = ({
  items,
  removeItem,
  deleteCallback,
  toggleCallback
}) => {

  return(
    <ul className="list-group">
      {
        _.map(items, (item, key) => {
          let classes = classnames({
            "list-group-item": true,
            "completed": item.completed
          });
          return (<li key={key} className={classes}>
            <a href="#" onClick={toggleCallback.bind(null, key)}>{item.label}</a>
            <a href="#" className="glyphicon glyphicon-trash pull-right" aria-hidden="true" onClick={deleteCallback.bind(null, key)}></a>
          </li>);
        })
      }
    </ul>
  );
}

export default List;
