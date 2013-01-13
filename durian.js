var wallDown = 800;

function gon(list, x, y, d1X, d1Y, d2X, d2Y, prev, next) {
  g = {x: x, y: y, d1X: d1X, d1Y: d1Y, d2X: d2X, d2Y: d2Y};
  list.push(g);
  return g;
}

function render(ctx, list) {

  list.sort(function(l, r) {
    return l.y - r.y;
  });

  for(var i = 0; i < list.length; i++) {
    g = list[i];

    var end = g.x + g.d1X + g.d2X;
    var px = g.d1X / (g.d1X + g.d2X);

    var wall = ctx.createLinearGradient(g.x, 0, end, 0);
    wall.addColorStop(0.0, "rgb(50, 50, 50)");
    wall.addColorStop(px, "rgb(50, 50, 50)");
    wall.addColorStop(px, "rgb(100, 100, 100)");
    wall.addColorStop(1, "rgb(100, 100, 100)");

    ctx.fillStyle = wall;
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
var gui;

var hW = 80;
var hH = 30;
var sH = 10;

var penrose = {
  hW: 80,
  hH: 30,
  sH: 10,
  minStepsPerSide: 4
}

function init() {
  function addredraw(controller) {
    controller.onChange(function(value) {
      draw();
    });
    return controller;
  }
  gui = new dat.GUI();
  addredraw(gui.add(penrose, 'hW'));
  addredraw(gui.add(penrose, 'hH'));
  addredraw(gui.add(penrose, 'sH'));
  addredraw(gui.add(penrose, 'minStepsPerSide')).min(2).step(1);

  canvas = document.getElementById('scene');
  ctx = canvas.getContext('2d');

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var sX = 600;
  var sY = 300;

  var d1X = penrose.hW;
  var d1Y = penrose.hH;
  var d2X = penrose.hW;
  var d2Y = penrose.hH;

  var osX = sX;
  var osY = sY;

  var stepInc = penrose.minStepsPerSide - 1;

  // Steps are the up steps, not a platform.
  var totalSteps = stepInc;
  var makeupSteps = 6;

  var stepUp = totalSteps * penrose.sH;

  var insert = 0;

  // Enable step insertion
  if(true) {
    // For now we only insert in pairs.
    insert = Math.floor(stepUp/(hH * 2)) * 2;
  }

  totalSteps += insert;
  makeupSteps += insert;

  // Recompute this... seems weird.
  stepUp = totalSteps * penrose.sH;

  var stepUpMinusInsert = stepUp - (insert * hH)

  var makeupStepDown = stepUpMinusInsert / makeupSteps;

  var ddD = 1 + (makeupStepDown / hH);

  function inc(W, H) {
    sX += W;
    sY += H;
  }

  gons = [];

  function addGons(dX, dY, c, prev) {
    var cur;
    for(var i = 0; i < c; i++) {
      inc(dX, dY - penrose.sH);
      cur = gon(gons, sX, sY, d1X, d1Y, d2X, d2Y, prev, null);
      if(prev)
        prev.next = cur;
      prev = cur
    }
    return prev;
  }

  var prev = null;

  // Up and Right

  prev = addGons(d2X, -d2Y, stepInc, prev);

  // Up and Left

  prev = addGons(-d1X, -d1Y, stepInc, prev);

  var od2X = d2X;
  var od2Y = d2Y;
  d2X *= ddD;
  d2Y *= ddD;

  //hH *= 1.3;
  //hW *= 1.3;

  // Down and Left

  prev = addGons(-d2X, d2Y, stepInc + insert/2, prev);

  d2X = od2X;
  d2Y = od2Y;

  var od1X = d1X;
  var od1Y = d1Y;

  d1X *= ddD;
  d1Y *= ddD;

  // Down and Right

  prev = addGons(d1X, d1Y, stepInc + insert/2, prev);

  prev.next = gons[0];

  render(ctx, gons);
}

function mousemove(event, canvas) {
  mPcx = event.clientY/canvas.height;

  penrose.hH = 24 + (6 * mPcx);
  penrose.hW = 74 + (6 * mPcx);

  penrose.sH = 8 + (2 * mPcx);

  draw();
}
