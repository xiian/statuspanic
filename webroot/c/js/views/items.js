define(['models/item', 'views/item'], function(Item, Item_View){
    var View = Backbone.View.extend({
        initialize: function(options) {
            this.markup = $('<div class="module"></div>');
        },
        
        addOne: function(item) {
            console.group('Views_Items:addOne', arguments);
            var thisId = item.get('name') + '_' + item.cid,
                css = {
                    'width': item.get('width')
                };

            var mu = this.markup.clone();
            if (item.get('class')) {
                mu.addClass(item.get('class'));
            }
            if (item.get('height')) {
                css['height'] = item.get('height');
            }
            mu.attr('id', thisId);
            mu.css(css);
            this.el.append(mu);

            new Item_View({
                'model': item,
                'el'   : mu,
                'thisid' : thisId,
                'name': item['name'],
                'update': item.update,
                'args': item.args
            }).render();
            
            console.groupEnd();
        },

        render: function() {
            console.group('Views_Items:render', arguments);
            this.collection.each(_.bind(function(item){
                this.addOne(item);
            }, this));
            console.groupEnd();
        }
    });
    return View;
});
