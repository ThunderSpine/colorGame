//Declarations
const easyMode = 3;
const hardMode = 6;
const defaultColor = '#232323';
const title = document.querySelector('h1');
const msg = document.querySelector('#message');
const easyBtn = document.querySelector('#easy')
const hardBtn = document.querySelector('#hard')
const resetBtn = document.querySelector("#reset");
const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#colorDisplay');
let pickedColor = new String;
let numberOfSquares = hardMode;
let colors = new Array;

//	Listeners.
	//User-square feedback
	resetBtn.addEventListener("click", () => {gameStart(numberOfSquares)});
		for (let i = 0; i < squares.length; i++) {
			squares[i].addEventListener('click', function () {
				let clickedColor = this.style.backgroundColor;
				evaluation(clickedColor, squares[i]);
			});
		};

	//Reset trigger (using spacebar)
	document.body.addEventListener('keydown' , (e) => {if(e.keyCode===32){gameStart()}});

	//Set difficulty to easy
	easyBtn.addEventListener('click', () => {
		hardBtn.classList.remove('selected');
		easyBtn.classList.add('selected');
		gameStart();
	});

	//Set difficulty to hard
	hardBtn.addEventListener('click', () => {
		easyBtn.classList.remove('selected');
		hardBtn.classList.add('selected');
		gameStart();
	});

//	Generate a random color
let randomColor = () => {
	let r = Math.floor(Math.random()*256);
	let g = Math.floor(Math.random()*256);
	let b =	Math.floor(Math.random()*256);
	let rgb = `rgb(${r}, ${g}, ${b})`;
	
	return rgb;
};

//	Generate a colors array given a specific number of items
let generateRandomColors = (numOfColors) => {
	let randColor = new Array;

	for (let i = 0; i < numOfColors; i++) {
		randColor.push(randomColor());
	}
	colors = randColor;
	return colors;
};

//	Assign colors to squares
let colorizer = (colorSetting) => {
	for(let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colorSetting? colorSetting : colors[i];
		} else {
			squares[i].style.backgroundColor = defaultColor;
		}
	}
};

//	Pick a color from the colors array
let pickColor = (numOfColors) => {
	let randNum = Math.floor(Math.random()*numOfColors);

	pickedColor = colors[randNum];
	return pickedColor;
};

//	Game initialization
let init = (numberOfSquares) =>{
	generateRandomColors(numberOfSquares);
	colorizer();
	pickColor(numberOfSquares);
	msg.textContent = '';
	title.style.backgroundColor="#4682b4"
	resetBtn.textContent = 'New Colors';
	colorDisplay.textContent = pickedColor;
};

//	Evaluate players election
let evaluation = (clickedColor, targetSquare) => {
	if (clickedColor === pickedColor) {
		msg.textContent = 'Success!';
		title.style.backgroundColor = clickedColor;
		colorizer(clickedColor);
		resetBtn.textContent = 'Play Again?';
	} else {
		msg.textContent = 'Try Again';
		targetSquare.style.backgroundColor = defaultColor;
	}
};

//	Game engine
let gameStart = () =>{
		//Initializing
	easyBtn.classList.contains('selected')
		? numberOfSquares = easyMode
		: numberOfSquares = hardMode;
	init(numberOfSquares)
};

//	Game trigger
gameStart();