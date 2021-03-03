import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import styles from "./App.module.scss";

import Home from "./Pages/Home";
import Upload from "./Pages/Upload";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className={styles.appWrapper} id="AppComponent">
      <BrowserRouter>
          <div className={styles.sidebarWrapper}>
            <Navbar className={styles.sidebarContent}>
              <Navbar.Collapse>
                <Nav.Link className={styles.sidebarLink} eventKey="1" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link className={styles.sidebarLink} eventKey="2" as={Link} to="/upload">
                  Upload
                </Nav.Link>
                <Nav.Link className={styles.sidebarLink} eventKey="3" as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
          </div>
        <div className={styles.main}>
          <main className={styles.content}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
} 

export default App;
