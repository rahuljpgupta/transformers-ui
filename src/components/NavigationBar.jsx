import {
    Navbar,
    Nav,
} from 'react-bootstrap';
  
  function LineChartView() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Traffic Predictor</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#home">About</Nav.Link>
            <Nav.Link id="branding" end>Studio - Abc Wellness</Nav.Link>
            </Nav>
        </Navbar>
    );
  }
  
  export default LineChartView;
  