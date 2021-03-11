import axios from "axios";
import * as actionConstant from "./DashboardActionTypes";

export const getRows = (cacheKey: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: actionConstant.LOAD_DATA_REQUEST
    });

    let url = `/api//useranalytics/all/hash`;
    let res = await axios.get(url);

    if (res.data.hash !== cacheKey) {
      dispatch({
        type: actionConstant.UPDATE_CACHE_KEY,
        payload: res.data
      });
      url = `/api//useranalytics/all/`;
      res = await axios.get(url);
      dispatch({
        type: actionConstant.LOAD_DATA_SUCCESS,
        payload: res.data
      });
    } else {
      dispatch({
        type: actionConstant.LOAD_DATA_CACHED,
      });
    }
  } catch (e) {
    dispatch({
      type: actionConstant.LOAD_DATA_FAIL,
    })
  }
};

export const deleteRows = () => async (dispatch: any) => {
  try {
    dispatch({
      type: actionConstant.DELETE_DATA_REQUEST
    });

    //TODO
    const url = `/api/useranalytics/delete/`;
    const res = await axios.delete(url);

    dispatch({
      type: actionConstant.DELETE_DATA_SUCCESS,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: actionConstant.DELETE_DATA_FAIL,
    })
  }
};