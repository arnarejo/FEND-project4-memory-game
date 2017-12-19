let numbersList;
let movesMade;
let time;
let seconds;
let minutes;
let timerInterval;
let text;

$(document).ready(function() {
  restart();

  $('#restart').on('click', function() {
    restart();
  });

  $('#restart_modal').on('click', function() {
    $('.modal').addClass('modal_hide');
    $('.top').removeClass('opacity');
    $('.container').removeClass('opacity');
    restart();
  });

  $('#close_modal').on('click', function() {
    $('.modal').addClass('modal_hide');
    $('.top').removeClass('opacity');
    $('.container').removeClass('opacity');
  });

  // $('.card').on('click', function(index) {
  //   $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
  //   setTimeout(function() {
  //     checkMatch();
  //   }, 500);
  // });

});

// start/restart the game
function restart() {
  numbersList = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

  seconds = 0;
  minutes = 0;

  $('#cards').children().remove();

  shuffle();

  for (let i = 0; i < 16; i++) {
    $('#cards').append('<div class="card" data-card-value="' + numbersList[i]+ '"></div>');
  }

  startClock();

  movesMade = 0;
  $('#moves_made').html(movesMade);

  setRating();
  $('#rating').html(text);

  $('.card').on('click', function(index) {
    $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
    setTimeout(function() {
      checkMatch();
    }, 500);
  });

};

// this function will shuffle all the cards
function shuffle() {
  for (let i = 0; i < numbersList.length; i++ ) {
    randomNumber = Math.round(Math.random()*i);
    temp = numbersList[i];
    numbersList[i] = numbersList[randomNumber];
    numbersList[randomNumber] = temp;
  }
};

// this function will check if last two clicked cards are a match
function checkMatch() {
  if ($('.selected').length == 2) {
    movesMade++;
    $('#moves_made').html(movesMade);

    setRating();
    $('#rating').html(text);

    first = $('.selected').first().data('cardValue');
    second = $('.selected').last().data('cardValue');

    if (first == second) {
      $('.selected').addClass('match');
      checkWin();
    } else {
      $('.selected > p').remove();
    }
    $('.selected').removeClass('selected');
  }
}

// to check if game won
function checkWin() {
  if($('.match').length == 16) {
    stopClock();
    $('#modal_message').html("Game Over you win");
    $('#finish_time').html((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
    $('#final_rating').html(text);
    $('.modal').removeClass('modal_hide');

    $('.top').addClass('opacity');
    $('.container').addClass('opacity');
  }
}

function startClock() {
  clearInterval(timerInterval);
  timerInterval = setInterval(function(){

    seconds += 1;
    if (seconds > 60) {
      minutes++;
      seconds = 0;
    }
    $('#time').html((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
  }, 1000);
  }

function stopClock() {
  clearInterval(timerInterval);
}

function setRating() {
  if (movesMade <= 10) {
    text = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>';
  } else if (movesMade <= 15) {
    text = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>';
  } else {
    text = '<i class="fa fa-star" aria-hidden="true"></i>';
  }
}
