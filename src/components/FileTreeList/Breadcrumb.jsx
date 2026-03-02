import { Link } from 'react-router-dom';
import { browsePath } from '../../constants/routes';

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((crumb, i) => (
        <span key={crumb.path || 'root'}>
          {i > 0 && <span className="breadcrumb-sep"> / </span>}
          <Link to={browsePath(crumb.path)}>{crumb.name}</Link>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
