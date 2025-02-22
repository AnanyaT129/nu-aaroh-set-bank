import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@apollo/client';
import { AarohFilter } from '../App';
import { GET_ALL_SETS } from './queries';
import ShowDetails from './ShowDetails';

// Define the type for the response data
export interface Show {
  key: string;
  setLead: string[];
  date: string;
  name: string;
}

interface Set {
  setName: string;
  songs: string[];
  musicStyles: string[];
  instrumentation: string[];
  languages: string[];
  raag: string[];
  mostRecentPerformance: Show;
}

interface Column {
  id: 'setName' | 'songs' | 'musicStyles' | 'instrumentation' | 'languages' | 'raag' | 'mostRecentPerformance';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'setName', label: 'Set Name', minWidth: 100 },
  { id: 'songs', label: 'Songs', minWidth: 100 },
  { id: 'musicStyles', label: 'Music Styles', minWidth: 100 },
  { id: 'instrumentation', label: 'Instrumentation', minWidth: 100 },
  { id: 'languages', label: 'Languages', minWidth: 100 },
  { id: 'raag', label: 'Raag', minWidth: 100 },
  { id: 'mostRecentPerformance', label: 'Most Recent Performance', minWidth: 100 },
];

interface Data {
  getAllSets: Set[];
}

export default function StickyHeadTable(props: {filters: AarohFilter}) {
  const styleFilters = props.filters.styleFilters.length > 0 ? props.filters.styleFilters : null
  const raagFilters = props.filters.raagFilters.length > 0 ? props.filters.raagFilters : null
  const languageFilters = props.filters.languageFilters.length > 0 ? props.filters.languageFilters : null
  const instrumentFilters = props.filters.instrumentFilters.length > 0 ? props.filters.instrumentFilters : null

  const { loading, error, data } = useQuery(GET_ALL_SETS, {
    variables: {raagFilters: raagFilters, styleFilters: styleFilters, languageFilters: languageFilters, instrumentFilters: instrumentFilters},
  });

  console.log('Data from query:', data);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const rows: Set[] = data ? data.getAllSets : []

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.setName}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'mostRecentPerformance') {
                        return (<TableCell key={column.id} align={column.align}>
                          <ShowDetails show={value as Show}></ShowDetails>
                        </TableCell>)
                      } 
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value.toString()}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}