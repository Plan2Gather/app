import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';

import TimePopover from './time-popover/time-popover';

import type { CellData } from '@/app/pages/gathering-view/gathering-view.store';
import type { BoxProps } from '@mui/material/Box';

interface TimeGridProps {
  data: CellData[][];
  columnLabels: string[];
  rowLabels: string[];
  timezone: string;
  mostParticipants: number;
}

const cellWidth = 100;
const cellHeight = 30;

const isBestTime = (cell: CellData, mostParticipants: number) => {
  const numAvailable = cell.names.length;
  return { best: numAvailable > 1 && numAvailable === mostParticipants, numAvailable };
};

export default function TimeGrid({
  data,
  timezone,
  columnLabels,
  rowLabels,
  mostParticipants,
}: TimeGridProps) {
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

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data[0].length + 1}, ${cellWidth}px)`,
        columnGap: 1,
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
            const { best, numAvailable } = isBestTime(cellData, mostParticipants);
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
                  borderTop: rowIndex > 0 ? '1px dotted black' : 0,
                  borderBottom: 0,
                  borderLeft: 0,
                  borderRight: 0,
                  cursor: numAvailable > 0 ? 'pointer' : 'default',
                }}
                aria-label={`${columnLabels[colIndex]}, ${rowLabels[rowIndex]}, ${numAvailable} out of ${cellData.totalParticipants} participants available${best ? ', best time' : ''}`}
                {...(numAvailable > 0
                  ? ({
                      component: 'button',
                      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
                        handleClick(event, rowIndex, colIndex);
                      },
                    } as unknown as Partial<BoxProps>)
                  : {})}
              >
                {best ? <CheckCircleOutlineIcon sx={{ color: 'black' }} /> : null}
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
          <TimePopover
            dateRange={selectedCell.period}
            users={selectedCell.names}
            timezone={timezone}
            bestTime={isBestTime(selectedCell, mostParticipants).best}
          />
        )}
      </Popover>
    </Box>
  );
}
