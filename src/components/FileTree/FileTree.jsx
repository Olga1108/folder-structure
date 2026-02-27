import { useFileTree } from '../../hooks/useFileTree';
import TreeItem from '../FileTreeList/TreeItem';
import Breadcrumb from '../FileTreeList/Breadcrumb';
import './FileTree.css';

function FileTree() {
  const { items, breadcrumb, currentPath } = useFileTree();

  return (
    <div className="file-tree">
      <Breadcrumb items={breadcrumb} />
      <ul className="tree-root">
        {items.map(({ name, node }) => (
          <TreeItem key={name} name={name} node={node} currentPath={currentPath} />
        ))}
      </ul>
    </div>
  );
}

export default FileTree;
