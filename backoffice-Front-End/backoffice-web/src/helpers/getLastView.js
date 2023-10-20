export function getLastView(pathname) {
  return `/${pathname.split('/')[1]}`
}