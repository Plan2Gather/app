import { Fragment, useState } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';

interface TimeGridProps {
  data: {
    color: string;
    topBorder: string;
    names: string[];
    period: { start: DateTime; end: DateTime };
  }[][];
  columnLabels: string[];
  rowLabels: string[];
}

const cellWidth = 100;
const cellHeight = 20;

export default function TimeGrid({
  data,
  columnLabels,
  rowLabels,
}: TimeGridProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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
      }}
    >
      {/* Empty cell for the top-left corner */}
      <Box />

      {/* Render column labels */}
      {columnLabels.map((label) => (
        <Typography key={label} align="center">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Typography>
      ))}

      {/* Render data rows with row labels */}
      {data.map((rowData, rowIndex) => (
        <Fragment key={rowLabels[rowIndex]}>
          {/* Render row label */}
          <Box
            sx={{
              height: 20,
              marginTop: '-10px',
            }}
          >
            {rowLabels[rowIndex].match(/:(00|30)\b/) && (
              <Typography align="center">{rowLabels[rowIndex]}</Typography>
            )}
          </Box>

          {/* Render data cells */}
          {rowData.map((cellData, colIndex) => (
            <Fragment>
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={`${rowIndex}-${colIndex}`}
                sx={{
                  width: cellWidth,
                  height: cellHeight,
                  backgroundColor: cellData.color,
                  borderTop: cellData.topBorder,
                  borderBottom: '1px dotted grey',
                  borderLeft: '1px solid black',
                  borderRight: '1px solid black',
                }}
                aria-label={`${columnLabels[colIndex]}, ${rowLabels[rowIndex]}`}
                onClick={handleClick}
              />
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
                <Typography sx={{ p: 2 }}>
                content
                </Typography>
              </Popover>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Box>
  );
}
