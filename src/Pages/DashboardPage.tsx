import { createData } from "../utils/createData";
import Table from "../components/Table";

const data = createData();
const headers = transformHeaders(data.header, data.content[0]);

function transformHeaders(headers: any, content: any) {
  const shapeHeadersFn = (accumulator: any, header: any, index: number) => {
    let value = content[header];
    let type = "string";
    if (!isNaN(convertToNumber(value))) {
      type = "number";
    } else if (new Date(value).toString() !== "Invalid Date") {
      type = "date";
    }
    
    return [
      ...accumulator,
      {
        type: type,
        Header: header,
        accessor: header // toSnakeCase() didn't work??
      }
    ];
  }
  const result = headers.reduce(shapeHeadersFn, []);
  return result;
}

//TODO: unit test this
function parseNumber(value: any) {
  // remove some things like comma's and % signs
  const replaceValues = [",", "%"];
  const regex = new RegExp(replaceValues.join("|"), "g");
  const stringNumber = value.replace(regex, '');
  const result = +stringNumber;
  return result;
}

//TODO: unit test this
function convertToNumber(value: any) {
  let result;
  if (isNaN(parseInt(value))) {
    return NaN;
  }
  result = +value
  if (isNaN(result)) {
    result = parseNumber(value);
  }
  return result;
}

function DashboardPage() {
  
  return (
    <div id="DashboardComponent">
      DashboardComponent
      <Table columns={headers} data={data.content} />
    </div>
  );
} 

export default DashboardPage;
