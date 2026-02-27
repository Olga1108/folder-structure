import { useParams } from 'react-router-dom';
import fileStructure from '../data/fileStructure.json';
import { pathToSegments, resolveViewData } from '../utils/fileStructure';

export function useFileTree() {
  const { '*': pathParam } = useParams();
  const pathSegments = pathToSegments(pathParam);
  const { items, breadcrumb } = resolveViewData(fileStructure.root, pathSegments);
  const currentPath = pathSegments.join('/');

  return { items, breadcrumb, currentPath };
}
