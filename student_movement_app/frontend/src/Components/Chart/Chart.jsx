import React from 'react';
import './Chart.css';
import { Card, Row, Col, Button, Container } from 'react-bootstrap'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css'

const summaryData = [
  {
    summaryLabel: 'Total',
    value: 78000,
  },
  {
    summaryLabel: 'Transfer In',
    value: 800000,
  },
  {
    summaryLabel: 'Transfer Out',
    value: 150000,
  },
];
const pieData = [
  {
    summaryLabel: 'Transfer In',
    value: 800000,
  },
  {
    summaryLabel: 'Transfer Out',
    value: 150000,
  }];

const yearlyData = [
  { name: 'Jan', transferredIn: 20, transferredOut: 15 },
  { name: 'Feb', transferredIn: 25, transferredOut: 20 },
  { name: 'Mar', transferredIn: 30, transferredOut: 25 },
];

const Chart = () => {
  return (
    <div className='chart '>
      <Row className='m-4 '>
        {summaryData.map((item, index) => (
          <Col key={index} md={4} className='mb-3'>
            <Card className='shadow-lg bg-primary'>
              <Card.Body>
                <Card.Title className='fs-2 fw-medium'>{item.summaryLabel}</Card.Title>
                <Card.Text className='h2'>{item.value.toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className='m-4'>
        <Col className='flex-1'>
           <Card className='p-4'>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={pieData}  dataKey="value"
                  nameKey="summaryLabel"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                label />
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </Card>
        </Col>
        <Col className='flex-1'>
           <Card className='p-4'>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={yearlyData}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transferredIn" fill="#8884d8" name="Transferred In" />
                <Bar dataKey="transferredOut" fill="#82ca9d" name="Transferred Out" />
              </BarChart>
          </ResponsiveContainer>
        </Card>
        </Col>


      </Row>
    </div>
  );
};

export default Chart;