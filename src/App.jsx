import { useEffect, useState } from "react";

import MakePdf from "./components/MakePdf";
// import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(data);
  return (
    <>
      <MakePdf
        data={data}
        type={"print"}
        btnName="Print"
        title={"Sale Report"}
        customerName={"Mehmud"}
      />
    </>
  );
}

export default App;
