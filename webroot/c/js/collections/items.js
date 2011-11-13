define(['models/item'], function(Item){
    var Collection = Backbone.Collection.extend({
        model: Item
    });
    
    return Collection;
});