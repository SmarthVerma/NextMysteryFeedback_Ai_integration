"use client";
import { useState, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

export default function Component() {
  const [username, setUsername] = useState("");

  const [debounceVal] = useDebounceValue(username, 900);
  useEffect(() => {
    console.log("Debounced value:", debounceVal);
  }, [username, debounceVal]);

  return (
    <div> 
      <p>Debounce Value: {debounceVal}</p>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
    </div>
  );
}
