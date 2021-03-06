$(document).ready(function () {
  'use strict';
  var e = '.eqftp',
      a = '_active',
      eq = $(e),
      eqc = $(e + '__close'),
      eqp = $(e + '__page'),
      eqt = $(e + '-header__navigationTab'),
      psb = '.eqftp-content__page_fileTree, .eqftp-content__page_queue, .eqftp-connections, .eqftp-footer__list',
      title = $(e + '__header ' + e + '__title ' + e + '__titleNowrap');
  eq.toggleClass('eqftp' + a);
  $(e + '__page_blank').toggleClass('eqftp__page' + a);
  $(e + '-toolbar__icon').click(function () {
    eq.toggleClass('eqftp' + a);
    $(e + '__page_blank').toggleClass('eqftp__page' + a);
  });
  eqc.click(function () {
    eq.removeClass('eqftp' + a);
    title.text('eqFTP');
  });
  eqt.click(function () {
    $(this).addClass('eqftp-header__navigationTab' + a).siblings().removeClass('eqftp-header__navigationTab' + a);
    if ($(this).hasClass('eqftp-header__navigationTab_file-tree')) {
      title.text('File tree');
      $(e + '__page_file-tree').addClass('eqftp__page' + a).siblings().removeClass('eqftp__page' + a);
    } else if ($(this).hasClass('eqftp-header__navigationTab_query')) {
      title.text('Query');
      $(e + '__page_query').addClass('eqftp__page' + a).siblings().removeClass('eqftp__page' + a);
    } else if ($(this).hasClass('eqftp-header__navigationTab_connections')) {
      title.text('Connections');
      $(e + '__page_connections').addClass('eqftp__page' + a).siblings().removeClass('eqftp__page' + a);
    } else if ($(this).hasClass('eqftp-header__navigationTab_settings')) {
      title.text('Settings');
      $(e + '__page_settings').addClass('eqftp__page' + a).siblings().removeClass('eqftp__page' + a);
    }
  });
  $(e + '__row').click(function () {
    if ($(this).next(e + '-fileTree__element_subfolder').length !== 0) {
      $(this).next(e + '-fileTree__element_subfolder').slideToggle(100);
    }
  });
  $(e + '__connection').click(function () {
    $(this).next(e + '__container_connection').slideToggle(100).toggleClass('eqftp__container' + a);
  });
  if ($(psb).length !== 0) {
    $(psb).perfectScrollbar();
    $(psb).mouseenter(function () {
      $(psb).perfectScrollbar('update');
    });
  }
  $('.eqftp-header__searchHolder').click(function () {
    $('.eqftp-header__dropdown').toggleClass('eqftp-header__dropdown_active');
  });
  $('.eqftp-resize').bind('mousedown', function (e) {
    var eqftp = $('.eqftp');
    var w = eqftp.width();
    var y = e.clientY;
    var move = function (e) {
      eqftp.width(Math.max(20, e.clientY + w - y));
    };
    var up = function (e) {
      eqftp.unbind('mousemove', move).unbind('mouseup', up);
    };
    eqftp.bind('mousemove', move).bind('mouseup', up);
  });
});

function showConnectionsSettings() {
  'use strict';
  $('.eqftp-connectionsSettings').toggleClass('eqftp-connectionsSettings_active');
}

function showSearch() {
  'use strict';
  $('.eqftp-header__search').toggleClass('eqftp-header__search_active');
}

function showChildren(element) {
  'use strict';
  var text = $(element).find('.material-icons').text();
  if (text == 'keyboard_arrow_right') {
    $(element).find('.material-icons').text('keyboard_arrow_down');
  } else {
    $(element).find('.material-icons').text('keyboard_arrow_right');
  }
  $(element).next('.eqftp-fileTree__children').slideToggle(100);
}

function showLog() {
  'use strict';
  $('.eqftp-footer').toggleClass('eqftp-footer_active');
}

$.fn.eqftpResize = function () {
  'use strict';
  return this.each(function () {
    var self = $(this);
    self.after(
      $('<div class="eqftp-resize"></div>').bind('mousedown', function (e) {
        var w = self.width();
        var y = e.clientY;
        var moveHandler = function (e) {
          self.width(Math.max(20, e.clientY + w - y));
        };
        var upHandler = function (e) {
          $('html').unbind('mousemove', moveHandler).unbind('mouseup', upHandler);
        };
        $('html').bind('mousemove', moveHandler).bind('mouseup', upHandler);
      })
    );
  });
}
