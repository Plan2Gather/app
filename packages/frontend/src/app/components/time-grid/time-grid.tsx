import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TimeGridProps {
  data: {
    color: string;
    names: string[];
    period: { start: string; end: string };
  }[][];
  columnLabels: string[];
  rowLabels: string[];
}

const cellWidth = 100;
const cellHeight = 20;

function TimeGrid({ data, columnLabels, rowLabels }: TimeGridProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clickedCell, setClickedCell] = useState<{
    rowIndex: number;
    colIndex: number;
  } | null>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setClickedCell({ rowIndex, colIndex });
  };

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
          {label}
        </Typography>
      ))}

      {/* Render data rows with row labels */}
      {data.map((rowData, rowIndex) => (
        <Fragment key={rowLabels[rowIndex]}>
          {/* Render row label */}
          <Box
            sx={{
              height: cellHeight,
            }}
          >
            <Typography align="center">{rowLabels[rowIndex]}</Typography>
          </Box>

          {/* Render data cells */}
          {rowData.map((cellData, colIndex) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`${rowIndex}-${colIndex}`}
              sx={{
                width: cellWidth,
                height: cellHeight,
                backgroundColor: cellData.color,
                borderTop: '1px dotted black',
                borderBottom: '1px dotted black',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </Fragment>
      ))}
    </Box>
  );
}

export default TimeGrid;
