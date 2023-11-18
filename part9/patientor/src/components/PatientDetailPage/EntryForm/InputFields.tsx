import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

export const TextInput = ({id, label, value, onChange}: 
    {
        id: string, 
        label: string, 
        value: string | undefined, 
        onChange: React.ChangeEventHandler<HTMLInputElement>
    }) => (
    <TextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        sx={{mb: 2}}
        size="small"
        value={value}
        onChange={onChange}
    />
);

export const DateInput = ({label, value, onChange}: 
    {
        label: string, 
        value: string, 
        onChange: (value: string|undefined) => void
    }) => {
    console.log(value);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                sx={{mb: 2}}
                value={dayjs(value)}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onChange={(value: Dayjs|null, context) => onChange(value? value.format('YYYY-MM-DD'): undefined)}
                format="YYYY-MM-DD"
                slotProps={{ textField: { size: 'small' } }}
            />
        </LocalizationProvider>
    );
};

export const today = () => dayjs().format('YYYY-MM-DD');


export const MultiSelectInput = ({label, selected, options, onChange}: 
    {
        label: string, 
        selected: string[], 
        options: string[],
        onChange: (value: string[]|undefined) => void
    }) => {

    const handleChange = (event: SelectChangeEvent<typeof selected>) => {
      const {
        target: { value },
      } = event;
      onChange(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    return (
      <div>
        <FormControl sx={{ mb: 3, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selected}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            size="small"
          >
            {options.map((opt) => (
              <MenuItem
                key={opt}
                value={opt}
              >
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };