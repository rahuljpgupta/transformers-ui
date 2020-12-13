import {
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Area,
  } from 'recharts';
  
  function AreaChartView({handleChartItemClick, data}) {
    const handleClick = (e,f,g) => {
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
        <AreaChart width={730} height={250} data={parsedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area onClick={handleClick} type="monotone" dataKey="forecast" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area onClick={handleClick} type="monotone" dataKey="actual" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    );
  }
  
  export default AreaChartView;
  