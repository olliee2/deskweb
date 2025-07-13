export default function (destination: string, parameters: string = '') {
  window.location.href = `../${destination}/index.html?${parameters}`;
}
