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
let difficulty = hardMode;
let colors = new Array;
let pickedColor = new String;
//Asignar colores a los cuadrados.
let colorizer = () => {
	for(let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i]
		} else {
			squares[i].style.backgroundColor = defaultColor;
		}
	}
}
//Elegir un color del arreglo de colores.
let pickColor = (numOfColors) => {
	let randNum = Math.floor(Math.random()*numOfColors);
	pickedColor = colors[randNum]
	return pickedColor
}
//Generar un color random
let randomColor = () => {
	let r = Math.floor(Math.random()*256)
	let g = Math.floor(Math.random()*256)
	let b =	Math.floor(Math.random()*256)
	let rgb = `rgb(${r}, ${g}, ${b})`
	return rgb
}
//Generar un arreglo de colores con el número especificado de items.
let generateRandomColors = (numOfColors) => {
	let randColor = new Array;
	for (let i = 0; i < numOfColors; i++) {
		randColor.push(randomColor());
	}
	colors = randColor;
	return colors
};
//
let changeColors = (winnerColor) => {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = winnerColor
	}
};
let init = (difficulty) =>{
	resetBtn.addEventListener("click", () => {gameStart(difficulty)});
	title.style.backgroundColor="#4682b4"
	resetBtn.textContent = 'New Colors';
	generateRandomColors(difficulty);
	colorizer();
	pickColor(difficulty);
	colorDisplay.textContent = pickedColor;
}
//Game engine.
let gameStart = () =>{
		//Initializing
	easyBtn.classList.contains('selected')
		? difficulty = easyMode
		: difficulty = hardMode;
	init(difficulty)
		//Core
	for (let i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', function () {
			let clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				msg.textContent = 'Success!';
				title.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
				resetBtn.textContent = 'Play Again?'
			} else {
				msg.textContent = 'Try Again';
				squares[i].style.backgroundColor = defaultColor;
			}
		});
	}
};
gameStart();

easyBtn.addEventListener('click', () => {
	hardBtn.classList.remove('selected')
	easyBtn.classList.add('selected')
	gameStart()
})
hardBtn.addEventListener('click', () => {
	easyBtn.classList.remove('selected')
	hardBtn.classList.add('selected')
	gameStart()
})


//Ahora lo que haremos es a los primeros tres cuadrados le asignaremos los tres colores el arreglo , y para los otros 3 vamos a esconderlos. Para eso vamos a loopear sobre todos los cuadrados, y hacer una condicional dentro del loop que se fije que si para el índice en el que estamos hay un elemento definido en el arreglo colors, que sería un string con nuestro color, recordemos que un string es verdadero, le asigne el color a nuestro cuadrado, sino, osea que no hay ningún elemento en ese índice y por lo tanto nos devuelve undefined, que en si ya es falso, le cambie la propiedad css display del cuadrado a none, para que este se esconda. Fijémonos que cuando clickeamos easy los tres primeros cuadrados cambien de color, y los otros tres se escondan.
//Enfoquémonos en el botón hard. Otra vez tenemos que generar nuevos colores (que esta vez vuelven a ser 6), elegir un color ganador y mostrar en el título cual es el color ganador. Como vemos nuestro código se empieza a repetir bastante, no te preocupes ya vamos a volver para atrás y refactorear un poco.
//Ahora loopiemos a todos los cuadrados y asignémosle a todos un color del arreglo. Para poder volver a mostrar los cuadrados escondidos vamos a tener que darle a los cuadrados el valor block a la propiedad css display.Fíjate si después de ir a easy y volver a hard vuelven a aparecer los cuadrados escondidos y aparecen nuevos colores, también fijate si el juego sigue funcionando correctamente en ambos modos.
//En este momento estamos teniendo un bug en nuestro juego, que es que cuando estoy en easy mode y clickeo #reset este va a generar 6 nuevos colores en el arreglo que no se van a mostrar en pantalla. Para solucionar este problema vamos a crear una variable numberOfSquares que trackee con cuantos cuadrados se está jugando en ese momento. La variable iniciará siendo 6. Cuando hagamos click en easy cambiará a 3, y cuando hagamos click en hard volverá a 6. Ahora cada vez que ejecutemos generateNumberColors ya no pasaremos el número hard codeado como argumento sino que pasaremos la variable numberOfSquares. Ahora fijate si solucionamos el bug fijándonos en la consola si cuando estamos en easy mode y clickeamos new colors el arreglo de colors tiene 3 o 6 elementos.

//Ahora nuestro juego ya esta funcionando! Vayamos a darle un estilo mas atractivo, aquí tienes dos caminos posibles, o seguir el maqueteado del ejemplo, o crear tu propia version. Si elijes hacer tu propia versión, tienes q respetar lo siguiente:

//Los botones de new colors, easy y hard, no deberían parecer botones clásicos, igual que en el ejemplo. Y no deberían tener una linea azul alrededor si lo clickeamos(outline).
//El mensaje de correct y try again no tienen que mover los otros elementos cuando aparecen.
//Los cuadrados deben desaparecer con un efecto de transición de css, investiga como hacer esto.
//Cualquier duda sobre colores, tamaños y tipografías los puedes averiguar usando el inspector de elementos.

//!	Refactoriando
//Hasta este punto nuestro juego nos funciona perfecto, pero podemos mejorar nuestro código, menos repetitivo y mas prolijo, veamos como hacer esto.

//Los botones de Easy y Hard, tienen un event listener similar solo que lo q cambia es que uno muestra tres y otro 6 colores. para mejorar esto vamos a sacarles el id, y vamos hacer que ambos compartan la misma clase. Comenta las dos funciones de nuestros botones. Ahora seleccionemos los botones y agreguemos un event listener que haga lo siguiente:
//Vamos a darle al botón que clickeamos la clase selected.
//Ahora pensemos como actualizar numSquare. Para eso haremos una condicional donde dependiendo el textContent del botón que clickeamos, el valor de numSquare será 3 o 6. Podemos hacerlo usando un operador ternario para ahorrar líneas de código.
//Ahora lo que deberíamos hacer es generar nuevos colores en nuestro arreglo, elegir un color ganador, y actualizar el display de la página correctamente. Esto lo estuvimos repitiendo varias veces en nuestro código. Vamos a meterlo directamente en una función reset para simplificar líneas y no repetir siempre lo mismo.
//Nuestra función reset debería considerar el mismo if statement, donde dependiendo si hay un color mostramos el color, y si no hay lo escondemos. Esto funcionaría bien en easy y hard mode, te podés imaginar porque?
//Ahora sigamos limpiando nuestro código: ahora que tenemos una función reset podemos borrar un poco nuestro código, por ejemplo cuando clickeamos el botón #reset, directamente podemos llamar a esa función.
//También podemos usar nuestra función reset cuando recién carga la página, y esta podría estar en una nueva función init, donde pondríamos todo lo que necesita hacer cuando se carga la página, como el evento para nuestros botones de modo y el event listener de los cuadrados.
//Ahora como nuestras variables, colors y pickedColor las va a definir reset, solo las deberíamos dejar definidas sin un valor.
//Solo faltaría ejecutar init.
//Como un último detalle si quiseramos dejar init bien prolijo, podríamos hacer dos funciones para los dos listeners que agregamos, y así init solo sería una función que ejecuta tres funciones.
