require(['models/board','views/board', 'jquery','underscore','backbone'], function(Board, Board_View){
    $.getJSON('/config.json', function(data){
        new Board_View({
            model: new Board(data),
            el: $('body')
        }).render();
    });
});