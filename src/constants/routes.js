export const BROWSE_BASE = '/browse';

export function browsePath(relativePath = '') {
  return relativePath ? `${BROWSE_BASE}/${relativePath}` : BROWSE_BASE;
}
