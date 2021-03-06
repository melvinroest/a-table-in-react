import Papa from 'papaparse';
import { isFunctionDeclaration } from 'typescript';
import encodedData from "./encodedData";
import { toSnakeCase } from "./stringTransform";

export function createData() {
  const data = atob(encodedData);
  const options: Papa.ParseConfig = {
    delimiter: ",",
    quoteChar: '"',
    header: true
  }
  const result = Papa.parse(data, options);
  return { header: result.meta.fields, content: result.data.slice(0, 20) };
}

// function parseLine(line: string, valueSeparator: string, quoteChar: string): string[] {
//   let result: string[] = [];

//   const regex1 = new RegExp(`[^${quoteChar}]+|${quoteChar}.+${quoteChar}`, "g"); // [^"]+|".+"    l1.match(/[^"]+|".+"/g)[0]
//   const seperatedQuoteCharsInMiddle = line.match(regex1)!;
//   const before = seperatedQuoteCharsInMiddle[0].split(`${valueSeparator}`).filter(x => x);
//   result = [...result, ...before];

//   if (seperatedQuoteCharsInMiddle.length > 1) {
//     const regex2 = new RegExp(`${quoteChar}(.*?)${quoteChar}`, "g");
//     const middle = Array.from(seperatedQuoteCharsInMiddle[1].matchAll(regex2), m => m[1]);
//     result = [...result, ...middle];
//   }
  
//   if (seperatedQuoteCharsInMiddle.length > 2) {
//     const after = seperatedQuoteCharsInMiddle[2].split(`${valueSeparator}`).filter(x => x);
//     result = [...result, ...after];
//   }

//   console.log(result.length, result);
//   return result;
// }

// function createData() {

//   const data = atob(encodedData);

//   // https://stackoverflow.com/questions/28543821/convert-csv-lines-into-javascript-objects/28544299
//   // Split data into lines and separate headers from actual data
//   // using Array spread operator
//   const [headerLine, ...lines] = data.split('\n');

//   // Split headers line into an array
//   // `valueSeparator` may come from some kind of argument
//   // You may want to transform header strings into something more
//   // usable, like `camelCase` or `lowercase-space-to-dash`
//   const valueSeparator = ',';
//   const quoteChar = '"';
//   const headers = headerLine.split(valueSeparator);
//   const objectReducer = () => (object: any, value: any, index: number) => ({
//     ...object,
//     [ headers[index] ]: value,
//   })

//   // Create objects from parsing lines
//   // There will be as much objects as lines
//   const objects = lines.map( (line, index) => parseLine(line, valueSeparator, quoteChar).reduce(objectReducer, {}));
//   return objects;

// }