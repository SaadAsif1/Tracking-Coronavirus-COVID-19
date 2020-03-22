import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch } from 'antd';
import AlertTexts from './AlertTexts';
import AlertBarGraph from './AlertBarGraph';

export default function Alert() {
  const [values, setValues] = useState({
    switchState: true,
    data: ''
  });

  const { switchState, data } = values;

  useEffect(() => {
    axios
      .get('https://corona.lmao.ninja/all')
      .then(res => {
        setValues({ ...values, data: res.data });
      })
      .catch(err => console.log(err));
  }, []);

  function onChange(checked) {
    setValues({ ...values, switchState: checked });
  }
  return (
    <div>
      <Switch defaultChecked onChange={onChange} />
      {switchState ? <AlertTexts data={data} /> : <AlertBarGraph data={data} />}
    </div>
  );
}
