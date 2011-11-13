define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'module',
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
            var $el = $(this.el).css({
                'width' : this.model.get('width'),
                'height': this.model.get('height')
            }).addClass(this.model.get('class'));

            $.get(this.model.url(), this.model.get('args'), _.bind(function(data) {
                $el.html(data);
            }, this));
            return this;
        }
    });
    return View;
});
