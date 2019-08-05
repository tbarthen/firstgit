javascript: (function() {
  function loadScripts(array, callback) {
    var loader = function(src, handler) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = script.onreadystatechange = function() {
        script.onreadystatechange = script.onload = null;
        handler();
      };
      var head = document.getElementsByTagName("head")[0];
      (head || document.body).appendChild(script);
    };
    (function run() {
      if (array.length != 0) {
        loader(array.shift(), run);
      } else {
        callback && callback();
      }
    })();
  }

  if (!($ = window.jQuery)) {
    loadScripts(
      [
        "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        "https://cdn.jsdelivr.net/g/jquery@3.0.0,mark.js@8.6.0(jquery.mark.min.js)",
        "https://rmm5t.github.io/jquery-sieve/dist/jquery.sieve.min.js"
      ],
      function() {
        console.log("All things are loaded");
        releasetheKraken();
      }
    );
  } else {
    console.log("got jq");
    releasetheKraken();
    console.log("done calling");
  }
  function releasetheKraken() {
    console.log("The Kraken has been released, master!");
    $(".g").css("background-color", "gray");
    var $context = $(".g:first").parent();
    console.log("g parent", $context.attr("class"));

    $context.children().css("background-color", "LightCyan");

    $context.sieve({
      itemSelector: $(".g"),
      complete: function() {
        var term = this.searchInput[0].value,
          $items = $context.find(this.itemSelector);
        $items.unmark({
          done: function() {
            $items.mark(term);
          }
        });
      }
    });
  }
})();
