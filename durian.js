function gon(ctx, x, y, d1X, d1Y, d2X, d2Y) {
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

  var hW = 40;
  var hH = 15;
  var sH = 5
  var sX = 200;
  var sY = 200;
  var d1X = hW;
  var d1Y = hH;
  var d2X = hW;
  var d2Y = hH;

  d2X *= 0.7;
  d2Y *= 0.7;

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

  //hH += 10;
  //hW += 10;

  //hH *= 1.3;
  //hW *= 1.3;

  // Down and Left

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(-d2X, + d2Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  // Down and Right

  inc(d1X, + d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);

  inc(d1X, + d1Y - sH);
  gon(ctx, sX, sY, d1X, d1Y, d2X, d2Y);
 
}
