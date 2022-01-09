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
  const types = [
    { value: "fixed", label: "Cuota fija" },
    { value: "variable", label: "Cuota variable" },
  ];
  const [loan, setLoan] = useState("");
  const [nper, setNper] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("fixed");

  useEffect(() => {
    onChange(loan, nper, rate, type);
  }, [onChange, loan, nper, rate, type]);

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
        color="info"
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
        color="info"
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
        color="info"
        margin="normal"
        onChange={(e) => setRate(e.target.value)}
        InputProps={{
          inputComponent: FormatPercentage,
        }}
      />
      <TextField
        id="type"
        focused
        select
        variant="outlined"
        label="Modalidad"
        color="info"
        margin="normal"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ textAlign: "center" }}
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default Inputs;
