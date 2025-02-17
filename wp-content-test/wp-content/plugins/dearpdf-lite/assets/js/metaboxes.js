/**
 * Created by Deepak on 5/9/2016.
 */

(function ($) {
  function initTabs(tabs) {

    $(document).on("click", "." + tabs.tabsListId + " a", function (event) {
      event.preventDefault();

      var parent = $(this).parent();

      if (parent.hasClass(tabs.activeClass)) return;

      var target_id = $(this).attr("href").replace("!", "");
      var target = $(this).closest("." + tabs.tabsId).find(target_id);

      var tab = (parent[0].nodeName == "LI") ? parent : $(this);
      var tabActiveClass = tabs.activeClass;
      if (tab.hasClass("nav-tab"))
        tabActiveClass += " nav-tab-active";

      tab.siblings().removeClass(tabActiveClass);
      tab.addClass(tabActiveClass);

      target.siblings().removeClass(tabActiveClass);
      target.addClass(tabActiveClass);

      if (parent.hasClass(tabs.hashUpdateClass)) {
        var hash = this.hash.split('#').join('#!');
        window.location.hash = hash;
        updatePostHash(hash);
      }
    });

    function updatePostHash(value) {
      var post_link = $('#post').attr('action');
      if (post_link) {
        post_link = post_link.split('#')[0];
        $('#post').attr('action', post_link + value);
      }
    }

    if (window.location.hash && window.location.hash.indexOf('!df-tab-') >= 0) {
      $('.' + tabs.tabsListId).find('a[href="' + window.location.hash.replace('!', '') + '"]').trigger("click");
      updatePostHash(window.location.hash);
    }
  }

  function initConditionals() {
    $(".df-box .df-option div>:input").on("change", function () {
      parse_condition();
      checkGlobal($(this));
    });

    function match_condition(condition) {
      var match;
      var regex = /(.+?):(is|not|contains|notcontains|less_than|less_than_or_equal_to|greater_than|greater_than_or_equal_to)\((.*?)\),?/g;
      var conditions = [];

      while (match = regex.exec(condition)) {
        conditions.push({
          'check': match[1],
          'rule': match[2],
          'value': match[3] || ''
        });
      }

      return conditions;
    }

    function parse_condition() {
      $('[data-condition]').each(function () {

        var passed;
        var conditions = match_condition($(this).data('condition'));
        if (conditions.length > 0) {
          var operator = ($(this).data('operator') || 'and').toLowerCase();

          $.each(conditions, function (index, condition) {

            //var target   = $( '#setting_' + condition.check );
            var targetEl = $("#" + condition.check);// !! target.length && target.find( OT_UI.condition_objects() ).first();

            //if ( ! target.length || ( ! targetEl.length && condition.value.toString() != '' ) ) {
            //    return;
            //}
            if (!targetEl.length) {
              return;
            }

            var v1 = targetEl.length ? targetEl.val().toString() : '';

            if (targetEl.data("global") === v1) {//happens only with dropdown
              //skip global and take real global value
              var tmp = targetEl.siblings("[data-global-value]").data("global-value");
              if (tmp !== undefined) {
                v1 = tmp.toString();
              }
            }

            var v2 = condition.value.toString();
            var result;

            switch (condition.rule) {
              case 'less_than':
                result = (parseInt(v1) < parseInt(v2));
                break;
              case 'less_than_or_equal_to':
                result = (parseInt(v1) <= parseInt(v2));
                break;
              case 'greater_than':
                result = (parseInt(v1) > parseInt(v2));
                break;
              case 'greater_than_or_equal_to':
                result = (parseInt(v1) >= parseInt(v2));
                break;
              case 'contains':
                result = (v1.indexOf(v2) !== -1 ? true : false);
                break;
              case 'notcontains':
                result = (v1.indexOf(v2) === -1 ? true : false);
                break;
              case 'is':
                result = (v1 == v2);
                break;
              case 'not':
                result = (v1 != v2);
                break;
            }

            if ('undefined' == typeof passed) {
              passed = result;
            }

            switch (operator) {
              case 'or':
                passed = (passed || result);
                break;
              case 'and':
              default:
                passed = (passed && result);
                break;
            }

          });

          if (passed) {
            $(this).removeClass("df-disabled");//animate({opacity: 'show', height: 'show'}, 200);
          }
          else {
            $(this).addClass("df-disabled");//.animate({opacity: 'hide', height: 'hide'}, 200);
          }

          delete passed;
        }
      });
    }

    function checkGlobal(_this) {
      var globalValue = _this.data("global");
      if (_this.val) {
        var value = _this.val().trim();
        if (value == globalValue || (globalValue == undefined && value == "")) {
          _this.addClass("df-global-active").removeClass("df-global-inactive");
        }
        else {
          _this.addClass("df-global-inactive").removeClass("df-global-active");
        }
      }
    }

    parse_condition();
    $('.df-box .df-option div>:input[id^="dearpdf_"][data-global]').each(function () {
      checkGlobal($(this));
    });

  }

  $(document).ready(function () {

    var uploadMediaClass = "df-upload-media";

    var thumbAutoButton = null,
      thumbSrcInput = null,
      thumbnailPreview = null;

    $("#content").val($("#dearpdf_settings").val());

    initTabs({
      activeClass: "df-active",
      hashUpdateClass: "df-update-hash",
      tabsId: "df-tabs",
      tabsListId: "df-tabs-list"
    });

    function uploadMedia(options) {
      var title = options.title || 'Select File',
        text = options.text || 'Send to DearPDF',
        urlInput = options.target;

      var multiple = options.multiple == true ? 'add' : false;
      var uploader = wp.media({
        multiple: multiple,
        title: title,
        button: {
          text: text
        },
        library: {
          type: options.type
        }

      })
        .on('select', function () {
          var files = uploader.state().get('selection');

          if (multiple == false) {
            var fileUrl = files.models[0].attributes.url;
            if (urlInput) urlInput.val(fileUrl);
            if (options.callback) options.callback(fileUrl);
          }
          else {
            if (options.callback) options.callback(files);
          }


        })
        .open();
    }

    //upload doc
    $(document).on('click', '#dearpdf_upload_source', function (e) {
      e.preventDefault();
      uploadMedia({
        target: $(this).parent().find("input"),
        type: 'application/pdf',
        callback: function (url) {
          if (thumbAutoButton)
            thumbAutoButton.trigger("click");
          parse_condition();
          checkGlobal($("#dearpdf_upload_source"));
        }
      });
    });

    $(document).on('click', '#dearpdf_upload_pdfThumb', function (e) {
      e.preventDefault();
      uploadMedia({
        type: 'image',
        callback: function (src) {
          updateThumb(src);
        }
      });
    });
    $(document).on('click', '#dearpdf_upload_backgroundImage', function (e) {
      e.preventDefault();
      uploadMedia({
        target: $(this).parent().find("input"),
        type: 'image',
      });
    });


    var thumbLoaded = false;

    function updateThumb(src) {
      if (thumbnailPreview)
        thumbnailPreview.find("img").attr("src", src);
      if (thumbnailPreview)
        thumbSrcInput.val(src);
      thumbnailPreview.toggleClass("df-empty-thumb", src == "");
      thumbLoaded = true;
      thumbAutoButton.removeClass("df-disabled");
      thumbAutoButton.html("Auto Generate PDF Thumb");
    }

    function updateThumbProgress(info) {
      if (!thumbLoaded)
        thumbAutoButton.html("Auto Generate PDF Thumb : " + info);
    }

    var getPDFThumb = void 0;
    if(window.DEARPDF && window.DEARPDF.getPDFThumb) getPDFThumb = window.DEARPDF.getPDFThumb;
    if(window.DEARFLIP && window.DEARFLIP.getPDFThumb) getPDFThumb = window.DEARFLIP.getPDFThumb;
    if (getPDFThumb !== void 0) {
      thumbSrcInput = $("#dearpdf_pdfThumb");
      thumbAutoButton = $("<a href='#' class='df-button button button-secondary auto-thumb' data-condition='dearpdf_source:contains(http)'>Auto Generate PDF Thumb</a>").appendTo(thumbSrcInput.parent())
        .on("click", function (e) {
          e.preventDefault();
          getPDFThumb({
            pdfURL: $("#dearpdf_source").val(),
            updateInfo: updateThumbProgress,
            callback: updateThumb
          });
          thumbLoaded = false;
          updateThumbProgress("Loading...");
          thumbAutoButton.addClass("df-disabled");
        });

      thumbnailPreview = $("<div id='thumb_preview'>")
        .data("option", DEARPDF.openFileOptions)
        .on("click", function () {
          DEARPDF.openFileOptions.source = $("#dearpdf_source").val();
          DEARPDF.openFileOptions.viewerType = $("#dearpdf_viewerType").val() != "global"
                                                 ? $("#dearpdf_viewerType").val() : dearpdfWPGlobal.viewerType;
          DEARPDF.openFileOptions.is3D = $("#dearpdf_is3D").val() != "global" ? $("#dearpdf_is3D").val() == "true"
                                                                                : dearpdfWPGlobal.is3D;
        })
        .appendTo($("#dearpdf_pdfThumb_box .df-upload"))
        .html("\n" +
          "        <div class='df-book-cover'>\n" +
          "            <img>\n" +
          "        </div>");

      updateThumb($("#dearpdf_pdfThumb").val());
    }

    initConditionals();

  });

})(jQuery);
