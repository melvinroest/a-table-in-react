import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import Upload from "./Pages/Upload";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div id="AppComponent">
      <BrowserRouter>
        <Navbar>
          <Navbar.Collapse>
            <Nav.Link eventKey="1" as={Link} to="/upload">
              Upload
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <main>
          <Switch>
            <Route exact path="/" component={Upload} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
} 

export default App;
