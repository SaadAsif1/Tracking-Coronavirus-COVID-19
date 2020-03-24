import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd';
import StatesText from './StatesText';
import StatesBarGraphs from './StatesBarGraph';
import './States.css';

export default function States() {
  const [values, setValues] = useState({
    switchStates: true,
    stateFilter: '',
    data: ''
  });

  const { switchStates, stateFilter, data } = values;

  useEffect(() => {
    axios
      .get('https://corona.lmao.ninja/states')
      .then(res => {
        console.log(res.data);
        setValues({ ...values, data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // filter search
  const handleStateFileter = e => {
    setValues({ ...values, stateFilter: e.target.value });
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
      <div className='stateNav'>
        {switchStates ? (
          <h2>Covid-19 State Text Data</h2>
        ) : (
          <h2>Covid-19 State Graph Data</h2>
        )}
        <Button className='button' onClick={handleToggle} type='primary'>
          {switchStates ? 'View Graph Data' : 'View Text Data'}
        </Button>
        {switchStates ? (
          <div className='stateInput'>
            <Input placeholder='Filter by States' onChange={handleStateFileter} />
          </div>
        ) : null}
      </div>

      {switchStates ? (
        <StatesText stateFilter={stateFilter} data={data} />
      ) : (
        <StatesBarGraphs data={data} />
      )}
    </div>
  );
}
