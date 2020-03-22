import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default function AlertBarGraph({ data }) {
  const barData = [
    { name: 'Total Deaths', Death: data.deaths },
    { name: 'Total Cases', Cases: data.cases },
    { name: 'Total Recovered', Recovered: data.recovered }
  ];

  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={barData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' height={36} />
        <Bar dataKey='Death' stackId='a' fill='#8884d8' />
        <Bar dataKey='Cases' stackId='a' fill='#82ca9d' />
        <Bar dataKey='Recovered' stackId='a' fill='#000' />
      </BarChart>
    </div>
  );
}
