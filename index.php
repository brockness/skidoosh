<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>email maker pof</title>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css"
    integrity="sha256-fmMNkMcjSw3xcp9iuPnku/ryk9kaWgrEbfJfKmdZ45o="
    crossorigin="anonymous"
  />
  <style>

    body {
      font-size: 12px;
      font-family: "Helvetica", Arial, sans-serif;
      background-color: #000000;
      overflow-x: hidden;
    }

    .container {
      background-color: #efefef;
      width: 900px;
      margin: 0 auto;
      background-color: #ffffff;
      border-left: 1px solid #303030;
      border-right: 1px solid #303030;
    }

    ul.nav {

    }

    ul.nav li a {
      border: 1px solid #cccccc;
      color: #303030;
    }

    #content_tray {
      z-index: 900;
      position: absolute;
      top: 0;
      left: 100%;
      width: 350px;
      margin: 0 auto 0 -30px;
      padding: 0;
      background-color: #f0f0f0;
    }

    #content_title {
      width: 30px;
      float: left;
      background-color: blue;
      margin: 0 auto;
      padding: 0;
      color: white;
      text-align: center;
    }

    #content_body {
      width: 320px;
      float: right;
      background-color: transparent;
      margin: 0 auto;
      padding: 0;
    }

    .text-small {
      font-size: 11px;
    }

  </style>
</head>
<body>

<div id="utility_modal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script type="text/temlate" id="textarea_form">
<form name="set_text" enctype="application/x-www-form-urlencoded">
  <textarea name="set_text" id="header_set" class="form-control" rows="5">

  </textarea>
  <input type="hidden" value="<%= doc_section %>_html">
  <br>
  <p><button id="set_text" class="btn btn-success">Add</button>&nbsp;<button class="btn btn-default">Reset</button></p>
</form>
</script>

<script type="text/temlate" id="input_form">
<form name="hero_text" enctype="application/x-www-form-urlencoded">
  <div class="row"
    <div class="col-xs-12">
      <input name="hero_img" id="hero_img" class="form-control" placeholder="Hero Image">
    </div>
  </div>
  <div class="row"
    <div class="col-xs-12">
      <input name="hero_alt" id="hero_alt" class="form-control" placeholder="Hero Alt">
    </div>
  </div>
  <div class="row"
    <div class="col-xs-3"></div>
    <div class="col-xs-6">
      <input name="bg_color" id="bg_color" class="form-control" placeholder="BG Color">
    </div>
    <div class="col-xs-3"></div>
  </div>
  <div class="row"
    <div class="col-xs-12">
      <br>
      <button id="hero_add" class="btn btn-success">Add</button>&nbsp;<button class="btn btn-default">Reset</button>
    </div>
  </div>
</form>
</script>

<script type="text/template" id="hero-tmpl">
<tr><!-- Image link in next line below -->
  <td valign="top" bgcolor="<%= bg_color %>" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;">
  <% if( img_link == '' ) { %>
    <img style="display: block; border: 0px;" src="<%= img_src %>" border="0" alt="<%= img_alt %>" width="600" class="imageresize" />
  <% } else { %>
    <a href="<%= img_link %>" target="_blank">
      <img style="display: block; border: 0px;" src="<%= img_src %>" border="0" alt="<%= img_alt %>" width="600" class="imageresize" />
    </a>
  <% } %>
  </td>
</tr>
</script>

<div class="container">
  <div class="row bg-success">
    <div class="col-xs-3">
    </div>
    <div class="col-xs-6 text-cetner">
      <ul class="menu nav nav-justified">
        <li class="text-center"><a href="javascript:void(0);">Header</a></li>
        <li class="text-center"><a href="javascript:void(0);">Body</a></li>
        <li class="text-center"><a href="javascript:void(0);">Footer</a></li>
        <li class="text-center"><a href="javascript:void(0);">Menace</a></li>
      </ul>
    </div>
    <div class="col-xs-3">
    </div>
  </div>
  <div class="row">
    <div class="col-xs-1"></div>
    <div class="col-xs-10" id="workspace">

    </div>
    <div class="col-xs-1"></div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <h3 class="text-center"><p class="text-small">&copy; this infernal contraption</p></h3>
    </div>
  </div>
</div>

<div class="" id="content_tray">
  <div class="" id="content_title">
    <br>
    <span class="glyphicon glyphicon-chevron-left"></span>
  </div>
  <div class="" id="content_body"></div>
</div>



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.0/underscore.js" integrity="sha256-Uap2tTK6UhgsRjhuW9LfFVED06vNSTAMfstr3H2Tols=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.js"></script>
<script>

/*
(function () {
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var create = document.getElementById('create'),
    textbox = document.getElementById('textbox');

  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(textbox.value);
    link.style.display = 'block';
  }, false);
})();
*/

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
      $('.modal-body').html(textAreaTmpl);
      this.activateModal(navText);
      this.bindFormSubmit(navText);
    } else if( navText.toLowerCase() == 'body' ) {
      inputTmpl = _.template($('#input_form').html())
      $('.modal-body').html(inputTmpl);
      this.activateModal(navText);
      this.bindFormSubmit(navText);
    } else {
      alert('what\'t you do fool');
    }
  },

  bindFormSubmit : function (navText) {
    $('.modal-body form button:nth-of-type(1)').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      alert('click');
      return false;
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


$(document).ready(function(){
  $('.container,#content_tray,#content_title,#content_body').css({'height':window.innerHeight + 'px'});
  email_maker_app.init();
});




</script>
</body>
</html>
