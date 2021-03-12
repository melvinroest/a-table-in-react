import { addFilterTypeToColumns } from "./columnFilter";
import { determineType } from "../../shared/src/utils/typeFunctions";
import { createEditableCell } from "./editableCell";
import { values } from "lodash";

export function transformHeaders(headers: any, firstRow: any) {
  const shapeHeadersFn = (headersAccumulator: any, header: any, index: number) => {
    return [
      ...headersAccumulator,
      {
        Header: header,
        accessor: header //TODO: toSnakeCase() didn't work??
      }
    ];
  }
  
  const addTypeInformation = (columns: any, firstRow: any) => {
    const result = columns.reduce((headersAccumulator: any, header: any, index: number) => {
      const val = firstRow[header.accessor];
      let type = determineType(val);
      header = {
        ...header,
        Type: type
      };
      return [
        ...headersAccumulator,
        header
      ];
    }, []);
    return result;
  };

  const addRenderer = (columns: any, firstRow: any) => {
    const result = columns.reduce((headersAccumulator: any, header: any, index: number) => {
      const val = firstRow[header.accessor];
      let type = determineType(val);
      let renderer = <div>{val}</div>
      switch (type) {
        case "string":
          renderer = <div>{val}</div>
          break;
        case "number":
          renderer = <div>{val.toLocaleString()}</div>
          break;
        case "date":
          renderer = <div>{new Date(val).toISOString()}</div>
          break;
      }
      header = {
        ...header,
        Cell: renderer
      };
      return [
        ...headersAccumulator,
        header
      ];
    }, []);
    return result;
  }

  let result = headers.reduce(shapeHeadersFn, []);
  result = addFilterTypeToColumns(result, firstRow);
  result = addTypeInformation(result, firstRow);
  // result = addRenderer(result, firstRow);
  
  //TODO: put in config file, to make sure multiple fields could be editable cells
  //TODO: create an edit toggle so that you can switch between a nice presentation mode and an edit mode
  result = result.map((item: any, index: any) => {
    if (item.accessor !== "goal_value") {
      return item;
    }
    return {
      ...item,
      ...createEditableCell()
    }
  });

  return result;
}