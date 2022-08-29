import "./App.css";
import Inputs from "./components/Inputs";
import AmortizationTable from "./components/AmortizationTable";
import Box from "@mui/material/Box";
import Logo from "./components/Logo";
import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import { useSelector } from "react-redux";
import TableToExcel from "@linways/table-to-excel";

function App() {
  const type = useSelector((state) => state.table.type);
  const loan = useSelector((state) => state.table.loan);
  const nper = useSelector((state) => state.table.nper);
  const rate = useSelector((state) => state.table.rate);
  return (
    <Box m={{ xs: 2, sm: 3, md: 4, lg: 5 }} mt={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Inputs />
        <Box mt={2}>
          <Logo />
        </Box>
      </Box>
      {loan && nper && rate && (
        <Box
          mt={{ xs: 2, sm: 3, md: 4, lg: 5 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color={
              type === "fixed"
                ? "primary"
                : type === "variable"
                ? "secondary"
                : type === "linearGrowth"
                ? "success"
                : "error"
            }
            startIcon={
              <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </SvgIcon>
            }
            onClick={() => {
              TableToExcel.convert(document.getElementById("tblLoan"), {
                name: "Tabla_de_Amortización.xlsx",
                sheet: {
                  name: "Sheet 1",
                },
              });
            }}
          >
            Download
          </Button>
        </Box>
      )}
      <Box mt={{ xs: 2, sm: 3, md: 4, lg: 5 }}>
        <AmortizationTable />
      </Box>
    </Box>
  );
}

export default App;
