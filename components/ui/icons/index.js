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
    <defs />
  </svg>
);

export default Icons;
