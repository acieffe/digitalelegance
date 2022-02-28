let container = document.querySelector('.container');
let btn = document.getElementById('spin');
let rotations = 0;
let degrees = 0;
let output = document.querySelector('.output');

btn.onclick = function () {
	rotations += Math.ceil(Math.random() * 720) + 720;
	container.style.transform = 'rotate(' + rotations + 'deg)';
   degrees = rotations % 360;
   makeSound(degrees);
};

function makeSound(degrees) {
	var tile = 0;
	setTimeout(function () {
		if (degrees <= 45) {
			tile = 8;
			var audio = new Audio('sounds/cat.mp3');
			audio.play();
		}
      else if (degrees <= 90) {
			tile = 7;
			var audio = new Audio('sounds/cow.mp3');
			audio.play();
		}
      else if (degrees <= 135) {
			tile = 6;
			var audio = new Audio('sounds/rooster.mp3');
			audio.play();
		}
      else if (degrees <= 180) {
			tile = 5;
			var audio = new Audio('sounds/duck.mp3');
			audio.play();
		}
      else if (degrees <= 225) {
			tile = 4;
			var audio = new Audio('sounds/dog.mp3');
			audio.play();
		}
      else if (degrees <= 270) {
			tile = 3;
			var audio = new Audio('sounds/sheep.mp3');
			audio.play();
		}
      else if (degrees <= 315) {
			tile = 2;
			var audio = new Audio('sounds/horse.mp3');
			audio.play();
		}
      else {
			tile = 1;
			var audio = new Audio('sounds/turkey.mp3');
			audio.play();
		}
	}, 5000); // 5 seconds
} 


