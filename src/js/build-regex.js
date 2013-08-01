/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
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
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input').prop('checked', !this.$element.hasClass('active'))
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

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
/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
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
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el    = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

// jQuery List DragSort v0.5.1
// Website: http://dragsort.codeplex.com/
// License: http://dragsort.codeplex.com/license

(function($) {

	$.fn.dragsort = function(options) {
		if (options == "destroy") {
			$(this.selector).trigger("dragsort-uninit");
			return;
		}

		var opts = $.extend({}, $.fn.dragsort.defaults, options);
		var lists = [];
		var list = null, lastPos = null;

		this.each(function(i, cont) {

			//if list container is table, the browser automatically wraps rows in tbody if not specified so change list container to tbody so that children returns rows as user expected
			if ($(cont).is("table") && $(cont).children().size() == 1 && $(cont).children().is("tbody"))
				cont = $(cont).children().get(0);

			var newList = {
				draggedItem: null,
				placeHolderItem: null,
				pos: null,
				offset: null,
				offsetLimit: null,
				scroll: null,
				container: cont,

				init: function() {
					//set options to default values if not set
					var tagName = $(this.container).children().size() == 0 ? "li" : $(this.container).children(":first").get(0).tagName.toLowerCase();
					if (opts.itemSelector == "")
						opts.itemSelector = tagName;
					if (opts.dragSelector == "")
						opts.dragSelector = tagName;
					if (opts.placeHolderTemplate == "")
						opts.placeHolderTemplate = "<" + tagName + ">&nbsp;</" + tagName + ">";

					//listidx allows reference back to correct list variable instance
					$(this.container).attr("data-listidx", i).mousedown(this.grabItem).bind("dragsort-uninit", this.uninit);
					this.styleDragHandlers(true);
				},

				uninit: function() {
					var list = lists[$(this).attr("data-listidx")];
					$(list.container).unbind("mousedown", list.grabItem).unbind("dragsort-uninit");
					list.styleDragHandlers(false);
				},

				getItems: function() {
					return $(this.container).children(opts.itemSelector);
				},

				styleDragHandlers: function(cursor) {
					this.getItems().map(function() { return $(this).is(opts.dragSelector) ? this : $(this).find(opts.dragSelector).get(); }).css("cursor", cursor ? "pointer" : "");
				},

				grabItem: function(e) {
					//if not left click or if clicked on excluded element (e.g. text box) or not a moveable list item return
					if (e.which != 1 || $(e.target).is(opts.dragSelectorExclude) || $(e.target).closest(opts.dragSelectorExclude).size() > 0 || $(e.target).closest(opts.itemSelector).size() == 0)
						return;

					//prevents selection, stops issue on Fx where dragging hyperlink doesn't work and on IE where it triggers mousemove even though mouse hasn't moved,
					//does also stop being able to click text boxes hence dragging on text boxes by default is disabled in dragSelectorExclude
					e.preventDefault();

					//change cursor to move while dragging
					var dragHandle = e.target;
					while (!$(dragHandle).is(opts.dragSelector)) {
						if (dragHandle == this) return;
						dragHandle = dragHandle.parentNode;
					}
					$(dragHandle).attr("data-cursor", $(dragHandle).css("cursor"));
					$(dragHandle).css("cursor", "move");

					//on mousedown wait for movement of mouse before triggering dragsort script (dragStart) to allow clicking of hyperlinks to work
					var list = lists[$(this).attr("data-listidx")];
					var item = this;
					var trigger = function() {
						list.dragStart.call(item, e);
						$(list.container).unbind("mousemove", trigger);
					};
					$(list.container).mousemove(trigger).mouseup(function() { $(list.container).unbind("mousemove", trigger); $(dragHandle).css("cursor", $(dragHandle).attr("data-cursor")); });
				},

				dragStart: function(e) {
					if (list != null && list.draggedItem != null)
						list.dropItem();

					list = lists[$(this).attr("data-listidx")];
					list.draggedItem = $(e.target).closest(opts.itemSelector);

					//record current position so on dragend we know if the dragged item changed position or not
					list.draggedItem.attr("data-origpos", $(this).attr("data-listidx") + "-" + list.getItems().index(list.draggedItem));

					//calculate mouse offset relative to draggedItem
					var mt = parseInt(list.draggedItem.css("marginTop"));
					var ml = parseInt(list.draggedItem.css("marginLeft"));
					list.offset = list.draggedItem.offset();
					list.offset.top = e.pageY - list.offset.top + (isNaN(mt) ? 0 : mt) - 1;
					list.offset.left = e.pageX - list.offset.left + (isNaN(ml) ? 0 : ml) - 1;

					//calculate box the dragged item can't be dragged outside of
					if (!opts.dragBetween) {
						var containerHeight = $(list.container).outerHeight() == 0 ? Math.max(1, Math.round(0.5 + list.getItems().size() * list.draggedItem.outerWidth() / $(list.container).outerWidth())) * list.draggedItem.outerHeight() : $(list.container).outerHeight();
						list.offsetLimit = $(list.container).offset();
						list.offsetLimit.right = list.offsetLimit.left + $(list.container).outerWidth() - list.draggedItem.outerWidth();
						list.offsetLimit.bottom = list.offsetLimit.top + containerHeight - list.draggedItem.outerHeight();
					}

					//create placeholder item
					var h = list.draggedItem.height();
					var w = list.draggedItem.width();
					if (opts.itemSelector == "tr") {
						list.draggedItem.children().each(function() { $(this).width($(this).width()); });
						list.placeHolderItem = list.draggedItem.clone().attr("data-placeholder", true);
						list.draggedItem.after(list.placeHolderItem);
						list.placeHolderItem.children().each(function() { $(this).css({ borderWidth:0, width: $(this).width() + 1, height: $(this).height() + 1 }).html("&nbsp;"); });
					} else {
						list.draggedItem.after(opts.placeHolderTemplate);
						list.placeHolderItem = list.draggedItem.next().css({ height: h, width: w }).attr("data-placeholder", true);
					}

					if (opts.itemSelector == "td") {
						var listTable = list.draggedItem.closest("table").get(0);
						$("<table id='" + listTable.id + "' style='border-width: 0px;' class='dragSortItem " + listTable.className + "'><tr></tr></table>").appendTo("body").children().append(list.draggedItem);
					}

					//style draggedItem while dragging
					var orig = list.draggedItem.attr("style");
					list.draggedItem.attr("data-origstyle", orig ? orig : "");
					list.draggedItem.css({ position: "absolute", opacity: 0.8, "z-index": 999, height: h, width: w });

					//auto-scroll setup
					list.scroll = { moveX: 0, moveY: 0, maxX: $(document).width() - $(window).width(), maxY: $(document).height() - $(window).height() };
					list.scroll.scrollY = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							$(opts.scrollContainer).scrollTop($(opts.scrollContainer).scrollTop() + list.scroll.moveY);
							return;
						}
						var t = $(opts.scrollContainer).scrollTop();
						if (list.scroll.moveY > 0 && t < list.scroll.maxY || list.scroll.moveY < 0 && t > 0) {
							$(opts.scrollContainer).scrollTop(t + list.scroll.moveY);
							list.draggedItem.css("top", list.draggedItem.offset().top + list.scroll.moveY + 1);
						}
					}, 10);
					list.scroll.scrollX = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							$(opts.scrollContainer).scrollLeft($(opts.scrollContainer).scrollLeft() + list.scroll.moveX);
							return;
						}
						var l = $(opts.scrollContainer).scrollLeft();
						if (list.scroll.moveX > 0 && l < list.scroll.maxX || list.scroll.moveX < 0 && l > 0) {
							$(opts.scrollContainer).scrollLeft(l + list.scroll.moveX);
							list.draggedItem.css("left", list.draggedItem.offset().left + list.scroll.moveX + 1);
						}
					}, 10);

					//misc
					$(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					list.setPos(e.pageX, e.pageY);
					$(document).bind("mousemove", list.swapItems);
					$(document).bind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						$(window).bind("DOMMouseScroll mousewheel", list.wheel);
				},

				//set position of draggedItem
				setPos: function(x, y) { 
					//remove mouse offset so mouse cursor remains in same place on draggedItem instead of top left corner
					var top = y - this.offset.top;
					var left = x - this.offset.left;

					//limit top, left to within box draggedItem can't be dragged outside of
					if (!opts.dragBetween) {
						top = Math.min(this.offsetLimit.bottom, Math.max(top, this.offsetLimit.top));
						left = Math.min(this.offsetLimit.right, Math.max(left, this.offsetLimit.left));
					}

					//adjust top, left calculations to parent element instead of window if it's relative or absolute
					this.draggedItem.parents().each(function() {
						if ($(this).css("position") != "static" && (!$.browser.mozilla || $(this).css("display") != "table")) {
							var offset = $(this).offset();
							top -= offset.top;
							left -= offset.left;
							return false;
						}
					});

					//set x or y auto-scroll amount
					if (opts.scrollContainer == window) {
						y -= $(window).scrollTop();
						x -= $(window).scrollLeft();
						y = Math.max(0, y - $(window).height() + 5) + Math.min(0, y - 5);
						x = Math.max(0, x - $(window).width() + 5) + Math.min(0, x - 5);
					} else {
						var cont = $(opts.scrollContainer);
						var offset = cont.offset();
						y = Math.max(0, y - cont.height() - offset.top) + Math.min(0, y - offset.top);
						x = Math.max(0, x - cont.width() - offset.left) + Math.min(0, x - offset.left);
					}
					
					list.scroll.moveX = x == 0 ? 0 : x * opts.scrollSpeed / Math.abs(x);
					list.scroll.moveY = y == 0 ? 0 : y * opts.scrollSpeed / Math.abs(y);

					//move draggedItem to new mouse cursor location
					this.draggedItem.css({ top: top, left: left });
				},

				//if scroll container is a div allow mouse wheel to scroll div instead of window when mouse is hovering over
				wheel: function(e) {
					if (($.browser.safari || $.browser.mozilla) && list && opts.scrollContainer != window) {
						var cont = $(opts.scrollContainer);
						var offset = cont.offset();
						if (e.pageX > offset.left && e.pageX < offset.left + cont.width() && e.pageY > offset.top && e.pageY < offset.top + cont.height()) {
							var delta = e.detail ? e.detail * 5 : e.wheelDelta / -2;
							cont.scrollTop(cont.scrollTop() + delta);
							e.preventDefault();
						}
					}
				},

				//build a table recording all the positions of the moveable list items
				buildPositionTable: function() {
					var pos = [];
					this.getItems().not([list.draggedItem[0], list.placeHolderItem[0]]).each(function(i) {
						var loc = $(this).offset();
						loc.right = loc.left + $(this).outerWidth();
						loc.bottom = loc.top + $(this).outerHeight();
						loc.elm = this;
						pos[i] = loc;
					});
					this.pos = pos;
				},

				dropItem: function() {
					if (list.draggedItem == null)
						return;

					//list.draggedItem.attr("style", "") doesn't work on IE8 and jQuery 1.5 or lower
					//list.draggedItem.removeAttr("style") doesn't work on chrome and jQuery 1.6 (works jQuery 1.5 or lower)
					var orig = list.draggedItem.attr("data-origstyle");
					list.draggedItem.attr("style", orig);
					if (orig == "")
						list.draggedItem.removeAttr("style");
					list.draggedItem.removeAttr("data-origstyle");

					list.styleDragHandlers(true);

					list.placeHolderItem.before(list.draggedItem);
					list.placeHolderItem.remove();

					$("[data-droptarget], .dragSortItem").remove();

					window.clearInterval(list.scroll.scrollY);
					window.clearInterval(list.scroll.scrollX);

					//if position changed call dragEnd
					if (list.draggedItem.attr("data-origpos") != $(lists).index(list) + "-" + list.getItems().index(list.draggedItem))
						opts.dragEnd.apply(list.draggedItem);
					list.draggedItem.removeAttr("data-origpos");

					list.draggedItem = null;
					$(document).unbind("mousemove", list.swapItems);
					$(document).unbind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						$(window).unbind("DOMMouseScroll mousewheel", list.wheel);
					return false;
				},

				//swap the draggedItem (represented visually by placeholder) with the list item the it has been dragged on top of
				swapItems: function(e) {
					if (list.draggedItem == null)
						return false;

					//move draggedItem to mouse location
					list.setPos(e.pageX, e.pageY);

					//retrieve list and item position mouse cursor is over
					var ei = list.findPos(e.pageX, e.pageY);
					var nlist = list;
					for (var i = 0; ei == -1 && opts.dragBetween && i < lists.length; i++) {
						ei = lists[i].findPos(e.pageX, e.pageY);
						nlist = lists[i];
					}

					//if not over another moveable list item return
					if (ei == -1)
						return false;

					//save fixed items locations
					var children = function() { return $(nlist.container).children().not(nlist.draggedItem); };
					var fixed = children().not(opts.itemSelector).each(function(i) { this.idx = children().index(this); });

					//if moving draggedItem up or left place placeHolder before list item the dragged item is hovering over otherwise place it after
					if (lastPos == null || lastPos.top > list.draggedItem.offset().top || lastPos.left > list.draggedItem.offset().left)
						$(nlist.pos[ei].elm).before(list.placeHolderItem);
					else
						$(nlist.pos[ei].elm).after(list.placeHolderItem);

					//restore fixed items location
					fixed.each(function() {
						var elm = children().eq(this.idx).get(0);
						if (this != elm && children().index(this) < this.idx)
							$(this).insertAfter(elm);
						else if (this != elm)
							$(this).insertBefore(elm);
					});

					//misc
					$(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					lastPos = list.draggedItem.offset();
					return false;
				},

				//returns the index of the list item the mouse is over
				findPos: function(x, y) {
					for (var i = 0; i < this.pos.length; i++) {
						if (this.pos[i].left < x && this.pos[i].right > x && this.pos[i].top < y && this.pos[i].bottom > y)
							return i;
					}
					return -1;
				},

				//create drop targets which are placeholders at the end of other lists to allow dragging straight to the last position
				createDropTargets: function() {
					if (!opts.dragBetween)
						return;

					$(lists).each(function() {
						var ph = $(this.container).find("[data-placeholder]");
						var dt = $(this.container).find("[data-droptarget]");
						if (ph.size() > 0 && dt.size() > 0)
							dt.remove();
						else if (ph.size() == 0 && dt.size() == 0) {
							if (opts.itemSelector == "td")
								$(opts.placeHolderTemplate).attr("data-droptarget", true).appendTo(this.container);
							else
								//list.placeHolderItem.clone().removeAttr("data-placeholder") crashes in IE7 and jquery 1.5.1 (doesn't in jquery 1.4.2 or IE8)
								$(this.container).append(list.placeHolderItem.removeAttr("data-placeholder").clone().attr("data-droptarget", true));
							
							list.placeHolderItem.attr("data-placeholder", true);
						}
					});
				}
			};

			newList.init();
			lists.push(newList);
		});

		return this;
	};

	$.fn.dragsort.defaults = {
		itemSelector: "",
		dragSelector: "",
		dragSelectorExclude: "input, textarea",
		dragEnd: function() { },
		dragBetween: false,
		placeHolderTemplate: "",
		scrollContainer: window,
		scrollSpeed: 5
	};

})(jQuery);

/*!
 * VerbalExpressions JavaScript Library v0.1
 * https://github.com/jehna/VerbalExpressions
 *
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-19
 * 
 */

// Define the collection class.
(function(){

		var root = this;

    // I am the constructor function.
    function VerbalExpression(){
        var verbalExpression = Object.create( RegExp.prototype );
        
        // Initialize 
        verbalExpression = (RegExp.apply( verbalExpression, arguments ) || verbalExpression);
     
        // Add all the class methods
        VerbalExpression.injectClassMethods( verbalExpression );

        // Return the new object.
        return( verbalExpression );
    }
 
 
    // Define the static methods.
    VerbalExpression.injectClassMethods = function( verbalExpression ){
 
        // Loop over all the prototype methods
        for (var method in VerbalExpression.prototype){
 
            // Make sure this is a local method.
            if (VerbalExpression.prototype.hasOwnProperty( method )){
 
                // Add the method
                verbalExpression[ method ] = VerbalExpression.prototype[ method ];
 
            }
 
        }
        
        return( verbalExpression );
 
    };
 
    // Define the class methods.
    VerbalExpression.prototype = {
        
        // Variables to hold the whole
        // expression construction in order
        _prefixes : "",
        _source : "",
        _suffixes : "",
        _modifiers : "", //"gm", // default to global multiline matching
        
        
        // Sanitation function for adding
        // anything safely to the expression
        sanitize : function( value ) {
            if(value.source) return value.source;
            return value.replace(/[^\w]/g, function(character) { return "\\" + character; });
        },
        
        // Function to add stuff to the
        // expression. Also compiles the
        // new expression so it's ready to
        // be used.
        add: function( value ) {
            this._source += value || "";
            this.compile(this._prefixes + this._source + this._suffixes, this._modifiers);
            return( this );
        },
        
        // Start and end of line functions
        startOfLine: function( enable ) {
            enable = ( enable != false );
            this._prefixes = enable ? "^" : "";
            this.add( "" );
            return( this );
        },
        
        endOfLine : function( enable ) {
            enable = ( enable != false );
            this._suffixes = enable ? "$" : "";
            this.add( "" );
            return( this );
        },
        
        // We try to keep the syntax as
        // user-friendly as possible.
        // So we can use the "normal"
        // behaviour to split the "sentences"
        // naturally.
        then : function( value ) {
            value = this.sanitize( value );
            this.add( "(?:" + value + ")" );
            return( this );
        },
        
        // And because we can't start with
        // "then" function, we create an alias
        // to be used as the first function
        // of the chain.
        find : function( value ) {
            return( this.then( value ) );
        },
        
        // Maybe is used to add values with ?
        maybe : function( value ) {
            value = this.sanitize(value);
            this.add( "(?:" + value + ")?" );
            return( this );
        },
        
        // Any character any number of times
        anything : function() {
            this.add( "(?:.*)" );
            return( this );
        },
        
        // Anything but these characters
        anythingBut : function( value ) {
            value = this.sanitize( value );
            this.add( "(?:[^" + value + "]*)" );
            return( this );
        },

        // Any character at least one time
        something : function() {
            this.add( "(?:.+)" );
            return( this );
        },

        // Any character at least one time except for these characters
        somethingBut : function( value ) {
            value = this.sanitize( value );
            this.add( "(?:[^" + value + "]+)" );
            return( this );
        },

        // Shorthand function for the
        // String.replace function to
        // give more logical flow if, for
        // example, we're doing multiple
        // replacements on one regexp.
        replace : function( source, value ) {
            source = source.toString();
            return source.replace( this, value );
        },
        
        
        /// Add regular expression special ///
        /// characters                     ///
        
        // Line break
        lineBreak : function() {
            this.add( "(?:(?:\\n)|(?:\\r\\n))" ); // Unix + windows CLRF
            return( this );
        },
        // And a shorthand for html-minded
        br : function() {
            return this.lineBreak();
        },
        
        // Tab (duh?)
        tab : function() {
            this.add( "\\t" );
            return( this );
        },
        
        // Any alphanumeric
        word : function() {
            this.add( "\\w+" );
            return( this );
        },
        
        // Any given character
        anyOf : function( value ) {
            value = this.sanitize(value);
            this.add( "["+ value +"]" );
            return( this );
        },
        
        // Shorthand
        any : function( value ) {
            return( this.anyOf( value ) );
        },
        
        // Usage: .range( from, to [, from, to ... ] )
        range : function() {
            
            var value = "[";
            console.log(arguments);
            
            for(var _from = 0; _from < arguments.length; _from += 2) {
                var _to = _from+1;
                if(arguments.length <= to) break;
                
                var from = this.sanitize( arguments[_from] );
                var to = this.sanitize( arguments[_to] );
                
                value += from + "-" + to;
            }
            
            value += "]";
            
            this.add( value );
            return( this );
        },
        
        
        /// Modifiers      ///
        
        // Modifier abstraction
        addModifier : function( modifier ) {
            if( this._modifiers.indexOf( modifier ) == -1 ) {
                this._modifiers += modifier;
            }
            this.add("");
            return( this );
        },
        removeModifier : function( modifier ) {
            this._modifiers = this._modifiers.replace( modifier, "" );
            this.add("");
            return( this );
        },
        
        // Case-insensitivity modifier
        withAnyCase : function( enable ) {
            
            if(enable != false) this.addModifier( "i" );
            else this.removeModifier( "i" );
            
            this.add( "" );
            return( this );
            
        },
        
        // Default behaviour is with "g" modifier,
        // so we can turn this another way around
        // than other modifiers
        stopAtFirst : function( enable ) {
            
            if(enable != false) this.removeModifier( "g" );
            else this.addModifier( "g" );
            
            this.add( "" );
            return( this );
            
        },
        
        // Multiline, also reversed
        searchOneLine : function( enable ) {
            
            if(enable != false) this.removeModifier( "m" );
            else this.addModifier( "m" );
            
            this.add( "" );
            return( this );
            
        },
        
        
        
        /// Loops  ///
        
        multiple : function( value ) {
            // Use expression or string
            value = value.source ? value.source : this.sanitize(value);
            switch(value.substr(-1)) {
                case "*":
                case "+":
                    break;
                default:
                    value += "+";
            }
            this.add( value );
            return( this );
        },
        
        // Adds alternative expressions
        or : function( value ) {
            
            this._prefixes += "(?:";
            this._suffixes = ")" + this._suffixes;
            
            this.add( ")|(?:" );
            if(value) this.then( value );
            
            return( this );
        },

        //starts a capturing group
        beginCapture : function() {
            //add the end of the capture group to the suffixes for now so compilation continues to work
            this._suffixes += ")";
            this.add( "(", false );

            return( this );
        },

        //ends a capturing group
        endCapture : function() {
						//remove the last parentheses from the _suffixes and add to the regex itself
            this._suffixes = this._suffixes.substring(0, this._suffixes.length - 1 );
            this.add( ")", true );
            
            return( this );
        }
        
    };

    function createVerbalExpression() {
        return new VerbalExpression();
    }

    // support both browser and node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = createVerbalExpression;
    }
    else if (typeof define === 'function' && define.amd) {
        define(VerbalExpression);
    }
    else {
        root.VerEx = createVerbalExpression;
    }
 
}).call();

var $conditions_container = $('#conditions'),
    row_html = $('#row-template').html(),
    tester,
    options_without_params = ['anything', 'endOfLine', 'lineBreak', 'something', 'startOfLine', 'tab', 'word'],
    match_options = {
        add: 'Add',
        any: 'Any',
        anyOf: 'Any Of',
        anything: 'Anything',
        anythingBut: 'Anything But',
        endOfLine: 'End of Line',
        find: 'Find',
        lineBreak: 'Line Break',
        maybe: 'Maybe',
        or: 'Or',
        something: 'Something',
        somethingBut: 'Something But',
        startOfLine: 'Start of Line',
        tab: 'Tab',
        then: 'Then',
        word: 'Word'
    };

$('#new-condition').on('click', function(){
    $('<div />', { class: 'row' })
        .html(row_html)
        .find('select')
            .chain(function(){
                var $select = $(this);
                $.each(match_options, function(key, val){
                    $('<option />', { value: key }).text(val).appendTo($select);
                });
            })
            .on('change', function(){
                if ($.inArray($(this).val(), options_without_params) > -1) {
                    $(this).parents('.row').find('input').attr('disabled', 'disabled');
                } else {
                    $(this).parents('.row').find('input').removeAttr('disabled');
                }
                $(document).trigger('update-expression');
            })
        .end()
        .find('.match-param')
            .on('keyup', function(){
                $(document).trigger('update-expression');
            })
        .end()
        .find('.remove-match-option')
            .on('click', function(){
                $(this).parents('.row').remove();
                $(document).trigger('update-expression');
            })
            .end()
        .appendTo($conditions_container);
}).one('click', function(){
    $(document).trigger('first-row-created');
});

$(document).on({
    'first-row-created': function(){
        $conditions_container.dragsort({ 
            dragSelector: '.move-match-option',
            dragSelectorExclude: 'select, input',
            dragEnd: function(){
                $(document).trigger('update-expression');
            }
        });
    },
    'update-expression': function(){
        buildExpression();
    }
});

$('input[name="modifiers[]"]').on('change', function(){
    $(document).trigger('update-expression');
})


function buildExpression()
{
    var modifiers = $('input[name="modifiers[]"]:checked').map(function(){ return $(this).val(); });

    expression = new VerEx();
    $conditions_container.find('.row').each(function(){
        var $this = $(this),
            condition = $this.find('.match-options').val(),
            param = $this.find('.match-param').val();

        if ($.inArray(condition, options_without_params) > -1) {
            expression[condition]();
        } else {
            expression[condition](param);
        }
    });

    if ($conditions_container.children().length == 0) {
        expression = '';
    }

    for (var i = 0; i < modifiers.length; i++) {
        expression.addModifier(modifiers[i]);
    }

    $('#expression').find('span').text(expression);
}

$.fn.chain = function(fn) 
{
    fn.apply(this);
    return this;
}