import React from 'react';
import Alert from './components/Alert/Alert';
import Countries from './components/Countries/Countries';
import States from './components/Us-States/States';
import MapChart from './components/Infected-Map/MapChart';
import TimelineChart from './components/Timeline-Chart/TimelineChart';
import { Tabs } from 'antd';
import { GithubFilled } from '@ant-design/icons';
const { TabPane } = Tabs;

export default function App() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <div className='docRef'>
        All Data Retrieved from NovelCOVID API{' '}
        <a target='_blank' className='apiRef' href='https://github.com/NovelCOVID/API'>
          Github <GithubFilled />
        </a>
      </div>
      <Alert />
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Countries' key='1'>
            <Countries />
          </TabPane>
          <TabPane tab='States' key='2'>
            <States />
          </TabPane>
          <TabPane tab='COVID-19 Timeline' key='3'>
            <TimelineChart />
          </TabPane>
          <TabPane tab='COVID-19 Map Data' key='4'>
            <MapChart />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}