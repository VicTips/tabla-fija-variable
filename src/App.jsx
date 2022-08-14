import "./App.css";
import Inputs from "./components/Inputs";
import { useState } from "react";
import AmortizationTable from "./components/AmortizationTable";
import Box from "@mui/material/Box";
import Logo from "./components/Logo";
import Rows from "./services/Rows";

function App() {
  const [loan, setLoan] = useState("");
  const [gradient, setGradient] = useState("");
  const [nper, setNper] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  let rows = new Rows(loan, nper, rate);
  return (
    <Box m={{ xs: 2, sm: 3, md: 4, lg: 5 }} mt={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Inputs
          onChange={(loan, gradient, nper, rate, type) => {
            setLoan(loan);
            setGradient(gradient);
            setNper(nper);
            setRate(rate);
            setType(type);
          }}
        />
        <Box mt={2}>
          <Logo />
        </Box>
      </Box>
      <Box mt={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
        <AmortizationTable
          rows={
            type === "fixed"
              ? rows.pmtFixed()
              : type === "variable"
              ? rows.pmtVariable()
              : type === "linearGrowth"
              ? rows.linearGrowth(gradient)
              : rows.linearDecay(gradient)
          }
          type={type}
        />
      </Box>
    </Box>
  );
}

export default App;
