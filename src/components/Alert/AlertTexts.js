import React from 'react';

export default function AlertTexts({ data }) {
  return (
    <div className='containerText'>
      <div>Total Cases: {data.cases}</div>
      <div>Total Death: {data.deaths}</div>
      <div>Total Recovered: {data.recovered}</div>
    </div>
  );
}
