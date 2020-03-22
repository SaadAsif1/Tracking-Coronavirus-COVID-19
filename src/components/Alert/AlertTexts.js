import React from 'react';
import './Alert.css';

export default function AlertTexts({ data }) {
  return (
    <div className='container'>
      <div>
        <div>Total Cases: {data.cases}</div>
        <div>Totals Death: {data.deaths}</div>
        <div>Totals Recovered: {data.recovered}</div>
      </div>
    </div>
  );
}
