import React from "react";
import { Room } from "@material-ui/icons";

import "../../App.css";

const Legend = () => {
  return (
    <div className="legend">
      <h3>
        Your Places:
        <Room style={{ margin: "-2px", color: "red" }} />
      </h3>
      <h3>
        Others Places:
        <Room style={{ margin: "-2px", color: "purple" }} />
      </h3>
    </div>
  );
};

export default Legend;
