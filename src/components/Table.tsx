import React from 'react';
import { useTable, useSortBy, useFilters, useAsyncDebounce, useRowSelect } from 'react-table';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import _ from "lodash";

const useToolbarStyles = makeStyles((theme: any) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Table({ columns, data, deleteData }: any) {
  const classes = useToolbarStyles();

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: any) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
    )
  
  const deleteUserHandler = (event: any) => {
    const arrayIndicesToDelete = Object.keys(selectedRowIds).map(x => parseInt(x, 10));
    const dbIndicesToDelete = arrayIndicesToDelete.map((i: number) => data[i].id);
    deleteData(arrayIndicesToDelete, dbIndicesToDelete);
  }
  const numSelected = Object.keys(selectedRowIds).length;

  // Render the UI for your table
  return (
    <TableContainer>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteUserHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: any, i: number) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  )
}

export default Table;