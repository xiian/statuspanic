define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'module',
        model: Item,
        initialize: function(options) {
          // Set up the automatic update, if needed
          if (this.model.get('update') > 0) {
              setInterval(_.bind(function(){
                  this.render();
              }, this), (this.model.get('update') * 1000));
          }

          // Call sub initializers
          this._initialize();
        },

        _initialize: function(){},

        render: function(id) {
            var $el = $(this.el).css({
                'width' : this.model.get('dimensions').width,
                'height': this.model.get('dimensions').height
            }).addClass(this.model.get('class'))
            .attr({'title': this.model.get('title')});

            $.get(this.model.url(), this.model.get('args'), _.bind(function(data) {
                this.handleData(data);
            }, this));
            return this;
        },

        handleData: function(data) {
          $(this.el).html(data);
        }
    });
    return View;
});
