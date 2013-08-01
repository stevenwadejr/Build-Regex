// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// jQuery List DragSort v0.5.1
// License: http://dragsort.codeplex.com/license
(function(b){b.fn.dragsort=function(k){if("destroy"==k)b(this.selector).trigger("dragsort-uninit");else{var f=b.extend({},b.fn.dragsort.defaults,k),h=[],a=null,l=null;this.each(function(k,j){b(j).is("table")&&1==b(j).children().size()&&b(j).children().is("tbody")&&(j=b(j).children().get(0));var m={draggedItem:null,placeHolderItem:null,pos:null,offset:null,offsetLimit:null,scroll:null,container:j,init:function(){var a=0==b(this.container).children().size()?"li":b(this.container).children(":first").get(0).tagName.toLowerCase(); ""==f.itemSelector&&(f.itemSelector=a);""==f.dragSelector&&(f.dragSelector=a);""==f.placeHolderTemplate&&(f.placeHolderTemplate="<"+a+">&nbsp;</"+a+">");b(this.container).attr("data-listidx",k).mousedown(this.grabItem).bind("dragsort-uninit",this.uninit);this.styleDragHandlers(!0)},uninit:function(){var a=h[b(this).attr("data-listidx")];b(a.container).unbind("mousedown",a.grabItem).unbind("dragsort-uninit");a.styleDragHandlers(!1)},getItems:function(){return b(this.container).children(f.itemSelector)}, styleDragHandlers:function(a){this.getItems().map(function(){return b(this).is(f.dragSelector)?this:b(this).find(f.dragSelector).get()}).css("cursor",a?"pointer":"")},grabItem:function(a){if(!(1!=a.which||b(a.target).is(f.dragSelectorExclude)||0<b(a.target).closest(f.dragSelectorExclude).size()||0==b(a.target).closest(f.itemSelector).size())){a.preventDefault();for(var c=a.target;!b(c).is(f.dragSelector);){if(c==this)return;c=c.parentNode}b(c).attr("data-cursor",b(c).css("cursor"));b(c).css("cursor", "move");var e=h[b(this).attr("data-listidx")],g=this,i=function(){e.dragStart.call(g,a);b(e.container).unbind("mousemove",i)};b(e.container).mousemove(i).mouseup(function(){b(e.container).unbind("mousemove",i);b(c).css("cursor",b(c).attr("data-cursor"))})}},dragStart:function(d){null!=a&&null!=a.draggedItem&&a.dropItem();a=h[b(this).attr("data-listidx")];a.draggedItem=b(d.target).closest(f.itemSelector);a.draggedItem.attr("data-origpos",b(this).attr("data-listidx")+"-"+a.getItems().index(a.draggedItem)); var c=parseInt(a.draggedItem.css("marginTop")),e=parseInt(a.draggedItem.css("marginLeft"));a.offset=a.draggedItem.offset();a.offset.top=d.pageY-a.offset.top+(isNaN(c)?0:c)-1;a.offset.left=d.pageX-a.offset.left+(isNaN(e)?0:e)-1;f.dragBetween||(c=0==b(a.container).outerHeight()?Math.max(1,Math.round(0.5+a.getItems().size()*a.draggedItem.outerWidth()/b(a.container).outerWidth()))*a.draggedItem.outerHeight():b(a.container).outerHeight(),a.offsetLimit=b(a.container).offset(),a.offsetLimit.right=a.offsetLimit.left+ b(a.container).outerWidth()-a.draggedItem.outerWidth(),a.offsetLimit.bottom=a.offsetLimit.top+c-a.draggedItem.outerHeight());c=a.draggedItem.height();e=a.draggedItem.width();"tr"==f.itemSelector?(a.draggedItem.children().each(function(){b(this).width(b(this).width())}),a.placeHolderItem=a.draggedItem.clone().attr("data-placeholder",!0),a.draggedItem.after(a.placeHolderItem),a.placeHolderItem.children().each(function(){b(this).css({borderWidth:0,width:b(this).width()+1,height:b(this).height()+1}).html("&nbsp;")})): (a.draggedItem.after(f.placeHolderTemplate),a.placeHolderItem=a.draggedItem.next().css({height:c,width:e}).attr("data-placeholder",!0));if("td"==f.itemSelector){var g=a.draggedItem.closest("table").get(0);b("<table id='"+g.id+"' style='border-width: 0px;' class='dragSortItem "+g.className+"'><tr></tr></table>").appendTo("body").children().append(a.draggedItem)}g=a.draggedItem.attr("style");a.draggedItem.attr("data-origstyle",g?g:"");a.draggedItem.css({position:"absolute",opacity:0.8,"z-index":999, height:c,width:e});a.scroll={moveX:0,moveY:0,maxX:b(document).width()-b(window).width(),maxY:b(document).height()-b(window).height()};a.scroll.scrollY=window.setInterval(function(){if(f.scrollContainer!=window)b(f.scrollContainer).scrollTop(b(f.scrollContainer).scrollTop()+a.scroll.moveY);else{var c=b(f.scrollContainer).scrollTop();if(0<a.scroll.moveY&&c<a.scroll.maxY||0>a.scroll.moveY&&0<c)b(f.scrollContainer).scrollTop(c+a.scroll.moveY),a.draggedItem.css("top",a.draggedItem.offset().top+a.scroll.moveY+ 1)}},10);a.scroll.scrollX=window.setInterval(function(){if(f.scrollContainer!=window)b(f.scrollContainer).scrollLeft(b(f.scrollContainer).scrollLeft()+a.scroll.moveX);else{var c=b(f.scrollContainer).scrollLeft();if(0<a.scroll.moveX&&c<a.scroll.maxX||0>a.scroll.moveX&&0<c)b(f.scrollContainer).scrollLeft(c+a.scroll.moveX),a.draggedItem.css("left",a.draggedItem.offset().left+a.scroll.moveX+1)}},10);b(h).each(function(a,b){b.createDropTargets();b.buildPositionTable()});a.setPos(d.pageX,d.pageY);b(document).bind("mousemove", a.swapItems);b(document).bind("mouseup",a.dropItem);f.scrollContainer!=window&&b(window).bind("DOMMouseScroll mousewheel",a.wheel)},setPos:function(d,c){var e=c-this.offset.top,g=d-this.offset.left;f.dragBetween||(e=Math.min(this.offsetLimit.bottom,Math.max(e,this.offsetLimit.top)),g=Math.min(this.offsetLimit.right,Math.max(g,this.offsetLimit.left)));this.draggedItem.parents().each(function(){if("static"!=b(this).css("position")&&(!b.browser.mozilla||"table"!=b(this).css("display"))){var a=b(this).offset(); e-=a.top;g-=a.left;return!1}});if(f.scrollContainer==window)c-=b(window).scrollTop(),d-=b(window).scrollLeft(),c=Math.max(0,c-b(window).height()+5)+Math.min(0,c-5),d=Math.max(0,d-b(window).width()+5)+Math.min(0,d-5);else var i=b(f.scrollContainer),h=i.offset(),c=Math.max(0,c-i.height()-h.top)+Math.min(0,c-h.top),d=Math.max(0,d-i.width()-h.left)+Math.min(0,d-h.left);a.scroll.moveX=0==d?0:d*f.scrollSpeed/Math.abs(d);a.scroll.moveY=0==c?0:c*f.scrollSpeed/Math.abs(c);this.draggedItem.css({top:e,left:g})}, wheel:function(d){if((b.browser.safari||b.browser.mozilla)&&a&&f.scrollContainer!=window){var c=b(f.scrollContainer),e=c.offset();d.pageX>e.left&&d.pageX<e.left+c.width()&&d.pageY>e.top&&d.pageY<e.top+c.height()&&(e=d.detail?5*d.detail:d.wheelDelta/-2,c.scrollTop(c.scrollTop()+e),d.preventDefault())}},buildPositionTable:function(){var d=[];this.getItems().not([a.draggedItem[0],a.placeHolderItem[0]]).each(function(a){var e=b(this).offset();e.right=e.left+b(this).outerWidth();e.bottom=e.top+b(this).outerHeight(); e.elm=this;d[a]=e});this.pos=d},dropItem:function(){if(null!=a.draggedItem){var d=a.draggedItem.attr("data-origstyle");a.draggedItem.attr("style",d);""==d&&a.draggedItem.removeAttr("style");a.draggedItem.removeAttr("data-origstyle");a.styleDragHandlers(!0);a.placeHolderItem.before(a.draggedItem);a.placeHolderItem.remove();b("[data-droptarget], .dragSortItem").remove();window.clearInterval(a.scroll.scrollY);window.clearInterval(a.scroll.scrollX);a.draggedItem.attr("data-origpos")!=b(h).index(a)+"-"+ a.getItems().index(a.draggedItem)&&f.dragEnd.apply(a.draggedItem);a.draggedItem.removeAttr("data-origpos");a.draggedItem=null;b(document).unbind("mousemove",a.swapItems);b(document).unbind("mouseup",a.dropItem);f.scrollContainer!=window&&b(window).unbind("DOMMouseScroll mousewheel",a.wheel);return!1}},swapItems:function(d){if(null==a.draggedItem)return!1;a.setPos(d.pageX,d.pageY);for(var c=a.findPos(d.pageX,d.pageY),e=a,g=0;-1==c&&f.dragBetween&&g<h.length;g++)c=h[g].findPos(d.pageX,d.pageY),e=h[g]; if(-1==c)return!1;var i=function(){return b(e.container).children().not(e.draggedItem)},d=i().not(f.itemSelector).each(function(){this.idx=i().index(this)});null==l||l.top>a.draggedItem.offset().top||l.left>a.draggedItem.offset().left?b(e.pos[c].elm).before(a.placeHolderItem):b(e.pos[c].elm).after(a.placeHolderItem);d.each(function(){var a=i().eq(this.idx).get(0);this!=a&&i().index(this)<this.idx?b(this).insertAfter(a):this!=a&&b(this).insertBefore(a)});b(h).each(function(a,b){b.createDropTargets(); b.buildPositionTable()});l=a.draggedItem.offset();return!1},findPos:function(a,b){for(var e=0;e<this.pos.length;e++)if(this.pos[e].left<a&&this.pos[e].right>a&&this.pos[e].top<b&&this.pos[e].bottom>b)return e;return-1},createDropTargets:function(){f.dragBetween&&b(h).each(function(){var d=b(this.container).find("[data-placeholder]"),c=b(this.container).find("[data-droptarget]");0<d.size()&&0<c.size()?c.remove():0==d.size()&&0==c.size()&&("td"==f.itemSelector?b(f.placeHolderTemplate).attr("data-droptarget", !0).appendTo(this.container):b(this.container).append(a.placeHolderItem.removeAttr("data-placeholder").clone().attr("data-droptarget",!0)),a.placeHolderItem.attr("data-placeholder",!0))})}};m.init();h.push(m)});return this}};b.fn.dragsort.defaults={itemSelector:"",dragSelector:"",dragSelectorExclude:"input, textarea",dragEnd:function(){},dragBetween:!1,placeHolderTemplate:"",scrollContainer:window,scrollSpeed:5}})(jQuery);

// Place any jQuery/helper plugins in here.
/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
//if(!jQuery)throw new Error("Bootstrap requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("webkitTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger("webkitTransitionEnd")};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(window.jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]');if(a.length){var b=this.$element.find("input").prop("checked",!this.$element.hasClass("active"));"radio"===b.prop("type")&&a.find(".active").removeClass("active")}this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover"},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;this.sliding=!0,f&&this.pause(),e=e.length?e:this.$element.find(".item")[h]();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .accordion-group > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find("[data-toggle=collapse][data-parent="+i+"]").not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(window.jQuery),+function(a){"use strict";function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown")}return e.focus(),!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("dropdown");d||c.data("dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(window.jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b).on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(){return this[this.isShown?"hide":"show"]()},b.prototype.show=function(){var b=this,c=a.Event("show.bs.modal");this.$element.trigger(c),this.isShown||c.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.backdrop(function(){var c=a.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(document.body),b.$element.show(),c&&b.$element[0].offsetWidth,b.$element.addClass("in").attr("aria-hidden",!1),b.enforceFocus(),c?b.$element.one(a.support.transition.end,function(){b.$element.focus().trigger("shown.bs.modal")}).emulateTransitionEnd(300):b.$element.focus().trigger("shown.bs.modal")}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c){return this.each(function(){var d=a(this),e=d.data("bs.modal"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.modal",e=new b(this,f)),"string"==typeof c?e[c]():f.show&&e.show()})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f).one("hide",function(){c.is(":visible")&&c.focus()})});var d=a(document.body).on("shown.bs.modal",".modal",function(){d.addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){d.removeClass("modal-open")})}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.enter=function(b){var c=this.getDefaults(),d={};this._options&&a.each(this._options,function(a,b){c[a]!=b&&(d[a]=b)});var e=b instanceof this.constructor?b:a(b.currentTarget)[this.type](d).data("bs."+this.type);return clearTimeout(e.timeout),e.options.delay&&e.options.delay.show?(e.hoverState="in",e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show),void 0):e.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this._options).data("bs."+this.type);return clearTimeout(c.timeout),c.options.delay&&c.options.delay.hide?(c.hoverState="out",c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p="bottom"==d?{top:g.top+g.height,left:g.left+g.width/2-h/2}:"top"==d?{top:g.top-i,left:g.left+g.width/2-h/2}:"left"==d?{top:g.top+g.height/2-i/2,left:g.left-h}:{top:g.top+g.height/2-i/2,left:g.left+g.width};this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight;a.top=a.top+parseInt(d.css("margin-top"),10),a.left=a.left+parseInt(d.css("margin-left"),10),d.offset(a).addClass("in");var g=d[0].offsetWidth,h=d[0].offsetHeight;if("top"==b&&h!=f&&(c=!0,a.top=a.top+f-h),"bottom"==b||"top"==b){var i=0;a.left<0&&(i=-2*a.left,a.left=0,d.offset(a),g=d[0].offsetWidth,h=d[0].offsetHeight),this.replaceArrow(i-e+g,g,"left")}else this.replaceArrow(h-f,h,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){var b=this.tip(),c=a.Event("hide.bs."+this.type);return this.$element.trigger(c),c.isDefaultPrevented()?void 0:(b.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?b.one(a.support.transition.end,b.detach).emulateTransitionEnd(150):b.detach(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this._options).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(window.jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title:empty").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData(this.type)};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(window.jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(window.jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.attr("data-target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(window.jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(window.jQuery);

/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!
function($) {

  "use strict"; // jshint ;_;

  /* DROPDOWN CLASS DEFINITION
   * ========================= */

  var toggle = '[data-toggle=dropdown]',
    Dropdown = function(element) {
      var $el = $(element).on('click.dropdown.data-api', this.toggle)
      $('html').on('click.dropdown.data-api', function() {
        $el.parent().removeClass('open')
      });
    }

  Dropdown.prototype = {

    constructor: Dropdown,
    toggle: function(e) {
      var $this = $(this),
        $parent, isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
        positioning($parent.find('.dropdown-menu'), $this)
      }

      $this.focus()

      return false
    },
    change: function(e) {

      var
      $parent, $menu, $toggle, selector, text = '',
        $items;

      $menu = $(this).closest('.dropdown-menu');

      $toggle = $menu.parent().find('[data-label-placement]');

      if (!$toggle || !$toggle.length) {
        $toggle = $menu.parent().find(toggle);
      }

      if (!$toggle || !$toggle.length || $toggle.data('placeholder') === false) return; // do nothing, no control
      ($toggle.data('placeholder') == undefined && $toggle.data('placeholder', $.trim($toggle.text())));
      text = $.data($toggle[0], 'placeholder');

      $items = $menu.find('li > input:checked');

      if ($items.length) {
        text = [];
        $items.each(function() {
          var str = $(this).parent().find('label').eq(0),
            label = str.find('.data-label');

          if (label.length) {
            var p = $('<p></p>');
            p.append(label.clone());
            str = p.html();
          } else {
            str = str.html();
          }


          str && text.push($.trim(str));
        });

        text = text.length < 4 ? text.join(', ') : text.length + ' selected';
      }

      var caret = $toggle.find('.caret');

      $toggle.html(text || '&nbsp;');
      if (caret.length) $toggle.append(' ') && caret.appendTo($toggle);

    },
    keydown: function(e) {
      var $this, $items, $active, $parent, isActive, index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a, li:not(.divider):visible > input:not(disabled) ~ label', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index-- // up
      if (e.keyCode == 40 && index < $items.length - 1) index++ // down
      if (!~index) index = 0

      $items.eq(index).focus()
    }

  }

  function positioning($menu, $control) {
    if ($menu.hasClass('pull-center')) {
      $menu.css('margin-right', $menu.outerWidth() / -2);
    }

    if ($menu.hasClass('pull-middle')) {
      $menu.css('margin-top', ($menu.outerHeight() / -2) - ($control.outerHeight() / 2));
    }
  }

  function clearMenus() {
    $(toggle).each(function() {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target'),
      $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function(option) {
      return this.each(function() {
        var $this = $(this),
          data = $this.data('dropdown')
          if (!data) $this.data('dropdown', (data = new Dropdown(this)))
          if (typeof option == 'string') data[option].call($this)
      })
    }

  $.fn.dropdown.Constructor = Dropdown


  /* DROPDOWN NO CONFLICT
   * ==================== */

  $.fn.dropdown.noConflict = function() {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document).on('click.dropdown.data-api', clearMenus).on('click.dropdown.data-api', '.dropdown form', function(e) {
    e.stopPropagation()
  }).on('click.dropdown-menu', function(e) {
    e.stopPropagation()
  }).on('click.dropdown-menu', '.dropdown-menu > li > input[type="checkbox"] ~ label, .dropdown-menu > li > input[type="checkbox"], .dropdown-menu.noclose > li', function(e) {
    e.stopPropagation()
  }).on('change.dropdown-menu', '.dropdown-menu > li > input[type="checkbox"], .dropdown-menu > li > input[type="radio"]', Dropdown.prototype.change).on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)

}(window.jQuery);