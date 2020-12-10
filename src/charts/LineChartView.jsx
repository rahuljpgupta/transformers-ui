import {
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line,
  } from 'recharts';
  
  function LineChartView({data}) {
    return (
        <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Actual" stroke="#8884d8" />
            <Line type="monotone" dataKey="Prediction" stroke="#82ca9d" />
        </LineChart>
    );
  }
  
  export default LineChartView;
  