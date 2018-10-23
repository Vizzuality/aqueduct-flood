// https://github.com/fridays/next-routes
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
routes.add('compare', '/compare/:tab?', 'compare');
routes.add('home', '/:tab?', 'home');

// embed
routes.add('widget-preview', '/preview/:tab/widget/:id', 'widget-preview');
routes.add('widget-embed', '/embed/:tab/widget/:id', 'widget-embed');

module.exports = routes;
