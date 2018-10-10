// https://github.com/fridays/next-routes
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
routes.add('home', '/:tab?', 'home');
routes.add('compare', '/compare/:tab?', 'compare');

// embed
routes.add('widget-embed', '/embed/:tab/widget/:id', 'widget-embed');

module.exports = routes;
