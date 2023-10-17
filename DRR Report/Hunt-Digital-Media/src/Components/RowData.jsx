import React from "react";

function RowData({ data, onDelete }) {
  function DateChip({ date }) {
    return <span className="date-chip">{date}</span>;
  }
  return (
    <tr>
      <td data-label="Action">
        <button onClick={() => onDelete(data.id)}>Delete</button>
      </td>
      <td data-label="ID">{data.id}</td>
      <td data-label="Start Date">{data.startDate}</td>
      <td data-label="End Date">{data.endDate}</td>
      <td data-label="Month/Year">{data.monthYear}</td>
      <td data-label="Dates Excluded">
        {data.datesExcluded.map((date, i) => (
          <DateChip key={i} date={date} />
        ))}
      </td>
      <td data-label="Number of Days">{data.numOfDays}</td>
      <td data-label="Lead Count">{data.leadCount}</td>
      <td data-label="Expected DRR">{data.expectedDRR}</td>
      <td data-label="Last Updated">{data.lastUpdated}</td>
    </tr>
  );
}

export default RowData;
