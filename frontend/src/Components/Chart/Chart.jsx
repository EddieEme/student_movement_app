import React, { useState } from 'react';
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

// Static mock data for demonstration purposes
const mockStatistics = {
  total_students: 150,
  transferred_in: 50,
  transferred_out: 25,
  students_list: [
    { student_name: 'John Doe', state_of_origin: 'Lagos', student_class: 'SS1' },
    { student_name: 'Jane Smith', state_of_origin: 'Abuja', student_class: 'SS2' },
    { student_name: 'Michael Johnson', state_of_origin: 'Kano', student_class: 'SS3' },
    { student_name: 'Alice Brown', state_of_origin: 'Kaduna', student_class: 'SS1' },
    { student_name: 'Bob White', state_of_origin: 'Lagos', student_class: 'SS2' },
  ],
};

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

// Function to aggregate students by class
const aggregateStudentsByClass = (students) => {
  const classCounts = {};

  students.forEach((student) => {
    const studentClass = student.student_class;
    if (classCounts[studentClass]) {
      classCounts[studentClass] += 1;
    } else {
      classCounts[studentClass] = 1;
    }
  });

  return Object.keys(classCounts).map((studentClass) => ({
    className: studentClass,
    count: classCounts[studentClass],
  }));
};

const Chart = () => {
  // Use static mock data
  const statistics = mockStatistics;
  const studentData = statistics.students_list;

  // Aggregated student count by class
  const studentClassData = aggregateStudentsByClass(studentData);

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

        <Col xs={12} lg={6}>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentClassData}>
                <XAxis dataKey="className" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" name="Number of Students" />
              </BarChart>
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
              <th>State of Origin</th>
              <th>Class</th>
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
