import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import styles from "./App.module.scss";

import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div className={styles.appWrapper} id="AppComponent">
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
            <Route exact path="/" component={HomePage} />
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Redirect to={"/"} />
          </Switch>
        </main>
      </div>
    </div>
  );
} 

export default App;
