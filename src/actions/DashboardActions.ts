import axios from "axios";
import * as actionConstant from "./DashboardActionTypes";

export const getRows = () => async (dispatch: any) => {
  try {
    dispatch({
      type: actionConstant.LOAD_DATA_REQUEST
    });

    //TODO
    const url = `/api//useranalytics/all/`;
    const res = await axios.get(url);

    dispatch({
      type: actionConstant.LOAD_DATA_SUCCESS,
      payload: res.data
    })
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