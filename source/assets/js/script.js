
$(function(){
  MainNav.init();
});

MainNav = {
  init: function() {
    $('.hamburger').on('click touch', function(e){
      e.preventDefault();
      $('.hamburger').toggleClass('open');
      $('.main-nav').toggleClass('visible');
    })
  }
};