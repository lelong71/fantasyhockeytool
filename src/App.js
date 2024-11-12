import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import FantasyHockeyTool from './fantasy';

function App() {
    return (
        <Container className="App">
            <Row>
                <Col>
                    <main>
                        <FantasyHockeyTool /> {/* Display the Fantasy component here */}
                    </main>
                </Col>
            </Row>
        </Container>
    );
}

export default App;