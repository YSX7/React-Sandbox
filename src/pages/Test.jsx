import React, { useState } from "react";
import ClassCounter from "@/components/ClassCounter";

function Test() {
  const [value, setValue] = useState("");

  return (
    <div>
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Oh hi Mark"
      />
      <ClassCounter />
    </div>
  );
}

export default Test;
