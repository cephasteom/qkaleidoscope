const contexts = [];

onmessage = ({ data }) => {
    if (data.canvas) {
        const context = data.canvas.getContext("2d");
        contexts.push(context);
        return;
    }
  
    // TODO: why not iterate over the data?
    if (data.data) {
        contexts.forEach(ctx => draw(ctx, data.data));
    }
};
    
function draw(ctx, data) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    data.forEach((point) => {
        ctx.fillStyle = point.color;
    
        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(point.rot);
        switch (point.shape) {            
            case 'bezier':
                drawBlob(ctx, point.size, point.rot);
                break;
            
            case 'poly':
                drawIrregularPolygon(ctx, point.size, point.curve);
                break;
    
            case 'arc':
                default:
                drawArc(ctx, point.size);
                break;
        }
        ctx.restore();
    });
  }
  

  function drawBlob(ctx, size, blobFactor = 0.4) {
    const controlRadius = size * blobFactor;
  
    ctx.beginPath();
    ctx.moveTo(0, -size);
  
    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const xControl = Math.cos(angle + Math.PI / 4) * controlRadius;
      const yControl = Math.sin(angle + Math.PI / 4) * controlRadius;
      const xEnd = Math.cos(angle + Math.PI / 2) * size;
      const yEnd = Math.sin(angle + Math.PI / 2) * size;
  
      ctx.quadraticCurveTo(xControl, yControl, xEnd, yEnd);
    }
  
    ctx.closePath();
    ctx.fill();
  }

function drawIrregularPolygon(ctx, size, vertexCount) {
    ctx.beginPath();
    for (let i = 0; i < vertexCount; i++) {
      const angle = (Math.PI * 2 * i) / vertexCount;
      const radius = size * (0.8 + 1 * 0.4); // Randomize the radius
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}

function drawArc(ctx, size) {
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();
}