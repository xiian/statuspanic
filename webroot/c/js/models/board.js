define(['collections/items','backbone', 'underscore'], function(Items){
    var Model = Backbone.Model.extend({
        defaults: {
            title: 'default statusboard title',
            width: '100%'
        },
        initialize: function(options) {
            this.set({'items': new Items});
        },
        parse: function(){
            console.debug(arguments);
        }
    });
    return Model;
});