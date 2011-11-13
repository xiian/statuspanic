define(['backbone', 'underscore'], function(){
    var Model = Backbone.Model.extend({
        defaults: {
            banana: 'yay',
            update: 300,
            width: 980,
            args: {}
        },
        initialize: function(options) {
            this.get('args')['width'] = options.width;
        },

        url: function(){
            return 'modules/' + this.get('name') + '.module.php';
        }
    });
    return Model;
});