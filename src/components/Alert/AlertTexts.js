import React from 'react';

export default function AlertTexts({ data }) {
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  return (
    <div>
      {data !== '' && (
        <div className='containerText'>
          <div>Total Cases: {formatNumber(data.cases)}</div>
          <div>Total Death: {formatNumber(data.deaths)}</div>
          <div>Total Recovered: {formatNumber(data.recovered)}</div>
        </div>
      )}
    </div>
  );
}
