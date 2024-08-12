import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, CartesianGrid, Legend, Line } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const summaryData = [
  { summaryLabel: 'Total', value: 78000 },
  { summaryLabel: 'Transfer In', value: 800000 },
  { summaryLabel: 'Transfer Out', value: 150000 },
];

const pieData = [
  { summaryLabel: 'Transfer In', value: 800000 },
  { summaryLabel: 'Transfer Out', value: 150000 },
];

const monthlyData = [
  { name: 'Jan', transferredIn: 20, transferredOut: 15 },
  { name: 'Feb', transferredIn: 25, transferredOut: 20 },
  { name: 'Mar', transferredIn: 30, transferredOut: 25 },
];

const yearlyTrend = [
  { year: '2021', transferredIn: 400, transferredOut: 250 },
  { year: '2022', transferredIn: 150, transferredOut: 50 },
  { year: '2023', transferredIn: 500, transferredOut: 150 },
  { year: '2024', transferredIn: 325, transferredOut: 250 },
];

const SummaryCard = ({ label, value }) => (
  <Card className="shadow-sm bg-primary text-white h-100">
    <Card.Body>
      <Card.Title className="fs-4 fw-medium">{label}</Card.Title>
      <Card.Text className="h3">{value.toLocaleString()}</Card.Text>
    </Card.Body>
  </Card>
);

const ChartCard = ({ children }) => (
  <Card className="shadow-sm h-100">
    <Card.Body>{children}</Card.Body>
  </Card>
);

const Chart = () => {
  return (
    <Container fluid className="chart py-4">
      <Row className="g-4 mb-4">
        {summaryData.map((item, index) => (
          <Col key={index} xs={12} md={4}>
            <SummaryCard label={item.summaryLabel} value={item.value} />
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        <Col xs={12} lg={6}>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="summaryLabel"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
        <Col xs={12} lg={6}>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transferredIn" fill="#8884d8" name="Transferred In" />
                <Bar dataKey="transferredOut" fill="#82ca9d" name="Transferred Out" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} lg={6}>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="transferredIn" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="transferredOut" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
        <Col xs={12} lg={6}>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transferredIn" fill="#8884d8" name="Transferred In" />
                <Bar dataKey="transferredOut" fill="#82ca9d" name="Transferred Out" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Chart;