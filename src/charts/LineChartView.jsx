import {
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Line,
  } from 'recharts';
  
  function LineChartView({handleChartItemClick, data}) {
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
        <LineChart width={730} height={250} data={parsedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" onClick={handleClick}/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line onClick={handleClick} type="monotone" dataKey="upperEstimate" stroke="#b4eb34" />
            <Line onClick={handleClick} type="monotone" dataKey="actualClasses" stroke="#8884d8" />
            <Line onClick={handleClick} type="monotone" dataKey="forecast" stroke="#82ca9d" />
        </LineChart>
    );
  }
  
  export default LineChartView;
  