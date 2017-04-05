//
// Constructor.
//
function TransformedPositionColor() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
TransformedPositionColor.VERTEX_SHADER_SOURCE = [
    //
   'precision highp float;', // which is the default vertex shader precision.
    //
   'attribute vec4 vertexPosition;',
   'attribute vec4 vertexColor;',
    //
   'varying vec4 color;',
    //
   'void main() {',
        //
       'gl_Position = vertexPosition;',
        //
       'color = vertexColor;',
   '}'

].join('\n');

TransformedPositionColor.FRAGMENT_SHADER_SOURCE = [
    //
   'precision mediump float;', // which is the recommended fragment shader precision.
    //
   'varying vec4 color;',
    //
   'void main() {',
       'gl_FragColor = color;',
   '}'
   
].join('\n');

Object.freeze(TransformedPositionColor);

export { TransformedPositionColor };
