$(function() {

  // get data from server
  function fillData() {
    $.getJSON("/data/data.json", function(data) {
      var template = $("#event-template");
      function createEventDiv(e) {
        var t = template.clone().removeClass("template");
        t.find(".event-title").text(e.title);
        t.find(".event-image").append($("<img>", { src: e.image }));
        t.find(".event-description").text(e.description);
        return t;
      }
      // "about" data
      for (var i = 0; i < data.about.events.length; ++i) {
        var e = data.about.events[i];
        var t = createEventDiv(e);
        $(".content-about").append(t);
      }
      // "projects" data
      for (var i = 0; i < data.projects.length; ++i) {
        var e = data.projects[i];
        var t = createEventDiv(e);
        $(".content-projects").append(t);
      }
    });
  }

  // main function
  fillData();

});
