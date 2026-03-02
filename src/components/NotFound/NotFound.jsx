import { Link } from 'react-router-dom';
import { BROWSE_BASE } from '../../constants/routes';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h2 className="not-found-title">404</h2>
      <p className="not-found-message">Page not found</p>
      <Link to={BROWSE_BASE} className="not-found-link">
        Back to file structure
      </Link>
    </div>
  );
}

export default NotFound;
