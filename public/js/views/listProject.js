define(function(require, exports, module) {
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        ProjectTemplate = require('text!templates/ListProjectView.html'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection'),
        ProjectListItem = require("views/listItemProject");

module.exports = Backbone.View.extend({

    initialize: function () {
        this.childViews = [];
        // due to asynchronous nature
        // make sure the collection is rendered after the models have populated collection
        this.collection.on("reset", this.renderCollection, this);
    },

    render: function () {
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    renderCollection: function (collection) {
        var self = this;
        collection.each(function(project){
            var projectItemView = (new ProjectListItem({
                model : project
            })).render().el;
            $(projectItemView).appendTo(".project-list");
            self.childViews.push(projectItemView);
        });
    },

    remove: function () {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();

        _.each(this.childViews, function(childView){
            if (childView.close)
                childView.close();
        });

        return this;
    }

});

}); // end of module
