import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import TableHeader from "./TableHeader";
import InputRow from "./InputRow";
import RowData from "./RowData";
import initialData from "./initialData";
import Pagination from "./Pagination/Pagination";
import "./MyTable.css";

function MyTable() {
  const [data, setData] = useState(initialData);
  const [triggerRecalculation, setTriggerRecalculation] = useState(false);

  const [inputData, setInputData] = useState({
    id: "",
    startDate: "",
    endDate: "",
    monthYear: "",
    datesExcluded: [],
    numOfDays: "",
    leadCount: "",
    expectedDRR: "",
    lastUpdated: "",
  });
  const [excludedDates, setExcludedDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  // for pagination
  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  // for search
  const searchedData = data.filter((item) => {
    return (
      item.id.toString().includes(searchTerm) ||
      item.startDate.includes(searchTerm) ||
      item.endDate.includes(searchTerm) ||
      item.lastUpdated.includes(searchTerm)
    );
  });
  // updated pagination
  const totalPages = Math.ceil(searchedData.length / rowsPerPage);
  const currentRows = searchedData.slice(firstRowIndex, lastRowIndex);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const calculateNumOfDays = (startDate, endDate, datesExcluded) => {
    let numOfDays = 0;
    let current = new Date(startDate);

    while (current <= new Date(endDate)) {
      if (!datesExcluded.includes(current.toISOString().split("T")[0])) {
        numOfDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return numOfDays;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "datesExcluded") {
      handleExcludeDate(value);
    } else {
      setInputData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleExcludeDate = (date) => {
    let updatedExcludedDates = [...inputData.datesExcluded];
    if (!updatedExcludedDates.includes(date)) {
      updatedExcludedDates.push(date);
    }

    if (inputData.startDate && inputData.endDate) {
      const numOfDays = calculateNumOfDays(
        inputData.startDate,
        inputData.endDate,
        updatedExcludedDates
      );

      setInputData((prev) => ({
        ...prev,
        datesExcluded: updatedExcludedDates,
        numOfDays: numOfDays,
      }));
    }
  };

  const handleAdd = async () => {
    if (!inputData.id) return alert("ID cannot be empty.");
    if (data.some((item) => item.id == inputData.id))
      return alert("ID must be unique.");

    const startDate = new Date(inputData.startDate);
    const endDate = new Date(inputData.endDate);

    if (startDate >= endDate)
      return alert("Start date should be before end date.");

    if (inputData.datesExcluded) {
      const excludedDate = new Date(inputData.datesExcluded);
      if (excludedDate < startDate || excludedDate > endDate)
        return alert("Excluded date should be between start and end dates.");
    }

    const numOfDays = calculateNumOfDays(
      startDate,
      endDate,
      inputData.datesExcluded
    );

    const leadCount = inputData.leadCount || 0;
    const expectedDRR = (leadCount * 5) / 100;

    const newData = {
      ...inputData,
      numOfDays: numOfDays, // <-- Use calculated numOfDays
      expectedDRR: expectedDRR,
      lastUpdated: new Date().toISOString().slice(0, 10),
      monthYear: startDate.toISOString().slice(0, 7),
    };

    // Ajax Call to Submit the data to the server
    try {
      const response = await fetch("http://localhost:3000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with a status of ${response.status}`);
      }

      const responseBody = await response.json();

      // Handling the response from the server
      console.log(responseBody);

      // Adding the new data to local state
      setData((prev) => [...prev, newData]);

      // Reseting the input form
      setInputData({
        id: "",
        startDate: "",
        endDate: "",
        monthYear: "",
        datesExcluded: [],
        numOfDays: "",
        leadCount: "",
        expectedDRR: "",
        lastUpdated: "",
      });
      setExcludedDates([]);
    } catch (error) {
      console.error("Failed to submit data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const sortData = (key) => {
    const sorted = [...data].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setData(sorted);
  };

  useEffect(() => {
    const newData = data.map((item) => {
      const numOfDays = calculateNumOfDays(
        item.startDate,
        item.endDate,
        item.datesExcluded
      );
      const expectedDRR = (item.leadCount * 5) / 100;

      return {
        ...item,
        numOfDays: numOfDays,
        expectedDRR: expectedDRR,
      };
    });

    setData(newData);
    // Reseting the trigger after updating data
    setTriggerRecalculation(false);
  }, [triggerRecalculation]);
  useEffect(() => {
    if (inputData.startDate) {
      setInputData((prev) => ({
        ...prev,
        monthYear: new Date(inputData.startDate).toISOString().slice(0, 7),
      }));
    }
  }, [inputData.startDate]);
  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        className="search"
      />
      <table className="responsive-table">
        <TableHeader onSort={sortData} />
        <tbody>
          <InputRow
            inputData={inputData}
            onInputChange={handleInputChange}
            onSave={handleAdd}
          />
          {currentRows.map((row) => (
            <RowData key={row.id} data={row} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />
    </div>
  );
}

export default MyTable;
