import axios from "axios";
import * as actionConstant from "./DashboardActionTypes";
import { StatusCodes } from 'http-status-codes';

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
        payload: res.data.hash
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

export const deleteRows = (localIds: Array<number>, ids: Array<number>) => async (dispatch: any) => {
  try {
    dispatch({
      type: actionConstant.DELETE_DATA_REQUEST
    });

    const url = `/api/useranalytics/delete/`;
    const res = await axios.delete(url, { data: ids });

    if (res.status === StatusCodes.OK) {
      // update cache
      let url = `/api//useranalytics/all/hash`;
      let res = await axios.get(url);
      dispatch({
        type: actionConstant.UPDATE_CACHE_KEY,
        payload: res.data.hash
      });
    }

    dispatch({
      type: actionConstant.DELETE_DATA_SUCCESS,
      payload: {
        ids: localIds,
      }
    })
  } catch (e) {
    dispatch({
      type: actionConstant.DELETE_DATA_FAIL,
    })
  }
};