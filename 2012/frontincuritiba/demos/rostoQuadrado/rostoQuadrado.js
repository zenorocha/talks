window.onload = function() {

	var canvas = document.getElementById('rostoQuadrado');
	var contexto = canvas.getContext('2d');
	
	// Cabeça
    contexto.rect(25, 25, 200, 200);

    // Olho esquerdo
    contexto.rect(90, 80, 20, 20);

    // Olho direito
    contexto.rect(140, 80, 20, 20);

    // Boca
    contexto.moveTo(50, 180);
    contexto.lineTo(200, 180);

    contexto.lineWidth = 10;
	contexto.strokeStyle = "white";
    contexto.stroke();
};