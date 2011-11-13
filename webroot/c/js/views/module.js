define(['models/module'], function(Module){
    var View = Backbone.View.extend({
        model: Module,
        initialize: function(options) {
          if (options.update > 0) {
              var that = this;
              setInterval(function(){
                  that.render();
              }, (options.update * 1000));
          }
        },

        render: function(id) {
            $.get('modules/' + this.model.get('name') + '.module.php', this.model.get('args'), _.bind(function(data) {
                $(this.el).html(data);
            }, this));
        }
    });
    return View;
});
