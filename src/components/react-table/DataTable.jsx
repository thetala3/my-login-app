import React, { useState, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import "./index.css"; // Import the CSS file

const CustomTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const columns = useMemo(
    () =>
      Object.keys(data[0] || {}).map((key) => ({
        Header: key,
        accessor: key
      })),
    [data]
  );

  const filteredData = useMemo(() => {
    if (!selectedColumn || !filterText) return data;
    return data.filter((item) =>
      item[selectedColumn]
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  }, [data, selectedColumn, filterText]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    usePagination
  );

  return (
    <Box>
      <Box className="custom-input-container" sx={{ marginTop: "10px" }}>
        <FormControl
          variant="outlined"
          sx={{ flex: 1, maxWidth: 300, margin: "0 10px" }}
        >
          <InputLabel id="select-column-label">Add Filter</InputLabel>
          <Select
            labelId="select-column-label"
            id="select-column"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            label="Add Filter"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {columns.map((column) => (
              <MenuItem key={column.accessor} value={column.accessor}>
                {column.Header}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="custom-input"
          placeholder="Filter value"
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ flex: 1, maxWidth: 300, margin: "0 10px" }}
        />
      </Box>
      <TableContainer className="custom-table-container">
        <Table {...getTableProps()} className="custom-table">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(e, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
      />
    </Box>
  );
};

export default CustomTable;
