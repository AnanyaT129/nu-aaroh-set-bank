import * as React from 'react';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MultipleSelectCheckmarks from './Filter';
import { AarohFilter } from '../App';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
import { GET_INSTRUMENTS, GET_LANGUAGES, GET_RAAGS, GET_STYLES } from './queries';

type filterProps = {
  filter: AarohFilter
  setFilter: React.Dispatch<React.SetStateAction<AarohFilter>>
}

const Item = styled(Container)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function AllFilters(props: filterProps) {
  const [styleFilter, setStyleFilter] = React.useState<string[]>([]);
  const [raagFilter, setRaagFilter] = React.useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = React.useState<string[]>([]);
  const [instrumentFilter, setInstrumentFilter] = React.useState<string[]>([]);

  const handleFilterUpdate = () => {
    props.setFilter({styleFilters:styleFilter, raagFilters:raagFilter, languageFilters:languageFilter, instrumentFilters: instrumentFilter})
  }

  const { loading: loadingRaag, error: errorRaag, data: dataRaag } = useQuery(GET_RAAGS);
  const { loading: loadingStyles, error: errorStyles, data: dataStyles } = useQuery(GET_STYLES);
  const { loading: loadingLanguage, error: errorLanguage, data: dataLanguage } = useQuery(GET_LANGUAGES);
  const { loading: loadingInstrument, error: errorInstrument, data: dataInstrument } = useQuery(GET_INSTRUMENTS);

  if (loadingRaag || loadingStyles || loadingLanguage || loadingInstrument) return <div>Loading...</div>;
  if (errorRaag || errorStyles || errorLanguage || errorInstrument) return <div>Error loading filters - refresh</div>;

  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item><MultipleSelectCheckmarks
          filterItems={dataStyles.getAllStyles}
          label={"Music Style"}
          filterItem={styleFilter}
          setFilterItem={setStyleFilter}>
        </MultipleSelectCheckmarks></Item>
        <Item><MultipleSelectCheckmarks
          filterItems={dataRaag.getAllRaags ? dataRaag.getAllRaags : []}
          label={"Raag"}
          filterItem={raagFilter}
          setFilterItem={setRaagFilter}>
        </MultipleSelectCheckmarks></Item>
        <Item><MultipleSelectCheckmarks
          filterItems={dataLanguage.getAllLanguages}
          label={"Language"}
          filterItem={languageFilter}
          setFilterItem={setLanguageFilter}>
        </MultipleSelectCheckmarks></Item>
        <Item><MultipleSelectCheckmarks
          filterItems={dataInstrument.getAllInstruments}
          label={"Instrument"}
          filterItem={instrumentFilter}
          setFilterItem={setInstrumentFilter}>
        </MultipleSelectCheckmarks></Item>
        <Item><Button onClick={handleFilterUpdate}>Submit</Button></Item>
      </Stack>
    </div>
  );
}
