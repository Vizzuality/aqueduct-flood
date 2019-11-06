import React from "react";

const Icons = () => (
  <svg
    aria-hidden="true"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    {/* Put your symbols inside the defs tag */}
    <symbol id="icon-layers" viewBox="0 0 34 32">
      <title>
        layers
      </title>
      <path
        d="M29.995 17.712l4.29 2.859-17.143 11.429-17.136-11.429 4.286-2.857 12.855 8.571 12.85-8.574zM34.281 11.429l-17.136 11.429-17.145-11.429 17.143-11.429 17.138 11.429z"
      />
    </symbol>
    <symbol id="icon-boundaries" viewBox="0 0 32 32">
      <title>Toggle borders</title>
      <path fill="#555" d="M7.909 27.108l-4.708 4.709-3.017-3.017 4.709-4.709-4.891-4.892h12.8v12.8l-4.891-4.892zM24.091 4.891l4.709-4.708 3.017 3.017-4.709 4.709 4.892 4.892h-12.8v-12.8l4.892 4.891zM1.25 4.267l3.017-3.017 26.484 26.484-3.017 3.017-26.484-26.484z"></path>
    </symbol>
    <defs />
  </svg>
);

export default Icons;
