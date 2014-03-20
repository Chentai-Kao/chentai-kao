$(function() {

  $(".content-projects").hide();
  $("#nav-about").click(function(e) {
    e.preventDefault();
    $(".content").hide();
    $(".content-about").show();
  });
  $("#nav-projects").click(function(e) {
    e.preventDefault();
    $(".content").hide();
    $(".content-projects").show();
  });

});
