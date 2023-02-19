import actionTypes from '../actions/actionTypes';

const initialState = {
  pending: false,
  success: false,
  names: [],
  fail: false,
  error: '',
};

const namesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.nameActions.GET_NAMES_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.nameActions.GET_NAMES_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        names: action.payload,
      };
    case actionTypes.nameActions.GET_NAMES_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.nameActions.DELETE_NAME_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.nameActions.DELETE_NAME_SUCCESS:
      let filteredNames = state.names.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pending: false,
        success: true,
        fail: false,
        names: filteredNames,
      };
    case actionTypes.nameActions.DELETE_NAME_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        fail: true,
        error: action.payload,
      };
    case actionTypes.nameActions.ADD_NAME:
      return {
        ...state,
        names: [...state.names, action.payload],
      };

    default:
      return state;
  }
};

export default namesReducer;
