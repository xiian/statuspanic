define(['backbone', 'underscore'], function(){
    var Module = Backbone.Model.extend({
        defaults: {
            update: 300,
            width: 980,
            args: {}
        },
        initialize: function(options) {
            this.get('args')['width'] = options.width;
        }
    });
    return Module;
});