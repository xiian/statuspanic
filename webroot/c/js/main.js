require(['views/board', 'models/module', 'views/module','jquery','underscore','backbone'], function(Board, Module, Module_View){
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

        // Load the modules
        var moduleMarkup = $('<div class="module"></div>');
        _.each(data.modules, function(item){
            var thisId = item['name'] + '_' + modNumber++,
                css = {
                    'width': item.width
                };

            var mu = moduleMarkup.clone();
            if (item['class']) {
                mu.addClass(item['class']);
            }
            mu.attr('id', thisId);
            mu.css(css);
            board.append(mu);


            var module = new Module(item);

            new Module_View({
                'model': module,
                'el'   : mu,
                'thisid' : thisId,
                'name': item['name'],
                'update': item.update,
                'args': item.args
            }).render();
        });
    });
});