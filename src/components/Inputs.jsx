import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoan,
  setNper,
  setRate,
  setGradient,
  changeType,
} from "../redux/tableSlice";
import {
  FormatCurrency,
  FormatPercentage,
  FormatPeriods,
} from "./CustomFormats";

const Inputs = () => {
  const types = [
    { value: "fixed", label: "Cuota fija" },
    { value: "variable", label: "Abono constate" },
    { value: "linearGrowth", label: "Lineal creciente" },
    { value: "linearDecay", label: "Lineal decreciente" },
  ];
  const dispatch = useDispatch();
  const type = useSelector((state) => state.table.type);

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
        color={
          type === "fixed"
            ? "primary"
            : type === "variable"
            ? "secondary"
            : type === "linearGrowth"
            ? "success"
            : "error"
        }
        margin="normal"
        onChange={(e) => dispatch(setLoan(e.target.value))}
        InputProps={{
          inputComponent: FormatCurrency,
        }}
      />
      <TextField
        id="gradient"
        focused
        placeholder="$100,000"
        variant="outlined"
        label="Gradiente"
        color={
          type === "fixed"
            ? "primary"
            : type === "variable"
            ? "secondary"
            : type === "linearGrowth"
            ? "success"
            : "error"
        }
        margin="normal"
        style={{
          display:
            type === "linearGrowth"
              ? "flex"
              : type === "linearDecay"
              ? "flex"
              : "none",
        }}
        onChange={(e) => dispatch(setGradient(e.target.value))}
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
        color={
          type === "fixed"
            ? "primary"
            : type === "variable"
            ? "secondary"
            : type === "linearGrowth"
            ? "success"
            : "error"
        }
        margin="normal"
        onChange={(e) => dispatch(setNper(e.target.value))}
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
        color={
          type === "fixed"
            ? "primary"
            : type === "variable"
            ? "secondary"
            : type === "linearGrowth"
            ? "success"
            : "error"
        }
        margin="normal"
        onChange={(e) => dispatch(setRate(e.target.value))}
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
        color={
          type === "fixed"
            ? "primary"
            : type === "variable"
            ? "secondary"
            : type === "linearGrowth"
            ? "success"
            : "error"
        }
        margin="normal"
        value={type}
        onChange={(e) => dispatch(changeType(e.target.value))}
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
};

export default Inputs;
