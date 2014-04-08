$(function() {

  // get data from server
  function fillData() {
    $.getJSON("/data/data.json", function(data) {
      var template = $("#event-template");
      function fillEachEvent(array, targetSelector) {
        for (var i = 0; i < array.length; ++i) {
          var e = array[i];
          var t = template.clone().removeClass("invisible")
                          .addClass("event-bar");
          t.find(".event-title").html(e.title);
          t.find(".event-time").html(e.time);
          t.find(".event-image").append($("<img>", { src: e.image }));
          t.find(".event-brief").html(e.description);
          if (typeof e.team !== "undefined") {
            t.find(".event-team").html("Team: " + e.team);
          }
          if (typeof e.paper !== "undefined") {
            t.find(".event-paper").html("Paper: " + e.paper);
          }
          $(targetSelector).append(t);
        }
        $(targetSelector + "> div:last-child").removeClass("event-bar");
      }
      fillEachEvent(data.about.events, "#content-about");
      fillEachEvent(data.projects, "#content-projects");
      // other callbackes
      navScroller();
      scrollSpy();
      linkHighlight();
    });
  }

  // animate scrolling of navigation bar
  function navScroller() {
    $(".nav a").click(function(e) {
      e.preventDefault();
      var targetSelector = $(this).attr("href");
      var offset = parseInt($(targetSelector).offset().top);
      var headerHeight = parseInt($(".header-container").height());
      $("html, body").animate({ scrollTop: offset - headerHeight }, 300);
    });
  }

  // hlghlight link when mouse over
  function linkHighlight() {
    $(".event-description a").hover(
      function() { $(this).addClass("over"); },
      function() { $(this).removeClass("over"); }
    );
  }

  // highlight navigation bar based on scroll position
  function scrollSpy() {
    $(document).scroll(function(e) {
      // find ID of the target div
      var headerHeight = parseInt($(".header-container").height());
      var boundaryPos = parseInt($(document).scrollTop()) + headerHeight;
      var minDistance = parseInt($(document).height());
      var targetId = $(".content").first().attr("id");
      $(".content-container").each(function() {
        var divPos = parseInt($(this).offset().top);
        var distance = divPos - boundaryPos;
        if (distance <= 0 && Math.abs(distance) < minDistance) {
          minDistance = Math.abs(distance);
          targetId = $(this).find(".content").attr("id");
        }
      });
      // use the target ID to backtrace the navigation bar
      $(".nav a").each(function() {
        if ($(this).attr("href") === "#" + targetId) {
          $(this).addClass("highlight");
        }
        else {
          $(this).removeClass("highlight");
        }
      });
    });
  }

  // main function
  fillData();

});
