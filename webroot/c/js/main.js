require(['models/board','views/board', 'lib/jquery','lib/underscore','lib/backbone'], function(Board, Board_View){
    $.getJSON('/config.json', function(data){
        new Board_View({
            model: new Board(data),
            el: $('body')
        }).render();
    });
});