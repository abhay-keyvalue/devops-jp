(function ($) {
  "use strict";

  // Loader
  $(function () {
    var loader = function () {
      setTimeout(function () {
        if ($("#loader").length > 0) {
          $("#loader").removeClass("show");
        }
      }, 1);
    };
    loader();
  });

  // Auto Init
  M.AutoInit();
})(jQuery);

// Play Music
body.addEventListener("click", function () {
  $("#autoPlayMusic")[0].play();
});

// Double Click
$("#dblClick").dblclick(function () {
  var currentPath = window.location.pathname;
  var newPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
  window.location.href = newPath + "/number3.html";
});

console.clear();
