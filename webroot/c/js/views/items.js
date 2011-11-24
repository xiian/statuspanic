define(['models/item'], function(Item){
    var View = Backbone.View.extend({
        addOne: function(item) {
            require(['views/item/' + item.get('name')], _.bind(function(Item_View){
                var element = new Item_View({
                    'model': item
                }).render().el;
                this.el.append(element);
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
