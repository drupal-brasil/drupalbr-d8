/*!
 * jQuery Scrollspy Plugin
 * Author: @sxalexander
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    $.fn.extend({
      scrollspy: function ( options ) {
        
          var defaults = {
            min: 0,
            max: 0,
            mode: 'vertical',
            namespace: 'scrollspy',
            buffer: 0,
            container: window,
            onEnter: options.onEnter ? options.onEnter : [],
            onLeave: options.onLeave ? options.onLeave : [],
            onTick: options.onTick ? options.onTick : []
          }
          
          var options = $.extend( {}, defaults, options );

          return this.each(function (i) {

              var element = this;
              var o = options;
              var $container = $(o.container);
              var mode = o.mode;
              var buffer = o.buffer;
              var enters = leaves = 0;
              var inside = false;
                            
              /* add listener to container */
              $container.bind('scroll.' + o.namespace, function(e){
                  var position = {top: $(this).scrollTop(), left: $(this).scrollLeft()};
                  var xy = (mode == 'vertical') ? position.top + buffer : position.left + buffer;
                  var max = o.max;
                  var min = o.min;
                  
                  /* fix max */
                  if($.isFunction(o.max)){
                    max = o.max();
                  }

                  /* fix max */
                  if($.isFunction(o.min)){
                    min = o.min();
                  }

                  if(max == 0){
                      max = (mode == 'vertical') ? $container.height() : $container.outerWidth() + $(element).outerWidth();
                  }
                  
                  /* if we have reached the minimum bound but are below the max ... */
                  if(xy >= min && xy <= max){
                    /* trigger enter event */
                    if(!inside){
                       inside = true;
                       enters++;
                       
                       /* fire enter event */
                       $(element).trigger('scrollEnter', {position: position})
                       if($.isFunction(o.onEnter)){
                         o.onEnter(element, position);
                       }
                      
                     }
                     
                     /* trigger tick event */
                     $(element).trigger('scrollTick', {position: position, inside: inside, enters: enters, leaves: leaves})
                     if($.isFunction(o.onTick)){
                       o.onTick(element, position, inside, enters, leaves);
                     }
                  }else{
                    
                    if(inside){
                      inside = false;
                      leaves++;
                      /* trigger leave event */
                      $(element).trigger('scrollLeave', {position: position, leaves:leaves})

                      if($.isFunction(o.onLeave)){
                        o.onLeave(element, position);
                      }
                    }
                  }
              }); 

          });
      }

    })

    
})( jQuery, window, document, undefined );
;
/**
 * On scroll, set active menu item.
 */
(function ($) {
  Drupal.behaviors.Scrollspy = {
    attach: function (context, settings) {
      // Set first menu item active on page load.
      $(Drupal.settings.singlePage.menuClass + ' li:nth-child(1) a').addClass('active');

      $('.single-page-wrapper').each(function (i) {
        var position = $(this).position();
        $(this).scrollspy({
          min: position.top,
          max: position.top + $(this).height(),
          onEnter: function (element, position) {
            var id = element.id;
            $(Drupal.settings.singlePage.menuClass + ' li a[data-active-item="' + id + '"]').addClass('active');
            // Set history state.
            if (Drupal.settings.singlePage.updateHash != 0) {
            var stateData = {
              path: window.location.href,
              scrollTop: $(window).scrollTop()
            };
            //window.history.replaceState(stateData, '', '#' + id);
            window.history.pushState(stateData, '', '#' + id);
            }
          },
          onLeave: function (element, position) {
            var id = element.id;
            $(Drupal.settings.singlePage.menuClass + ' li a[data-active-item="' + id + '"]').removeClass('active');
          }
        });
      });
    }
  };
})(jQuery);;
/**
 * Smooth scrolling to anchor item.
 */

(function ($) {
  Drupal.behaviors.scrollToAnchor = {
    init: function (context, settings) {
      // On page load, smooth scroll.
      var hash = window.location.hash;
      var heightDifference = $(document).height() - $(window).height();
      if (hash && $(hash).length > 0) {
        Drupal.behaviors.scrollToAnchor.scrollToDestination($(hash).offset().top, heightDifference);
      }

      // On click, smooth scroll this baby!
      $('a[href^="#"], a[href^="/#"]').click(function (event) {
        if ($(document).find('#single-page-overall-wrapper').length) {
          // Only do this on the single page.
          event.preventDefault();
        }
        var hrefValue = $(this).attr('href').replace('/', '');
        var strippedHref = hrefValue.replace('#', '').replace('/', '');

        if (Drupal.behaviors.scrollToAnchor.validateSelector(hrefValue)) {
          if ($(hrefValue).length > 0) {
            var linkOffset = $(this.hash).offset().top;
            Drupal.behaviors.scrollToAnchor.scrollToDestination(linkOffset, heightDifference);
          }
          else if ($('a[name=' + strippedHref + ']').length > 0) {
            var linkOffset = $('a[name=' + strippedHref + ']').offset().top;
            Drupal.behaviors.scrollToAnchor.scrollToDestination(linkOffset, heightDifference);
          }
        }
      });
    },
    validateSelector: function (a) {
      return /^#[a-z]{1}[a-z0-9_-]*$/i.test(a);
    },
    scrollToDestination: function (a, b) {
      if (a > b) {
        var destination = b;
      } else {
        var destination = a;
      }
      if (Drupal.settings.singlePage.offsetSelector) {
        // Take offset selector height into account.
        if ($(document).find(Drupal.settings.singlePage.offsetSelector).length) {
          destination -= $(Drupal.settings.singlePage.offsetSelector).height();
        }
      }
      $('html,body').stop().animate({scrollTop: destination}, 800, 'swing');
    }
  };

  $(function () {
    // Init scroll behaviour.
    Drupal.behaviors.scrollToAnchor.init();
  });
}(jQuery));
;
