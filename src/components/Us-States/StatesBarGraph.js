import React, { useState, useEffect } from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from 'recharts';
import { Input } from 'antd';
const { Search } = Input;

export default function StatesBarGraph({ data }) {
  const [values, setValues] = useState({
    searchStates: '',
    graphData: '',
    graphName: '',
    checkData: ''
  });

  const { searchStates, graphName, graphData, checkData } = values;

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if ('California'.toLocaleLowerCase() === data[i].state.toLocaleLowerCase()) {
        const graphName = `${data[i].state} Total Cases: ${data[i].cases}`;
        const graphData = [
          { name: 'Today Cases', TodayCases: data[i].todayCases },
          { name: 'Total Deaths', Deaths: data[i].deaths },
          { name: 'Today Deaths', TodayDeaths: data[i].todayDeaths },
          { name: 'Recovered People', Recovered: data[i].recovered }
        ];
        setValues({
          ...values,
          graphData,
          graphName,
          checkData: data[i],
          searchStates: 'California'
        });
      }
    }
  }, []);

  const handleChange = inputValues => event => {
    setValues({ ...values, [inputValues]: event.target.value });
  };

  const handleSearch = () => {
    for (let i = 0; i < data.length; i++) {
      if (searchStates.toLocaleLowerCase() === data[i].state.toLocaleLowerCase()) {
        const graphName = `${data[i].state} Total Cases: ${data[i].cases}`;
        const graphData = [
          { name: 'Today Cases', TodayCases: data[i].todayCases },
          { name: 'Total Deaths', Deaths: data[i].deaths },
          { name: 'Today Deaths', TodayDeaths: data[i].todayDeaths },
          { name: 'Recovered People', Recovered: data[i].recovered }
        ];
        setValues({ ...values, graphData, graphName, checkData: data[i] });
      }
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Search
        placeholder='Countries COVID-19 Graphs'
        onSearch={handleSearch}
        onChange={handleChange('searchStates')}
        value={searchStates}
        enterButton
        size='large'
      />

      {checkData === '' ? null : (
        <div>
          <div style={{ textAlign: 'center' }}>
            <h2>{graphName}</h2>
          </div>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={graphData}
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
                <Legend />
                <Bar dataKey='TodayCases' stackId='a' fill='#82ca9d' />
                <Bar dataKey='Deaths' stackId='a' fill='#000' />
                <Bar dataKey='TodayDeaths' stackId='a' fill='blue' />
                <Bar dataKey='Recovered' stackId='a' fill='pink' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
