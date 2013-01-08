function gon(ctx, x, y, halfWidth, halfHeight) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + halfWidth, y + halfHeight);
  ctx.lineTo(x + halfWidth * 2, y);
  ctx.lineTo(x + halfWidth, y - halfHeight);
  ctx.fill();
}

function init() {
  var canvas = document.getElementById('scene');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";

  var hW = 40;
  var hH = 15;
  var sH = 5
  var sX = 200;
  var sY = 200;

  function inc(W, H) {
    sX += W;
    sY += H;
  }

  ctx.fillStyle = "rgb(200,0,0)";
  
  // Start
  
  gon(ctx, sX, sY, hW, hH);

  // Up and Right

  inc(hW, -hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(hW, -hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(hW, -hH - sH);
  gon(ctx, sX, sY, hW, hH);

  // Up and Left

  inc(-hW, -hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(-hW, -hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(-hW, -hH - sH);
  gon(ctx, sX, sY, hW, hH);

  // Down and Left

  inc(-hW, + hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(-hW, + hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(-hW, + hH - sH);
  gon(ctx, sX, sY, hW, hH);

  // Down and Right

  inc(hW, + hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(hW, + hH - sH);
  gon(ctx, sX, sY, hW, hH);

  inc(hW, + hH - sH);
  gon(ctx, sX, sY, hW, hH);
 
}
