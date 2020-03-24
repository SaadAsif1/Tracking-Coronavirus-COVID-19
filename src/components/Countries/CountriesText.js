import React from 'react';
import { Card } from 'antd';

export default function Contries({ contriesFilter, data }) {
  let dataArray;

  if (data !== '') {
    dataArray = data.filter(users => {
      return users.country.toLowerCase().indexOf(contriesFilter.toLowerCase()) !== -1;
    });
  }

  return (
    <div>
      {data === '' ? (
        <div>Loading ...</div>
      ) : (
        dataArray.map((virusData, index) => (
          <div key={index}>
            <Card
              style={{ backgroundColor: '#f1f1f1', marginBottom: '1rem' }}
              title={`${virusData.country}`}
            >
              <p>Comfirmed: {virusData.cases} People</p>
              <p>Today Cases {virusData.todayCases} People</p>
              <p>Deaths {virusData.deaths} People</p>
              <p>Today Deaths {virusData.todayDeaths} People</p>
              <p>People Recovered {virusData.recovered} People</p>
              <p>Critival condition: {virusData.critical} People</p>
              <p>Active: {virusData.active} People</p>
              <p>Case Per One Million: {virusData.casesPerOneMillion} / 1,000,000</p>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
