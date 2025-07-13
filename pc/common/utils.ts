export function redirect(destination: string, parameters: string = '') {
  window.location.href = `../${destination}/index.html?${parameters}`;
}
