// import React from "react";
import * as React from "react";

export default function Test() {
  const [count, setCount] = React.useState(0);
  if (count > 0) {
    React.useEffect(() => {
      console.log("Count is greater than 0");
    }, []);
  }
  const addCount = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <button onClick={addCount}>count++</button>
      <div>count: {count}</div>
    </div>
  );
}
