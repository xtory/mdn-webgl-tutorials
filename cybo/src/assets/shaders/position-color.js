//
// Constructor.
//
function PositionColor() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
PositionColor.VERTEX_SHADER_SOURCE = [
    //
   'precision highp float;', // which is the default vertex shader precision.
    //
   'attribute vec3 vertexPosition;',
   'attribute vec4 vertexColor;',
   'uniform mat4 transform;',
    //
   'varying vec4 color;',
    //
   'void main() {',
       'gl_Position = transform * vec4(vertexPosition, 1.0);',
       'color = vertexColor;',
   '}'

].join('\n');

PositionColor.FRAGMENT_SHADER_SOURCE = [
    //
   'precision mediump float;', // which is the recommended fragment shader precision.
    //
   'varying vec4 color;',
    //
   'void main() {',
       'gl_FragColor = color;',
   '}'

].join('\n');

Object.freeze(PositionColor);

export { PositionColor };
