import {
    Dropdown,
} from 'react-bootstrap';
  
  function ChartDropdown({ handleChartSelection, selectedChart }) {
    const dropdownOptions = [
        {eventKey:"Area", Name:"Area"},
        {eventKey:"Bar", Name:"Bar"},
        {eventKey:"Line", Name:"Line"},
        {eventKey:"Composed", Name:"Composed"},
    ];
    const handleSelection = e => {
        handleChartSelection(e);
    }
    return (
        <Dropdown bsPrefix="chartdropdown-bsprefix" drop="right">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            {`Chart Type - ${selectedChart}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {
                dropdownOptions.map(item => (
                    <Dropdown.Item eventKey={item.eventKey} key={item.eventKey} onSelect={handleSelection}>{item.Name}</Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
        </Dropdown>
    );
  }
  
  export default ChartDropdown;
  