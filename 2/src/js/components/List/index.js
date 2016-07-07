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

  let filteredItems = (items && items.size > 0) ? items.filter(item => !item.get('deleted')) : [];
  let renderItems = (filteredItems && filteredItems.size > 0)
    ? (
      filteredItems.map((item, key) => {
        let classes = classnames({
          "list-group-item": true,
          "completed": item.get('completed')
        });
        return (<li key={key} className={classes}>
          <a href="#" onClick={toggleCallback.bind(null, item.get('id'))}>{item.get('label')}</a>
          <a href="#" className="glyphicon glyphicon-trash pull-right" aria-hidden="true" onClick={deleteCallback.bind(null, item.get('id'))}></a>
        </li>);
      })
    ) : <li className="list-group-item">No items yet.</li>

  return(
    <ul className="list-group">
      {renderItems}
    </ul>
  );
}

export default List;
