var wallDown = 800;

function gon(list, x, y, d1X, d1Y, d2X, d2Y) {
  list.push({x: x, y: y, d1X: d1X, d1Y: d1Y, d2X: d2X, d2Y: d2Y});
}

function render(ctx, list) {

  list.sort(function(l, r) {
    return l.y - r.y;
  });

  for(var i = 0; i < list.length; i++) {
    g = list[i];
    ctx.fillStyle = "rgb(100, 100, 100)";
    ctx.beginPath();
    ctx.moveTo(g.x, g.y);
    ctx.lineTo(g.x, g.y + wallDown);
    ctx.lineTo(g.x + g.d1X + g.d2X, g.y + wallDown);
    ctx.lineTo(g.x + g.d1X + g.d2X, g.y + g.d1Y - g.d2Y);
    ctx.fill();

    var grad = ctx.createLinearGradient(g.x, g.y, g.x + g.d1X, g.y + g.d1Y);
    grad.addColorStop(0.4, "rgb(0, 0, 100)");
    grad.addColorStop(1, "rgb(100, 0, 0)");
 
    // assign gradients to fill and stroke styles
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(g.x, g.y);
    ctx.lineTo(g.x + g.d1X, g.y + g.d1Y);
    ctx.lineTo(g.x + g.d1X + g.d2X, g.y + g.d1Y - g.d2Y);
    ctx.lineTo(g.x + g.d2X, g.y - g.d2Y);
    ctx.fill();
  }
}

var canvas;
var ctx;

var hW = 80;
var hH = 30;
var sH = 5;

function init() {
  canvas = document.getElementById('scene');
  ctx = canvas.getContext('2d');

  draw();
}

function draw() {
  var sX = 450;
  var sY = 300;

  var d1X = hW;
  var d1Y = hH;
  var d2X = hW;
  var d2Y = hH;

  var osX = sX;
  var osY = sY;

  // Steps are the up steps, not a platform.
  var totalSteps = 12;
  var makeupSteps = 4;

  var stepUp = totalSteps * sH;

  var makeupStepDown = stepUp / makeupSteps;

  var ddD = 1 + (makeupStepDown / hH);

  function inc(W, H) {
    sX += W;
    sY += H;
  }

  gons = [];

  // Start
  
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  // Up and Right

  inc(d2X, -d2Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d2X, -d2Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d2X, -d2Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  // Up and Left

  inc(-d1X, -d1Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d1X, -d1Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d1X, -d1Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  var od2X = d2X;
  var od2Y = d2Y;
  d2X *= ddD;
  d2Y *= ddD;

  //hH *= 1.3;
  //hW *= 1.3;

  // Down and Left

  inc(-d2X, + d2Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d2X, + d2Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  //inc(-d2X, + d2Y - sH);
  //gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  d2X = od2X;
  d2Y = od2Y;

  var od1X = d1X;
  var od1Y = d1Y;

  d1X *= ddD;
  d1Y *= ddD;

  inc(-d2X, + d2Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  // Down and Right

  inc(d1X, + d1Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  //inc(d1X, + d1Y - sH);
  //gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  d1X = od1X;
  d1Y = od1Y;
  //gon(gons, sX, sY, d1X, d1Y, d2X, d2Y);

  // Repaint the first one
  //gon(gons, osX, osY, hW, hH, hW, hH);

  render(ctx, gons);
}

function mousemove(event, canvas) {
  mPcx = event.clientY/canvas.height;

  hH = 27 + (6 * mPcx);
  hW = 79 + (2 * mPcx);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
}
