define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        tagName: 'div',
        className: 'module',
        model: Item,
        setUpdate: function(seconds) {
          // Clear the interval that's been set
          clearInterval(this.interval);

          // If we're setting it this low, we're actually just cancelling
          if (seconds <= 0) {
            return true;
          }

          // Set a new interval
          this.interval = setInterval(_.bind(function(){
            this.render();
          }, this), seconds * 1000);
        },

        initialize: function(options) {
          // Set up the automatic update, if needed
          if (this.model.get('update') > 0) {
            this.setUpdate(this.model.get('update'));
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
