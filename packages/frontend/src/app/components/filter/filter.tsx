import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useCallback, useEffect, useState } from 'react';

import useGatheringViewData from '../../pages/gathering-view/gathering-view.store';

interface FilterProps {
  userLabels: string[];
}

export default function Filter({ userLabels }: FilterProps) {
  const initialState = userLabels.reduce<Record<string, boolean>>((acc, label) => {
    acc[label] = false;
    return acc;
  }, {});
  const [state, setState] = useState(initialState);

  const { setCheckedUsers } = useGatheringViewData();

  const updateCheckedUsers = useCallback(
    (checked: Record<string, boolean>) => {
      setCheckedUsers(
        Object.entries(checked)
          .filter(([, value]) => value)
          .map(([key]) => key)
      );
    },
    [setCheckedUsers]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => {
        const result = {
          ...prev,
          [event.target.name]: event.target.checked,
        };

        updateCheckedUsers(result);

        return result;
      });
    },
    [updateCheckedUsers]
  );

  useEffect(() => {
    updateCheckedUsers(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCheckedUsers]);

  return (
    <FormGroup>
      {userLabels.map((userLabel) => (
        <FormControlLabel
          key={userLabel}
          control={<Checkbox checked={state[userLabel]} onChange={handleChange} name={userLabel} />}
          label={userLabel}
        />
      ))}
    </FormGroup>
  );
}
