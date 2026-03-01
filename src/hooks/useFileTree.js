import { useParams } from 'react-router-dom';
import { useFileStructure } from './useFileStructure';
import { pathToSegments, resolveViewData } from '../utils/fileStructure';

export function useFileTree() {
  const { '*': pathParam } = useParams();
  const { data, loading, error } = useFileStructure();
  const pathSegments = pathToSegments(pathParam);

  if (loading || error || !data?.root) {
    return {
      items: [],
      breadcrumb: [{ name: 'root', path: '' }],
      currentPath: pathSegments.join('/'),
      loading,
      error
    };
  }

  const { items, breadcrumb } = resolveViewData(data.root, pathSegments);
  const currentPath = pathSegments.join('/');

  return {
    items,
    breadcrumb,
    currentPath,
    loading: false,
    error: null
  };
}
