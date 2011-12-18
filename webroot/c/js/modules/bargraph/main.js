define(['views/item'], function(Base_View){
    var Bar = Backbone.Model.extend({
      defaults: {
        'title'   : 'DEFAULT TITLE',
        'complete': 0,
        'total'   : 300
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

    var Bar_View = Backbone.View.extend({
      template: _.template('<div class="bar"><div class="header"><span class="complete"><%=complete%></span> / <span class="total"><%=total%></span></div><div class="view"></div></div>'),
      initialize: function(){
        _.bindAll(this, 'render');
      },

      getHeight: function(){
        var left = this.model.get('total') - this.model.get('complete');
        return Math.floor(this.options.maxHeight * (left / this.model.get('total')));
      },

      getMarginTop: function(){
        return this.options.maxHeight - this.getHeight();
      },

      render: function(){
        this.el = $(this.template(this.model.toJSON()));
        this.el.css({
          'margin-top': this.getMarginTop(),
          'width'     : this.options.width,
          'padding'   : this.options.padding
        });
        this.el.find('.view').css({
          'height': this.getHeight()
        });
        return this;
      },

      renderLabel: function(){
        var element = $('<div class="bar-title">' + this.model.get('title') + '</div>');
        element.css({
          'width'   : this.options.width,
          'padding' : this.options.padding
        });

        return {
          el: element
        };
      }
    });

    var Bars_View = Backbone.View.extend({
      collection: Bars,

      defaults: {
        defaultPadding: 12,
        maxBarWidth: 956
      },

      initialize: function(options){
        _.bindAll(this, 'render');

        // Use defaults
        $.extend(this.options, this.defaults, options);
      },

      getWidth: function() {
        var paddingPer          = (this.options.defaultPadding * 2);
        var totalPadding        = paddingPer * this.collection.length;
        var widthWithoutPadding = this.options.maxWidth - totalPadding;
        var widthPer            = widthWithoutPadding / this.collection.length;
        var minimum             = Math.min(this.options.maxBarWidth, widthPer);
        return Math.floor(minimum);
      },

      render: function(){
        var $el = $(this.el);
        var bars = $el.append('<div class="bars"></div>').find('.bars');
        var labels = $el;
        var barWidth = this.getWidth();
        var maxHeight = this.options.maxHeight;

        this.collection.each(_.bind(function(bar){
          var view = new Bar_View({
            model: bar,
            width: barWidth,
            padding: this.options.defaultPadding,
            maxHeight: maxHeight
          });

          // Append the bar
          bars.append(view.render().el);

          // Append the label
          labels.append(view.renderLabel().el);
        }, this));

        return this;
      }
    });

    var View = Base_View.extend({
      _initialize: function(){
        // Set the format, for science!
        this.model.get('args').fmt = 'json';
      },

      handleData: function(data){
        var BarsView = new Bars_View({
          collection: new Bars(data.sets),
          maxHeight : this.model.get('args').height,
          maxWidth  : this.model.get('args').width,
          container : this
        });

        $(this.el).html(BarsView.render().el);
      }
    });
    return View;
});
