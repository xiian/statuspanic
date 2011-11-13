define(['underscore','backbone', 'models/board', 'collections/items', 'views/items'], function(x,y,Board, Items, Items_View){
    var View = Backbone.View.extend({
        model: Board,
        initialize: function(options) {
            this.container = this.$('#board');
        },
        
        render: function() {
            console.group('Views_Board:render', arguments);
            console.debug(this);
            
            // Set the title
            document.title = this.model.get('title');
            
            // Set the width
            this.container.css({'width': this.model.get('width')});
            
            var coll = new Items(this.model.get('modules'));

            new Items_View({
                collection: coll,
                el: this.container
            }).render();
            
            
            console.groupEnd();
        }
    });
    return View;
});
