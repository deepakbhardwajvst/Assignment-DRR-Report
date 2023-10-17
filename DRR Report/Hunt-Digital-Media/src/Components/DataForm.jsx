import React, { useState } from "react";

const DataForm = ({ onAddData }) => {
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
    monthYear: "",
    numberOfDays: 0,
    numberOfLeads: 0,
    excludedDates: [], // New field for excluded dates
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (name.includes("Date")) {
        // Check if the value is a valid date
        const isValidDate = !isNaN(new Date(value).getTime());

        // Update the date only if it's a valid date
        newData[name] = isValidDate ? new Date(value) : value;
      } else {
        newData[name] = value;
      }

      return newData;
    });
  };

  const handleAddExcludedDate = () => {
    if (
      formData.excludedDate &&
      !formData.excludedDates.includes(formData.excludedDate)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        excludedDates: [...prevData.excludedDates, prevData.excludedDate],
        excludedDate: "", // Clear the input after adding
      }));
    }
  };

  const handleRemoveExcludedDate = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      excludedDates: prevData.excludedDates.filter((d) => d !== date),
    }));
  };

  const handleSubmit = (e) => {
    // ... (unchanged code for other form fields)

    const newData = {
      id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      monthYear: formData.monthYear,
      excludedDates: formData.excludedDates,
      numberOfDays: formData.numberOfDays,
      numberOfLeads: formData.numberOfLeads,
      leadCount: Math.floor(Math.random() * 100),
      expectedDRR: "Some value",
      lastUpdated: new Date(),
    };

    onAddData(newData);

    // Reset the form data
    setFormData({
      startDate: new Date(),
      endDate: new Date(),
      monthYear: "",
      numberOfDays: 0,
      numberOfLeads: 0,
      excludedDates: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="data-form">
      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formData.startDate.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={formData.endDate.toISOString().split("T")[0]}
          onChange={handleChange}
        />
      </label>
      <label>
        MonthYear:
        <input
          type="text"
          name="monthYear"
          value={formData.monthYear}
          onChange={handleChange}
        />
      </label>
      <label>
        Excluded Dates:
        <input
          type="date"
          name="excludedDate"
          value={formData.excludedDate}
          onChange={handleChange}
        />
        <button type="button" onClick={handleAddExcludedDate}>
          Add
        </button>
      </label>
      <ul>
        {formData.excludedDates.map((date) => (
          <li key={date}>
            {date}{" "}
            <button
              type="button"
              onClick={() => handleRemoveExcludedDate(date)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <label>
        Number of Days:
        <input
          type="number"
          name="numberOfDays"
          value={formData.numberOfDays}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Leads:
        <input
          type="number"
          name="numberOfLeads"
          value={formData.numberOfLeads}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Data</button>
    </form>
  );
};

export default DataForm;
