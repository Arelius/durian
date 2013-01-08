function gon(ctx, x, y, d1X, d1Y, d2X, d2Y) {

  var grad = ctx.createLinearGradient(x, y, x + d1X, y + d1Y);
  grad.addColorStop(0.4, "rgb(0, 0, 100)");
  grad.addColorStop(1, "rgb(100, 0, 0)");
 
  // assign gradients to fill and stroke styles
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + d1X, y + d1Y);
  ctx.lineTo(x + d1X + d2X, y + d1Y - d2Y);
  ctx.lineTo(x + d2X, y - d2Y);
  ctx.fill();
}

function init() {
  var canvas = document.getElementById('scene');
  var ctx = canvas.getContext('2d');

  var hW = 80;
  var hH = 30;
  var sH = 5
  var sX = 450;
  var sY = 300;
  var d1X = hW;
  var d1Y = hH;
  var d2X = hW;
  var d2Y = hH;

  var osX = sX;
  var osY = sY;

  // Steps are the up steps, not a platform.
  var totalSteps = 14;
  var makeupSteps = 8;

  var stepUp = totalSteps * sH;

  var makeupStepDown = stepUp / makeupSteps;

  // hH is half the height of a step.
  var ddD = 1 + (makeupStepDown / (hH * 2));

  console.log(makeupStepDown);
  console.log(ddD);

  var ddD = 1.045;

  function inc(W, H) {
    sX += W;
    sY += H;
  }

  ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
  
  // Start
  
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  // Up and Right

  inc(d2X, -d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d2X, -d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d2X, -d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  // Up and Left

  inc(-d1X, -d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d1X, -d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d1X, -d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  var od2X = d2X;
  var od2Y = d2Y;
  d2X *= ddD;
  d2Y *= ddD;

  //hH *= 1.3;
  //hW *= 1.3;

  // Down and Left

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  d2X = od2X;
  d2Y = od2Y;

  var od1X = d1X;
  var od1Y = d1Y;

  d1X *= ddD;
  d1Y *= ddD;

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  // Down and Right

  inc(d1X, + d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  d1X = od1X;
  d1Y = od1Y;
  //gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  // Repaint the first one
  gon(ctx, osX, osY, hW, hH, hW, hH);
 
}
