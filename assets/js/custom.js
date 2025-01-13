$(document).ready(function() {

  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({pageNotFound : 'error_404'}); // initialize

  // define routes
  app.route({
    view: 'view_1',
    onCreate: function() { 
      var userData = JSON.parse(localStorage.getItem('userData'));
      $("#view_1").append("<h2 class=\"text-white\">Welcome, " + userData.name + "<br/></h2>"); 
    },
  });
  app.route({view: 'view_2', load: 'view_2.html'});
  app.route({view: 'view_3', load: 'view_3.html'});
  app.route({view: 'view_4', load: 'view_4.html'});
  app.route({view: 'view_5', load: 'view_5.html', 
    onReady: function() {
      console.log('View 5 is ready');
    }
  });

  // run app
  app.run();

});

