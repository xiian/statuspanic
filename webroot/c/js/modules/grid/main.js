define(['views/item', 'models/item'], function(Base_View, Model){
    var View = Base_View.extend({
      templates: {
        container: $('<div><table border="0" width="100%" cellpadding="0" cellspacing="10"></table></div>'),
        rowBase: $('<tr></tr>')
      },

      _initialize: function(){
        // Set the format, for science!
        this.model.get('args').fmt = 'json';
      },

      handleData: function(data) {
        var html = this.templates.container.clone(),
            table = $('table', html),
            rowBase = this.templates.rowBase.clone();
        // For each row
        _.each(data, function(row){
          // Make a new DOM element for the row
          var rowHtml = rowBase.clone();
          // For each cell
          _.each(row, function(cell){
            // Put the cell contents in there
            rowHtml.append('<td>' + cell + '</td>');
          });
          // Stick the row into the table
          table.append(rowHtml);
        });

        // Stick the new table (with container) into the element
        $(this.el).html(html);
      }
    });
    return {
      view: View,
      model: Model
    };
});
