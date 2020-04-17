import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd';
import CountriesText from './CountriesText';
import CountriesBarGraph from './CountriesBarGraph';
import './Countries.css';

export default function Countries() {
  const [values, setValues] = useState({
    switchStates: true,
    contriesFilter: '',
    data: '',
  });

  const { switchStates, contriesFilter, data } = values;

  useEffect(() => {
    axios
      .get('https://corona.lmao.ninja/v2/countries')
      .then((res) => {
        setValues({ ...values, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // filter search
  const handleContrieFilter = (e) => {
    setValues({ ...values, contriesFilter: e.target.value });
  };

  // Toggle
  const handleToggle = () => {
    if (switchStates === true) {
      setValues({ ...values, switchStates: false });
    } else {
      setValues({ ...values, switchStates: true });
    }
  };

  return (
    <div>
      <div className='countriesNav'>
        {switchStates ? (
          <h2>Covid-19 Country Text Data</h2>
        ) : (
          <h2>Covid-19 Country Graph Data</h2>
        )}
        <Button className='button' onClick={handleToggle} type='primary'>
          {switchStates ? 'View Graph Data' : 'View Text Data'}
        </Button>
        {switchStates ? (
          <div className='contriesInput'>
            <Input placeholder='Filter by Countries' onChange={handleContrieFilter} />
          </div>
        ) : null}
      </div>

      {switchStates ? (
        <CountriesText contriesFilter={contriesFilter} data={data} />
      ) : (
        <CountriesBarGraph />
      )}
    </div>
  );
}
