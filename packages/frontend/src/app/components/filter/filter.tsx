import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { GatheringData } from '@plan2gather/backend/types';

import React, { useState } from 'react';

interface FilterProps {
  data: GatheringData;
}

export default function Filter({ data }: FilterProps) {
  const userLabels = Object.keys(data.availability);
  // given a string list of keys
  // return a record of keys to booleans
  const initialState = userLabels.reduce<Record<string, boolean>>(
    (acc, label) => {
      acc[label] = false;
      return acc;
    },
    {}
  );

  const [state, setState] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  // Function to get the list of checked checkboxes
  const getCheckedAttendees = () => {
    return userLabels.filter((label) => state[label]);
  };

  return (
    <div>
      <FormGroup>
        {userLabels.map((userLabel) => (
          <FormControlLabel
            key={userLabel}
            control={
              <Checkbox
                checked={state[userLabel]}
                onChange={handleChange}
                name={userLabel}
              />
            }
            label={userLabel}
          />
        ))}
      </FormGroup>
      <div>
        <strong>Checked Attendees:</strong>
        <ul>
          {getCheckedAttendees().map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
