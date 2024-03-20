import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import "./index.css"; // Import the CSS file

const CustomDataTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");

  const getMinWidth = (key) => {
    const maxWidth = 200; // Set a reasonable max width to prevent overly wide columns
    const longestString = data.reduce((acc, item) => {
      const currentItemLength = item[key] ? item[key].toString().length : 0;
      return currentItemLength > acc ? currentItemLength : acc;
    }, 0);
    return Math.min(maxWidth, longestString * 7);
  };

  const columns = useMemo(
    () =>
      Object.keys(data[0] || {}).map((key) => ({
        name: key,
        selector: (row) => row[key],
        sortable: true,
        wrap: true,
        style: {
          whiteSpace: "normal",
          overflow: "visible",
          wordBreak: "break-word" // To ensure long words do not overflow
        }
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

  const customStyles = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: "#666666",
        whiteSpace: "normal",
        overflow: "visible",
        wordBreak: "break-word"
      }
    },
    cells: {
      style: {
        fontSize: "14px",
        color: "#000000",
        backgroundColor: "#ffffff",
        whiteSpace: "normal",
        overflow: "visible"
      }
    },
    rows: {
      style: {
        backgroundColor: "#ffffff",
        color: "#000000",
        hover: {
          backgroundColor: "#e1bee7"
        },
        pointerOnHover: true,
        highlightOnHover: true
      }
    },
    pagination: {
      style: {
        color: "#6a1b9a"
      },
      pageButtonsStyle: {
        borderRadius: "5px",
        backgroundColor: "#f1f1f1",
        color: "#6a1b9a",
        fill: "#6a1b9a",
        "&:disabled": {
          backgroundColor: "#cccccc"
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "#d1c4e9"
        },
        "&:active": {
          backgroundColor: "#ce93d8"
        }
      }
    }
  };

  return (
    <div>
      <div className="container ">
        <select
          className="custom-select" // Add class name for styling
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <option value="">Select Column</option>
          {columns.map((column) => (
            <option key={column.name} value={column.name}>
              {column.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter value"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="custom-input"
        />
      </div>
      <hr className="hr-spacing" />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
      />
    </div>
  );
};
export default CustomDataTable;
