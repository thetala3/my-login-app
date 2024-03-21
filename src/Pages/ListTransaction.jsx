import React, { useState, useEffect } from "react";
import CustomDataTable from "../components/react-table/DataTable"; // Adjust the path as necessary
import dataJ from "../components/react-table/test.json";
import { useConfig } from "../context/DataContext";
import Axios from "axios";
const ListTransaction = () => {
  const config = useConfig();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(config.GetTransactionsList); // Replace with your actual API URL
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <hr style={{ height: "40px", background: "transparent" }} />
      {dataJ.length > 0 ? (
        <CustomDataTable data={dataJ} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ListTransaction;
