require(['views/board', 'collections/items', 'models/item', 'views/item','jquery','underscore','backbone'], function(Board, Items, Item, Item_View){
    $.getJSON('/config.json', function(data){
        var board = $('#board'),
            modNumber = 0;

        // Set the title
        if (data.title) {
            document.title = data.title;
        }

        // Set the width
        var width = '100%';
        if (data.width) {
            width = data.width + 'px';
        }
        board.css({'width': width});

        var coll = new Items(data.modules);

        // Load the modules
        var moduleMarkup = $('<div class="module"></div>');
        coll.each(function(item){
            var thisId = item.get('name') + '_' + modNumber++,
                css = {
                    'width': item.get('width')
                };

            var mu = moduleMarkup.clone();
            if (item.get('class')) {
                mu.addClass(item.get('class'));
            }
            mu.attr('id', thisId);
            mu.css(css);
            board.append(mu);

            new Item_View({
                'model': item,
                'el'   : mu,
                'thisid' : thisId,
                'name': item['name'],
                'update': item.update,
                'args': item.args
            }).render();
        });
    });
});