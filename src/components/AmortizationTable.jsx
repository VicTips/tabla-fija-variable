import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function AmortizationTable({ rows }) {
  let formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="amortization table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Periodo</b>
            </TableCell>
            <TableCell align="center">
              <b>Cuota</b>
            </TableCell>
            <TableCell align="center">
              <b>Intereses</b>
            </TableCell>
            <TableCell align="center">
              <b>Amortización</b>
            </TableCell>
            <TableCell align="center">
              <b>Saldo</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ period, payment, interest, principal, balance }) => (
            <TableRow
              key={period}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{period}</TableCell>
              <TableCell align="center">{formatter.format(payment)}</TableCell>
              <TableCell align="center">{formatter.format(interest)}</TableCell>
              <TableCell align="center">
                {formatter.format(principal)}
              </TableCell>
              <TableCell align="center">{formatter.format(balance)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AmortizationTable;
