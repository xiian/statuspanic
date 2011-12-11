define([], function(){
    var Model = Backbone.Model.extend({
        defaults: {
            update: 300,
            width: 980,
            dimensions: {
              width: null,
              height: null
            },
            args: {}
        },
        initialize: function(options) {
          // Always pass the width along
            this.get('args')['width'] = options.width;
        },

        url: function(){
            if (this.get('url')) {
              return this.get('url');
            }
            return 'modules/' + this.get('type') + '.module.php';
        }
    });
    return Model;
});