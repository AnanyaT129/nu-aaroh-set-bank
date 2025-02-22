import React from 'react';
import StickyHeadTable from './components/DataTable';
import { Box, Container, Typography } from '@mui/material';
import AllFilters from './components/AllFilters';
import LoginForm from './components/Login';

export type AarohFilter = {
  styleFilters: string[]
  raagFilters: string[]
  languageFilters: string[]
  instrumentFilters: string[]
}

const App: React.FC = () => {
  const [filters, setFilters] = React.useState<AarohFilter>({styleFilters:[], raagFilters:[], languageFilters:[], instrumentFilters: []});
  const [auth, setAuth] = React.useState<boolean>(false)

  const handleLoginSubmit = (username: string, password: string) => {
    const user = process.env.REACT_APP_USERNAME;
    const pass = process.env.REACT_APP_PASSWORD;

    console.log(user)
    console.log(pass)
    if (username === user && password === pass) {
      setAuth(true)
    }
  };

  return <Box margin={"5%"}>
    <Typography variant='h1'>NU Aaroh Set Bank</Typography>
    {auth ? (<div>
        <AllFilters filter={filters} setFilter={setFilters}></AllFilters>
        <StickyHeadTable filters={filters}></StickyHeadTable>
      </div>) : <LoginForm onSubmit={handleLoginSubmit}></LoginForm>}
  </Box>
};

export default App;
