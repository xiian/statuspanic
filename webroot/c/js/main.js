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
        var moduleMarkup = $('<div class="module">CUSTOM MODULE</div>');
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
            activate_module(thisId, item['name'], item.update, item.args);
        });
    });
    
    $(document).ready(function() {
      $('.middle').each(function(id, val) {
        var outer_height = $(val).height();
        var inner_height = $(val).children().first().height();
        var buffer = (outer_height - inner_height) / 2;
        var SEL = '#' + $(val).attr('id') + '>div';
        $(SEL).css('marginTop', buffer);
        $(SEL).css('marginBottom', buffer);
      });
    });
    
    
    function render_module(id, name, args, firstrun) {
        $.get('modules/' + name + '.module.php', args, function(data) {
            $('#' + id).html(data);
            if (firstrun==1) {
                module_init (name);
            }
        });
    }

    function activate_module(id, name, seconds, args) {
      render_module(id, name, args, 1);
      if (seconds > 0) {
          setInterval(function(){
              render_module(id, name, args, 0);
          }, (seconds * 1000));
      }
    }
    
    function module_init (name) {
        switch (name) {
            case 'stockticker':
                stockticker_init();
    	        break;
    	    default:
    	        break;
        }
    }

    // stockticker global vars
    var left = 0;
    function stockticker_init() {
        ticker = $('.stockticker');
    	ticker.css('position','absolute');
    	ticker.css('display','block');
    	ticker.css('opacity','0');
        ticker.animate({ opacity: 1 }, 6000);
        startTicker();
    }

    function startTicker() {
        ticker = $('.stockticker');
    	ticker.css('position','absolute');
    	ticker.css('display','block');

        var shiftLeftAt = ticker.children().get(0).offsetWidth ;
        ticker.width(screen.availWidth + 2 * shiftLeftAt);

        $('.stockticker div').each(function(){
            $(this).css('float','left');
            $(this).css('padding-left','2em');
            $(this).css('display','block');
        });

        left -= 1;
        if(left <= shiftLeftAt * -1) {
            left = 0;
            ticker.append(ticker.children().get(0));
    		ticker.remove(ticker.children().get(0));
            shiftLeftAt = ticker.children().get(0).offsetWidth;
        }
        ticker.css('left', left + 'px');
    	setTimeout(arguments.callee, 30);
    }


});