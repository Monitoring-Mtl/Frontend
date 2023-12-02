import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Route } from "@/types/Route";

interface DropdownProps {
  routes: Route[];
  label: string; // Add a label prop
  disabled?: boolean; // Add an optional disabled prop
}

const Dropdown: React.FC<DropdownProps> = ({ routes, label, disabled = false }) => {
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
          {routes.map((route) => (
            <MenuItem key={route.id} value={route.id}>
              {route.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedOption && <p>Selected option: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;
