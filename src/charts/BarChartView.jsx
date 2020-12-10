import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
  } from 'recharts';
  
  function BarChartView({handleChartItemClick, data}) {
    const handleClick = e => {
      handleChartItemClick(e);
    }
    return (
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar bsPrefix="bsPrefix-bar" onClick={handleClick} dataKey="Actual" fill="#8884d8" />
            <Bar bsPrefix="bsPrefix-bar" onClick={handleClick} dataKey="Prediction" fill="#82ca9d" />
        </BarChart>
    );
  }
  
  export default BarChartView;
  