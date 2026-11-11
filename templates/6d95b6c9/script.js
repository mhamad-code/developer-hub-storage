// --- TU TEXTO EXACTO, SIN CAMBIAR NADA ---
let frases = [
  { texto: "Mi ternurita hemosha ✨", clase: "c1" },
  { texto: "No sabes lo agradecido que estoy por tenerte en mi vida 🥺💖", clase: "c2" },
  { texto: "Eres mi personita especial, favorita ✨", clase: "c3" },
  { texto: "Eres única mi niña ✨", clase: "c1" },
  { texto: "Gracias por hacer que los días sean mágicos", clase: "c2" },
  { texto: "Y por más pequeño que sea, haces que mis días florezcan 🌺🌷🪷", clase: "c3" },
  { texto: "Te quiero muchísimo mi ternurita 💖", clase: "c1" },
  { texto: "Te quiero infinitamente ♾️", clase: "c2" },
  { texto: "Te quiero con todo mi corazón", clase: "c3" },
  { texto: "Nunca olvides que eres mi todo 🥺💖", clase: "c1" },
  { texto: "Te quiero muchísimo ternurita 💖", clase: "final" }
];

let indice = 0;
let contenedor = document.getElementById('contenedor-frases');
let fin = document.getElementById('fin');
let finalCorazon = document.getElementById('finalCorazon');

document.addEventListener('click', () => {
  if (indice < frases.length) {
    let p = document.createElement('p');
    p.className = 'frase ' + frases[indice].clase;
    p.textContent = frases[indice].texto;
    p.style.display = 'block';
    contenedor.appendChild(p);
    
    // 1 FUEGO ARTIFICIAL al mismo tiempo que la frase
    explotar(window.innerWidth / 2, window.innerHeight * 0.3);
    indice++;
  }
  
  if (indice === frases.length) {
    fin.style.display = 'block';
    finalCorazon.style.display = 'block';
    for (let i = 0; i < 3; i++) setTimeout(() => explotar(Math.random() * window.innerWidth, 150 + Math.random() * 250), i * 400);
  }
});

// --- FUEGOS ARTIFICIALES ---
let canvas = document.getElementById('fuegos');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particulas = [];
let colores = ['#ff1493', '#ffd700', '#a855f7', '#ff4d6d', '#00ffcc', '#ff69b4', '#ff8c00'];

function explotar(x, y) {
  let forma = Math.random();
  let color = colores[Math.floor(Math.random() * colores.length)];
  let cantidad = 100;
  for (let i = 0; i < cantidad; i++) {
    let angulo, radio;
    if (forma < 0.3) {
      let t = Math.random() * Math.PI * 2;
      let hx = 16 * Math.pow(Math.sin(t), 3);
      let hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      angulo = Math.atan2(hy, hx);
      radio = Math.sqrt(hx * hx + hy * hy) * 3.2;
    } else if (forma < 0.45) {
      let t = (i / cantidad) * Math.PI * 2;
      radio = (i % 2 == 0 ? 90 : 40);
      angulo = t;
    } else {
      angulo = Math.random() * Math.PI * 2;
      radio = 50 + Math.random() * 80;
    }
    particulas.push({
      x: x,
      y: y,
      vx: Math.cos(angulo) * radio / 18,
      vy: Math.sin(angulo) * radio / 18,
      vida: 1,
      color: color,
      size: 2 + Math.random() * 2
    });
  }
}

function animar() {
  ctx.fillStyle = 'rgba(5,0,20,0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particulas = particulas.filter(p => p.vida > 0);
  particulas.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.02;
    p.vx *= 0.99;
    p.vy *= 0.99;
    p.vida -= 0.008;
    ctx.globalAlpha = p.vida;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animar);
}
animar();
setInterval(() => { explotar(Math.random() * canvas.width, 100 + Math.random() * canvas.height * 0.5); }, 1200);
window.addEventListener('resize', () => { canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; });