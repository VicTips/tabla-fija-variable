import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect } from "react";
import {
  FormatCurrency,
  FormatPercentage,
  FormatPeriods,
} from "./CustomFormats";

function Inputs({ onChange }) {
  const types = { fixed: "Cuota fija", variable: "Cuota variable" };
  const [loan, setLoan] = useState("");
  const [nper, setNper] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    onChange(loan, nper, rate);
  }, [onChange, loan, nper, rate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { width: "23ch" },
      }}
    >
      <TextField
        id="loan"
        focused
        placeholder="$10,000,000"
        variant="outlined"
        label="Valor del crédito"
        color="warning"
        margin="normal"
        onChange={(e) => setLoan(e.target.value)}
        InputProps={{
          inputComponent: FormatCurrency,
        }}
      />
      <TextField
        id="nper"
        focused
        placeholder="12"
        variant="outlined"
        label="Número de periodos"
        color="warning"
        margin="normal"
        onChange={(e) => setNper(e.target.value)}
        InputProps={{
          inputComponent: FormatPeriods,
        }}
      />
      <TextField
        id="rate"
        focused
        placeholder="1.5%"
        variant="outlined"
        label="Tasa de interés"
        color="warning"
        margin="normal"
        onChange={(e) => setRate(e.target.value)}
        InputProps={{
          inputComponent: FormatPercentage,
        }}
      />
      <TextField
        id="type"
        focused
        variant="outlined"
        label="Modalidad"
        color="warning"
        margin="normal"
      >
        {types.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default Inputs;
