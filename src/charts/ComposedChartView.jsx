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
  
  const parsedData = data && data.map(item => {
  let date = new Date(item.classDate);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();
  const name = mm + '/' + dd + '/' + yyyy;

    return {
      ...item,
      name,
    }
  })

  return (
      <ComposedChart width={730} height={250} data={parsedData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="upperEstimate" fill="#cfeb34" stroke="#b4eb34" />
        <Bar onClick={handleClick} dataKey="actual" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="forecast" stroke="#ff7300" />
      </ComposedChart>
  );
}

export default ComposedChartView;
