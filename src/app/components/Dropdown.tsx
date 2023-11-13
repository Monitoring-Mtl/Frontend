import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface DropdownProps {
  options: string[];
  label: string; // Add a label prop
  disabled?: boolean; // Add an optional disabled prop
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setSelectedOption(event.target.value as string);
  };

  return (
    <div className="dropdown">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          label={label}
          labelId="dropdown-label"
          value={selectedOption}
          onChange={handleSelectChange}
          disabled={disabled}
        >
          <MenuItem value="" disabled>
            Select an option
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedOption && <p>Selected option: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;
