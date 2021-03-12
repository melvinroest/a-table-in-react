import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash";

import Table from "../components/Table/Table";
import { getRows, deleteRows, updateField } from "../actions/DashboardActions";

import { RootState } from "../reducers/RootReducer";
import { transformHeaders } from "../components/Table/headerLib";

// fake data
// const globalData = createData();
// const globalHeaders = transformHeaders(globalData.header);

function DashboardPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.DashboardPage);

  const fetchData = () => {
    dispatch(getRows(state.cacheKey));
  }

  const deleteData = (newState: any, indices: Array<number>) => {
    dispatch(deleteRows(newState, indices));
  }

  const updateData = (arrayIndex: number, key: string, value: any) => {
    const id = state.data[arrayIndex].id;
    dispatch(updateField(key, arrayIndex, id, value));
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  
  const dataElement = () => {
    if (state.loading && _.isEmpty(state.data)) {
      return <p>Loading</p>
    }

    if (!_.isEmpty(state.data)) {
      const headers = transformHeaders(Object.keys(state.data[0]), state.data[0]);
      let result = <>
          {/* {state.loading ? <p>Loading</p> : null} */}
          <Table columns={headers} data={state.data} deleteData={deleteData} updateData={updateData} />
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
      <h1>User Analytics Dashboard</h1>
      {dataElement()}
    </div>
  );
} 

export default DashboardPage;
