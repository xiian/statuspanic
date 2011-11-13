require(['jquery','underscore','backbone'], function(){
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
            // Add the width to the args
            if (item.args && item.width) {
                item.args.width = item.width;
            }

            // Set the height
            if (item.height) {
                css.height = item.height;
            }

            var mu = moduleMarkup.clone();
            if (item['class']) {
                mu.addClass(item['class']);
            }
            mu.attr('id', thisId);
            mu.css(css);
            board.append(mu);
            Module.activate(thisId, item['name'], item.update, item.args);
        });
    });

    var Module = {
        init: function(name) {},

        activate: function(id, name, seconds, args) {
          Module.render(id, name, args, 1);
          if (seconds > 0) {
              setInterval(function(){
                  Module.render(id, name, args, 0);
              }, (seconds * 1000));
          }
        },

        render: function(id, name, args, firstrun) {
            $.get('modules/' + name + '.module.php', args, function(data) {
                $('#' + id).html(data);
                if (firstrun==1) {
                    Module.init(name);
                }
            });
        }
    };
});