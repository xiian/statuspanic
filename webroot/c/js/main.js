var oldA = require.attach;
require.attach = function (url, cName, mName, cb, type) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + 'bust=' + (new Date().getTime());
  return oldA.call(require, url, cName, mName, cb, type);
};

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