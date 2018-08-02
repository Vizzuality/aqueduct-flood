// https://github.com/fridays/next-routes
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
routes.add('home', '/', 'home');
routes.add('analyzer-compare', '/analyzer-compare', 'analyzer-compare');

module.exports = routes;
