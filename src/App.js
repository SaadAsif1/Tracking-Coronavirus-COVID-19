import React from 'react';
import Alert from './components/Alert/Alert';
import Countries from './components/Countries/Countries';
import States from './components/Us-States/States';
import MapChart from './components/Infected-Map/MapChart';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default function App() {
  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Alert />
      <div className='card-container'>
        <Tabs type='card'>
          <TabPane tab='Countries' key='1'>
            <Countries />
          </TabPane>
          <TabPane tab='States' key='2'>
            <States />
          </TabPane>
          <TabPane tab='Tab Title 3' key='3'>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab='COVID-19 Map Data' key='4'>
            <MapChart />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
