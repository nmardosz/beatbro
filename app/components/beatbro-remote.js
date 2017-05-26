import Ember from 'ember';
var $ = Ember.$;

export default Ember.Component.extend({
  iosocket: Ember.inject.service('io-sockets'),
  didInsertElement () {
    var thiscontext = this;
    var userToken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var usersName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var ishosting = document.cookie.replace(/(?:(?:^|.*;\s*)hostingid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (userToken && usersName) {
      $('.beatbro-remote-nli').css('display', 'none');
      $('.beatbro-remote').css('display', 'block');
      if (ishosting) {
        $('.hostingindicator').css('display', 'block');
      } else {
        $('.hostingindicator').css('display', 'none');
      }
    } else {
      $('.beatbro-remote').css('display', 'none');
      $('.beatbro-remote-nli').css('display', 'block');
      $('.hostingindicator').css('display', 'none');
    }
    $('.remotehost').mouseover(function() {
        $('.beatbro-host-img').attr('src', '/images/site/hosticon.png');
    });
    $('.remotehost').mouseout(function() {
        $('.beatbro-host-img').attr('src', '/images/site/hosticond.png');
    });
    $('.remotejoin').mouseover(function() {
        $('.beatbro-join-img').attr('src', '/images/site/joinicon.png');
    });
    $('.remotejoin').mouseout(function() {
        $('.beatbro-join-img').attr('src', '/images/site/joinicond.png');
    });
    $('.remotehost').click(function() {
      $('.beatbro-remote').css('display', 'none');
      $('.host-settings').css('display', 'block');
    });
    $('.starthosting').click(function() {
      $('.beatbro-remote').css('display', 'none');
      if ($('.joinpassword').val() == "") {
        $("label[for=joinpassword]").text("Please enter a password.");
        $("label[for=joinpassword]").css('display', 'block');
        $('.joinpassword').css('border', 'solid 1px #ff0000');
      }
      if($('.joinpassword').val().length < 4 && $('.joinpassword').val() != "") {
        $("label[for=joinpassword]").text("Your password is too short.");
        $("label[for=joinpassword]").css('display', 'block');
        $('.joinpassword').css('border', 'solid 1px #ff0000');
      }
      if($('.joinpassword').val().length >= 4 && $('.joinpassword').val() != "") {
        $("label[for=joinpassword]").css('display', 'none');
        $('.joinpassword').css('border', '0');
      }
      if(!$('.joinsettingsfull').is(':checked') && !$('.joinsettingsview').is(':checked')) {
        $("label[for=joinsettings]").text("Please set your default join settings.");
        $("label[for=joinsettings]").css('display', 'block');
      }
      if($('.joinsettingsfull').is(':checked') || $('.joinsettingsview').is(':checked')) {
        $("label[for=joinsettings]").css('display', 'none');
      }
      if($('.joinpassword').val().length >= 4 && $('.joinpassword').val() != "" && ($('.joinsettingsfull').is(':checked') || $('.joinsettingsview').is(':checked'))) {

        var jwttoken = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var jpassword = $('.joinpassword').val();
        var url = "http://10.0.0.1:8000/remotehost?joinpassword=" + encodeURIComponent(jpassword);
        if(jwttoken) {
          $.ajax({
            type: 'GET',
            url: url,
            headers: {
              'x-access-token': jwttoken
            },
            async: true,
            contentType: "application/json",
            dataType: 'json',
            success: function(json) {
              //console.log(json);
              var issuccess = json.success;
              if(issuccess == true) {
                document.cookie = 'access_token=' + json.token + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
                document.cookie = 'username=' + json.username + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
                document.cookie = 'hostingid=' + json.hostingid + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
                document.cookie = 'joinpassword=' + json.jpassword + '; expires=Fri, 3 Aug 2070 20:47:11 UTC; path=/'
                var connecttoken = json.token;
                if(connecttoken) {
                  thiscontext.get('iosocket').socketinit(connecttoken);
                  //var socket = thiscontext.get('socketIOService').socketFor('http://10.0.0.3:9000/', {query: 'token=' + connecttoken, reconnection: false});
                  //connect_socket(connecttoken);
                }
              }
              if(issuccess == false) {
                alert("This device is already hosting");
                $('.hostingindicator').css('display', 'block');
              }
            },
            error: function(e) {
               console.log(e.message);
            }
          });
        }
      }
    });
  },
  actions: {
		login: function() {
			var currentRoute = this.get('router.url');
			$('.loginfrom').val(currentRoute);
			this.sendAction('login');
		}
  }
});
