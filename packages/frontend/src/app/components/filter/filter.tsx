import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';

interface FilterProps {
  userLabels: string[];
}

export default function Filter({ userLabels }: FilterProps) {
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

  return (
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
  );
}
