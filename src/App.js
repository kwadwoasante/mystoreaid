import './styles/main.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Branches from './components/Branches';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Sales from './components/Sales';
import Sale from './components/Sale';

function App() {

  const [toggle, setToggle] = useState(false);

  return (
    <Router>
      <div className={toggle ? "d-flex toggled" : "d-flex"} id="wrapper">
        <Sidebar />

        <div id="page-content-wrapper">
          <Navigation setToggle={setToggle} />

          <div className="content container-fluid">
            <Switch>
              <Route exact path="/" component={Branches} />
              <Route path="/sales/:id" component={Sales} />
              <Route path="/sale/:branch_id/:sale_id" component={Sale} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
