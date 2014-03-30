$(function() {

  // animate scrolling of navigation bar
  function navScroller() {
    $(".nav a").click(function(e) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: $($(this).attr("href")).offset().top
      }, 300);
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
