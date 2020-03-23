import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Card } from 'antd';
import AlertTexts from './AlertTexts';
import AlertBarGraph from './AlertBarGraph';
import './Alert.css';

const { Search } = Input;

export default function Alert() {
  const [values, setValues] = useState({
    switchState: true,
    data: '',
    countrieSearch: { show: false, data: null },
    displayCard: false
  });

  const { switchState, data, countrieSearch, displayCard } = values;

  useEffect(() => {
    axios
      .get('https://corona.lmao.ninja/all')
      .then(res => {
        setValues({ ...values, data: res.data });
      })
      .catch(err => console.log(err));
  }, []);

  const handleClick = () => {
    if (switchState === true) {
      setValues({ ...values, switchState: false });
    } else {
      setValues({ ...values, switchState: true });
    }
  };

  const closeCard = () => {
    setValues({
      ...values,
      countrieSearch: { show: false, data: null },
      displayCard: false
    });
  };

  const handleSearch = value => {
    if ('' === value) {
      return setValues({
        ...values,
        countrieSearch: { show: false, data: 'Please select any Country' }
      });
    }
    setValues({
      ...values,
      countrieSearch: { show: false, data: '' },
      displayCard: false
    });
    axios
      .get(`https://corona.lmao.ninja/countries/${value}`)
      .then(res => {
        if (typeof res.data === 'string') {
          return setValues({
            ...values,
            countrieSearch: { show: false, data: res.data },
            displayCard: false
          });
        }
        setValues({
          ...values,
          countrieSearch: { show: true, data: res.data },
          displayCard: true
        });
      })
      .catch(err => {
        setValues({
          ...values,
          countrieSearch: { show: false, data: 'Please Choose a Valid Country' },
          displayCard: false
        });
      });
  };

  return (
    <div className='alertContainer'>
      <div className='buttonContainer'>
        <Button
          shape='round'
          className='button'
          onClick={handleClick}
          size='large'
          type='primary'
          block
        >
          <h3 className='buttonText'>
            {switchState
              ? 'View COVID-19 Global graph data'
              : 'View COVID-19 Global Text Data'}
          </h3>
        </Button>
        <div className='search'>
          <Search
            placeholder='Search Countries COVID-19'
            onSearch={handleSearch}
            enterButton='Search'
            size='large'
          />
        </div>
      </div>
      {switchState ? <AlertTexts data={data} /> : <AlertBarGraph data={data} />}
      <div>
        {countrieSearch.data === '' ? (
          <div className='errorsSearch'>Loading...</div>
        ) : countrieSearch.show ? (
          displayCard ? (
            <div className='cardStyle'>
              <Card title={` ${countrieSearch.data.country}`} bordered={true}>
                <p>Comfirmed: {countrieSearch.data.cases} People</p>
                <p>Today Cases {countrieSearch.data.todayCases} People</p>
                <p>Deaths {countrieSearch.data.deaths} People</p>
                <p>Today Deaths {countrieSearch.data.todayDeaths} People</p>
                <p>People Recovered {countrieSearch.data.recovered} People</p>
                <p>Critival condition: {countrieSearch.data.critical} People</p>
                <p>Actvie: {countrieSearch.data.active} People</p>
                <p>
                  Case Per One Million: {countrieSearch.data.casesPerOneMillion} /
                  1,000,000
                </p>
                <Button onClick={closeCard} size='small' type='danger'>
                  Close
                </Button>
              </Card>
            </div>
          ) : null
        ) : (
          <div className='errorsSearch'>{countrieSearch.data}</div>
        )}
      </div>
    </div>
  );
}
