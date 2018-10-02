// https://github.com/fridays/next-routes
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
routes.add('home', '/:tab?', 'home');
routes.add('compare', '/compare', 'compare');

module.exports = routes;
