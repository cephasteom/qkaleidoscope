import Perlin from 'perlin.js';

Perlin.seed(Math.random());

export function noiseWalk(): (speed: number) => number {
    let x = Math.random(), y = Math.random();
    return (speed: number = 0.1) => {
        x += (0.003 * speed);
        y += (0.002 * speed);
        return (Perlin.simplex2(x, y) + 1) / 2;
    };
}

export function numberToRGBA(value: number, alpha: number = 1) {
    if (value < 0 || value > 1) {
        throw new Error("Input must be between 0 and 1");
    }
    
    // Map value to hue (0 to 360 degrees)
    let hue = value * 360;
    
    // Convert HSL to RGB (full saturation and lightness at 50%)
    const [r, g, b] = hslToRgb(hue, 1, 0.5);
    // console.log(r, g, b);
    return `rgba(${r},${g},${b},${alpha})`;
}

function hslToRgb(h: number, s: number, l: number) {
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r, g, b;
    
    if (h < 60) {
        [r, g, b] = [c, x, 0];
    } else if (h < 120) {
        [r, g, b] = [x, c, 0];
    } else if (h < 180) {
        [r, g, b] = [0, c, x];
    } else if (h < 240) {
        [r, g, b] = [0, x, c];
    } else if (h < 300) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }
    
    // Convert to 0-255 range
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return [r, g, b];
}

export function segmentDimensions(segments: number, canvasSize: number) {
    const angle = 360 / segments; // Angle per segment
    const radians = (angle * Math.PI) / 180; // Convert to radians
  
    // Assuming the segment extends from the centre to the edge, we use the canvas height as the radius
    const radius = canvasSize / 2;
  
    // Calculate the base width of the triangle segment using trigonometry
    const width = 2 * radius * Math.tan(radians / 2);
  
    return {
        width,
        height: canvasSize / 2, // Segment height (half the canvas height)
    };
}
  

export function generateClipPath(segments: number) {
    const angle = (360 / segments); // Half-angle per segment
    const radians = (angle * Math.PI) / 180;
  
    const xOffset = Math.sin(radians) * 50; // Scale within 0-100%
    const yOffset = Math.cos(radians) * 100; // Scale within 0-100%
  
    return `polygon(50% 0%, ${50 - xOffset}% ${yOffset}%, ${50 + xOffset}% ${yOffset}%, 50% 0%)`;
}