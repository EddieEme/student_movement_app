import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Table } from 'react-bootstrap';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, CartesianGrid, Legend, Line } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const Chart = () => {


  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState([]);  // State to hold the student list

  useEffect(() => {
    // Fetch JWT token from local storage
    const token = localStorage.getItem('accessToken');
    const apiUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_STATISTICS_ENDPOINT}`;
    // Make the API call
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch school statistics');
        }
        return response.json();
      })
      .then((data) => {
        setStatistics(data);
        setStudentData(data.students_list);  // Set the student list from the API response
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const summaryData = [
    { summaryLabel: 'Total', value: statistics.total_students || 0 },
    { summaryLabel: 'Transfer In', value: statistics.transferred_in || 0 },
    { summaryLabel: 'Transfer Out', value: statistics.transferred_out || 0 },
  ];

  const pieData = [
    { summaryLabel: 'Transfer In', value: statistics.transferred_in || 0 },
    { summaryLabel: 'Transfer Out', value: statistics.transferred_out || 0 },
  ];

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
      </Row>

      <Row className="mb-4 mt-3 px-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Student</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>  {/* Adding S/N dynamically */}
                <td>{student.student_name}</td>
                <td>{student.state_of_origin}</td>
                <td>{student.student_class}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Chart;
