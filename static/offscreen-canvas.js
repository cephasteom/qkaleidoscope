const contexts = [];

onmessage = ({ data }) => {
    if (data.canvas) {
        const ctx = data.canvas.getContext("2d");
        contexts.push(ctx);
        return;
    }

    if (data.data) {
        contexts
            .slice(0, data.segments)
            .forEach(ctx => draw(ctx, data.data));
    }
};


// -------------------------------
// DRAW LOOP
// -------------------------------
function draw(ctx, data) {
    // mild trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    data.forEach(point => {
        ctx.save();
        ctx.fillStyle = point.fill;
        ctx.strokeStyle = point.stroke;

        ctx.translate(point.x, point.y);
        ctx.rotate(point.rot);

        drawSuperformula(
            ctx,
            point.size,
            point.sf   // { m, n1, n2, n3 }
        );

        ctx.restore();
    });
}


// -------------------------------
// SUPERFORMULA SHAPE
// -------------------------------
function drawSuperformula(ctx, size, params) {
    if (!params) return;
    const { m, n1, n2, n3 } = params;

    ctx.beginPath();

    const step = 0.05;
    let first = true;

    for (let phi = 0; phi < Math.PI * 2; phi += step) {
        const r = superformula(phi, m, n1, n2, n3) * size;

        const x = r * Math.cos(phi);
        const y = r * Math.sin(phi);

        if (first) {
            ctx.moveTo(x, y);
            first = false;
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}


// -------------------------------
// SUPERFORMULA EQUATION
// -------------------------------
function superformula(phi, m, n1, n2, n3) {
    const t1 = Math.abs(Math.cos((m * phi) / 4));
    const t2 = Math.abs(Math.sin((m * phi) / 4));

    const r = Math.pow(
        Math.pow(t1, n2) + Math.pow(t2, n3),
        -1 / n1
    );

    return r;
}
