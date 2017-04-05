//
// Constructor.
//
function PositionTextureCoordinates() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
PositionTextureCoordinates.VERTEX_SHADER_SOURCE = [
    //
   'precision highp float;', // which is the default vertex shader precision.
    //
   'attribute vec3 vertexPosition;',
   'attribute vec2 vertexTextureCoordinates;',
   'uniform mat4 transform;',
    //
   'varying vec2 textureCoordinates;',
    //
   'void main() {',
       'gl_Position = transform * vec4(vertexPosition, 1.0);',
       'textureCoordinates = vertexTextureCoordinates;',
   '}'

].join('\n');

PositionTextureCoordinates.FRAGMENT_SHADER_SOURCE = [
    //
   'precision mediump float;', // which is the recommended fragment shader precision.
    //
   'varying vec2 textureCoordinates;',
   'uniform sampler2D sampler;',
    //
   'void main() {',
       'gl_FragColor = texture2D(sampler, textureCoordinates);',
   '}'
   
].join('\n');

Object.freeze(PositionTextureCoordinates);

export { PositionTextureCoordinates };
