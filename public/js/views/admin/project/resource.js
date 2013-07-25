define(function(require, exports, module) {
    var $                = require('jquery'),
        _                = require('underscore'),
        Backbone         = require('Backbone'),
        ResourceTemplate = require('text!templates/admin/project/resource.html');

// this.model is one project from the project collection
module.exports = Backbone.View.extend({
    initialize: function() {
    },

    render: function() {
        this.$el.html(_.template(ResourceTemplate, this.model));
        return this;
    },

    reset: function() {
        this.$("#name").val(this.model.name);
        this.$("#description").val(this.model.description);
        this.$("#link").val(this.model.link);
    },

    get: function() {
        var resource = {};

        resource.name = this.$("#name").val();
        resource.description = this.$("#description").val();
        resource.link = this.$("#link").val();

        return resource;
    },

    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module