var oldA = require.attach;
require.attach = function (url, cName, mName, cb, type) {
  url += (url.indexOf('?') === -1 ? '?' : '&') + 'bust=' + (new Date().getTime());
  return oldA.call(require, url, cName, mName, cb, type);
};
require.config({
  priority: [
    'lib/jquery',
    'lib/underscore'
  ]
});
require(['lib/jquery','lib/underscore','lib/backbone'], function(){
    require(['models/board','views/board'],function(Board, Board_View){
        $.ajax({
          url: '/config.json',
          dataType: 'json',
          success: function(data){
              new Board_View({
                  model: new Board(data),
                  el: $('body')
              }).render();
          },
          error: function(xhr, status, e){
            alert('There was an error loading the config file. Error was: ' + e);
          }
        });
    });
});