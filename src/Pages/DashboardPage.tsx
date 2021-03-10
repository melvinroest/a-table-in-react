import React from 'react';
import { createData } from "../shared/src/utils/createData";
import Table from "../components/Table";
const globalData = createData();
const globalHeaders = transformHeaders(globalData.header, globalData.content[0]);

function transformHeaders(headers: any, content: any) {
  const shapeHeadersFn = (accumulator: any, header: any, index: number) => {
    return [
      ...accumulator,
      {
        Header: header,
        accessor: header // toSnakeCase() didn't work??
      }
    ];
  }
  const result = headers.reduce(shapeHeadersFn, []);
  return result;
}

function DashboardPage() {
  const [data, setData] = React.useState(globalData.content);
  
  return (
    <div id="DashboardComponent">
      DashboardComponent
      <Table columns={globalHeaders} data={data} setData={setData} />
    </div>
  );
} 

export default DashboardPage;
