import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function CountriesBarGraph() {
  const [values, setValues] = useState({
    data: '',
    searchCountries: '',
    graphData: '',
    graphName: ''
  });

  const { data, searchCountries, graphData, graphName } = values;

  useEffect(() => {
    axios
      .get(`https://corona.lmao.ninja/countries/usa`)
      .then(res => {
        const data = res.data;
        const graphName = `${data.country} Total Cases: ${data.cases}`;
        const graphData = [
          { name: 'Today Cases', todayCases: data.todayCases },
          { name: 'Total Deaths', deaths: data.deaths },
          { name: 'Today Deaths', todayDeaths: data.todayDeaths },
          { name: 'Critical People', critical: data.critical }
        ];
        setValues({ ...values, graphData, graphName, data, searchCountries: 'USA' });
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = inputValues => event => {
    setValues({ ...values, [inputValues]: event.target.value });
  };

  const handleSearch = () => {
    axios
      .get(`https://corona.lmao.ninja/countries/${searchCountries}`)
      .then(res => {
        if (typeof res.data === 'string') {
          return setValues({
            ...values,
            graphName: 'Please Select Another Country ',
            graphData: []
          });
        }
        const data = res.data;
        const graphName = `${data.country} Total Cases: ${data.cases}`;
        const graphData = [
          { name: 'Today Cases', todayCases: data.todayCases },
          { name: 'Total Deaths', deaths: data.deaths },
          { name: 'Today Deaths', todayDeaths: data.todayDeaths },
          { name: 'Critical People', critical: data.critical }
        ];
        setValues({ ...values, graphData, graphName, data });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <Search
        placeholder='Countries COVID-19 Graphs'
        onSearch={handleSearch}
        onChange={handleChange('searchCountries')}
        value={searchCountries}
        enterButton
        size='large'
      />

      {data === '' ? null : (
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
                <Bar dataKey='todayCases' stackId='a' fill='#82ca9d' />
                <Bar dataKey='deaths' stackId='a' fill='#000' />
                <Bar dataKey='todayDeaths' stackId='a' fill='blue' />
                <Bar dataKey='critical' stackId='a' fill='orange' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
