import { useState } from 'react';

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
    <div
      style={{
        position: 'relative',
        overflow: 'auto',
        display: 'grid',
        gridTemplateColumns: `repeat(${data[0].length + 1}, ${cellWidth}px)`,
        border: 'none',
      }}
    >
      {/* Empty cell for the top-left corner */}
      <div
        style={{
          width: '30px',
          height: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          textAlign: 'center',
          lineHeight: '20px',
        }}
      />

      {/* Render column labels */}
      {columnLabels.map((label) => (
        <div
          key={label}
          style={{
            width: cellWidth,
            height: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            textAlign: 'center',
            lineHeight: '20px',
          }}
        >
          {label}
        </div>
      ))}

      {/* Render data rows with row labels */}
      {data.map((rowData, rowIndex) => (
        // Render cells for each row
        <>
          {/* Render row label */}
          <div
            key={`row-label-${rowIndex}`}
            style={{
              width: '30px',
              height: cellHeight,
              backgroundColor: 'rgba(0, 0, 0, 0.0)',
              textAlign: 'center',
              lineHeight: '10px',
            }}
          >
            {rowLabels[rowIndex]}
          </div>

          {/* Render data cells */}
          {rowData.map((cellData, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                position: 'relative',
                width: cellWidth,
                height: cellHeight,
                backgroundColor: cellData.color,
                borderTop: '1x dotted black',
                borderBottom: '1px dotted black',
                borderLeft: '1px solid black',
                borderRight: '1px solid black',
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </>
      ))}
    </div>
  );
}

export default TimeGrid;
