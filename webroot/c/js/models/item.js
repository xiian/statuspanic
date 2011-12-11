define([], function(){
    var Model = Backbone.Model.extend({
        defaults: {
            update: 300,
            width: 980,
            args: {}
        },
        initialize: function(options) {
            this.get('args')['width'] = options.width;
        },

        url: function(){
            return 'modules/' + this.get('type') + '.module.php';
        }
    });
    return Model;
});