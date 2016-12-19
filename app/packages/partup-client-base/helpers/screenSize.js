var mobile = 320;
var tablet = 768;
var desktop = 992;

Template.registerHelper('screenSize', function(sizeName) {
    var size = Partup.client.screen.size.get('width');
    var name = 'mobile';
    if (size >= tablet && size < desktop) {
        name = 'tablet';
    } else if (size >= desktop) {
        name = 'desktop';
    }

    return sizeName === name;
});

Template.registerHelper('screenSizeMin', function(sizeName) {
    var size = Partup.client.screen.size.get('width');
    var name = 'mobile';
    if (size >= tablet) {
        name = 'tablet';
    } else if (size >= desktop) {
        name = 'desktop';
    }

    return sizeName === name;
});
