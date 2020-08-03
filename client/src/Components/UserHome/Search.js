import React, { useContext } from "react";

import Input from "../ReusableComponents/Input/input";
import { Posts } from "../posts_contex";

function SearchBar() {
  const { setSearchTerm } = useContext(Posts);
  const handleChange = (input, setValue) => {
    setValue(input);
  };

  const style = {
    zIndex: "-1",
    position: "absolute",
    left: "18%",
  };

  return (
    <div style={style}>
      <Input
        placeholder="Search"
        onchange={handleChange}
        stateToUpdate={setSearchTerm}
      />
    </div>
  );
}

export default SearchBar;
