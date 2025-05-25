import { BrowserRouter as Router } from 'react-router-dom';
import RouteHandler from './RouteHandler';
import './index.css';

function App() {
  return (
    <Router>
      <RouteHandler />
    </Router>
  );
}

export default App;