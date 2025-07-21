export function redirect(destination, parameters = '') {
  window.location.href = `../${destination}/index.html?${parameters}`;
}
