var click = 0;
var round = 1;
var matched = 0;
var cards;
var imagesBox = new Array;
var removedItems = new Array;
var lvl;
var dx = 0;
var PickedCard;

var Picks = {
   first: null,
   last: null
};

var imagesBox1 = [
   "images/level1/WilkMEM.jpg",
   "images/level1/KonMEM.jpg",
   "images/level1/LionMEM.jpg",
   "images/level1/owcaMEM.jpg",
   "images/level1/LionMEM.jpg",
   "images/level1/WilkMEM.jpg",
   "images/level1/owcaMEM.jpg",
   "images/level1/KonMEM.jpg"
];
var imagesBox2 = [
   "images/level2/ChichenMEM.jpg",
   "images/level2/ColosseumMEM.jpg",
   "images/level2/EifelMEM.jpg",
   "images/level2/ChichenMEM.jpg",
   "images/level2/TajMahalMEM.jpg",
   "images/level2/ColosseumMEM.jpg",
   "images/level2/pyramidMEM.jpg",
   "images/level2/statueMEM.jpeg",
   "images/level2/pyramidMEM.jpg",
   "images/level2/TajMahalMEM.jpg",
   "images/level2/EifelMEM.jpg",
   "images/level2/statueMEM.jpeg"
];
var imagesBox3 = [
   "images/level3/znak1.png",
   "images/level3/znak2.png",
   "images/level3/znak9.png",
   "images/level3/znak5.png",
   "images/level3/znak3.png",
   "images/level3/znak6.png",
   "images/level3/znak1.png",
   "images/level3/znak4.png",
   "images/level3/znak5.png",
   "images/level3/znak6.png",
   "images/level3/znak4.png",
   "images/level3/znak7.png",
   "images/level3/znak9.png",
   "images/level3/znak2.png",
   "images/level3/znak7.png",
   "images/level3/znak3.png"
];

//funkcja rysowania pola po naciśnieciu przycisków

var btDesk = function () {
//levele
   for (i = 1; i <= 3; i++) {

      $('.btStart' + i).on('click', function () {

         if ($(this)[0].className === 'btStart1') {
            //ustaw liczbę kart
            cards = 8;
            //lvl
            imagesBox = shuffle(imagesBox1);
            //ustaw level do rankingu
            lvl = 1;
            //rysowanie pola gry z 8 kartami 
            for (z = 1; z <= 4; z++) {
               $('.deskContainer').prepend('<div class = "imagesContainer' + z + '">' + '</div>');

               for (i = 1; i <= 2; i++) {
                  dx = dx + 1;
                  $('.imagesContainer' + z).prepend('<div class = "emptyImg' + ' d' + dx + '"></div>');
               };
            };
            window.location.hash = "#view";
         };
         if ($(this)[0].className === 'btStart2') {
            //ustaw liczbę kart
            cards = 12;
            //rozstaw losowo obrazki w tablicy
            imagesBox = shuffle(imagesBox2);
            //ustaw level do rankingu
            lvl = 2;
            //rysowanie pola gry z 12 kartami 
            for (z = 1; z <= 4; z++) {
               $('.deskContainer').prepend('<div class = "imagesContainer' + z + '">' + '</div>');
               for (i = 1; i <= 3; i++) {
                  dx = dx + 1;
                  $('.imagesContainer' + z).prepend('<div class = "emptyImg' + ' d' + dx + '"></div>');
               };
            };
            window.location.hash = "#view";
         };
         if ($(this)[0].className === 'btStart3') {
            //ustaw liczbę kart
            cards = 16;
            //rozstaw losowo obrazki w tablicy
            imagesBox = shuffle(imagesBox3);
            //ustaw level do rankingu
            lvl = 3;
            //rysowanie pola gry z 16 kartami 
            for (z = 1; z <= 4; z++) {
               $('.deskContainer').prepend('<div class = "imagesContainer' + z + '">' + '</div>');

               for (i = 1; i <= 4; i++) {
                  dx = dx + 1;
                  $('.imagesContainer' + z).prepend('<div class = "emptyImg' + ' d' + dx + '"></div>');
               };
            };
            window.location.hash = "#view";
         };
         clickFunction();
         $('.btStart1')[0].disabled = true;
         $('.btStart2')[0].disabled = true;
         $('.btStart3')[0].disabled = true;
      });
   };
};
//funkcja przywracajaca usuniete obrazki z localStorage
var setRemovedItems = function () {

   for (z = 0; z < 30; z++) {
      var itemR = removedItems[z];
      if (itemR !== null && itemR !== 'undefined') {
         localStorage.setItem(lvl + " " + z, removedItems[z]);
      }
   }
};

//funkcja ustawiajaca ranking po podaniu nazwy uzytkownika
var setRanking = function () {

   Loop1:
           for (i = 1; i <= 10; i++) {
      Loop2:
              for (z = 4; z < 25; z++) {

         var sc = $('.Score' + i).html();

         if (z < sc) {
            var item = localStorage.getItem(lvl + " " + z);
            if (item !== null && item !== 'undefined') {

               $('.Score' + i).html(z);
               $('.User' + i).html(item);
               localStorage.removeItem(lvl + " " + z);
               removedItems[z] = item;
               continue Loop1;
            }
         }
      }
   }
   setRemovedItems();
};
//funkcja losujaca rozstawienie kart
var shuffle = function (array) {
   var currentIndex = array.length, temporaryValue, randomIndex;

   while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
};

//funkcja usuwajaca obrazki po zakonczeniu rundy
var removeImages = function () {

   for (i = 1; i <= cards; i++) {
      //usuń content, a potem samą klasę additional ze wszystkich div-ów, w których jest 
      $('.additional' + i).css({'content': ''});
      $('.d' + i)[0].classList.remove("additional" + i);
   };
};
//funkcja usuwajaca obrazki po zakonczeniu rundy
var clickCounter = function () {
   if (click >= 2) {
      round = round + 1;
      removeImages();
      roundFunction();
      click = 0;
      Picks.first = null;
      Picks.last = null;
   }
};
//funkcja ustawiajaca rundy
var roundFunction = function () {
   $('.round').text("Round " + round);
};
//funkcja wygranej, wyswietlajaca sie po dopasowaniu wszystkich par
var winFunction = function () {
   alert('You won!! Congratulations!! ');
   matched = 0;
   window.location.hash = "#view2";
};

//funkcja dodawania nazwy uzytkownika do rankingu
var userName = function () {

   $('.submit').on('click', function () {
      var name;
      var lastName;
      var username;
      name = $('#inlineFormName').val();
      lastName = $('#inlineFormLastName').val();
      username = name + ' ' + lastName;
      window.location.hash = "#view2";

      Loop3:
              for (i = 1; i <= 10; i++) {

         var sc = $('.Score' + i).html();

         if (round < $('.Score' + i).html()) {

            //to dodaj w tym miejscu wartość round, username i przerwij pętle
            $('.Score' + i).html(round);
            $('.User' + i).html(username);
            localStorage.setItem(lvl + " " + round, username);

            break Loop3;
         }
      }
      setRanking();
   });
};

// funkcja klikniecia kart odwracajaca obrazki i obslugujaca ich parowanie 
var clickFunction = function () {

   $('.deskContainer .emptyImg').click(function (event) {
      clickCounter();

      console.log(event.target);

//jeśli już dopasowana, to wyjdź z funkcji
      if ($(event.target).hasClass('matched')) {

         return;
      };
      //jeśli wybrano tą samą kartę, co poprzednio
      if (PickedCard === event.target) {
         return;
      }
      //pokaż obrazek kryjący się - założenie, że nie będzie więcej niż 99 obrazków
      //znajdź po charach obrazek
//jeśli nie kliknąłeś w tą samą lub dopasowaną kartę - licz kliknięcie
      click = click + 1;
      var fieldChosen = $(event.target)[0].className;
      var secondChar = fieldChosen.charAt(fieldChosen.length - 1);

      if (!isNaN(fieldChosen.charAt(fieldChosen.length - 2))) {
         var firstChar = fieldChosen.charAt(fieldChosen.length - 2);
         char = firstChar + secondChar;
      }
      if (isNaN(fieldChosen.charAt(fieldChosen.length - 2))) {
         char = secondChar;
      }
      //dopasuj obrazek 
      $(event.target).addClass('additional' + char);
      $('.additional' + char).css('content', 'cover');
      $('.additional' + char).css('content', 'url' + '("' + imagesBox[char - 1] + '")');
      //dodaj obrazki do objektu Picks 
      if (Picks.first === null) {
         Picks.first = imagesBox[char - 1];
      } else {
         Picks.last = imagesBox[char - 1];
      }
      if (Picks.first === Picks.last) {
         $(event.target).addClass('animated bounceOut matched');
         $(PickedCard).addClass('animated bounceOut matched');
         matched = matched + 2;
         
      } else if (Picks.first !== null & Picks.last !== null) {
         setTimeout(clickCounter, 800);
      }
      //jeśli wcześniej wybrana karta równa nie obecnemu targetowi
      PickedCard = event.target;
      console.log(matched);
      if (cards === matched) {
         $('.deskContainer').addClass('animated2 flash');
         setTimeout(winFunction, 3000);
      }
   }); //end Click Function
};

//funkcja powrotu do startu po nacisnieciu przycisku
var backToStart = function () {
   $('.btback').on('click', function () {
      location.reload();
   });
};

var main = function () {
   btDesk();
   userName();
   backToStart();
   clickFunction();
};

$(document).ready(main);
