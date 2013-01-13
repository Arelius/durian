var wallDown = 800;

function vmag(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

function vnorm(a) {
  var mag = vmag(a);
  return [a[0]/mag, a[1]/mag];
}

function vdot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function vmult(a, b) {
  return [a[0] * b, a[1] * b];
}

function gon(list, pos, d1, d2, prev, next) {
  g = {pos: pos, d1: d1, d2: d2};
  list.push(g);
  return g;
}

function render(ctx, list) {

  list.sort(function(l, r) {
    return l.pos[1] - r.pos[1];
  });

  for(var i = 0; i < list.length; i++) {
    g = list[i];

    var end = g.pos[0] + g.d1[0] + g.d2[0];
    var px = g.d1[0] / (g.d1[0] + g.d2[0]);

    var wall = ctx.createLinearGradient(g.pos[0], 0, end, 0);
    wall.addColorStop(0.0, "rgb(50, 50, 50)");
    wall.addColorStop(px, "rgb(50, 50, 50)");
    wall.addColorStop(px, "rgb(100, 100, 100)");
    wall.addColorStop(1, "rgb(100, 100, 100)");

    ctx.fillStyle = wall;
    ctx.beginPath();
    ctx.moveTo(g.pos[0], g.pos[1]);
    ctx.lineTo(g.pos[0], g.pos[1] + wallDown);
    ctx.lineTo(g.pos[0] + g.d1[0] + g.d2[0], g.pos[1] + wallDown);
    ctx.lineTo(g.pos[0] + g.d1[0] + g.d2[0], g.pos[1] + g.d1[1] - g.d2[1]);
    ctx.fill();

    var grad = ctx.createLinearGradient(g.pos[0], g.pos[1], g.pos[0] + g.d1[0], g.pos[1] + g.d1[1]);
    grad.addColorStop(0.4, "rgb(0, 0, 100)");
    grad.addColorStop(1, "rgb(100, 0, 0)");

    // assign gradients to fill and stroke styles
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(g.pos[0], g.pos[1]);
    ctx.lineTo(g.pos[0] + g.d1[0], g.pos[1] + g.d1[1]);
    ctx.lineTo(g.pos[0] + g.d1[0] + g.d2[0], g.pos[1] + g.d1[1] - g.d2[1]);
    ctx.lineTo(g.pos[0] + g.d2[0], g.pos[1] - g.d2[1]);
    ctx.fill();
  }
}

var canvas;
var ctx;
var gui;

var penrose = {
  halfWidth: 80,
  halfHeight: 80,
  stepHeight: 10,
  upDir: [0, -1],
  aspect: 8/3,
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
  addredraw(gui.add(penrose, 'halfWidth'));
  //addredraw(gui.add(penrose, 'halfHeight'));
  addredraw(gui.add(penrose, 'aspect'));
  addredraw(gui.add(penrose, 'stepHeight'));
  addredraw(gui.add(penrose, 'minStepsPerSide')).min(2).step(1);

  canvas = document.getElementById('scene');
  ctx = canvas.getContext('2d');

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var start = [600, 300];

  //var d1 = [penrose.halfWidth, penrose.halfHeight];
  //var d2 = [penrose.halfWidth, penrose.halfHeight];

  var d1 = vnorm([1 * penrose.aspect, 1]);
  var d2 = [d1[0], d1[1]];

  // Square Steps.
  penrose.halfHeight = penrose.halfWidth;

  d1 = vmult(d1, penrose.halfWidth);
  d2 = vmult(d2, penrose.halfHeight);

  var stepRaise = vdot(d1, penrose.upDir) * vmag(penrose.upDir) * -1;

  var stepInc = penrose.minStepsPerSide - 1;

  // Steps are the up steps, not a platform.
  var totalSteps = stepInc * 4;
  var makeupSteps = 6;

  var stepUp = totalSteps * penrose.stepHeight;
  var stepDir = vmult(penrose.upDir, penrose.stepHeight);

  var insert = 0;

  // Enable step insertion
  if(true) {
    // For now we only insert in pairs.
    insert = Math.floor(stepUp/(stepRaise * 2)) * 2;
  }

  totalSteps += insert;
  makeupSteps += insert;

  // Recompute this... seems weird.
  stepUp = totalSteps * penrose.stepHeight;

  var stepUpMinusInsert = stepUp - (insert * stepRaise)

  var makeupStepDown = stepUpMinusInsert / makeupSteps;

  var ddD = 1 + (makeupStepDown / stepRaise);

  function inc(D) {
    start = [start[0] + D[0], start[1] + D[1]];
  }

  gons = [];

  function addGons(dir, c, prev) {
    var cur;
    var d = [dir[0], dir[1]];

    if(dir[0] === dir[1]) {
      d[0] *= d1[0];
      d[1] *= d1[1];
    }
    else {
      d[0] *= d2[0];
      d[1] *= d2[1];
    }
    for(var i = 0; i < c; i++) {
      inc(d);
      inc(stepDir);
      cur = gon(gons, start, d1, d2, prev, null);
      if(prev)
        prev.next = cur;
      prev = cur
    }
    return prev;
  }

  var prev = null;

  // Up and Right

  prev = addGons([1, -1], stepInc, prev);

  // Up and Left

  prev = addGons([-1, -1], stepInc, prev);

  var od2 = [d2[0], d2[1]];
  d2 = [d2[0] * ddD, d2[1] * ddD];

  // Down and Left

  prev = addGons([-1, 1], stepInc + insert/2, prev);

  d2 = [od2[0], od2[1]];

  var od1 = [d1[0], d1[1]];

  d1 = [d1[0] * ddD, d1[1] * ddD];

  // Down and Right

  prev = addGons([1, 1], stepInc + insert/2, prev);

  prev.next = gons[0];

  render(ctx, gons);
}

function mousemove(event, canvas) {
  mPcx = event.clientY/canvas.height;

  //penrose.halfHeight = 24 + (6 * mPcx);
  //penrose.halfWidth = 74 + (6 * mPcx);

  //penrose.stepHeight = 8 + (2 * mPcx);

  draw();
}
