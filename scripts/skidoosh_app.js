
var email_maker_app = {

  settings : {
    'header' : '',
    'footer' : '',
    'body' : []
  },

  data : [],

  activateModal : function(navText){
    console.log('n text',navText);
    $('#utility_modal').modal('show');
  },

  buildModal : function (navText) {
    var self = this;
    console.log('navText',navText);
    $('.modal-title,.modal-body').empty();
    if( navText.toLowerCase() == 'header' || navText.toLowerCase() == 'footer' ) {
      textAreaTmpl = _.template($('#textarea_form').html())
      $('.modal-body').html(textAreaTmpl({'doc_section':navText.toLowerCase()}));
      this.activateModal(navText);
      this.bindFormBtns(navText);
    } else if( navText.toLowerCase() == 'body' ) {
      inputTmpl = _.template($('#input_form').html())
      $('.modal-body').html(inputTmpl({'doc_section':navText.toLowerCase()}));
      this.activateModal(navText);
      this.bindFormBtns(navText);
    } else {
      alert('what\'t you do fool');
    }
  },

  bindFormBtns : function (navText) {
    var self = this;
    if( navText.toLowerCase() == 'header' || navText.toLowerCase() == 'footer' ) {
      this.settings.formName = 'set';
    } else if ( navText.toLowerCase() == 'body' ){
      this.settings.formName = 'hero';
    } else {
      console.log('t',navText.toLowerCase());
      this.settings.formName = 'test';
    }
    $('.modal-body form button:nth-of-type(1)').on('click',function(e){
      $('.modal-body form').submit(function(f){
        f.preventDefault();
        f.stopPropagation();
        dataObj = $(this).serialize();
        console.log('d obj',dataObj);
      });
    });
  },

  bindMenu : function() {
    var self = this;
    $('ul.nav li a').on('click',function(e){
      self.buildModal($(this).text());
    });
  },

  trayToggle : function(){
    var self = this;
    $('#content_title').on('click',function(){
      console.log('margin right',$('#content_tray').css('margin-left'));
      if( $('#content_tray').css('margin-left') == '-30px' ) {
        $('#content_tray').animate({
           'margin-left':'-350px'
        },1000).promise().done(function(){
          $('#content_title span').removeClass('glyphicon glyphicon-chevron-left');
          $('#content_title span').addClass('glyphicon glyphicon-chevron-right');
        });
      } else if ( $('#content_tray').css('margin-left') == '-350px' ) {
        $('#content_tray').animate({
          'margin-left':'-30px'
        },1000).promise().done(function(){
          $('#content_title span').removeClass('glyphicon glyphicon-chevron-right');
          $('#content_title span').addClass('glyphicon glyphicon-chevron-left');
        });;
      }
    });
  },

  adjustWorkspace : function () {
    $('.container,#content_tray,#content_title,#content_body').css({'height':window.innerHeight + 'px'});
    $('#workspace').css({
        'height': ( window.innerHeight - ( $('.row:nth-of-type(1)').height() + $('.row:nth-of-type(3)').height() ) ) + 'px'
    });
  },

  bindResize : function () {
    var self = this;
    $(window).resize(function(){
      self.adjustWorkspace();
    });
  },

  init : function () {
    this.bindMenu();
    this.trayToggle();
    this.adjustWorkspace();
    this.bindResize();
  }

}
