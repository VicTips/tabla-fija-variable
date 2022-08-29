import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rows from "../services/Rows";
import { useSelector } from "react-redux";

const AmortizationTable = () => {
  let headers = ["Periodo", "Cuota", "Intereses", "Amortización", "Saldo"];
  const type = useSelector((state) => state.table.type);
  const loan = useSelector((state) => state.table.loan);
  const nper = useSelector((state) => state.table.nper);
  const rate = useSelector((state) => state.table.rate);
  const gradient = useSelector((state) => state.table.gradient);
  let rows = new Rows(loan, nper, rate);
  let rowsToMap =
    type === "fixed"
      ? rows.pmtFixed()
      : type === "variable"
      ? rows.pmtVariable()
      : type === "linearGrowth"
      ? rows.linearGrowth(gradient)
      : rows.linearDecay(gradient);

  let formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  });

  return (
    <TableContainer component={Paper} id="tblLoan">
      <Table sx={{ minWidth: 650 }} aria-label="amortization table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                align="center"
                style={
                  type === "fixed"
                    ? { backgroundColor: "#0288d1" }
                    : type === "variable"
                    ? { backgroundColor: "#ab47bc" }
                    : type === "linearGrowth"
                    ? { backgroundColor: "#388e3c" }
                    : { backgroundColor: "#f44336" }
                }
              >
                <b>{header}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToMap.map(
            ({ period, payment, interest, principal, balance }) => (
              <TableRow
                key={period}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{period}</TableCell>
                <TableCell align="center">
                  {formatter.format(payment)}
                </TableCell>
                <TableCell align="center">
                  {formatter.format(interest)}
                </TableCell>
                <TableCell align="center">
                  {formatter.format(principal)}
                </TableCell>
                <TableCell align="center">
                  {formatter.format(balance)}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AmortizationTable;
