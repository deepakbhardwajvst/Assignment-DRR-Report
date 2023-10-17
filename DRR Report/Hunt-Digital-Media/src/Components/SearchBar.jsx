import React from "react";

function SearchBar(props) {
  const { searchTerm, onSearchTermChange } = props;

  const handleInputChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
