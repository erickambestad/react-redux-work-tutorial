Step 1:

NPM install all the things.

npm install react react-dom react-router redux react-redux redux-logger redux-thunk webpack webpack-dev-server immutable lodash uglify-loader style-loader sass-loader css-loader file-loader img-loader babel-loader imports-loader react-hot-loader node-sass es6-promise babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-2 classnames reqwest bootstrap


Step 2:

Initial setup -
  Directory and file structure
  React-router with a basic template/home route
    - src/htdocs
    - index.html
    - app.js
    - pages
    - components
  webpack and webpack-dev-server


  Step 3:

    Add redux
      - initialState.js
      - actionTypes.js
      - store.js
      - actions/
      - reducers/
    Turn page components in to Redux containers and map state/actions to props
