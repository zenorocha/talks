var PEjs = {};

PEjs.equalCoordinates = function (coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

PEjs.checkCoordinateInArray = function (coord, arr) {
  var isInArray = false;
  $.each(arr, function (index, item) {
	if (PEjs.equalCoordinates(coord, item)) {
	  isInArray = true;
	}
  });
  return isInArray;
};

PEjs.game = (function () {
  var canvas, contexto;
  var fps;
  var snake;
  var apple;
  var score;
  var timeout;
  
  PEjs.width = 450;
  PEjs.height = 450;
  PEjs.blockSize = 15;
  PEjs.widthInBlocks = PEjs.width / PEjs.blockSize;
  PEjs.heightInBlocks = PEjs.height / PEjs.blockSize;

  function init() {
	
	var $canvas = $('#snake');
	
	if ($canvas.length === 0) {
	  $('body').append('<canvas id="snake">');
	}

	$canvas = $('#snake');
	$canvas.attr('width', PEjs.width);
	$canvas.attr('height', PEjs.height);
	
	canvas = $canvas[0];
	contexto = canvas.getContext('2d');
	score = 0;
	fps = 100;
	snake = PEjs.snake();
	apple = PEjs.apple();
	bindEvents();
	gameLoop();

  }

  function gameLoop() {
	
	contexto.clearRect(0, 0, PEjs.width, PEjs.height);
	snake.advance(apple);
	draw();

	if (snake.checkCollision()) {
	  snake.retreat(); //move snake back to previous position
	  snake.draw(contexto); //draw snake in its previous position
	  gameOver();
	}
	else {
	  timeout = setTimeout(gameLoop, fps);
	}

  }

  function draw() {
	snake.draw(contexto);
	drawBorder();
	apple.draw(contexto);
	drawScore();
  }

  function drawScore() {
	contexto.save();
	contexto.font = 'bold 102px sans-serif';
	contexto.fillStyle = 'rgba(0, 0, 0, 0.1)';
	contexto.textAlign = 'center';
	contexto.textBaseline = 'middle';
	var centreX = PEjs.width / 2;
	var centreY = PEjs.width / 2;
	contexto.fillText(score.toString(), centreX, centreY);
	contexto.restore();
  }

  function gameOver() {
	contexto.save();
	contexto.font = 'bold 30px sans-serif';
	contexto.fillStyle = 'rgba(0, 0, 0, 0.5)';
	contexto.textAlign = 'center';
	contexto.textBaseline = 'middle';
	contexto.strokeStyle = 'white';
	contexto.lineWidth = 2;
	var centreX = PEjs.width / 2;
	var centreY = PEjs.width / 2;
	contexto.fillText('Game Over', centreX, centreY - 10);
	contexto.font = 'bold 15px sans-serif';
	contexto.fillText('clique aqui para inserir uma ficha', centreX, centreY + 15);
	contexto.restore();
  }

  function drawBorder() {
	contexto.save();
	contexto.strokeStyle = '#fbca13';
	contexto.lineWidth = PEjs.blockSize;
	contexto.lineCap = 'square';
	var offset = contexto.lineWidth / 2;
	var corners = [
	  [offset, offset],
	  [PEjs.width - offset, offset],
	  [PEjs.width - offset, PEjs.height - offset],
	  [offset, PEjs.height - offset]
	];
	contexto.beginPath();
	contexto.moveTo(corners[3][0], corners[3][1]);
	$.each(corners, function (index, corner) {
	  contexto.lineTo(corner[0], corner[1]);
	});
	contexto.stroke();
	contexto.restore();
  }

  function restart() {
	clearTimeout(timeout);
	$('body').unbind('keydown');
	$(PEjs).unbind('appleEaten');
	$(canvas).unbind('click');
	PEjs.game.init();
  }
  
  function bindEvents() {
	var keysToDirections = {
	  37: 'left',
	  38: 'up',
	  39: 'right',
	  40: 'down'
	};

	$(document).keydown(function (event) {
	  var key = event.which;
	  var direction = keysToDirections[key];

	  if (direction) {
		snake.setDirection(direction);
		event.preventDefault();
	  }
	  else if (key === 32) {
		restart();
	  }
	});

	$(PEjs).bind('appleEaten', function (event, snakePositions) {
	  apple.setNewPosition(snakePositions);
	  score++;
	  fps *= 0.99; //subtle speed-up
	});

	$(canvas).click(restart);
  }

  return {
	init: init
  };
})();

PEjs.apple = function () {
  
  var position = [6, 6];

  function draw(contexto) {
	contexto.save();
	contexto.fillStyle = '#75bd43'; //apple green
	contexto.beginPath();
	var radius = PEjs.blockSize / 2;
	var x = position[0] * PEjs.blockSize + radius;
	var y = position[1] * PEjs.blockSize + radius;
	contexto.arc(x, y, radius, 0, Math.PI * 2, true);
	contexto.fill();
	contexto.restore();
  }

  function random(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
  }

  //get a random position within the game bounds
  function getRandomPosition() {
	var x = random(1, PEjs.widthInBlocks - 2);
	var y = random(1, PEjs.heightInBlocks - 2);
	return [x, y];
  }

  function setNewPosition(snakeArray) {
	var newPosition = getRandomPosition();
	//if new position is already covered by the snake, try again
	if (PEjs.checkCoordinateInArray(newPosition, snakeArray)) {
	  return setNewPosition(snakeArray);
	}
	//otherwise set position to the new position
	else {
	  position = newPosition;
	}
  }

  function getPosition() {
	return position;
  }

  return {
	draw: draw,
	setNewPosition: setNewPosition,
	getPosition: getPosition
  };
};

PEjs.snake = function () {
  var previousPosArray;
  var posArray = [];
  posArray.push([6, 4]);
  posArray.push([5, 4]);
  var direction = 'right';
  var nextDirection = direction;

  function setDirection(newDirection) {
	var allowedDirections;

	switch (direction) {
	case 'left':
	case 'right':
	  allowedDirections = ['up', 'down'];
	  break;
	case 'up':
	case 'down':
	  allowedDirections = ['left', 'right'];
	  break;
	default:
	  throw('Invalid direction');
	}
	if (allowedDirections.indexOf(newDirection) > -1) {
	  nextDirection = newDirection;
	}
  }

  function drawSection(contexto, position) {
	var x = PEjs.blockSize * position[0];
	var y = PEjs.blockSize * position[1];
	contexto.fillRect(x, y, PEjs.blockSize, PEjs.blockSize);
  }

  function draw(contexto) {
	contexto.save();
	contexto.fillStyle = '#1d9ed6';
	for(var i = 0; i < posArray.length; i++) {
	  drawSection(contexto, posArray[i]);
	}
	contexto.restore();
  }

  function checkCollision() {
	var wallCollision = false;
	var snakeCollision = false;
	var head = posArray[0]; //just the head
	var rest = posArray.slice(1); //the rest of the snake
	var snakeX = head[0];
	var snakeY = head[1];
	var minX = 1;
	var minY = 1;
	var maxX = PEjs.widthInBlocks - 1;
	var maxY = PEjs.heightInBlocks - 1;
	var outsideHorizontalBounds = snakeX < minX || snakeX >= maxX;
	var outsideVerticalBounds = snakeY < minY || snakeY >= maxY;

	if (outsideHorizontalBounds || outsideVerticalBounds) {
	  wallCollision = true;
	}
	//check if the snake head coords overlap the rest of the snake
	snakeCollision = PEjs.checkCoordinateInArray(head, rest);
	return wallCollision || snakeCollision;
  }

  function advance(apple) {
	//make a copy of the head of the snake otherwise
	//the changes below would affect the head of the snake
	var nextPosition = posArray[0].slice();
	direction = nextDirection;
	switch (direction) {
	case 'left':
	  nextPosition[0] -= 1;
	  break;
	case 'up':
	  nextPosition[1] -= 1;
	  break;
	case 'right':
	  nextPosition[0] += 1;
	  break;
	case 'down':
	  nextPosition[1] += 1;
	  break;
	default:
	  throw('Invalid direction');
	}

	previousPosArray = posArray.slice(); //save previous array
	posArray.unshift(nextPosition);
	if (isEatingApple(posArray[0], apple)) {
	  $(PEjs).trigger('appleEaten', [posArray]);
	}
	else {
	  posArray.pop();
	}
  }

  function isEatingApple(head, apple) {
	return PEjs.equalCoordinates(head, apple.getPosition());
  }

  function retreat() {
	posArray = previousPosArray;
  }

  return {
	draw: draw,
	advance: advance,
	retreat: retreat,
	setDirection: setDirection,
	checkCollision: checkCollision
  };
}


PEjs.game.init();