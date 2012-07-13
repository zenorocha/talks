window.onload = function() {

	var canvas = document.getElementById('rostoRedondo');
	var contexto = canvas.getContext('2d');

	// Cabeça
	contexto.arc(110, 110, 100, 0, Math.PI*2, true);
	
	// Boca
	contexto.moveTo(165, 120);
	contexto.arc(110, 120, 55, 0, Math.PI, false);
	
	// Olho esquerdo
	contexto.moveTo(90, 75);
	contexto.arc(85, 75, 5, 0, Math.PI*2, true);
	
	// Olho direito
	contexto.moveTo(135,75);
	contexto.arc(140, 75, 5, 0, Math.PI*2, true);

	contexto.lineWidth = 10;
	contexto.strokeStyle = "white";
	contexto.stroke();

};