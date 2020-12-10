import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
} from 'recharts';

function ComposedChartView({handleChartItemClick, data}) {
  const handleClick = e => {
    handleChartItemClick(e);
  }
  return (
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar onClick={handleClick} dataKey="Actual" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="Prediction" stroke="#ff7300" />
      </ComposedChart>
  );
}

export default ComposedChartView;
