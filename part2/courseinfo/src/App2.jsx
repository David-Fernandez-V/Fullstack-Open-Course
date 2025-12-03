import { useEffect, useState } from "react";

function App2() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/data.txt")
    .then((res) => res.text())
    .then((text) => setData(text))
    console.log(data);
  })

  let outputs = data
    .trim()
    .split("\r\n")
    .map(line => line.split('-'))
  console.log("salidas: ", outputs)


  return (
    <div>App2</div>
  )
}

export default App2