import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useEffect, useState } from 'react';
import useGatheringViewData from '../../pages/gathering-view/gathering-view.store';

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

  const { setCheckedUsers } = useGatheringViewData();

  const updateCheckedUsers = (checked: Record<string, boolean>) => {
    let toShow = Object.entries(checked)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if (toShow.length === 0) {
      toShow = Object.keys(checked);
    }

    setCheckedUsers(toShow);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      const result = {
        ...prev,
        [event.target.name]: event.target.checked,
      };

      updateCheckedUsers(result);

      return result;
    });
  };

  useEffect(() => {
    setCheckedUsers(Object.keys(state));
  }, []);

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
