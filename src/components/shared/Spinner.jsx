import spinner from "../spinner.gif";

import React from "react";

function Spinner() {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{ width: "100px", margin: "auto", display: "block" }}
    ></img>
  );
}

export default Spinner;
