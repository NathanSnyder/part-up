var url = Npm.require('url');

// Disable all default response headers (we want to control them manually)
JsonRoutes.setResponseHeaders({});

// Enable caching for a couple of different endpoints
JsonRoutes.Middleware.use(function(request, response, next) {
    var urlRegexesToCacheForAnHour = [
        /\/networks\/[a-zA-Z0-9-]+$/, // /networks/lifely-open
        /\/partups\/by_ids\/[a-zA-Z0-9,]+$/, // /partups/by_ids/vGaxNojSerdizDPjb
        /\/partups\/discover??((?!userId).)*$/, // /partups/discover?query (only if userId is not present)
        /\/partups\/discover\/count??((?!userId).)*$/, // /partups/discover/count?query (only if userId is not present)
        /\/partups\/home\/[a-zA-Z]+$/, // /partups/home/en
        /\/users\/count$/, // /users/count
    ];

    var imagesAndFonts = [
        /^.*\.woff(2)*$/,
        /^.*\.(jpeg|jpg|gif|png)$/
    ];

    var meteorResourceIndicators = [
        'meteor_js_resource=true',
        'meteor_css_resource=true'
    ];

    var cacheControl = 'no-store, max-age=0';

    urlRegexesToCacheForAnHour.forEach(function(regex) {
        if (regex.test(request.url)) {
            cacheControl = 'public, max-age=3600';
        }
    });

    var uri = url.parse(request.url, true, true);

    if (uri.query.meteor_js_resource ||
        uri.query.meteor_css_resource ||
        uri.query.hash || uri.query.v ||
        imagesAndFonts.some(function(regex) { return regex.test(uri.pathname) })) {
        // Meteor resource filename is hashed, cache for a year...
        cacheControl = 'public, max-age=31536000';
    }

    response.setHeader('Cache-Control', cacheControl);

    next();
});

JsonRoutes.Middleware.use(JsonRoutes.Middleware.parseBearerToken);
JsonRoutes.Middleware.use(JsonRoutes.Middleware.authenticateMeteorUserByToken);