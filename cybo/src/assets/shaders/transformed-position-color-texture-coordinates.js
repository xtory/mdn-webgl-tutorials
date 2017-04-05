//
// Constructor.
//
function TransformedPositionColorTextureCoordinates() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
TransformedPositionColorTextureCoordinates.VERTEX_SHADER_SOURCE = [
    //
   'precision highp float;', // which is the default vertex shader precision.
    //
   'attribute vec4 vertexPosition;',
   'attribute vec4 vertexColor;',
   'attribute vec2 vertexTextureCoordinates;',
    //
   'varying vec4 color;',
   'varying vec2 textureCoordinates;',
    //
   'void main() {',
        //
       'gl_Position = vertexPosition;',
        //
       'color = vertexColor;',
       'textureCoordinates = vertexTextureCoordinates;',
   '}'

].join('\n');

TransformedPositionColorTextureCoordinates.FRAGMENT_SHADER_SOURCE = [
    //
   'precision mediump float;', // which is the recommended fragment shader precision.
    //
   'varying vec4 color;',
   'varying vec2 textureCoordinates;',
    //
   'uniform sampler2D sampler;',
    //
   'void main() {',
       'gl_FragColor = color * texture2D(sampler, textureCoordinates);',
   '}'
   
].join('\n');

Object.freeze(TransformedPositionColorTextureCoordinates);

export { TransformedPositionColorTextureCoordinates };
