import { Link } from 'react-router-dom';
import { useFileTree } from '../../hooks/useFileTree';
import TreeItem from '../FileTreeList/TreeItem';
import Breadcrumb from '../FileTreeList/Breadcrumb';
import { browsePath } from '../../constants/routes';
import './FileTree.css';

function FileTree() {
  const { items, breadcrumb, currentPath, loading, error, notFound } = useFileTree();

  if (loading) {
    return (
      <div className="file-tree">
        <p className="file-tree-message">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="file-tree">
        <p className="file-tree-message file-tree-error">Error: {error}</p>
      </div>
    );
  }

  if (notFound) {
    const parentPath = breadcrumb.length > 1 ? breadcrumb[breadcrumb.length - 2].path : '';
    return (
      <div className="file-tree">
        <Breadcrumb items={breadcrumb} />
        <p className="file-tree-message file-tree-not-found">Folder not found</p>
        <Link to={browsePath(parentPath)} className="file-tree-back-link">
          Back to {parentPath || 'root'}
        </Link>
      </div>
    );
  }

  return (
    <div className="file-tree">
      <Breadcrumb items={breadcrumb} />
      <ul className="tree-root">
        {items.map(({ name, node }) => (
          <TreeItem 
            key={name} 
            name={name}
            node={node}
            currentPath={currentPath}
          />
        ))}
      </ul>
    </div>
  );
}

export default FileTree;
