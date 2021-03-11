import * as actionConstant from "../actions/DashboardActionTypes";

const DefaultState = {
  loading: false,
  data: [],
  errorMessage: "",
  count: 0,
  cacheKey: 0,
};

const DashboardReducer = (state = DefaultState, action: any) => {
  switch (action.type) {
    case actionConstant.UPDATE_CACHE_KEY:
      return {
        ...state,
        cacheKey: action.payload.hash
      };
    case actionConstant.LOAD_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: ""
      };
    case actionConstant.LOAD_DATA_CACHED:
      return {
        ...state,
        loading: false,
        errorMessage: "",
      }
    case actionConstant.LOAD_DATA_SUCCESS:
      //TODO: maybe delete them here as well
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        errorMessage: "",
        count: action.payload.count
      };
    case actionConstant.LOAD_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: "Could not load data"
      };

    case actionConstant.DELETE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: ""
      };
    case actionConstant.DELETE_DATA_SUCCESS:
      //TODO: maybe delete them here as well
      return {
        ...state,
        data: action.payload.result,
        loading: false,
        errorMessage: "",
        count: action.payload.count
      };
    case actionConstant.DELETE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: "Could not delete rows"
      };
    default:
      return state
  }
};

export default DashboardReducer