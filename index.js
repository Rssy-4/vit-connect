

var canvas = document.getElementById('campusCanvas');

var ctx = canvas.getContext('2d');

ctx.fillStyle = '#87CEEB';
ctx.fillRect(0, 0, 600, 140);

ctx.fillStyle = '#90EE90';
ctx.fillRect(0, 140, 600, 60);

ctx.fillStyle = '#D2691E';
ctx.fillRect(50, 60, 120, 80);

ctx.fillStyle = '#FFD700';
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 2; j++) {
        ctx.fillRect(65 + (i * 35), 75 + (j * 30), 20, 15);
    }
}

ctx.fillStyle = '#8B4513';
ctx.fillRect(95, 110, 30, 30);

ctx.fillStyle = '#4682B4';
ctx.fillRect(220, 50, 150, 90);

ctx.fillStyle = '#E0E0E0';
var windowIndex = 0;
while (windowIndex < 4) {
    ctx.fillRect(235 + (windowIndex * 35), 70, 20, 20);
    windowIndex = windowIndex + 1;
}

ctx.fillStyle = '#FFFFFF';
ctx.font = '14px Arial';
ctx.fillText('LIBRARY', 260, 120);

ctx.fillStyle = '#228B22';
ctx.beginPath();
ctx.arc(430, 90, 30, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#8B4513';
ctx.fillRect(425, 120, 10, 20);

ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.arc(540, 40, 25, 0, Math.PI * 2);
ctx.fill();

ctx.strokeStyle = '#999';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(110, 140);
ctx.lineTo(110, 170);
ctx.lineTo(295, 170);
ctx.lineTo(295, 140);
ctx.stroke();

ctx.fillStyle = '#333';
ctx.font = 'bold 16px Arial';
ctx.fillText('VIT Campus', 240, 195);

var featureCards = document.querySelectorAll('.feature-card');

for (var k = 0; k < featureCards.length; k++) {
    featureCards[k].addEventListener('mouseover', function() {
        this.style.backgroundColor = '#e8f0fe';
    });

    featureCards[k].addEventListener('mouseout', function() {
        this.style.backgroundColor = '#ffffff';
    });
}
