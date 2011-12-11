define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        addOne: function(item) {
          var placeholder = $('<div></div>');
          this.el.append(placeholder);
            require(['views/item/' + item.get('type')], _.bind(function(Item_View){
                var element = new Item_View({
                    'model': item
                }).render().el;
                placeholder.replaceWith(element);
            }, this));
        },

        render: function() {
            this.collection.each(_.bind(function(item){
                this.addOne(item);
            }, this));
        }
    });
    return View;
});
