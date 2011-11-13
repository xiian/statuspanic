define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        model: Item,
        initialize: function(options) {
          if (this.model.get('update') > 0) {
              var that = this;
              setInterval(function(){
                  that.render();
              }, (this.model.get('update') * 1000));
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
