const ROOT_LABEL = 'root';

/**
 * @param {Object} root
 * @param {string[]} pathSegments
 * @returns {Object|null}
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
 * @param {string} pathParam
 * @returns {string[]}
 */
export function pathToSegments(pathParam) {
  if (!pathParam) return [];
  return pathParam.split('/').filter(Boolean);
}

/**
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
 * @param {Object} children
 * @returns {{ name: string, node: Object }[]}
 */
export function childrenToItems(children) {
  return Object.entries(children).map(([name, node]) => ({ name, node }));
}

/**
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
      items: [],
      breadcrumb: buildBreadcrumb(pathSegments),
      notFound: true
    };
  }

  return {
    items: childrenToItems(targetChildren),
    breadcrumb: buildBreadcrumb(pathSegments)
  };
}
