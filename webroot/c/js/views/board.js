define(['models/board', 'views/items'], function(Board, Items_View){
    var View = Backbone.View.extend({
        model: Board,
        initialize: function(options) {
            this.container = this.$('#board');
        },
        
        render: function() {
            // Set the title
            document.title = this.model.get('title');
            
            // Set the width
            this.container.css({'width': this.model.get('width')});

            // Create the view
            new Items_View({
                collection: this.model.get('items'),
                el: this.container,
                template: $('<div class="module"></div>')
            }).render();
        }
    });
    return View;
});
