define(['views/item', 'lib/date', 'lib/time'], function(Base_View){
    var plural = function(num, singular, plural) {
      return num + ' ' + (num == 1 ? singular : (plural || singular + 's'));
    };

    var View = Base_View.extend({
      templates: {
        'active'  : _.template('<div class="mega"><%=label%> <span class="event"><%=title%></span></div>'),
        'complete': _.template('<div class="mega"><div class="star"><span class="top"></span><span class="center"></span><span class="bottom"></span><span class="text">!</span></div> <%=completion%></div>')
      },
      render: function(id) {
          // Initialize
          var diff     = new TimeSpan(Date.parse(this.model.get('args').stop) - new Date()),
              update   = 0,
              template = this.templates.complete,
              params   = {
                'label'     : '',
                'title'     : this.model.get('args').title,
                'completion': this.model.get('args').completion || 'woo hoo'
              };

          // Determine the label
          if (diff.days > 0 || diff.hours > 0 || diff.minutes > 0 || diff.seconds > 0) {
            // Change the template to the active one
            template = this.templates.active;
            if (diff.days > 0) {
              params.label = plural(diff.days,'day');
              update = 60 * 60;
            } else if (diff.hours > 3){
              params.label = plural(diff.hours,'hour');
              update = 60;
            } else if (diff.hours > 0){
              params.label = plural(diff.hours,'hour') + ', ' + plural(diff.minutes,'minute');
              update = 30;
            } else if (diff.minutes > 0) {
              params.label = plural(diff.minutes,'minute');
              update = 10;
            } else if (diff.seconds > 0) {
              params.label = plural(diff.seconds,'second');
              update = 1;
            }
          }

          // Update the updater
          this.model.set({'update': update});

          // Update the DOM
          $(this.el)
          .css(this.model.get('dimensions'))
          .addClass(this.model.get('class'))
          .attr({'title': this.model.get('title')})
          .html(template(params));

          return this;
      }
    });
    return View;
});
