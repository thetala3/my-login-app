import React, { useState, useEffect } from "react";
import CustomDataTable from "../components/react-table/DataTable"; // Adjust the path as necessary
import data from "../components/react-table/test.json";
import Header from "../components/Header/index";
const ListTransaction = () => {
  return (
    <div>
      {<Header />}
      <hr style={{ height: "40px", background: "transparent" }} />
      {data.length > 0 ? (
        <CustomDataTable data={data} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ListTransaction;
