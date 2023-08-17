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

// Submit Answer
$("#submitAnswer").click(function () {
  var firstTimeOut = document.getElementById("firstTimeOutside").value;
  var result = firstTimeOut.toString().toLowerCase().replace(/\s/g, '');
  var finalResult = result.includes("devopshandbook");
  if (finalResult == true) {
    var currentPath = window.location.pathname;
    var newPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    window.location.href = newPath + "/blaahh.html";
  } else {
    document.getElementById("errorHandler").innerHTML =
      "Wrong Answer. Please Try again.";
  }
});

console.clear();
