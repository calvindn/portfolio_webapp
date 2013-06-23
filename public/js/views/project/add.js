define(function(require, exports, module){
    var $               = require('jquery'),
        _               = require('underscore'),
        Backbone        = require('Backbone'),
        Parsley         = require('parsley'),
        ProjectTemplate = require('text!templates/project/AddView.html'),
        Resource        = require('models/Resource'),
        Project         = require('models/Project'),
        Projects        = require('models/ProjectCollection');

module.exports = Backbone.View.extend({
    initialize: function (){

    },

    render: function (){
        this.$el.html(_.template(ProjectTemplate));
        return this;
    },

    events: {
        "click .add-resource" : "appendResourceHtml",
        "click .save"         : "validateForm",
        "click .close"        : "closeAlert",
        "click .clear"        : "clearForm"
    },

    //
    // can probably use $("#client")[0] to loop through them
    //
    // VALIDATION / ALERTS IS A FUCKING MESS IN HERE

    appendResourceHtml: function() {

    },

    validateForm: function (){
        if (this.$('#addProjectForm').parsley( 'validate' ))
            return this.saveProject();

        return this.$('.alert').animate({opacity:0});
    },

    saveProject: function (){
        var self = this;

        var resources = [];
        this.gatherResources(resources);

        var images = [];
        this.gatherImages(images);

        new Project({
            name        : this.$("#name").val(),
            images      : images,
            description : this.$("#description").val(),
            github      : "https://github.com/calvinDN/"+this.$("#github").val(),
            completed   : this.$('#completed').is(":checked"),
            resources   : resources
        }).save(null, {
            wait: true,
            success: function(response, model){
                if (self.$('.alert').css('opacity') == 1)
                    self.$('.alert').css({opacity:0});

                setTimeout(function(){
                    self.$( '#addProjectForm' ).parsley( 'destroy' );
                    self.$("#addProjectForm")[0].reset();
                },1600);
                self.updateAlert('alert-success');
                // SHOULDDO: Add self code to updateAlert
                self.$('.alert').html('<a class="close">✕</a><strong>Success!</strong> Project added to database.');
                self.$('.alert').animate({opacity:1});
            },
            error: function(response){
                // MUSTDO: Investigate if this alert is being displayed correctly
                console.log(response);
                if (self.$('.alert').css('opacity') == 1)
                    self.$('.alert').css({opacity:0});
                self.updateAlert('alert-error');
                self.$('.alert').html('<a class="close">✕</a><strong>Error!</strong> Something went wrong.');
                self.$('.alert').animate({opacity:1});
            }
        });
    },

    updateAlert: function(newClass){
        this.$('.alert').removeClass('alert-success').removeClass('alert-error').removeClass('alert-warn').addClass(newClass);
    },

    closeAlert: function (e){
        this.$(e.target).closest('.alert').animate({opacity:0});
        //this.$('.alert').animate({opacity:0});
    },

    clearForm: function (){
        this.$( '#addProjectForm' ).parsley( 'destroy' );
        this.$('.alert').animate({opacity:0});
        //this.closeAlert();
    },

    gatherResources: function(resources){
        var i=1;
        var item = new Resource({
                name        : this.$("#resourceName-"+i).val(),
                link        : this.$("#resourceLink-"+i).val(),
                description : this.$("#resourceDesc-"+i).val()
            });
        resources.push(item);
    },

    gatherImages: function(images){

    },

    remove: function(){
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
    }

});

}); // end of module
