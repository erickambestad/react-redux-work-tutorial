"use strict";

import React from "react";
import _ from 'lodash';
import classnames from 'classnames';
import FlipMove from 'react-flip-move';

// Require our specific list styles
require('./styles.scss');

const List = ({
  items,
  removeItem,
  deleteCallback,
  toggleCallback
}) => {

  // Filter the items before rendering.  This will allow us to check and make sure the filtered results aren't 0 since we aren't removing on delete. just flagged.
  let filteredItems = (items && items.size > 0) ? items.filter(item => !item.get('deleted')) : [];

  // render the filtered items in the list or the empty message
  let renderItems = (filteredItems && filteredItems.size > 0)
    ? (
      filteredItems.keySeq().map((itemKey, index) => {
        let item = filteredItems.get(itemKey);
        let classes = classnames({
          "list-group-item": true,
          "completed": item.get('completed')
        });
        return (
          <li key={index} className={classes}>
            <a href="#" onClick={toggleCallback.bind(null, itemKey, !item.get('completed'))}>{item.get('label')}</a>
            <a href="#" className="glyphicon glyphicon-trash pull-right" aria-hidden="true" onClick={deleteCallback.bind(null, itemKey)}></a>
          </li>
        );
      })
    ) : <li className="list-group-item">No items yet.</li>

  return(
    <ul className="list-group">
      <FlipMove staggerDelayBy={50} enterAnimation="accordianVertical" leaveAnimation="none">
        {renderItems}
      </FlipMove>
    </ul>
  );
}

export default List;
