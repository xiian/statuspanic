define(['views/item'], function(Base_View){
    var Bar = Backbone.Model.extend({
      defaults: {
        'name'     : 'DEFAULT NAME',
        'remaining': 0,
        'height'   : 300
      }
    });

    var Bars = Backbone.Collection.extend({
      model: Bar,
      defaults: {
        maxHeight: 999,
        maxWidth: 666
      },
      setMaxHeight: function(maxHeight){
        this.maxHeight = maxHeight;
      },
      setMaxWidth: function(maxWidth){
        this.maxWidth = maxWidth;
      }
    });

    var View = Base_View.extend({
      _initialize: function(){
        // Set the format, for science!
        this.model.get('args').fmt = 'json';
      },

      handleData: function(data){
        var coll = new Bars(data.bars);
        coll.setMaxHeight(data.height);
        coll.setMaxWidth(data.width);
      }
    });
    return View;
});
