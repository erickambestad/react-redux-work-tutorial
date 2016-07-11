"use strict";

import { Map, List } from 'immutable';

// Not a huge app.. obviously
export default Map({
  auth: Map({
    currently: 'ANONYMOUS',
    username: null,
    uid: null,
    error: null
  }),
  loading: false,
  items: List(),
  item: '',
  submitEnabled: false
});
