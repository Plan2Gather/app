import React, { FC } from 'react';

interface TimeGridProps {
  data: string[][];
}

const TimeGrid: FC<TimeGridProps> = ({ data }) => {
  return (
    <div style={{ overflow: 'auto', display: 'grid', gridTemplateColumns: `repeat(${data[0].length}, 30px)` }}>
      {data.map((rowData, rowIndex) => (
        rowData.map((cellColor, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} style={{ width: '30px', height: '5px', backgroundColor: cellColor }}></div>
        ))
      ))}
    </div>
  );
};

export default TimeGrid;