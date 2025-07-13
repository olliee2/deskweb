export default function (destination, parameters = '') {
    window.location.href = `../${destination}/index.html?${parameters}`;
}
