
var email_maker_app = {

  settings : {
    'interval' : '',
      'header' : '',
      'footer' : '',
       'paths' : {
        'local' : '',
          'dev' : '',
      'bigfoot' : ''
    }
  },

  data : [], // body or hero data

  renderEmail : function () {
    var self = this;
    if( this.settings.header != '' && this.settings.footer != '' && this.data.length > 0 ) {
      payloadStr = this.settings.header;
      for( i = 0; i < this.data.length; i++ ) {
        heroTmpl = _.template($('#hero-tmpl').html()) ; // underscore js template utility
        payloadStr += heroTmpl(this.data[i]);
      }
      payloadStr += this.settings.footer;
      $('#workspace').empty().append('<iframe id="payload"></iframe>');
      document.getElementById('payload').contentWindow.document.write(payloadStr);
      this.settings.interval = setTimeout(function(){
        $('#payload').height($('#workspace').height());
        clearInterval(self.settings.interval);
      },100);
    } else {
      return false;
    }
  },

  dismissModal : function(){
    $('.modal-body').find('form').remove();
    $('#utility_modal').modal('hide');
  },

  activateModal : function(){
    $('#utility_modal').modal('show');
  },

  buildModal : function (navText) {
    var self = this;
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
      this.settings.interval = setTimeout(function(){
        self.bindFormBtns(navText);
        clearInterval(self.settings.interval);
      },100);
    } else {
      // alert('what\'t you do fool');
    }
  },

  bindFormBtns : function (navText) {
    var self = this;
    if( navText.toLowerCase() == 'header' || navText.toLowerCase() == 'footer' ) {
      this.settings.formName = 'set';
    } else if ( navText.toLowerCase() == 'body' ){
      this.settings.formName = 'hero';
    } else {
      this.settings.formName = 'test';
    }
    $('#submit_btn').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      if( navText.toLowerCase() == 'header' || navText.toLowerCase() == 'footer' ) {
        if( navText.toLowerCase() == 'header') {
          self.settings.header = $($('textarea')[0]).val();
        } else if ( navText.toLowerCase() == 'footer' ) {
          self.settings.footer = $($('textarea')[0]).val();
        }
      } else if ( navText.toLowerCase() == 'body' ) {
        inputObj = {};
        self.settings.formTest = 0;
        $('input[type="text"]').each(function(){
          if( $(this).val() != '' ) {
            inputObj[$(this).attr('name').toLowerCase()] = $(this).val();
          } else {
            if( $(this).attr('name') != 'img_link' ) {
              self.settings.formTest = 1;
            }
          }
        });
        if( self.settings.formTest != 1 ) {
          self.data.push(inputObj);
        } else {
          alert('please fill out the form');
          return false;
        }
      }
      if( $('#' + navText.toLowerCase() + '_set').val() != '' ) {
        self.dismissModal()
        self.renderEmail();
      } else {
        alert('please enter markup');
      }
    });
    $('#reset_btn').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      self.dismissModal();
    });
    $('#html_tmpl').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      console.log(navText.toLowerCase());
      if( navText.toLowerCase() != 'body' ) {
        self.populateForm(navText);
      } else {
        console.log('body 122',navText.toLowerCase());
        self.settings.interval = setTimeout(function(){
          $('#hero_img').val("http://via.placeholder.com/600x150");
        },100);
      }
    });
  },

  populateForm : function (navText) {
    $('#' + navText.toLowerCase() + '_set').val($('#'+ navText.toLowerCase() +'_tmpl').text());
  },

  downloadMarkup : function () {
    if( this.settings.header != '' && this.settings.footer != '' && this.data.length > 0 ) {
      head = document.getElementById('payload').contentWindow.document.head;
      body = document.getElementById('payload').contentWindow.document.body;
      docObj = document.getElementById('payload').contentWindow.document;
      console.log(docObj);
      payloadStr = '<!doctype><html><head>' + $(head).html() + '<head><body>' + $(body).html() + '</body></html>';
      console.log('head',$(head).html());
      // emailDoc = new Blob([payloadStr], {type: 'text/html'});
      anchorObj = document.createElement('a')
      anchorObj.href = payloadStr;
      anchorObj.download = 'example_test.html';
      anchorObj.click();
    } else {
      alert('set header, footer and at least one hero TR to download');
    }
  },

  bindMenu : function() {
    var self = this;
    $('ul#main li a').on('click',function(e){
      if( $(this).text().toLowerCase() != 'header' && $(this).text().toLowerCase() != 'footer' && $(this).text().toLowerCase() != 'body' ) {
        if ( self.settings.header != '' && self.settings.footer != '' && self.data.length > 0 ) {
          self.downloadMarkup();
        } else {
          alert('not ready to download html yet');
        }
      } else {
        self.buildModal($(this).text());
      }
    });
  },

  trayToggle : function(){
    var self = this;
    $('#content_title').on('click',function(){
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
