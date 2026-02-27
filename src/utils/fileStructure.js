const ROOT_LABEL = 'root';

/**
 * Returns the children object at the given path, or null if path is invalid.
 * @param {Object} root - Root node (object with folder/file entries)
 * @param {string[]} pathSegments - Array of path segments
 * @returns {Object|null} Children object or null
 */
export function getChildrenByPath(root, pathSegments) {
  let current = root;

  for (const segment of pathSegments) {
    const node = current[segment];
    if (!node || node.type !== 'folder' || !node.children) {
      return null;
    }
    current = node.children;
  }

  return current;
}

/**
 * Converts path string to segments array.
 * @param {string} pathParam - Path string (e.g. "movies/Avengers")
 * @returns {string[]}
 */
export function pathToSegments(pathParam) {
  if (!pathParam) return [];
  return pathParam.split('/').filter(Boolean);
}

/**
 * Builds breadcrumb items from path segments.
 * @param {string[]} pathSegments
 * @returns {{ name: string, path: string }[]}
 */
export function buildBreadcrumb(pathSegments) {
  return [
    { name: ROOT_LABEL, path: '' },
    ...pathSegments.map((segment, i) => ({
      name: segment,
      path: pathSegments.slice(0, i + 1).join('/')
    }))
  ];
}

/**
 * Converts children object to items array.
 * @param {Object} children
 * @returns {{ name: string, node: Object }[]}
 */
export function childrenToItems(children) {
  return Object.entries(children).map(([name, node]) => ({ name, node }));
}

/**
 * Resolves items and breadcrumb for a given path.
 * @param {Object} root
 * @param {string[]} pathSegments
 * @returns {{ items: Array, breadcrumb: Array }}
 */
export function resolveViewData(root, pathSegments) {
  const defaultBreadcrumb = [{ name: ROOT_LABEL, path: '' }];

  if (pathSegments.length === 0) {
    return {
      items: childrenToItems(root),
      breadcrumb: defaultBreadcrumb
    };
  }

  const targetChildren = getChildrenByPath(root, pathSegments);

  if (!targetChildren) {
    return {
      items: childrenToItems(root),
      breadcrumb: defaultBreadcrumb
    };
  }

  return {
    items: childrenToItems(targetChildren),
    breadcrumb: buildBreadcrumb(pathSegments)
  };
}
