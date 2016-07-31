/**
 * Created by kapitoha on 22.07.16.
 * v. 1.0
 */
var umodal = function(){
    alert('umodal not instantiated yet');
};
$(document).ready(function () {

    var modalBlock = $('#umodal-block');
    if (modalBlock.length == 0) {
        $('body').append('<div id="umodal-block"></div>');
        modalBlock = $('#umodal-block');
    }
    $.umodal = function () {
        return new Umodal(arguments);
    };
    umodal = function(){
        return new Umodal(arguments);
    };

    function Umodal() {
        var uid = Math.random().toString(36).substring(7);
        //remove previous modal if exists
        hideModal();
        $('.modal-backdrop').remove();
        modalBlock.html('');
        var vars = {
            text:'Hello World',
            title:'',
            header:null,
            body:null,
            footer:null,
            content:null,
            theme:'default',
            buttons:{}
        };

        var args = arguments[0];
        switch (args.length)
        {
            case 1:
                if (typeof args[0] === 'string'){
                    vars.text = args[0];
                }
                break;
            case 2:
                if (typeof args[0]==='string' && typeof args[1]==='string'){
                    vars.title=args[0];
                    vars.text=args[1];
                }
                else if (typeof args[0]==="string") {vars.text=args[0];}
                else if (typeof args[1]==="string") {vars.text=args[1];}
                break;
            case 3:
                if (typeof args[0]==='string' && typeof args[1]==='string' && typeof args[2]==='string'){
                    vars.title=args[0];
                    vars.text=args[1];
                    vars.theme = args[2];
                }
                else if (typeof args[0]==='string' && typeof args[1]==='string'){
                    vars.title=args[0];
                    vars.text=args[1];
                }
                break;
        }
        for (var i in args){
            if (typeof args[i] === 'object'){
                loadVariables(args[i]);
            }
        }
        

        function loadVariables(array){
            for (var key in array) {
                if (array.hasOwnProperty(key)) {
                    vars[key] = array[key];
                }
            }
            
        }
//Text
        this.text = function(text) {
			return this.setText(text);
		};
        this.setText = function(text){
            vars['text']=text;
            return this;
        };
//Title 
        this.setTitle = function(title){
        	vars['title']=title;
        	return this;
        };
        this.title = function(title) {
			return this.setTitle(title);
		}
        
//Theme       
        this.theme = function(theme){
            vars.theme=theme;
            return this;
        };
        this.setTheme = function(theme) {
			return this.theme(theme);
		}
        
        this.show = function () {
            var builder = new FormBuilder().setHeader(vars.header).setBody(vars.body).setFooter(vars.footer).setContent(vars.content);
            modalBlock.html(builder.getForm());
            showModal();
        };
        function showModal() {
            modalBlock.find('.modal').modal('show');
        }
        function hideModal(){
            modalBlock.find('.modal').modal('hide');
        }
        
//Header
        this.header = function(header) {
			return this.setHeader(header);
		}
        this.setHeader = function(header){
            vars['header']=header;
            return this;
        };
        
//Body
        this.body = function(body) {
			return this.setBody(body);
		}
        this.setBody=function(body){
            vars.body=body;
            return this;
        };
//Footer
        this.footer = function(footer) {
			return this.setFooter(footer);
		}
        this.setFooter = function(footer){
            vars.footer = footer;
            return this;
        };
        
//Content
        this.content = function(content) {
			return this.setContent(content);
		}
        this.setContent = function(content){
            vars.content=content;
            return this;
        };
        
//Button
        this.addButton=function(button, action){
        	vars.buttons[button] = action;
        	return this;
        };
        this.button = function(btn, action) {
        	vars.buttons[btn] = action;
        	return this;
		}

       function FormBuilder() {
            var base = $('<div class="modal fade text-center umodal-base-'+vars.theme+'" role="dialog"></div>');
            var dialog = $('<div class="modal-dialog umodal-dialog-'+vars.theme+'"></div>');
            var content = $('<div class="modal-content umodal-content-'+vars.theme+'"></div>');
            var header = $('<div class="modal-header umodal-header-'+vars.theme+'"><button type="button" class="close btn-umodal-close" data-dismiss="modal">&times;</button><p class="umodal-title">'+vars.title+'</p></div>');
            var body = $('<div class="modal-body umodal-body-'+vars.theme+'"><div class="container-fluid"><div class="row">'+vars.text+'</div></div></div>');
            var footer = $('<div class="modal-footer umodal-footer-'+vars.theme+' center-block"></div>');

            this.getForm = function() {
                base.append(dialog);
                if (Object.keys(vars.buttons).length > 0){
                    $.each(vars.buttons, function(i, value){
                        var button = $('<button type="button" class="btn btn-default" data-dismiss="modal">'+i+'</button>');
                        button.attr('id','btn-umodal-'+ i.hashCode());
                        if (typeof value === 'function'){
                        	button.on('click', function(e){
                        		value();
                        	});
                        }
                        else if (typeof value === 'object') {
                        	var options = value;
                            for (var opt in options){
                                if (options.hasOwnProperty(opt)){
                                    if (typeof options[opt] === 'function'){
                                        button.on(opt, function(e){
                                            options[opt]();
                                        });
                                    }
                                    else button.attr(opt, options[opt]);
                                }
                            }
						}
                        footer.append(button);
                    });
                }
                if (null == vars.content) {
                    content.append(header);
                    content.append(body);
                    content.append(footer);
                }
                dialog.append(content);

                return base;
            };

            this.setHeader = function (newHeader) {
                if (null != newHeader)
                    header.html(newHeader);
                return this;
            };
            this.setBody = function(newBody){
                if (null != newBody)
                    body.html(newBody);
                return this;
            };
            this.setFooter = function(newFooter){
                if (null != newFooter)
                    footer.html(newFooter);
                return this;
            };
            this.setContent = function(newContent){
                if (null != newContent)
                    content.html(newContent);
                return this;
            };

        }
    }
    String.prototype.hashCode = function(){
        var hash = 0;
        if (this.length == 0) return hash;
        for (i = 0; i < this.length; i++) {
            char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        }
        return hash;
    }
});

