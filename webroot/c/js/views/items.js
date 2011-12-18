define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        addOne: function(item) {
          var placeholder = $('<div></div>');
          this.el.append(placeholder);
            require(['c/js/modules/' + item.get('type') + '/main.js'], _.bind(function(Item_View){
                if (Item_View.view) {
                    Item_View = Item_View.view;
                }
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
