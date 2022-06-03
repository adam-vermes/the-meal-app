import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SetStateAction, useEffect, useState } from 'react';
import { Meal } from './App';

interface TableProps {
  rowData: Meal[]
}

interface RowProps {
  row: Meal
}

function Row({ row }: RowProps) {
  const {
    strMeal,
    strCategory,
    idMeal,
    strMealThumb,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
  } = row;

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width="10%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell width="20%" align="center">
          <img
            width="80"
            height="80"
            src={strMealThumb}
            srcSet={strMealThumb}
            alt={strMeal}
            loading="lazy"
          />
        </TableCell>
        <TableCell
          align="center"
          width="70%"
        >
          {strMeal}

        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, padding: 0 }}
          colSpan={6}
          align="center"
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              {strInstructions && strCategory && strIngredient1
                ? (
                  <>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Instructions</TableCell>
                          <TableCell>Ingredients</TableCell>
                          <TableCell>Category</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key={idMeal}>
                          <TableCell>{strInstructions}</TableCell>
                          <TableCell>
                            {`${strIngredient1}, 
                              ${strIngredient2}, 
                              ${strIngredient3}`}
                          </TableCell>
                          <TableCell>{strCategory}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </>
                ) : 'No data available for categories / ingredients.' }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable({ rowData }: TableProps) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);

  useEffect(() => {
    setPage(0);
  }, [rowData.length]);

  const handleChangePage = (
    event: unknown,
    newPage: SetStateAction<number>,
  ): void => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ border: '1px solid #F06543' }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">
                <Typography variant="h6" gutterBottom component="div">
                  Image
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="h6" gutterBottom component="div">
                  Name
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ).map((row: Meal) => (
              <Row
                key={row.idMeal}
                row={row}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={rowData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={rowData?.length <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </Paper>
  );
}
