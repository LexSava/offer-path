export function normalizePath(path: string): string {
  const [pathWithoutQueryOrHash] = path.split(/[?#]/);

  if (!pathWithoutQueryOrHash) {
    return '/';
  }

  if (pathWithoutQueryOrHash === '/') {
    return '/';
  }

  return pathWithoutQueryOrHash.replace(/\/+$/, '');
}

export function isCurrentRoute(pathname: string | null, href: string): boolean {
  const currentPath = normalizePath(pathname ?? '/');
  const targetPath = normalizePath(href);

  return currentPath === targetPath;
}
