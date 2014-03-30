$(function() {

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

  // get data from server
  function fillData() {
    $.getJSON("/data/data.json", function(data) {
      var template = $("#event-template");
      function fillEachEvent(array, targetSelector) {
        for (var i = 0; i < array.length; ++i) {
          var e = array[i];
          var t = template.clone().removeClass("invisible");
          t.find(".event-title").text(e.title);
          t.find(".event-image").append($("<img>", { src: e.image }));
          t.find(".event-description").text(e.description);
          $(targetSelector).append(t);
        }
      }
      fillEachEvent(data.about.events, "#content-about");
      fillEachEvent(data.projects, "#content-projects");
    });
  }

  // main function
  fillData();
  navScroller();

});
