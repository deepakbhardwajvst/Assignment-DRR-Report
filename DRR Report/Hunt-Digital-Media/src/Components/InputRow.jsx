function InputRow({ inputData, onInputChange, onSave }) {
  return (
    <tr>
      {/* Input fields for each column */}
      <td data-label="Action">
        <button onClick={onSave}>Save</button>
      </td>
      <td data-label="ID">
        <input
          className="add-row-input"
          name="id"
          onChange={onInputChange}
          value={inputData.id || ""}
        />
      </td>
      <td data-label="Start Date">
        <input
          className="add-row-input"
          type="date"
          name="startDate"
          onChange={onInputChange}
          value={inputData.startDate || ""}
        />
      </td>
      <td data-label="End Date">
        <input
          className="add-row-input"
          name="endDate"
          type="date"
          onChange={onInputChange}
          value={inputData.endDate || ""}
        />
      </td>
      <td data-label="Month/Year">
        <input
          className="add-row-input"
          name="monthYear"
          type="month"
          onChange={onInputChange}
          value={inputData.monthYear || ""}
        />
      </td>
      <td data-label="Dates Excluded">
        <input
          className="add-row-input"
          name="datesExcluded"
          type="date"
          onChange={onInputChange}
          value={
            inputData.datesExcluded && inputData.datesExcluded.length > 0
              ? inputData.datesExcluded[inputData.datesExcluded.length - 1]
              : ""
          }
        />
      </td>
      <td data-label="Number of Days">
        <input
          className="add-row-input"
          name="numOfDays"
          onChange={onInputChange}
          value={inputData.numOfDays || ""}
        />
      </td>
      <td data-label="Lead Count">
        <input
          className="add-row-input"
          name="leadCount"
          type="number"
          onChange={onInputChange}
          value={inputData.leadCount || ""}
        />
      </td>
      <td data-label="Expected DRR">
        <input
          className="add-row-input"
          name="expectedDRR"
          onChange={onInputChange}
          value={inputData.expectedDRR || ""}
        />
      </td>
      <td data-label="Last Updated">
        <input
          className="add-row-input"
          type="date"
          name="lastUpdated"
          onChange={onInputChange}
          value={inputData.lastUpdated || ""}
        />
      </td>
    </tr>
  );
}
export default InputRow;
