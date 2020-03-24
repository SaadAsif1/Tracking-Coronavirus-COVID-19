import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Input } from 'antd';
const { Search } = Input;

export default function TimelineChart() {
  const [values, setValues] = useState({
    data: '',
    timelineSearch: 'USA',
    timelineName: ''
  });

  const { data, timelineSearch, timelineName } = values;

  useEffect(() => {
    axios
      .get('https://corona.lmao.ninja/historical/usa')
      .then(res => {
        const dataDates = Object.keys(res.data.timeline.cases);
        const cases = Object.values(res.data.timeline.cases);
        const deaths = Object.values(res.data.timeline.deaths);
        const recovered = Object.values(res.data.timeline.recovered);

        let timeLineData = [];

        for (let i = 0; i < dataDates.length; i++) {
          let obj = {
            name: dataDates[i],
            Cases: cases[i],
            Deaths: deaths[i],
            Recovered: recovered[i]
          };
          timeLineData.push(obj);
        }
        setValues({
          ...values,
          data: timeLineData,
          timelineName: res.data.standardizedCountryName
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = inputValues => event => {
    setValues({ ...values, [inputValues]: event.target.value });
  };

  const handleSearch = () => {
    axios
      .get(`https://corona.lmao.ninja/historical/${timelineSearch}`)
      .then(res => {
        const dataDates = Object.keys(res.data.timeline.cases);
        const cases = Object.values(res.data.timeline.cases);
        const deaths = Object.values(res.data.timeline.deaths);
        const recovered = Object.values(res.data.timeline.recovered);

        let timeLineData = [];

        for (let i = 0; i < dataDates.length; i++) {
          let obj = {
            name: dataDates[i],
            Cases: cases[i],
            Deaths: deaths[i],
            Recovered: recovered[i]
          };
          timeLineData.push(obj);
        }

        setValues({
          ...values,
          data: timeLineData,
          timelineName: res.data.standardizedCountryName
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Search
        placeholder='Countries COVID-19 Timeline Graphs'
        onSearch={handleSearch}
        onChange={handleChange('timelineSearch')}
        value={timelineSearch}
        enterButton
        size='large'
      />
      {data === '' ? (
        <div>Loading...</div>
      ) : (
        <div style={{ width: '100%', height: '400px', paddingBottom: '3rem' }}>
          <div style={{ textAlign: 'center', margin: '1rem' }}>
            <h2 style={{ textTransform: 'capitalize' }}>
              {timelineName} COVID-19 Timeline
            </h2>
          </div>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 5,
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
              <Line dataKey='Cases' type='monotone' stroke='#8884d8' />
              <Line dataKey='Deaths' type='monotone' stroke='#82ca9d' />
              <Line dataKey='Recovered' type='monotone' stroke='#000' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
