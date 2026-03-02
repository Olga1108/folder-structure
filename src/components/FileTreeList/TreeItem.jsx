import { Link } from 'react-router-dom';
import FolderIcon from '../../assets/svg/FolderIcon';
import FileIcon from '../../assets/svg/FileIcon';
import { browsePath } from '../../constants/routes';

function TreeItem({ name, node, currentPath }) {
  const isFolder = node.type === 'folder';
  const fullPath = currentPath ? `${currentPath}/${name}` : name;

  if (isFolder) {
    return (
      <li className="tree-node">
        <Link to={browsePath(fullPath)} className="tree-item folder">
          <FolderIcon />
          <span>{name}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className="tree-node">
      <span className="tree-item file">
        <FileIcon />
        <span>{name}</span>
      </span>
    </li>
  );
}

export default TreeItem;
