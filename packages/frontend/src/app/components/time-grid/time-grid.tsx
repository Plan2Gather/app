import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';

import PossibleTime from './time-popover/time-popover';

import type { BoxProps } from '@mui/material/Box';
import type { DateTime } from 'luxon';

export interface CellData {
  totalParticipants: number;
  names: string[];
  period: { start: DateTime; end: DateTime };
}

interface TimeGridProps {
  data: CellData[][];
  columnLabels: string[];
  rowLabels: string[];
  timezone: string;
}

const cellWidth = 100;
const cellHeight = 30;

export default function TimeGrid({ data, columnLabels, rowLabels, timezone }: TimeGridProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellData | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const selectedCellData = data[rowIndex][colIndex];
    setSelectedCell(selectedCellData);

    if (selectedCellData.names.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Algorithm to find the best time, aka slots with the most participants. Return the number of participants.
  const mostParticipants = data.reduce(
    (max, row) =>
      Math.max(
        max,
        row.reduce((maxInRow, cell) => Math.max(maxInRow, cell.names.length), 0),
        0
      ),
    0
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data[0].length + 1}, ${cellWidth}px)`,
      }}
    >
      {/* Empty cell for the top-left corner */}
      <Box />

      {/* Render column labels */}
      {columnLabels.map((label) => (
        <Typography key={label} align="center" variant="button">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Typography>
      ))}

      {/* Render data rows with row labels */}
      {data.map((rowData, rowIndex) => (
        <Fragment key={rowLabels[rowIndex]}>
          {/* Render row label */}
          <Box
            sx={{
              pr: 1,
              marginTop: '-10px',
            }}
          >
            {rowLabels[rowIndex].match(/:(00|30)\b/) != null && (
              <Typography align="right" variant="body2">
                {rowLabels[rowIndex]}
              </Typography>
            )}
          </Box>

          {/* Render data cells */}
          {rowData.map((cellData, colIndex) => {
            const numAvailable = cellData.names.length;
            const isBestTime = numAvailable > 0 && numAvailable === mostParticipants;
            return (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={`${rowIndex}-${colIndex}`}
                sx={{
                  width: cellWidth,
                  height: cellHeight,
                  backgroundColor:
                    numAvailable > 0
                      ? `rgba(0, ${100 + 155 * (cellData.names.length / cellData.totalParticipants)}, 0, 1)`
                      : '#cccccc',
                  borderTop: '1px dotted black',
                  borderBottom: '1px dotted gray',
                  borderLeft: '1px solid black',
                  borderRight: '1px solid black',
                }}
                aria-label={`${columnLabels[colIndex]}, ${rowLabels[rowIndex]}, ${numAvailable} out of ${cellData.totalParticipants} participants available${isBestTime ? ', best time' : ''}`}
                {...(numAvailable > 0
                  ? ({
                      component: 'button',
                      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                        handleClick(event, rowIndex, colIndex);
                      },
                    } as unknown as Partial<BoxProps>)
                  : {})}
              >
                {isBestTime ? <CheckCircleOutlineIcon sx={{ color: 'black' }} /> : null}
              </Box>
            );
          })}
        </Fragment>
      ))}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {selectedCell != null && (
          <PossibleTime
            dateRange={{
              start: selectedCell.period.start.toISO()!,
              end: selectedCell.period.end.toISO()!,
            }}
            users={selectedCell.names}
            timezone={timezone}
          />
        )}
      </Popover>
    </Box>
  );
}
