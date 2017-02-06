import * as constants from '../actions';

const initialState = {
  plugins: []
};

const pluginsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RESET_PLUGINS:
      return Object.assign({}, state, {
        plugins: []
      });
    case constants.ADD_PLUGIN:
      return Object.assign({}, state, {
        plugins: [
          ...state.plugins,
          {
            component: action.plugin,
          }
        ]
      });
    default:
      return state;
  }
}

export default pluginsReducer;
