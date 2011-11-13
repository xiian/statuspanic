define(['models/item', 'views/item'], function(Item, Item_View){
    var View = Backbone.View.extend({
        addOne: function(item) {
            var element = new Item_View({
                'model': item
            }).render().el;
            this.el.append(element);
        },

        render: function() {
            this.collection.each(_.bind(function(item){
                this.addOne(item);
            }, this));
        }
    });
    return View;
});
