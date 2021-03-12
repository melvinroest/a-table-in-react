import React from 'react';
import { useTable, useSortBy, useFilters, usePagination, useRowSelect } from 'react-table';

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
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel'

import clsx from 'clsx'
import _ from "lodash";

import TablePaginationActions from './TablePaginationActions'
import { getFilterTypes, getDefaultColumnFilter } from './columnFilter';

const useStyles = makeStyles((theme: any) => ({
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
  noBorder: {
    border: 0,
  }
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

function Table({ columns, data, deleteData, updateData }: any) {
  const classes = useStyles();
  const filterTypes = React.useMemo(getFilterTypes, []);
  const defaultColumn = React.useMemo(() => ({
    ...getDefaultColumnFilter(),
  }), []);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // autoResetPage: !skipPageReset,
      updateData, // not part of the API but enables call from the editable cell renderer
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        // UI per cell for selection
        {
          id: 'selection',
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
  
  const handleChangePage = (event: any, newPage: any) => {
    gotoPage(newPage);
  }

  const handleChangeRowsPerPage = (event: any) => {
    setPageSize(Number(event.target.value));
  }
  
  const handleDataDeletion = (event: any) => {
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
          <IconButton aria-label="delete" onClick={handleDataDeletion}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      </Toolbar>

      <TablePagination
        className={clsx(classes.noBorder)}
        rowsPerPageOptions={[
          10,
          25,
          50,
          100,
          { label: 'All', value: data.length },
        ]}
        colSpan={3}
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, idx: number) => (
                  <TableCell key={idx+"a"} {...(column.id === "selection"
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}>
                    
                    {column.render('Header')}

                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has an unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headerGroup.headers.map((column: any, idx: number) => (
                  <TableCell key={idx+"b"}>
                    {column.canFilter ? column.render('Filter') : null}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {page.map((row: any, i: number) => {
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