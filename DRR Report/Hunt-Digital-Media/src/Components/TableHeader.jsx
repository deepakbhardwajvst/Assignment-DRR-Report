import React from "react";

const TableHeader = ({ onSort }) => {
  return (
    <thead>
      <tr>
        <th onClick={() => onSort("action")}>Action</th>
        <th onClick={() => onSort("id")}>ID</th>
        <th onClick={() => onSort("startDate")}>Start Date</th>
        <th onClick={() => onSort("endDate")}>End Date</th>
        <th onClick={() => onSort("monthYear")}>MonthYear</th>
        <th onClick={() => onSort("datesExcluded")}>Dates Excluded</th>
        <th onClick={() => onSort("numOfDays")}>Number of Days</th>
        <th onClick={() => onSort("leadCount")}>Lead Count</th>
        <th onClick={() => onSort("expectedDRR")}>Expected DRR</th>
        <th onClick={() => onSort("lastUpdated")}>Last Updated</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
