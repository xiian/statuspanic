define(['collections/items','backbone', 'underscore'], function(Items){
    var Model = Backbone.Model.extend({
        defaults: {
            title: 'default statusboard title',
            width: '100%'
        },
        initialize: function(options) {
            // Set up the items properly as a collection
            this.set({'items': new Items(options.modules)});
        }
    });
    return Model;
});