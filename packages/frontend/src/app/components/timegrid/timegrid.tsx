import { useState } from 'react';
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
const cellHeight = 10;

function TimeGrid({ data, columnLabels, rowLabels }: TimeGridProps) {
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
        position: 'relative',
        overflow: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${data[0].length + 1}, ${cellWidth}px)`,
        border: 'none',
      }}
    >
      {/* Empty cell for the top-left corner */}
      <Box
        sx={{
          width: '30px',
          height: '20px',
          backgroundColor: 'transparent',
          textAlign: 'center',
          lineHeight: '20px',
        }}
      />

      {/* Render column labels */}
      {columnLabels.map((label) => (
        <Box
          key={label}
          sx={{
            width: cellWidth,
            height: '20px',
            backgroundColor: 'transparent',
            textAlign: 'center',
            lineHeight: '20px',
          }}
        >
          <Typography>{label}</Typography>
        </Box>
      ))}

      {/* Render data rows with row labels */}
      {data.map((rowData, rowIndex) => (
        <>
          {/* Render row label */}
          <Box
            key={rowLabels[rowIndex]}
            sx={{
              width: '30px',
              height: cellHeight,
              backgroundColor: 'transparent',
              textAlign: 'center',
              lineHeight: '10px',
            }}
          >
            <Typography>{rowLabels[rowIndex]}</Typography>
          </Box>

          {/* Render data cells */}
          {rowData.map((cellData, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              sx={{
                position: 'relative',
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
        </>
      ))}
    </Box>
  );
}

export default TimeGrid;
