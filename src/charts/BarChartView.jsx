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
        <BarChart width={730} height={250} data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar bsPrefix="bsPrefix-bar" onClick={handleClick} dataKey="actual" fill="#8884d8" />
            <Bar bsPrefix="bsPrefix-bar" onClick={handleClick} dataKey="forecast" fill="#82ca9d" />
        </BarChart>
    );
  }
  
  export default BarChartView;
  