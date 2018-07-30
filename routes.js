// https://github.com/fridays/next-routes
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
routes.add('home', '/', 'home');

module.exports = routes;
