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

  let renderItems = (items && items.size > 0)
    ? (
      items.valueSeq().filter(item => !item.get('deleted')).map((item, key) => {
        let classes = classnames({
          "list-group-item": true,
          "completed": item.get('completed')
        });
        return (<li key={key} className={classes}>
          <a href="#" onClick={toggleCallback.bind(null, key)}>{item.get('label')}</a>
          <a href="#" className="glyphicon glyphicon-trash pull-right" aria-hidden="true" onClick={deleteCallback.bind(null, key)}></a>
        </li>);
      })
    ) : null

  return(
    <ul className="list-group">
      {renderItems}
    </ul>
  );
}

export default List;
