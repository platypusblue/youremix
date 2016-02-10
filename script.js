//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var movielist = [];
var counter = 0;

$('.loadVideo').on('submit', function () {
    var videoURL = $("#formVideoID").val().split("=");
    movielist[counter] = new movie(videoURL[1]);
    return false;
});


function movie(formVideoID) {

  var setVideo = formVideoID;
  var player;
  var start, duration, interval;

  function beat() {
    player.seekTo(start, true);
    player.playVideo();
    if (interval > duration) window.setTimeout(pauseVideo, duration);
    window.setTimeout(beat, interval);
  }

  function pauseVideo() {
    player.pauseVideo();
  }

  function loadVideo(thisVideo) {
    $(".movieframe").first().append(setBeatForm);
    $('.setBeat').on('submit', function () {
      var values = $(this).children();
      start = $(values[0]).val();
      duration = $(values[2]).val();
      interval = $(values[4]).val();
      beat();
      return false;
    });
    player = new YT.Player(counter.toString(), {
      height: '180',
      width: '320',
      videoId: thisVideo,
      events: {
      }
    });
    counter++;
    $('<div class="movieframe"><div id="'+ counter +'\"></div></div>').prependTo( "article" );
  }

  loadVideo(setVideo);

}

var setBeatForm = '<form name="beat" class="setBeat">Start:<input type="text" name="start" class="start"><br>Duration:<input type="text" name="duration" class="duration"><br>Interval:<input type="text" name="interval" class="interval"><br><input type="submit" value="Set Beat"></form>';
