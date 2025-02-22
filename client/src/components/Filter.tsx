import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

type filterProps = {
  filterItems: string[]
  label: string
  filterItem: string[]
  setFilterItem: React.Dispatch<React.SetStateAction<string[]>>
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

export default function MultipleSelectCheckmarks(props: filterProps) {
  const handleChange = (event: SelectChangeEvent<typeof props.filterItem>) => {
    const {
      target: { value },
    } = event;
    props.setFilterItem(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={props.filterItem}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.filterItems.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={props.filterItem.includes(item)} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
