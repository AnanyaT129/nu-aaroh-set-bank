import React from 'react';
import StickyHeadTable from './components/DataTable';
import { Typography } from '@mui/material';
import AllFilters from './components/AllFilters';

export type AarohFilter = {
  styleFilters: string[]
  raagFilters: string[]
  languageFilters: string[]
  instrumentFilters: string[]
}

const App: React.FC = () => {
  const [filters, setFilters] = React.useState<AarohFilter>({styleFilters:[], raagFilters:[], languageFilters:[], instrumentFilters: []});

  console.log(filters)
  return <div>
    <Typography variant='h1'>NU Aaroh Set Bank</Typography>
    <AllFilters filter={filters} setFilter={setFilters}></AllFilters>
    <StickyHeadTable filters={filters}></StickyHeadTable>
  </div>
};

export default App;
