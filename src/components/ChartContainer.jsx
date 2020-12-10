import ComposedChartView from '../charts/ComposedChartView';
import AreaChartView from '../charts/AreaChartView';
import BarChartView from '../charts/BarChartView';
import LineChartView from '../charts/LineChartView';
  
  function ChartContainer({ selectedChart, handleChartItemClick, chartData }) {
    let selectedChartComponent = <AreaChartView data={chartData} handleChartItemClick={handleChartItemClick} />;
    switch(selectedChart) {
        case 'Line':
            selectedChartComponent = <LineChartView data={chartData} handleChartItemClick={handleChartItemClick} />
            break;
        case 'Bar':
            selectedChartComponent = <BarChartView data={chartData} handleChartItemClick={handleChartItemClick} />
            break;
        case 'Composed':
            selectedChartComponent = <ComposedChartView data={chartData} handleChartItemClick={handleChartItemClick} />
            break;
    }
    return (
        <div>
            {selectedChartComponent}
        </div>
    );
  }
  
  export default ChartContainer;
  