import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash";

import { createData } from "../shared/src/utils/createData";
import Table from "../components/Table";
import { getRows, deleteRows } from "../actions/DashboardActions";

import { RootState } from "../reducers/RootReducer";

// const globalData = createData();
// const globalHeaders = transformHeaders(globalData.header);

function transformHeaders(headers: any) {
  const shapeHeadersFn = (accumulator: any, header: any, index: number) => {
    return [
      ...accumulator,
      {
        Header: header,
        accessor: header //TODO: toSnakeCase() didn't work??
      }
    ];
  }
  const result = headers.reduce(shapeHeadersFn, []);
  return result;
}

function DashboardPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.DashboardPage);

  const fetchData = () => {
    dispatch(getRows(state.cacheKey));
  }

  const deleteData = (newState: any, indices: Array<number>) => {
    dispatch(deleteRows(newState, indices));
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  
  const dataElement = () => {
    if (state.loading && _.isEmpty(state.data)) {
      return <p>Loading</p>
    }

    if (!_.isEmpty(state.data)) {
      const headers = transformHeaders(Object.keys(state.data[0]));
      let result = <>
          {/* {state.loading ? <p>Loading</p> : null} */}
          <Table columns={headers} data={state.data} deleteData={deleteData} />
        </>
      return result 
    }

    if (state.errorMessage !== "") {
      return <p>{state.errorMessage}</p>
    }

    return <p>The app is unable to get data, and it is unable to retrieve an error message.</p>
  }
  
  return (
    <div id="DashboardComponent">
      DashboardComponent
      {dataElement()}
    </div>
  );
} 

export default DashboardPage;
