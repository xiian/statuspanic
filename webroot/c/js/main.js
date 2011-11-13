require(['lib/jquery','lib/underscore','lib/backbone'], function(){
    require(['models/board','views/board'],function(Board, Board_View){
        $.getJSON('/config.json', function(data){
            new Board_View({
                model: new Board(data),
                el: $('body')
            }).render();
        });
    });
});