(function (exports) {
'use strict';

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

//
// Constructor.
//
function PositionOnly() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
PositionOnly.VERTEX_SHADER_SOURCE = [
    //
   'precision highp float;', // which is the default vertex shader precision.
    //
   'attribute vec3 vertexPosition;',
   'uniform mat4 transform;',
    //
   'void main() {',
       'gl_Position = transform * vec4(vertexPosition, 1.0);',
   '}'
   
].join('\n');

PositionOnly.FRAGMENT_SHADER_SOURCE = [
    //
   'precision mediump float;', // which is the recommended fragment shader precision.
    //
   'void main() {',
       'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);',
   '}'

].join('\n');

Object.freeze(PositionOnly);

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

//
// Constructor.
//
function TransformedPositionTextureCoordinates() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
TransformedPositionTextureCoordinates.VERTEX_SHADER_SOURCE = [
    //
   'precision highp float;', // which is the default vertex shader precision.
    //
   'attribute vec4 vertexPosition;',
   'attribute vec2 vertexTextureCoordinates;',
    //
   'varying vec2 textureCoordinates;',
    //
   'void main() {',
       'gl_Position = vertexPosition;',
       'textureCoordinates = vertexTextureCoordinates;',
   '}'

].join('\n');

TransformedPositionTextureCoordinates.FRAGMENT_SHADER_SOURCE = [
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

Object.freeze(TransformedPositionTextureCoordinates);

// Note:
// The equivelant of this value in C is 'FLT_EPSILON', and in the GNU C Library,
// http://www.gnu.org/software/libc/manual/html_node/Floating-Point-Parameters.html
// FLT_EPSILON is the difference between 1 and the smallest floating point number
// of type float that is greater than 1. It's not supposed to be greater than 1E-5.

// Note:
// C# float.Epsilon = 1.4013e-045f, which represents the smallest positive System.
// Single value greater than zero.

// Note:
// FLT_EPSILON is 1.192092896e-07F in <float.h>

// Note:
// SlimDX, Fly3D both define this value as 1e-06f and XNA uses 1e-04f, 1e-05f, or
// 1e-06f (in difference places) as epsilons. Cybo selects 1e-05f.

// Note:
// SlimDX uses the term ZeroTolerance to represent Epsilon.

// Note:
// In XNA, there is no such term called Epsilon. XNA directly uses 1e-04f, 1e-05f,
// 1e-06f or as epsilon. For instance...
// Ray.Intersects() directly uses 1e-05f as epsilon
// BoundingBox.Intersects() directly uses 1e-06f as epsilon, etc.

// Note:
// The equivelant in Fly3D of this value is 'FY_EPS'.
    
//
// Constructor.
//
function MathHelper() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//

// PI.

// Note:
// Pi = 3.1415926535897932 radians = 180 degrees.

MathHelper.PI                             = 3.1415926535897932;
MathHelper.PI_OVER_TWO                    = 1.5707963267948966;      // = pi / 2
MathHelper.PI_OVER_FOUR                   = 0.7853981633974483;      // = pi / 4
MathHelper.TWO_PI                         = 6.2831853071795864;      // = pi * 2
MathHelper.PI_OVER_ONE_EIGHTY             = 0.0174532925199432;      // = pi / 180
MathHelper.ONE_EIGHTY_OVER_PI             = 57.2957795130823208;     // = 180 / pi
MathHelper.RADIANS_OF_FORTY_FIVE_DEGREES  = MathHelper.PI_OVER_FOUR; // = MathHelper.toRadians(45)
MathHelper.RADIANS_OF_NINETY_DEGREES      = MathHelper.PI_OVER_TWO;  // = MathHelper.toRadians(90)
MathHelper.RADIANS_OF_ONE_EIGHTY_DEGREES  = MathHelper.PI;           // = MathHelper.toRadians(180)
MathHelper.RADIANS_OF_THREE_SIXTY_DEGREES = MathHelper.TWO_PI;       // = MathHelper.toRadians(360)

// Epsilon.
MathHelper.EPSILON = 0.00001; // = 1e-5;

//
// Static methods.
//

//
// Angles.
//
MathHelper.toRadians = function(degrees) {
    //
    // Note:
    // 1 radian = (180 / pi) degrees.
    // => 1 degree = (pi / 180) radians.
    // => n degrees = (pi / 180) * n radians.

    if (typeof(degrees) !== 'number') {
        throw 'typeof(degrees) !== \'number\'';
    }

    return MathHelper.PI_OVER_ONE_EIGHTY * degrees;
};

MathHelper.toDegrees = function(radians) {
    //
    // Note:
    // 1 radian = (180 / pi) degrees.
    // => n radians = (180 / pi) * n degrees.

    if (typeof(radians) !== 'number') {
        throw 'typeof(degrees) !== \'number\'';
    }

    return MathHelper.ONE_EIGHTY_OVER_PI * radians;
};

//
// Epsilon.
//
MathHelper.isZero = function(s) {
    //
    if (typeof(s) !== 'number') {
        throw 'typeof(s) !== \'number\'';
    }

    if (s <= -MathHelper.EPSILON ||
        MathHelper.EPSILON <= s) {
        return false;
    } else { // -MathHelper.EPSILON < s < MathHelper.EPSILON
        return true;
    }
};

MathHelper.areEqual = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    var s = s1 - s2;

//#if DEBUG
    /*
    if (MathHelper.IsZero(s) == false) {
        return false;
    } else { // MathHelper.IsZero(s) == true
        return true;
    }
    */

//#else // RELEASE

    if (s <= -MathHelper.EPSILON ||
        MathHelper.EPSILON <= s) {
        return false;
    } else { // -MathHelper.EPSILON < s < MathHelper.EPSILON
        return true;
    }

//#endif // DEBUG
};

MathHelper.isScalar1LessThanScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    if (s1 - s2 <= -MathHelper.EPSILON) {
        //
        // which equals to 's1 - s2 < 0',
        // that is, 's1 < s2'

        return true;

    } else {
        //
        // -MathHelper.EPSILON < s1 - s2, which includes
        // A. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON
        // B. MathHelper.EPSILON <= s1 - s2, and
        // A means 's1 - s2 = 0', B means '0 < s1 - s2',
        // so '0 <= s1 - s2', that is, 's2 <= s1'

        return false;
    }
};

MathHelper.isScalar1LessThanOrEqualToScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    if (s1 - s2 < MathHelper.EPSILON) {
        //
        // which includes
        // A. s1 - s2 <= -MathHelper.EPSILON, and
        // B. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON
        // A means 's1 - s2 < 0', B means 's1 - s2 = 0',
        // so 's1 - s2 <= 0', that is, 's1 <= s2'

        return true;

    } else {
        //
        // MathHelper.EPSILON <= s1 - s2, which equals to '0 < s1 - s2',
        // that is, 's2 < s1'

        return false;
    }
};

MathHelper.isScalar1GreaterThanScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    if (MathHelper.EPSILON <= s1 - s2) {
        //
        // which equals to '0 < s1 - s2',
        // that is, 's2 < s1'

        return true;

    } else {
        //
        // s1 - s2 < MathHelper.EPSILON, which includes
        // A. s1 - s2 <= -MathHelper.EPSILON, and
        // B. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON
        // A means 's1 - s2 < 0', B means 's1 - s2 = 0',
        // so 's1 - s2 <= 0', that is, 's1 <= s2'

        return false;
    }
};

MathHelper.isScalar1GreaterThanOrEqualToScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }
    
    if (-MathHelper.EPSILON < s1 - s2) {
        //
        // which includes
        // A. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON, and
        // B. MathHelper.EPSILON <= s1 - s2
        // A means 's1 - s2 = 0', B means '0 < s1 - s2',
        // so '0 <= s1 - s2', that is, 's2 <= s1'

        return true;

    } else {
        //
        // s1 - s2 <= -MathHelper.EPSILON, which equals to 's1 - s2 < 0',
        // that is, 's1 < s2'

        return false;
    }
};

//
// Textures.
//
MathHelper.isPowerOfTwo = function(s) {
    //
    if (typeof(s) !== 'number') {
        throw 'typeof(s) !== \'number\'';
    }
    
    // Note:
    // For instance,
    // 2  = 00000010 
    // 4  = 00000100 
    // 8  = 00001000 
    // 16 = 00010000
    //
    // => 
    // 2 - 1 = 1 = 00000001 
    // 4 - 1 = 3 = 00000011 
    // 8 - 1 = 7 = 00000111
    //
    // =>
    // 2 & 1 = 00000010 & 00000001 = 0 
    // 8 & 7 = 00001000 & 00000111 = 0

    if (s !== 0 &&
       (s & (s - 1)) === 0) {
        return true;
    } else {
        return false;
    }
};

Object.freeze(MathHelper);

//
// Constructor.
//
function ShaderType() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
ShaderType.VERTEX_SHADER = 0;
ShaderType.FRAGMENT_SHADER = 1;

Object.freeze(ShaderType);

//
// Constructor.
//
function AssetManager(_xcene) {
    //
    var _gl = _xcene.graphicsManager.webGLContext;

    //
    // Properties.
    //
    Object.defineProperty(this, 'xcene', {
        get: function() { return _xcene; }
    });

    //
    // Private methods.
    //
    function loadShader(shaderType, shaderSource) {
        //
        var shader;

        if (shaderType === ShaderType.VERTEX_SHADER) {
            shader = _gl.createShader(_gl.VERTEX_SHADER);
        } else if (
            shaderType === ShaderType.FRAGMENT_SHADER
        ){
            shader = _gl.createShader(_gl.FRAGMENT_SHADER);
        } else {
            return null; // Unknown shader type.
        }        

        // Send the source to the shader object
        _gl.shaderSource(shader, shaderSource);

        // Compile the shader program
        _gl.compileShader(shader);

        // See if it compiled successfully
        if (_gl.getShaderParameter(shader, _gl.COMPILE_STATUS) === false)
        {
            throw (
                'An error occurred compiling the shaders: ' +
                _gl.getShaderInfoLog(shader)
            );
        }

        return shader;
    }

    function loadShaderFromHtmlElement(id) {
        //
        var shaderScript = document.getElementById(id);

        // Didn't find an element with the specified ID; abort.

        if (shaderScript === null) {
            return null;
        }

        // Walk through the source element's children, building the
        // shader source string.

        var shaderSource = '';
        var currentChild = shaderScript.firstChild;

        while (currentChild !== null) {
            //
            if (currentChild.nodeType === Node.TEXT_NODE) {
                shaderSource += currentChild.textContent;
            }

            currentChild = currentChild.nextSibling;
        }

        // Now figure out what type of shader script we have,
        // based on its MIME type.

        var shader;

        if (shaderScript.type === 'x-shader/x-vertex') {
            shader = _gl.createShader(_gl.VERTEX_SHADER);
        } else if (
            shaderScript.type === 'x-shader/x-fragment'
        ){
            shader = _gl.createShader(_gl.FRAGMENT_SHADER);
        } else {
            return null; // Unknown shader type.
        }

        // Send the source to the shader object
        _gl.shaderSource(shader, shaderSource);

        // Compile the shader program
        _gl.compileShader(shader);

        // See if it compiled successfully
        if (_gl.getShaderParameter(shader, _gl.COMPILE_STATUS) === false)
        {
            throw (
                'An error occurred compiling the shaders: ' +
                _gl.getShaderInfoLog(shader)
            );
        }

        return shader;
    }

    function setUpProgram(vertexShader, fragmentShader) {
        //
        var program = _gl.createProgram();

        _gl.attachShader(program, vertexShader);
        _gl.attachShader(program, fragmentShader);

        _gl.linkProgram(program);

        if (_gl.getProgramParameter(program, _gl.LINK_STATUS) === false)
        {
            throw (
                'Unable to initialize the (shader) program: ' +
                _gl.getProgramInfoLog(program)
            );
        }
        
        return program;
    }
    
    //
    // Privileged methods.
    //
    this.setUpProgram = function(vertexShaderSource, fragmentShaderSource) {
        //
        var vertexShader =
            loadShader(ShaderType.VERTEX_SHADER, vertexShaderSource);

        var fragmentShader =
            loadShader(ShaderType.FRAGMENT_SHADER, fragmentShaderSource);

        return setUpProgram(vertexShader, fragmentShader);
    };

    this.setUpProgramFromHtmlElements = function(vertexShaderId, fragmentShaderId) {
        //
        var vertexShader =
            loadShaderFromHtmlElement(ShaderType.VERTEX_SHADER, vertexShaderId);

        var fragmentShader =
            loadShaderFromHtmlElement(ShaderType.FRAGMENT_SHADER, fragmentShaderId);

        return setUpProgram(vertexShader, fragmentShader);
    };

    this.loadTexture2D = function(imageSourceUrl) {
        //
        var image = new Image();
        var texture = _gl.createTexture();

        image.addEventListener('load', function() {
            handleTextureLoaded(image, texture);
        });

        image.src = imageSourceUrl;

        function handleTextureLoaded(image, texture) {
            //
            // Test:
            texture.width = image.width;
            texture.height = image.height;
            // :Test

            _gl.bindTexture (
                _gl.TEXTURE_2D,
                texture
            );

            _gl.texImage2D (
                _gl.TEXTURE_2D,    // target
                0,                 // level
                _gl.RGBA,          // internalFormat
                _gl.RGBA,          // format
                _gl.UNSIGNED_BYTE, // type
                image              // htmlImageElement
            );

            if (MathHelper.isPowerOfTwo(image.width) === true &&
                MathHelper.isPowerOfTwo(image.height) === true) {
                //
                _gl.generateMipmap(_gl.TEXTURE_2D);
                
                _gl.texParameteri (
                    _gl.TEXTURE_2D,
                    _gl.TEXTURE_MIN_FILTER,
                    _gl.LINEAR_MIPMAP_LINEAR
                );

            } else {
                //
                _gl.texParameteri (
                    _gl.TEXTURE_2D,
                    _gl.TEXTURE_MIN_FILTER,
                    _gl.LINEAR
                );
            }

            // TEXTURE_MAG_FILTER only has NEAREST or LINEAR to choose, no
            // LINEAR_MIPMAP_LINEAR.
            _gl.texParameteri (
                _gl.TEXTURE_2D,
                _gl.TEXTURE_MAG_FILTER,
                _gl.LINEAR
            );

            _gl.texParameteri (
                _gl.TEXTURE_2D,
                _gl.TEXTURE_WRAP_S,
                _gl.CLAMP_TO_EDGE
            );

            _gl.texParameteri (
                _gl.TEXTURE_2D,
                _gl.TEXTURE_WRAP_T,
                _gl.CLAMP_TO_EDGE
            );

            _gl.bindTexture(_gl.TEXTURE_2D, null);
        }

        return texture;
    };
}

Object.freeze(AssetManager);

//
// Constructor.
//
function CartesianAxis() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
CartesianAxis.X = 0;
CartesianAxis.Y = 1;
CartesianAxis.Z = 2;

Object.freeze(CartesianAxis);

//
// Constructor.
//
function Matrix4x4 (
    _s11, _s12, _s13, _s14,
    _s21, _s22, _s23, _s24,
    _s31, _s32, _s33, _s34,
    _s41, _s42, _s43, _s44
){
    // Note:
    // When storing matrices in memory, there are two ways of storing their
    // elements:
    // 1. Stored in the order s11, s12, s13, ..., s43, s44
    // => called 'row major' (used by DirectX), or
    // 2. Stored in the order s11, s21, s31, ..., s34, s44
    // => called 'column major' (used by OpenGL)

    // Note:
    // 'm x n' matrix always means 'm rows, n columns' whether it's row or
    // column major.

    this.elements = [
        _s11, _s21, _s31, _s41,
        _s12, _s22, _s32, _s42,
        _s13, _s23, _s33, _s43,
        _s14, _s24, _s34, _s44
    ];

    //
    // Properties.
    //
    Object.defineProperty(this, 's11', {
        get: function() { return this.elements[0]; }
    });

    Object.defineProperty(this, 's12', {
        get: function() { return this.elements[4]; }
    });

    Object.defineProperty(this, 's13', {
        get: function() { return this.elements[8]; }
    });

    Object.defineProperty(this, 's14', {
        get: function() { return this.elements[12]; }
    });

    Object.defineProperty(this, 's21', {
        get: function() { return this.elements[1]; }
    });

    Object.defineProperty(this, 's22', {
        get: function() { return this.elements[5]; }
    });

    Object.defineProperty(this, 's23', {
        get: function() { return this.elements[9]; }
    });

    Object.defineProperty(this, 's24', {
        get: function() { return this.elements[13]; }
    });

    Object.defineProperty(this, 's31', {
        get: function() { return this.elements[2]; }
    });

    Object.defineProperty(this, 's32', {
        get: function() { return this.elements[6]; }
    });

    Object.defineProperty(this, 's33', {
        get: function() { return this.elements[10]; }
    });

    Object.defineProperty(this, 's34', {
        get: function() { return this.elements[14]; }
    });

    Object.defineProperty(this, 's41', {
        get: function() { return this.elements[3]; }
    });

    Object.defineProperty(this, 's42', {
        get: function() { return this.elements[7]; }
    });

    Object.defineProperty(this, 's43', {
        get: function() { return this.elements[11]; }
    });

    Object.defineProperty(this, 's44', {
        get: function() { return this.elements[15]; }
    });
}

//
// Static constants (after Object.freeze()).
//
Matrix4x4.ELEMENT_COUNT = 16;

//
// Static methods.
//
Matrix4x4.fromArray = function(a) {
    //
    return new Matrix4x4 (
        a[0], a[4], a[ 8], a[12],
        a[1], a[5], a[ 9], a[13],
        a[2], a[6], a[10], a[14],
        a[3], a[7], a[11], a[15]
    );
};

Matrix4x4.createIdentityMatrix = function() {
    //
    return new Matrix4x4 (
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
};

Matrix4x4.createViewMatrix = function (
    cameraPosition,
    cameraFacingDirection, // not cameraTargetPosition, be careful!
    cameraUpDirection
){
    // Note:
    // Formula of Direct3D Matrix.LookAtRH():
    //
    // [ axisX.x                      axisY.x                      axisZ.x                     0
    //   axisX.y                      axisY.y                      axisZ.y                     0
    //   axisX.z                      axisY.z                      axisZ.z                     0
    //  -dot(axisX, cameraPosition)  -dot(axisY, cameraPosition)  -dot(axisZ, cameraPosition)  1 ]
    //
    // where
    // axisZ = normalize(cameraPosition - cameraTargetPosition)
    //       = normalize(-cameraFacingDirection)
    // axisX = normalize(cross(cameraUpVector, axisZ))
    // axisY = cross(axisZ, axisX)
    //

    // Note:
    // In the formula of Direct3D Matrix.LookAtLH():
    //
    // [ ... ]
    //
    // where
    // axisZ = normalize(cameraTargetPosition - cameraPosition)
    //       = normalize(cameraFacingDirection)

    var axisX, axisY, axisZ, v;
    
    v = Vector3D.negateVector(cameraFacingDirection);
    axisZ = Vector3D.calculateUnitVectorOf(v);
    v = Vector3D.calculateCrossProductOf(cameraUpDirection, axisZ);
    axisX = Vector3D.calculateUnitVectorOf(v);
    axisY = Vector3D.calculateCrossProductOf(axisZ, axisX);

    var s11 = axisX.x;
    var s21 = axisY.x;
    var s31 = axisZ.x;
    var s41 = 0;

    var s12 = axisX.y;
    var s22 = axisY.y;
    var s32 = axisZ.y;
    var s42 = 0;

    var s13 = axisX.z;
    var s23 = axisY.z;
    var s33 = axisZ.z;
    var s43 = 0;

    var s14 = -Vector3D.calculateDotProductOf(axisX, cameraPosition);
    var s24 = -Vector3D.calculateDotProductOf(axisY, cameraPosition);
    var s34 = -Vector3D.calculateDotProductOf(axisZ, cameraPosition);
    var s44 = 1;

    return new Matrix4x4 (
        s11, s12, s13, s14,
        s21, s22, s23, s24,
        s31, s32, s33, s34,
        s41, s42, s43, s44
    );
};

Matrix4x4.createProjectionMatrix = function (
    fovY,        // fieldOfViewY
    aspectRatio, // Aspect ratio of 'viewport', not 'back buffer'!
    near,        // distanceToNearPlane
    far          // distanceToFarPlane
){
    if (fovY === undefined) {
        fovY = Camera.FIELD_OF_VIEW_Y;
    }

    if (near === undefined) {
        near = Camera.DEFAULT_DISTANCE_TO_NEAR_PLANE;
    }

    if (far === undefined) {
        far = Camera.DEFAULT_DISTANCE_TO_FAR_PLANE;
    }

    // Note:
    // Formula of the Direct3D Matrix.PerspectiveFovRH method:
    //
    // [ w    0    0                      0
    //   0    h    0                      0
    //   0    0    far/(near-far)        -1
    //   0    0    near*far/(near-far)    0 ]
    //
    // where
    // h = cot(fovY/2) = 1 / tan(fovY/2)
    // w = h / aspectRatio
    //
    var w, h;

    h = 1.0 / Math.tan(fovY / 2.0);
    w = h / aspectRatio;

    var a = [];

    a[0] = w;
    a[1] = 0;
    a[2] = 0;
    a[3] = 0;

    a[4] = 0;
    a[5] = h;
    a[6] = 0;
    a[7] = 0;

    a[ 8] =  0;
    a[ 9] =  0;
    a[10] = far / (near - far);
    a[11] = -1;

    a[12] = 0;
    a[13] = 0;
    a[14] = near * far / (near - far);
    a[15] = 0;

    return Matrix4x4.fromArray(a);
};

Matrix4x4.createScaleMatrix = function(v) {
    //
    return new Matrix4x4 (
        v.x, 0,   0,   0,
        0,   v.y, 0,   0,
        0,   0,   v.z, 0,
        0,   0,   0,   1
    );
};

Matrix4x4.createRotationMatrix = function (
    cartesianAxis,
    angle // in radians.
){
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    switch (cartesianAxis) {
        //
        case CartesianAxis.X: {
            //
            // Note:
            // In DirectX,
            //
            // return new Matrix4x4 (
            //     1,    0,      0,      0,
            //     0,    cos,    sin,    0,
            //     0,   -sin,    cos,    0,
            //     0,    0,      0,      1
            // );
            //
            // But in OpenGL,
            //
            return new Matrix4x4 (
                1,    0,      0,      0,
                0,    cos,   -sin,    0,
                0,    sin,    cos,    0,
                0,    0,      0,      1
            );            
        }

        case CartesianAxis.Y: {
            //
            // Note:
            // In DirectX,
            //
            // return new Matrix4x4 (
            //     cos,    0,   -sin,    0,
            //     0,      1,    0,      0,
            //     sin,    0,    cos,    0,
            //     0,      0,    0,      1
            // );
            //
            // But in OpenGL,
            //
            return new Matrix4x4 (
                cos,    0,    sin,    0,
                0,      1,    0,      0,
               -sin,    0,    cos,    0,
                0,      0,    0,      1
            );            
        }

        case CartesianAxis.Z: {
            //
            // Note:
            // In DirectX,
            //
            // return new Matrix4x4 (
            //     cos,    sin,    0,    0,
            //    -sin,    cos,    0,    0,
            //     0,      0,      1,    0,
            //     0,      0,      0,    1
            // );
            //
            // But in OpenGL,
            //
            return new Matrix4x4 (
                cos,   -sin,    0,    0,
                sin,    cos,    0,    0,
                0,      0,      1,    0,
                0,      0,      0,    1
            );
        }

        default: {
            console.log('A not-supported exception raised.');
            break;
        }
    }
};

Matrix4x4.createTranslationMatrix = function(v) {
    //
    return new Matrix4x4 (
        1, 0, 0, v.x,
        0, 1, 0, v.y,
        0, 0, 1, v.z,
        0, 0, 0,   1
    );
};

Matrix4x4.multiplyMatrices = function(m1, m2) {
    //
    var a1 = m1.elements;
    var a2 = m2.elements;
    var a3 = [];

    var a11=a1[0], a12=a1[4], a13=a1[ 8], a14=a1[12];
    var a21=a1[1], a22=a1[5], a23=a1[ 9], a24=a1[13];
    var a31=a1[2], a32=a1[6], a33=a1[10], a34=a1[14];
    var a41=a1[3], a42=a1[7], a43=a1[11], a44=a1[15];

    var b11=a2[0], b12=a2[4], b13=a2[ 8], b14=a2[12];
    var b21=a2[1], b22=a2[5], b23=a2[ 9], b24=a2[13];
    var b31=a2[2], b32=a2[6], b33=a2[10], b34=a2[14];
    var b41=a2[3], b42=a2[7], b43=a2[11], b44=a2[15];

    a3[ 0] = a11*b11 + a12*b21 + a13*b31 + a14*b41;
    a3[ 4] = a11*b12 + a12*b22 + a13*b32 + a14*b42;
    a3[ 8] = a11*b13 + a12*b23 + a13*b33 + a14*b43;
    a3[12] = a11*b14 + a12*b24 + a13*b34 + a14*b44;

    a3[ 1] = a21*b11 + a22*b21 + a23*b31 + a24*b41;
    a3[ 5] = a21*b12 + a22*b22 + a23*b32 + a24*b42;
    a3[ 9] = a21*b13 + a22*b23 + a23*b33 + a24*b43;
    a3[13] = a21*b14 + a22*b24 + a23*b34 + a24*b44;

    a3[ 2] = a31*b11 + a32*b21 + a33*b31 + a34*b41;
    a3[ 6] = a31*b12 + a32*b22 + a33*b32 + a34*b42;
    a3[10] = a31*b13 + a32*b23 + a33*b33 + a34*b43;
    a3[14] = a31*b14 + a32*b24 + a33*b34 + a34*b44;

    a3[ 3] = a41*b11 + a42*b21 + a43*b31 + a44*b41;
    a3[ 7] = a41*b12 + a42*b22 + a43*b32 + a44*b42;
    a3[11] = a41*b13 + a42*b23 + a43*b33 + a44*b43;
    a3[15] = a41*b14 + a42*b24 + a43*b34 + a44*b44;

    return Matrix4x4.fromArray(a3);
};

Matrix4x4.transposeMatrix = function(m) {
    //
    return new Matrix4x4 (
        m.s11, m.s21, m.s31, m.s41,
        m.s12, m.s22, m.s32, m.s42,
        m.s13, m.s23, m.s33, m.s43,
        m.s14, m.s24, m.s34, m.s44
    );
};

Matrix4x4.invertMatrix = function(m) {
    //
    // Note:
    // Adapted from THREE's Matrix4.getInverse()
    //
    var s11=m.s11, s12=m.s12, s13=m.s13, s14=m.s14;
    var s21=m.s21, s22=m.s22, s23=m.s23, s24=m.s24;
    var s31=m.s31, s32=m.s32, s33=m.s33, s34=m.s34;
    var s41=m.s41, s42=m.s42, s43=m.s43, s44=m.s44;

    var d11 = s23*s34*s42 - s24*s33*s42 + s24*s32*s43 - s22*s34*s43 - s23*s32*s44 + s22*s33*s44;
    var d12 = s14*s33*s42 - s13*s34*s42 - s14*s32*s43 + s12*s34*s43 + s13*s32*s44 - s12*s33*s44;
    var d13 = s13*s24*s42 - s14*s23*s42 + s14*s22*s43 - s12*s24*s43 - s13*s22*s44 + s12*s23*s44;
    var d14 = s14*s23*s32 - s13*s24*s32 - s14*s22*s33 + s12*s24*s33 + s13*s22*s34 - s12*s23*s34;

    // Calculates the determinant.
    var s = s11*d11 + s21*d12 + s31*d13 + s41*d14;

    if (s === 0) {
        throw 'Can\'t invert matrix cuz determinant is 0';
    }

    s = 1 / s;

    return Matrix4x4.fromArray ([
        d11 * s,
        (s24*s33*s41 - s23*s34*s41 - s24*s31*s43 + s21*s34*s43 + s23*s31*s44 - s21*s33*s44) * s,
        (s22*s34*s41 - s24*s32*s41 + s24*s31*s42 - s21*s34*s42 - s22*s31*s44 + s21*s32*s44) * s,
        (s23*s32*s41 - s22*s33*s41 - s23*s31*s42 + s21*s33*s42 + s22*s31*s43 - s21*s32*s43) * s,
        d12 * s,
        (s13*s34*s41 - s14*s33*s41 + s14*s31*s43 - s11*s34*s43 - s13*s31*s44 + s11*s33*s44) * s,
        (s14*s32*s41 - s12*s34*s41 - s14*s31*s42 + s11*s34*s42 + s12*s31*s44 - s11*s32*s44) * s,
        (s12*s33*s41 - s13*s32*s41 + s13*s31*s42 - s11*s33*s42 - s12*s31*s43 + s11*s32*s43) * s,
        d13 * s,
        (s14*s23*s41 - s13*s24*s41 - s14*s21*s43 + s11*s24*s43 + s13*s21*s44 - s11*s23*s44) * s,
        (s12*s24*s41 - s14*s22*s41 + s14*s21*s42 - s11*s24*s42 - s12*s21*s44 + s11*s22*s44) * s,
        (s13*s22*s41 - s12*s23*s41 - s13*s21*s42 + s11*s23*s42 + s12*s21*s43 - s11*s22*s43) * s,
        d14 * s,
        (s13*s24*s31 - s14*s23*s31 + s14*s21*s33 - s11*s24*s33 - s13*s21*s34 + s11*s23*s34) * s,
        (s14*s22*s31 - s12*s24*s31 - s14*s21*s32 + s11*s24*s32 + s12*s21*s34 - s11*s22*s34) * s,
        (s12*s23*s31 - s13*s22*s31 + s13*s21*s32 - s11*s23*s32 - s12*s21*s33 + s11*s22*s33) * s
    ]);
};

Matrix4x4.areEqual = function(m1, m2) {
    //
    if ((m1 instanceof Matrix4x4) === false ||
        (m2 instanceof Matrix4x4) === false) {
        return false;
    }

    var a1 = m1.elements;
    var a2 = m2.elements;

    for (var i=0; i<Matrix4x4.ELEMENT_COUNT; i++)
    {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }

    return true;
};

Object.freeze(Matrix4x4);

//
// Constructor.
//
function Quaternion(_x, _y, _z, _w) {
    //
    // The vector part.
    this.x = _x;
    this.y = _y;
    this.z = _z;

    // The scalar part.
    this.w = _w; // W isn't the rotation angle (in radians).
}

Quaternion.prototype = {
    //
    // Public methods.
    //
    toMatrix4x4: function() {
        //
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var w = this.w;

        var xx = x * x;
        var yy = y * y;
        var zz = z * z;
        var xy = x * y;
        var zw = z * w;
        var zx = z * x;
        var yw = y * w;
        var yz = y * z;
        var xw = x * w;
        
        // Note:
        // In DirectX,
        //
        // m.s11 = 1 - (2 * (yy + zz));
        // m.s12 = 2 * (xy + zw);
        // m.s13 = 2 * (zx - yw);
        // m.s14 = 0;
        //
        // m.s21 = 2 * (xy - zw);
        // m.s22 = 1 - (2 * (zz + xx));
        // m.s23 = 2 * (yz + xw);
        // m.s24 = 0;
        //
        // m.s31 = 2 * (zx + yw);
        // m.s32 = 2 * (yz - xw);
        // m.s33 = 1 - (2 * (yy + xx));
        // m.s34 = 0;
        //
        // m.s41 = 0;
        // m.s42 = 0;
        // m.s43 = 0;
        // m.s44 = 1;

        var a = [
            // Column 1.
            1 - (2 * (yy + zz)), // m.s11
            2 * (xy + zw),       // m.s21
            2 * (zx - yw),       // m.s31
            0,                   // m.s41
            // Column 2.
            2 * (xy - zw),       // m.s12
            1 - (2 * (zz + xx)), // m.s22
            2 * (yz + xw),       // m.s32
            0,                   // m.s42
            // Column 3.
            2 * (zx + yw),       // m.s13
            2 * (yz - xw),       // m.s23
            1 - (2 * (yy + xx)), // m.s33
            0,                   // m.s43
            // Column 4.
            0,                   // n.s14
            0,                   // n.s24
            0,                   // n.s34
            1                    // n.s44
        ];        

        return Matrix4x4.fromArray(a);
    }
};

//
// Static constants (after Object.freeze()).
//
Quaternion.ELEMENT_COUNT = 4;

//
// Static methods.
//
Quaternion.fromAxisAngle = function(axis, angle) {
    //
    axis = Vector3D.calculateUnitVectorOf(axis);
    
    var halfAngle = angle * 0.5;

    var sin = Math.sin(halfAngle);
    var cos = Math.cos(halfAngle);

    return new Quaternion (
        axis.x * sin,
        axis.y * sin,
        axis.z * sin,
        cos
    );
};

Quaternion.fromArray = function(a) {
    return new Quaternion(a[0], a[1], a[2], a[3]);
};

Quaternion.createIdentityQuaternion = function() {
    return new Quaternion(0, 0, 0, 1);
};

Quaternion.calculateUnitQuaternionOf = function(q) {
    //
    var sqrt = Math.sqrt(q.x*q.x + q.y*q.y + q.z*q.z +q.w*q.w);
    if (sqrt < MathHelper.EPSILON) {
        //
        // Note:
        // This engine doesn't throw a divide-by-zero exception when normalizing
        // Vector2D, Vector3D, Vector4D, Quaternion.
        /*
        console.log('A divide-by-zero exception raised.');
        */

        return new Quaternion(0, 0, 0, 0);

    } else {
        //
        var s = 1.0 / sqrt;

        return new Quaternion(q.x*s, q.y*s, q.z*s, q.w*s);
    }
};

Quaternion.areEqual = function(q1, q2) {
    //
    if ((q1 instanceof Quaternion) === false ||
        (q2 instanceof Quaternion) === false) {
        return false;
    }

    if (q1.x !== q2.x ||
        q1.y !== q2.y ||
        q1.z !== q2.z ||
        q1.w !== q2.w) {
        return false;
    } else {
        return true;
    }
};

Object.freeze(Quaternion);

//
// Constructor.
//
function Vector2D(_x, _y) {
    //
    this.x = _x;
    this.y = _y;
}

Vector2D.prototype = {
    //
    // Public methods.
    //
    toArray: function() {
        return [ this.x, this.y ];
    }
};

//
// Static constants (after Object.freeze()).
//
Vector2D.ELEMENT_COUNT = 2;

//
// Static methods.
//
Vector2D.fromArray = function(a) {
    return new Vector2D(a[0], a[1]);
};

Vector2D.calculateUnitVectorOf = function(v) {
    //
    // Note:
    // All XNA, SlimDX, and WPF don't react to the situation when sqrt = 0, such
    // as zero vector's normalization. But finally I decide to code in the way as
    // the book 'Essential Mathematics for Games and Interactive Applications' does.

    var sqrt = Math.sqrt(v.x*v.x + v.y*v.y);

    if (sqrt < MathHelper.EPSILON) {
        //
        // Note:
        // Cybo doesn't throw a divide-by-zero exception when normalizing
        // Vector2D, Vector2D, Vector4D, Quaternion.
        /*
        console.log('A divide-by-zero exception raised.');
        */

        return new Vector2D(0, 0);

    } else {
        //
        var s = 1.0 / sqrt;
        return new Vector2D(v.x*s, v.y*s);
    }
};

Vector2D.negateVector = function (v) {
    return new Vector2D(-v.x, -v.y);
};

Vector2D.addVectors = function(v1, v2) {
    return new Vector2D(v1.x+v2.x, v1.y+v2.y);
};

Vector2D.subtractVectors = function(v1, v2) {
    return new Vector2D(v1.x-v2.x, v1.y-v2.y);
};

Vector2D.multiplyVectorByScalar = function(v, s) {
    return new Vector2D(v.x*s, v.y*s);
};

Vector2D.calculateLengthOf = function(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y);
};

Vector2D.calculateLengthSquaredOf = function(v) {
    return v.x*v.x + v.y*v.y;
};

Vector2D.calculateDotProductOf = function(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y;
};

Vector2D.calculatePerpendicularVectorOf = function(v) {
    //
    // Note:
    // There are two vectors perpendicular to any given vector, one rotated
    // 90 degrees counterclockwise and the other rotated 90 degrees clockwise.
    // F. S. Hill, Jr. (1994) defines the perpendicular vector (v2) obtained
    // from an initial vector (v1) by a counterclockwise rotation by 90
    // degrees.
    //
    return new Vector2D(-v.y, v.x);
};

Vector2D.calculatePerpendicularDotProductOf = function(v1, v2) {
    //
    // Optimization:
    /*
    var v3 = // which is v1 rotated 90 degrees counterclockwise.
        Vector2D.calculatePerpendicularVectorOf(v1);

    return Vector2D.calculateDotProductOf(v3, v2);
    */

    return -v1.y*v2.x + v1.x*v2.y;
    // :Optimization
};

Vector2D.areEqual = function(v1, v2) {
    //
    if ((v1 instanceof Vector2D) === false ||
        (v2 instanceof Vector2D) === false) {
        return false;
    }

    if (v1.x !== v2.x ||
        v1.y !== v2.y) {
        return false;
    } else {
        return true;
    }
};

Object.freeze(Vector2D);

//
// Constructor.
//
function Vector4D(_x, _y, _z, _w) {
    //
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.w = _w;
}

//
// Prototype.
//
Vector4D.prototype = {
    //
    // Public methods.
    //
    toArray: function() {
        return [ this.x, this.y, this.z, this.w ];
    }
};

Object.defineProperty(Vector4D.prototype, 'xyz', {
    'get': function() { return new Vector3D(this.x, this.y, this.z); }
});

//
// Static constants (after Object.freeze()).
//
Vector4D.ELEMENT_COUNT = 4;

//
// Static methods.
//
Vector4D.fromArray = function(a) {
    return new Vector4D(a[0], a[1], a[2], a[3]);
};

Vector4D.calculateUnitVectorOf = function(v) {
    //
    // Note:
    // All XNA, SlimDX, and WPF don't react to the situation when sqrt = 0, such
    // as zero vector's normalization. But finally I decide to code in the way as
    // the book 'Essential Mathematics for Games and Interactive Applications' does.

    var sqrt = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z + v.w*v.w);

    if (sqrt < MathHelper.EPSILON) {
        //
        // Note:
        // Cybo doesn't throw a divide-by-zero exception when normalizing
        // Vector2D, Vector4D, Vector4D, Quaternion.
        /*
        console.log('A divide-by-zero exception raised.');
        */

        return new Vector4D(0, 0, 0, 0);

    } else {
        //
        var s = 1.0 / sqrt;
        return new Vector4D(v.x*s, v.y*s, v.z*s, v.w*s);
    }
};

Vector4D.addVectors = function(v1, v2) {
    return new Vector4D(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z, v1.w+v2.w);
};

Vector4D.subtractVectors = function(v1, v2) {
    return new Vector4D(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z, v1.w-v2.w);
};

Vector4D.multiplyVectorByScalar = function(v, s) {
    return new Vector4D(v.x*s, v.y*s, v.z*s, v.w*s);
};

Vector4D.calculateLengthOf = function(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z + v.w*v.w);
};

Vector4D.calculateLengthSquaredOf = function(v) {
    return v.x*v.x + v.y*v.y + v.z*v.z + v.w*v.w;
};

Vector4D.transform = function(m, v) {
    //
    return new Vector4D (
        m.s11*v.x + m.s12*v.y + m.s13*v.z + m.s14*v.w,
        m.s21*v.x + m.s22*v.y + m.s23*v.z + m.s24*v.w,
        m.s31*v.x + m.s32*v.y + m.s33*v.z + m.s34*v.w,
        m.s41*v.x + m.s42*v.y + m.s43*v.z + m.s44*v.w
    );
};

Vector4D.areEqual = function(v1, v2) {
    //
    if ((v1 instanceof Vector4D) === false ||
        (v2 instanceof Vector4D) === false) {
        return false;
    }

    if (v1.x !== v2.x ||
        v1.y !== v2.y ||
        v1.z !== v2.z ||
        v1.w !== v2.w) {
        return false;
    } else {
        return true;
    }
};

Object.freeze(Vector4D);

//
// Constructor.
//
function Vector3D(_x, _y, _z) {
    //
    this.x = _x;
    this.y = _y;
    this.z = _z;

    // Object.defineProperty(this, 'xy', {
    //     'get': function() { return new Vector2D(_x, _y); }
    // });
}

Vector3D.prototype = {
    //
    // Public methods.
    //
    toArray: function() {
        return [ this.x, this.y, this.z ];
    }
};

Object.defineProperty(Vector3D.prototype, 'xy', {
    'get': function() { return new Vector2D(this.x, this.y); }
});

//
// Static constants (after Object.freeze()).
//
Vector3D.ELEMENT_COUNT = 3;

//
// Static methods.
//
Vector3D.fromArray = function(a) {
    return new Vector3D(a[0], a[1], a[2]);
};

Vector3D.calculateUnitVectorOf = function(v) {
    //
    // Note:
    // All XNA, SlimDX, and WPF don't react to the situation when sqrt = 0, such
    // as zero vector's normalization. But finally I decide to code in the way as
    // the book 'Essential Mathematics for Games and Interactive Applications' does.

    var sqrt = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);

    if (sqrt < MathHelper.EPSILON) {
        //
        // Note:
        // Cybo doesn't throw a divide-by-zero exception when normalizing
        // Vector2D, Vector3D, Vector4D, Quaternion.
        /*
        console.log('A divide-by-zero exception raised.');
        */

        return new Vector3D(0, 0, 0);

    } else {
        //
        var s = 1.0 / sqrt;
        return new Vector3D(v.x*s, v.y*s, v.z*s);
    }
};

Vector3D.negateVector = function (v) {
    return new Vector3D(-v.x, -v.y, -v.z);
};

Vector3D.addVectors = function(v1, v2) {
    return new Vector3D(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
};

Vector3D.subtractVectors = function(v1, v2) {
    return new Vector3D(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z);
};

Vector3D.multiplyVectorByScalar = function(v, s) {
    return new Vector3D(v.x*s, v.y*s, v.z*s);
};

Vector3D.calculateLengthOf = function(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
};

Vector3D.calculateLengthSquaredOf = function(v) {
    return v.x*v.x + v.y*v.y + v.z*v.z;
};

Vector3D.calculateDotProductOf = function(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
};

Vector3D.calculateCrossProductOf = function(v1, v2) {
    //
    return new Vector3D (
        v1.y*v2.z - v1.z*v2.y,
        v1.z*v2.x - v1.x*v2.z,
        v1.x*v2.y - v1.y*v2.x
    );
};

Vector3D.transformPoint = function(m, p) {
    //
    var v = new Vector4D(p.x, p.y, p.z, 1);
    var v2 = Vector4D.Transform(m, v);

    var s = 1 / v2.w;
    return new Vector3D(v2.x*s, v2.y*s, v2.z*s);
};

Vector3D.transformVector = function(m, v) {
    //
    var v2 = new Vector4D(v.x, v.y, v.z, 0);
    v = Vector4D.Transform(m, v2);

    return new Vector3D(v.x, v.y, v.z);
};

Vector3D.transform = function(v1, q) {
    //
    var x = q.X + q.X;
    var y = q.Y + q.Y;
    var z = q.Z + q.Z;
    var wx = q.W * x;
    var wy = q.W * y;
    var wz = q.W * z;
    var xx = q.X * x;
    var xy = q.X * y;
    var xz = q.X * z;
    var yy = q.Y * y;
    var yz = q.Y * z;
    var zz = q.Z * z;

    var s1 = (1.0 - yy) - zz;
    var s2 = xy - wz;
    var s3 = xz + wy;
    var s4 = xy + wz;
    var s5 = (1.0 - xx) - zz;
    var s6 = yz - wx;
    var s7 = xz - wy;
    var s8 = yz + wx;
    var s9 = (1.0 - xx) - yy;

    return new Vector3D (
        (v1.X*s1 + v1.Y*s2) + v1.Z*s3,
        (v1.X*s4 + v1.Y*s5) + v1.Z*s6,
        (v1.X*s7 + v1.Y*s8) + v1.Z*s9
    );
};

Vector3D.areEqual = function(v1, v2) {
    //
    if ((v1 instanceof Vector3D) === false ||
        (v2 instanceof Vector3D) === false) {
        return false;
    }

    if (v1.x !== v2.x ||
        v1.y !== v2.y ||
        v1.z !== v2.z) {
        return false;
    } else {
        return true;
    }
};

Object.freeze(Vector3D);

//
// Constructor.
//
function AxisGroup() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
AxisGroup.X_AXIS = new Vector3D(1, 0, 0);
AxisGroup.Y_AXIS = new Vector3D(0, 1, 0);
AxisGroup.Z_AXIS = new Vector3D(0, 0, 1);

Object.freeze(AxisGroup);

//
// Constructor.
//
function ViewFrustum() {
    // No contents.
}

Object.freeze(ViewFrustum);

//
// Constructor.
//
function Camera (
    _scene,
    _position,
    _facingDirection,
    _upDirection,
    _distanceToNearPlane,
    _distanceToFarPlane
){
    var _viewMatrix;
    var _projectionMatrix;
    var _transform;
    var _viewFrustum;
    var _hasToUpdateViewMatrix;
    var _hasToUpdateProjectionMatrix;
    var _hasToRaiseTransformUpdatedEvent;
    var _lastViewportAspectRatio;
        
    try {
        //
        if (_position === undefined) {
            _position = new Vector3D(0, 0, 10000);
        }

        if (_facingDirection === undefined) {
            _facingDirection = Camera.DEFAULT_FACING_DIRECTION;
        }

        if (_upDirection === undefined) {
            _upDirection = Camera.DEFAULT_UP_DIRECTION;
        }

        if (_distanceToNearPlane === undefined) {
            _distanceToNearPlane = Camera.DEFAULT_DISTANCE_TO_NEAR_PLANE;
        }

        if (_distanceToFarPlane === undefined) {
            _distanceToFarPlane = Camera.DEFAULT_DISTANCE_TO_FAR_PLANE;
        }

        if (_distanceToNearPlane < Camera.MIN_DISTANCE_TO_NEAR_PLANE) {
            _distanceToNearPlane = Camera.MIN_DISTANCE_TO_NEAR_PLANE;
        }

        if (Camera.MAX_DISTANCE_TO_FAR_PLANE < _distanceToFarPlane) {
            _distanceToFarPlane = Camera.MAX_DISTANCE_TO_FAR_PLANE;
        }

        _viewFrustum = new ViewFrustum();

        Object.defineProperty(this, 'position', {
            'get': function() { return _position; }
        });

        Object.defineProperty(this, 'facingDirection', {
            'get': function() { return _facingDirection; }
        });

        Object.defineProperty(this, 'upDirection', {
            'get': function() { return _upDirection; }
        });

        Object.defineProperty(this, 'distanceToNearPlane', {
            'get': function() { return _distanceToNearPlane; }
        });

        Object.defineProperty(this, 'distanceToFarPlane', {
            'get': function() { return _distanceToFarPlane; }
        });

        Object.defineProperty(this, 'viewFrustum', {
            'get': function() { return _viewFrustum; }
        });

        _hasToUpdateViewMatrix           = true;
        _hasToUpdateProjectionMatrix     = true;
        _hasToRaiseTransformUpdatedEvent = true;
        
    } catch (e) {
        //
        console.log('Cybo.Camera: ', e);

        throw e;
    }

    //
    // Private methods.
    //
    function checkViewMatrix() {
        //
        if (_hasToUpdateViewMatrix === false) {
            return;
        }

        _viewMatrix = Matrix4x4.createViewMatrix (
            _position,
            _facingDirection,
            _upDirection
        );

        _hasToRaiseTransformUpdatedEvent = true;
        _hasToUpdateViewMatrix = false;
    }

    function checkProjectionMatrix() {
        //
        // Note:
        // Calculates the aspect ratio of 'viewport', not 'back buffer'.

        var viewportAspectRatio =
            _scene.graphicsManager.viewport.aspectRatio;

        // Note:
        // The values we want to compare are ratios, we can't just compare if
        // they are equal. The results could be different in the debug and re-
        // lease modes and this will cause subtle bugs. Be careful!
        /*
        if (viewportAspectRatio === _lastViewportAspectRatio) {
            return;
        }
        */

        if (// Part 1.
            _hasToUpdateProjectionMatrix === false &&
            // Part 2.
            MathHelper.areEqual(viewportAspectRatio, _lastViewportAspectRatio) ===
            true) {
            return;
        }
        // :Note

        _lastViewportAspectRatio = viewportAspectRatio;

        _projectionMatrix = Matrix4x4.createProjectionMatrix (
            Camera.FIELD_OF_VIEW_Y,
            _lastViewportAspectRatio,
            _distanceToNearPlane,
            _distanceToFarPlane
        );

        _hasToRaiseTransformUpdatedEvent = true;
        _hasToUpdateProjectionMatrix = false;
    }

    //
    // Privileged methods.
    //
    this.zoom = function(distance) {
        //
        // _position +=
        //     Vector3D.calculateUnitVectorOf(_facingDirection) * distance;

        var v = Vector3D.multiplyVectorByScalar (
            Vector3D.calculateUnitVectorOf(_facingDirection),
            distance
        );

        _position = Vector3D.addVectors(_position, v);

        _hasToUpdateViewMatrix = true;
    };

    //
    // Privileged methods
    //

    //
    // Accessors
    //
    this.getViewMatrix = function(m) {
        //
        checkViewMatrix();
        m.elements = _viewMatrix.elements.slice();
    };

    this.getProjectionMatrix = function(m) {
        //
        checkProjectionMatrix();
        m.elements = _projectionMatrix.elements.slice();
    };

    this.getTransform = function(m) {
        //
        // Checks the view matrix.
        checkViewMatrix();

        // Checks the projection matrix.
        checkProjectionMatrix();

        if (_hasToRaiseTransformUpdatedEvent === true) {
            //
            // Note:
            // _hasToRaiseTransformUpdatedEvent == true means _viewMatrix or
            // _projectionMatrix (or both) is recreated. So, _transform has
            // to be recalculated.

            // Recalculates the transform.
            _transform = Matrix4x4.multiplyMatrices (
                _projectionMatrix,
                _viewMatrix
            );
        }

        m.elements = _transform.elements.slice();

        // Raises the transform-updated event (if necessary).
        if (_hasToRaiseTransformUpdatedEvent === true) {
            // Temp:
            /*
            if (this.TransformUpdated != null) {
                this.TransformUpdated(this, EventArgs.Empty);
            }
            */

            _hasToRaiseTransformUpdatedEvent = false;
        }
    };
}   

//
// Static constants (after Object.freeze()).
//
Camera.DEFAULT_FACING_DIRECTION       = Vector3D.negateVector(AxisGroup.Z_AXIS);
Camera.DEFAULT_UP_DIRECTION           = AxisGroup.Y_AXIS;
Camera.FIELD_OF_VIEW_Y                = MathHelper.PI_OVER_FOUR;           // = pi / 4
Camera.MIN_DISTANCE_TO_NEAR_PLANE     = 10;
Camera.MAX_DISTANCE_TO_FAR_PLANE      = 1000000;                           // = 10^6
Camera.DEFAULT_DISTANCE_TO_NEAR_PLANE = Camera.MIN_DISTANCE_TO_NEAR_PLANE; // = 10.
Camera.DEFAULT_DISTANCE_TO_FAR_PLANE  = 100000;                            // = 10^5

Object.freeze(Camera);

//
// Constructor.
//
function ClearOptions() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
ClearOptions.COLOR_BUFFER   = 0x00004000; // = gl.COLOR_BUFFER_BIT
ClearOptions.DEPTH_BUFFER   = 0x00000100; // = gl.DEPTH_BUFFER_BIT
ClearOptions.STENCIL_BUFFER = 0x00000400; // = gl.STENCIL_BUFFER_BIT

Object.freeze(ClearOptions);

// Note:
// OpenGL's color is composed of (r, g, b, a) channels.
// DirectX's color is composed of (a, r, g, b) channels.

//
// Constructor.
//
function Color(r, g, b, a) {
    //
    if (a === undefined) {
        a = 1.0;
    }

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

//
// Prototype.
//
Color.prototype = {
    //
    // Public methods.
    //
    toArray: function() {
        return [ this.r, this.g, this.b, this.a ];
    }
};

//
// Static methods.
//
Color.areEqual = function(value1, value2) {
    //
    if ((value1 instanceof Color) === false ||
        (value2 instanceof Color) === false) {
        return false;
    }

    if (value1.r !== value2.r ||
        value1.g !== value2.g ||
        value1.b !== value2.b ||
        value1.a !== value2.a) {
        return false;
    } else {
        return true;
    }
};

Object.freeze(Color);

// Reference:
// Photoshop CS2 Swatches.

//
// Constructor.
//
function Colors() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
Colors.DEFAULT_BACKGROUND = new Color(32/255, 32/255, 32/255, 1);

//
// System.
//
Colors.BLACK              = new Color(0, 0, 0, 1);
Colors.WHITE              = new Color(1, 1, 1, 1);
Colors.TRANSPARENT        = new Color(1, 1, 1, 0);
Colors.SKY_BLUE           = new Color(135/255, 206/255, 235/255, 1);
Colors.CADET_BLUE         = new Color(95/255, 158/255, 160/255, 1);

//
// Photoshop
//
// Red.
// (PS, There's no PHOTOSHOP_PASTEL_RED (cuz it's ugly), use PINK instead.)
//
Colors.PINK = new Color(255/255, 192/255, 203/255, 1);
Colors.PHOTOSHOP_DARK_RED = new Color(157/255, 10/255, 14/255, 1);

//
// Red orange.
//
Colors.PHOTOSHOP_PASTEL_RED_ORANGE = new Color(255, 173/255, 129/255, 1);
Colors.PHOTOSHOP_DARK_RED_ORANGE = new Color(255, 65/255, 13/255, 1);

//
// Yellow orange.
//
Colors.PHOTOSHOP_PASTEL_YELLOW_ORANGE = new Color(253/255, 198/255, 137/255, 1);
Colors.PHOTOSHOP_DARK_YELLOW_ORANGE = new Color(163/255, 97/255, 9/255, 1);

//
// Yellow.
//
Colors.PHOTOSHOP_PASTEL_YELLOW = new Color(255/255, 247/255, 153/255, 1);
Colors.PHOTOSHOP_DARK_YELLOW = new Color(171/255, 160/255, 0/255, 1);

//
// Green.
//
Colors.PHOTOSHOP_PASTEL_PEA_GREEN = new Color(196/255, 223/255, 155/255, 1);
Colors.PHOTOSHOP_DARK_PEA_GREEN = new Color(89/255, 133/255, 39/255, 1);

//
// Yellow green.
//
Colors.PHOTOSHOP_PASTEL_YELLOW_GREEN = new Color(162/255, 211/255, 156/255, 1);
Colors.PHOTOSHOP_DARK_YELLOW_GREEN = new Color(25/255, 122/255, 48/255, 1);

//
// Green.
//
Colors.PHOTOSHOP_PASTEL_GREEN = new Color(130/255, 202/255, 156/255, 1);
Colors.PHOTOSHOP_DARK_GREEN = new Color(0/255, 114/255, 54/255, 1);

//
// Green cyan.
//
Colors.PHOTOSHOP_PASTEL_GREEN_CYAN = new Color(122/255, 204/255, 200/255, 1);
Colors.PHOTOSHOP_DARK_GREEN_CYAN = new Color(0/255, 115/255, 106/255, 1);

//
// Cyan.
//
Colors.PHOTOSHOP_PASTEL_CYAN = new Color(109/255, 207/255, 246/255, 1);
Colors.PHOTOSHOP_DARK_CYAN = new Color(0/255, 118/255, 163/255, 1);

//
// Cyan blue.
//
Colors.PHOTOSHOP_PASTEL_CYAN_BLUE = new Color(125/255, 167/255, 216/255, 1);
Colors.PHOTOSHOP_DARK_CYAN_BLUE = new Color(0/255, 74/255, 128/255, 1);

//
// Blue.
//
Colors.PHOTOSHOP_PASTEL_BLUE = new Color(131/255, 147/255, 202/255, 1);
Colors.PHOTOSHOP_DARK_BLUE = new Color(0/255, 52/255, 113/255, 1);

//
// Blue violet.
//
Colors.PHOTOSHOP_PASTEL_BLUE_VIOLET = new Color(135/255, 129/255, 189/255, 1);
Colors.PHOTOSHOP_DARK_BLUE_VIOLET = new Color(27/255, 20/255, 100/255, 1);

//
// Violet.
//
Colors.PHOTOSHOP_PASTEL_VIOLET = new Color(161/255, 134/255, 190/255, 1);
Colors.PHOTOSHOP_DARK_VIOLET = new Color(68/255, 14/255, 98/255, 1);

//
// Violet magenta.
//
Colors.PHOTOSHOP_PASTEL_VIOLET_MAGENTA = new Color(188/255, 140/255, 191/255, 1);
Colors.PHOTOSHOP_DARK_VIOLET_MAGENTA = new Color(98/255, 4/255, 96/255, 1);

//
// Magenta.
//
Colors.PHOTOSHOP_PASTEL_MAGENTA = new Color(244/255, 154/255, 193/255, 1);
Colors.PHOTOSHOP_DARK_MAGENTA = new Color(158/255, 0/255, 93/255, 1);

//
// Magenta red.
//
Colors.PHOTOSHOP_PASTEL_MAGENTA_RED = new Color(245/255, 152/255, 157/255, 1);
Colors.PHOTOSHOP_DARK_MAGENTA_RED = new Color(157/255, 0/255, 57/255, 1);

//
// Brown.
//
Colors.PHOTOSHOP_PALE_COOL_BROWN = new Color(199/255, 178/255, 153/255, 1);
Colors.PHOTOSHOP_DARK_COOL_BROWN = new Color(83/255, 71/255, 65/255, 1);
Colors.PHOTOSHOP_PALE_WARM_BROWN = new Color(198/255, 156/255, 109/255, 1);
Colors.PHOTOSHOP_DARK_WARM_BROWN = new Color(117/255, 76/255, 36/255, 1);

//
// OSX
//
Colors.OSX_SOLID_KELP = new Color(89/255, 136/255, 123/255, 1);

Object.freeze(Colors);

// Note:
// Whether in OpenGL or DirectX, depth buffers have values 0 ~ 1, and conventionally,
// 0: near plane, 1: far plane. We can change it (such as: using gl.depthRange()
// or device.Viewport), but don't change it.

//
// Constructor.
//
function DepthBufferValues() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
DepthBufferValues.NEAR_CLIP_PLANE = 0.0; // = default zNear of gl.getParameter(gl.DEPTH_RANGE).
DepthBufferValues.FAR_CLIP_PLANE  = 1.0; // = default zFar of gl.getParameter(gl.DEPTH_RANGE).

Object.freeze(DepthBufferValues);

// Note:
// OpenGL viewport's (X, Y) means the lower-left corner.
// DirectX viewport's (X, Y) means the upper-left corner.

// Note:
// DirectX uses Viewport to set { left, top, width, height, minDepth(near), maxDepth(far) }
// OpenGL uses gl.viewport() to set { left, bottom, width, height }
// and gl.depthRange() to set { nearDepth, farDepth }

// import { NormalizedDeviceCoordinates  } from './normalized-device-coordinates';
// import { Vector2D  } from '../math/2d-vector';

//
// Constructor.
//
function Viewport(_left, _bottom, _width, _height) {
    //
    this.left   = _left;
    this.bottom = _bottom;
    this.width  = _width;
    this.height = _height;

    //
    // Properties.
    //
    Object.defineProperty(this, 'aspectRatio', {
        get: function() { return _width / _height; }
    });

    // //
    // // Privileged methods.
    // //
    // this.toNormalizedDeviceSpace = function(screenPosition) {
    //     //
    //     // Note:
    //     // Because the input is already a 'screen position', that is, we don't have
    //     // to worry about w (perspective division), the formula below converts the
    //     // screen position directly to normalized device coordinates.

    //     // Note:
    //     // Besides, OpenGL has no half-pixel offset problem like DirectX 9, don't
    //     // have to handle it.
    //     /*
    //     return new Vector2D (
    //         // Part 1.
    //         NormalizedDeviceCoordinates.MIN_X +
    //         ((screenPosition.x - 0.5) / _width) *
    //         (NormalizedDeviceCoordinates.MAX_X - NormalizedDeviceCoordinates.MIN_X),
    //         // Part 2.
    //         NormalizedDeviceCoordinates.MIN_Y +
    //         ((screenPosition.y - 0.5) / _height) *
    //         (NormalizedDeviceCoordinates.MAX_Y - NormalizedDeviceCoordinates.MIN_Y)
    //     );
    //     */

    //     return new Vector2D (
    //         // Part 1.
    //         NormalizedDeviceCoordinates.MIN_X +
    //         (screenPosition.x / _width) *
    //         (NormalizedDeviceCoordinates.MAX_X - NormalizedDeviceCoordinates.MIN_X),
    //         // Part 2.
    //         NormalizedDeviceCoordinates.MIN_Y +
    //         (screenPosition.y / _height) *
    //         (NormalizedDeviceCoordinates.MAX_Y - NormalizedDeviceCoordinates.MIN_Y)
    //     );
    //     // :Note
    // }
}

Object.freeze(Viewport);

//
// Constructor.
//
function GraphicsManager(_xcene) {
    //
    var _canvas;
    var _gl;
    var _pixelRatio;
    var _viewport;
    var _program;
    var _clearColor;
    var _clearDepth;
    var _clearStencil;

    try {
        //
        _pixelRatio = window.devicePixelRatio;

        setUpCanvas();

        setUpStyles();

        setUpWebGLContext();

    } catch (e) {
        //
        console.log('GraphicsManager: '+ e);

        throw e;
    }

    //
    // Properties.
    //
    Object.defineProperty(this, 'xcene', {
        'get': function() { return _xcene; }
    });

    Object.defineProperty(this, 'canvas', {
        'get': function() { return _canvas; }
    });
    
    Object.defineProperty(this, 'webGLContext', {
        get: function() { return _gl; }
    });

    Object.defineProperty(this, 'pixelRatio', {
        get: function() { return _pixelRatio; }
    });

    Object.defineProperty(this, 'viewport', {
        //
        'get': function() {
            return _viewport;
        },

        'set': function(value) {
            //
            if (value !== undefined &&
                _viewport !== undefined &&
                value.left   === _viewport.left &&
                value.bottom === _viewport.bottom &&
                value.width  === _viewport.width &&
                value.height === _viewport.height) {
                return;
            }

            _viewport = value;

            // Resets the gl's viewport as well.
            _gl.viewport (
                // Part 1.
                _viewport.left, _viewport.bottom,
                // Part 2.
                _viewport.width, _viewport.height
            );
        }
    });
    
    Object.defineProperty(this, 'program', {
        //
        get: function() {
            return _program;
        },
        
        set: function(value) {
            //
            if (value === _program)
            {
                return;                
            }
            
            _program = value;
            _gl.useProgram(_program);
        },
    });

    //
    // Private methods.
    //
    function setUpCanvas() {
        //
        if (_xcene.settings !== undefined &&
            _xcene.settings.canvas !== undefined) {
            //
            _canvas = _xcene.settings.canvas;

        } else {
            //
            if (document.body === undefined) {
                throw 'document.body === undefined';
            }

            _canvas = document.createElementNS (
                'http://www.w3.org/1999/xhtml',
                'canvas'
            );

            document.body.appendChild(_canvas);
        }
    }

    function setUpStyles() {
        //
        // Note:
        // This function is used to replace CSS below...
        //
        // body {
        //     margin: 0;
        //     background-color: #202020; /* = cybo.graphics.colors.DEFAULT_BACKGROUND*/
        // }
        //
        // canvas {
        //     width:   100vw;
        //     height:  100vh;
        //     display: block; /* prevents scrollbar */
        // }
        //
        if (_xcene.settings !== undefined &&
            _xcene.settings.usesDefaultStyles === true) {
            return;
        }

        var style;

        style = document.body.style;
        style.margin = 0;
        style.backgroundColor = '#202020'; // = cybo.graphics.colors.DEFAULT_BACKGROUND

        style = _canvas.style;
        style.width = '100vw';
        style.height = '100vh';
        style.display = 'block';
    }    

    function setUpWebGLContext() {
        //
        // Try to grab the standard context. If it fails, fallback to experimental.
        //
        // Note:
        // IE11 only supports 'experimental-webgl'.
        //
        _gl = _canvas.getContext('webgl');
        if (_gl === null) {
            //
            _gl = _canvas.getContext('experimental-webgl');
            if (_gl !== null) {
                //
                console.log (
                    'Your browser supports WebGL. \n\n' +
                    'However, it indicates the support is experimental. ' +
                    'That is, not all WebGL functionality may be supported, ' +
                    'and content may not run as expected.'
                );

            } else {
                //
                alert (
                    'Unable to initialize WebGL. Your browser may not support it.'
                );

                throw 'A WebGL-not-supported exception raised.';
            }
        }

        // See notes in DepthBufferValues.js
        _gl.depthRange (
            DepthBufferValues.NEAR_CLIP_PLANE, // = 0.0
            DepthBufferValues.FAR_CLIP_PLANE   // = 1.0
        );

        _clearColor = GraphicsManager.DEFAULT_CLEAR_COLOR;
        _clearDepth = GraphicsManager.DEFAULT_CLEAR_DEPTH;
        _clearStencil = GraphicsManager.DEFAULT_CLEAR_STENCIL;

        _gl.clearColor (
            // Part 1.
            _clearColor.r, _clearColor.g, _clearColor.b,
            // Part 2.
            _clearColor.a
        );

        _gl.clearDepth(_clearDepth);
        _gl.clearStencil(_clearStencil);
        
        // Sets up the states.
        setUpStates();
        
        // Flips the source data along its vertical axis to make WebGL's texture
        // coordinates (S, T) work correctly.
        _gl.pixelStorei (
            _gl.UNPACK_FLIP_Y_WEBGL,
            true
        );
    }

    function setUpStates() {
        //
        setUpAlphaBlendState();

        setUpDepthStencilState();

        setUpSamplerState();

        setUpRasterizerState();
    }

    function setUpAlphaBlendState() {
        //
        _gl.disable(_gl.BLEND); // default: disable.
    }

    function setUpDepthStencilState() {
        //
        // Depth.
        _gl.enable(_gl.DEPTH_TEST); // default: disable.
        _gl.depthFunc(_gl.LEQUAL); // default: LESS.

        // Stencil.
        _gl.disable(_gl.STENCIL_TEST); // default: disable.
    }

    function setUpSamplerState() {
        //
        // Note:
        // The way of setting WebGL's sampler states is different from DirectX.
    }

    function setUpRasterizerState() {
        //
        _gl.enable(_gl.CULL_FACE); // default: disable.
        _gl.cullFace(_gl.BACK); // default: BACK.
    }

    //
    // Privileged methods.
    //
    this.resize = function() {
        //
        // Lookup the size the browser is displaying the canvas.
        var width  = _canvas.clientWidth;
        var height = _canvas.clientHeight;

        // Check if the canvas is not the same size.
        if (_canvas.width  != width ||
            _canvas.height != height) {
            //
            // // Test:
            // alert (
            //     'resized!\n' +
            //     'window.innerWidth = ' + window.innerWidth + ', '  + 'window.innerHeight = ' + window.innerHeight + '\n' +
            //     'window.devicePixelRatio = ' + window.devicePixelRatio + '\n' +
            //     'canvas.width = ' + _mainCanvas.width + ', '  + 'canvas.height = ' + _mainCanvas.height + '\n' +
            //     'canvas.clientWidth = ' + _mainCanvas.clientWidth + ', '  + 'canvas.clientHeight = ' + _mainCanvas.clientHeight
            // );
            // // :Test
            
            // Make the canvas the same size
            _canvas.width  = width;
            _canvas.height = height;
            
            this.viewport = new Viewport (
                // Part 1.
                0, 0,
                // Part 2.
                _canvas.width, _canvas.height
            );
        }
    };

    this.setUpVertexBuffer = function(buffer, items) {
        //
        _gl.bindBuffer (
            _gl.ARRAY_BUFFER,
            buffer
        );
        
        _gl.bufferData (
            _gl.ARRAY_BUFFER,
            new Float32Array(items),
            _gl.STATIC_DRAW
        );
    };

    this.setUpIndexBuffer = function(buffer, items) {
        //
        _gl.bindBuffer (
            _gl.ELEMENT_ARRAY_BUFFER,
            buffer
        );

        // Note:
        // DirectX supports 16-bit or 32-bit index buffers. But in this engine,
        // so far, only 16-bit index buffer is supported.
        /*
        if (uses16Bits === true) {
            //
            _gl.bufferData (
                _gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(items),
                _gl.STATIC_DRAW
            );

        } else {
            //
            _gl.bufferData (
                _gl.ELEMENT_ARRAY_BUFFER,
                new Uint32Array(items),
                _gl.STATIC_DRAW
            );
        }
        */

        _gl.bufferData (
            _gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(items),
            _gl.STATIC_DRAW
        );
        // :Note
    };

    this.clear = function(clearOptions, color, depth, stencil) {
        //
        if (color !== undefined &&
            Color.areEqual(color, _clearColor) === false) {
            //
            _clearColor = color;
            
            _gl.clearColor (
                // Part 1.
                _clearColor.r, _clearColor.g, _clearColor.b,
                // Part 2.
                _clearColor.a
            );
        }
        
        if (depth !== undefined &&
            depth !== _clearDepth) {
            _clearDepth = depth;
            _gl.clearDepth(_clearDepth);
        }

        if (stencil !== undefined &&
            stencil !== _clearStencil) {
            _clearStencil = stencil;
            _gl.clearStencil(_clearStencil);
        }

        // Note:
        // There's no _clearOptions.

        if (clearOptions === undefined) {
            clearOptions = GraphicsManager.DEFAULT_CLEAR_OPTIONS;
        }

        _gl.clear(clearOptions);
    };

    this.drawPrimitives = function (
        primitiveType,
        start, // Index of start vertex.
        count
    ){
        _gl.drawArrays(primitiveType, start, count);
    };
    
    this.drawIndexedPrimitives = function (
        indexBuffer,
        primitiveType, count, offset
    ){
        if (offset === undefined) {
            offset = 0;
        }

        _gl.bindBuffer (
            _gl.ELEMENT_ARRAY_BUFFER,
            indexBuffer
        );
        
        _gl.drawElements (
            primitiveType,
            count,
            _gl.UNSIGNED_SHORT,
            offset
        );
    };
    
    //
    // Accessors.
    //
    this.getAttributeLocation = function(program, attributeName) {
        //
        return _gl.getAttribLocation(program, attributeName);
    };
    
    this.getUniformLocation = function(program, uniformName) {
        //
        return _gl.getUniformLocation(program, uniformName);
    };

    this.setAttribute = function(attributeLocation, buffer, size) {
        //
        // Binds the buffer before calling gl.vertexAttribPointer().
        _gl.bindBuffer (
            _gl.ARRAY_BUFFER,
            buffer
        );

        _gl.vertexAttribPointer (
            attributeLocation,
            size,
            _gl.FLOAT,
            false,
            0,
            0
        );

        // Turns the 'generic' vertex attribute array on at a given index position.
        // That is, this vertex attribute location (an 'index') doesn't belong to
        // any specific shader program.
        _gl.enableVertexAttribArray (
            attributeLocation
        );
    };

    this.setSampler = function(samplerUniformLocation, texture, unit) {
        //
        if (unit === undefined) {
            unit = GraphicsManager.DEFAULT_TEXTURE_UNIT;
        }

        // Note:
        // gl.TEXTUREX are numbers,
        // gl.TEXTURE0 = 33984,
        // gl.TEXTURE1 = 33985,
        // ...

        _gl.activeTexture(_gl.TEXTURE0 + unit);
        _gl.bindTexture(_gl.TEXTURE_2D, texture);

        this.setUniform(samplerUniformLocation, unit);
    };

    this.setUniform = function(uniformLocation, value) {
        //
        if ((value instanceof Matrix4x4) === true) {
            //
            _gl.uniformMatrix4fv (
                uniformLocation,
                false, // which is always false.
                new Float32Array(value.elements)
            );

        } else {
            _gl.uniform1i(uniformLocation, value);
        }
    };
}

//
// Static constants (after Object.freeze()).
//
GraphicsManager.DEFAULT_CLEAR_OPTIONS =
    ClearOptions.COLOR_BUFFER | ClearOptions.DEPTH_BUFFER;

GraphicsManager.DEFAULT_CLEAR_COLOR   = Colors.DEFAULT_BACKGROUND;
GraphicsManager.DEFAULT_CLEAR_DEPTH   = 1;
GraphicsManager.DEFAULT_CLEAR_STENCIL = 0;
GraphicsManager.DEFAULT_TEXTURE_UNIT  = 0;

Object.freeze(GraphicsManager);

// Note:
// NDC stands for 'normalized device coordinates'.

// Note:
// Projection transform converts positions from view space to 'clip space'. OpenGL
// and Direct3D have slightly different rules for clip space. In OpenGL, everything
// that is viewable must be within an axis-aligned cube such that the x, y, and
// z components of its clip-space position are <= its corresponding w component.
// This implies that -w <= x <= w, -w <= y <= w, -w <= z <= w. Direct3D has the
// same clipping requirement for x and y, but the z requirement is 0 <= z <= w.

// Note:
// Clip coordinates are in the homogenous form of <x, y, z, w>, but we need to
// compute a 2D position (an x and y pair) along with a depth value. Dividing x,
// y, and z by w (, which is called 'perspective division') accomplishes this.
// The resulting coordinates are called 'normalized device coordinates'. Now all
// the visible geometric data lies in a cube with positions between <-1, -1, -1>
// and <1, 1, 1> in OpenGL, and between <-1, -1, 0> and <1, 1, 1> in Direct3D.

// Note:
// We don't have to do perspective division ourselves, Direct3D/OpenGL do it for
// us automatically in the pipeline. Besides, Direct3D/OpenGL converts positions
// from NDC to screen space by 'viewport transform' automatically in the pipeline
// as well.

// Note:
// For instance, the values we pass to gl_Position are not divided by w yet. OpenGL
// takes care of 'perspective division' for us later in the pipeline.

// Note:
// Direct3D uses viewport transform; OpenGL uses viewport transform plus depth-
// range transform to convert positions from NDC to screen space.

// Note:
// Conventionally, Direct3D and OpenGL's depth buffers both use 0.0 to represent
// positions on the near clip plane; 1.0 to represent positions on the far clip
// plane, as default values.

//
// Constructor.
//
function NormalizedDeviceCoordinates() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
NormalizedDeviceCoordinates.MIN_X = -1; // Left.
NormalizedDeviceCoordinates.MAX_X =  1; // Right.
NormalizedDeviceCoordinates.MIN_Y = -1; // Bottom.
NormalizedDeviceCoordinates.MAX_Y =  1; // Top.
NormalizedDeviceCoordinates.MIN_Z = -1; // Near.
NormalizedDeviceCoordinates.MAX_Z =  1; // Far.

Object.freeze(NormalizedDeviceCoordinates);

//
// Constructor.
//
function PrimitiveType() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
PrimitiveType.LINE_LIST      = 1; // = gl.LINES
PrimitiveType.LINE_STRIP     = 3; // = gl.LINE_STRIP
PrimitiveType.TRIANGLE_LIST  = 4; // = gl.TRIANGLES
PrimitiveType.TRIANGLE_STRIP = 5; // = gl.TRIANGLE_STRIP

Object.freeze(PrimitiveType);

// Note:
// NDC stands for 'normalized device coordinates'.

//
// Constructor.
//
function ScreenCoordinateHelper() {
    // No contents.
}

//
// Static methods.
//
ScreenCoordinateHelper.toClipSpace = function(viewport, p) {
    //
    // Note:
    // Because the input is already a 'screen position', that is, we don't have
    // to worry about the w component (which is related to 'perspective division').
    // The formula below converts the screen position directly to clip space.

    // Note:
    // Besides, OpenGL has no half-pixel offset problem like Direct3D 9, don't
    // have to handle it.
    /*
    return new Vector3D (
        // Part 1.
        NormalizedDeviceCoordinates.MIN_X +
        ((p.x - 0.5) / viewport.width) *
        (NormalizedDeviceCoordinates.MAX_X - NormalizedDeviceCoordinates.MIN_X),
        // Part 2.
        NormalizedDeviceCoordinates.MIN_Y +
        ((p.y - 0.5) / viewport.height) *
        (NormalizedDeviceCoordinates.MAX_Y - NormalizedDeviceCoordinates.MIN_Y),
        // Part 3.
        p.z,
        // Part 4.
        1.0
    );
    */

    return new Vector4D (
        // Part 1.
        NormalizedDeviceCoordinates.MIN_X + // = -1
        (p.x / viewport.width) *
        (NormalizedDeviceCoordinates.MAX_X - NormalizedDeviceCoordinates.MIN_X), // = 2
        // Part 2.
        NormalizedDeviceCoordinates.MIN_Y + // = -1
        (p.y / viewport.height) *
        (NormalizedDeviceCoordinates.MAX_Y - NormalizedDeviceCoordinates.MIN_Y), // = 2
        // Part 3.
        NormalizedDeviceCoordinates.MIN_Z + // = -1
        p.z *
        (NormalizedDeviceCoordinates.MAX_Z - NormalizedDeviceCoordinates.MIN_Z), // = 2
        // Part 4.
        1.0 // w.
    );
    // :Note
};

Object.freeze(ScreenCoordinateHelper);

// Note:
// Texture Coordinates.
//
// DirectX: (U, V)      OpenGL: (S, T)           
//            
// (0, 0)     (1, 0)    (0, 1)     (1, 1)        
//     ┌───────┐            ┌───────┐            
//     │       │            │       │            
//     │       │            │       │            
//     └───────┘            └───────┘            
// (0, 1)     (1, 1)    (0, 0)     (1, 0)        
//
// The conditions below must be satisfied...
// V = -2 <-> T =  3
// V = -1 <-> T =  2
// V =  0 <-> T =  1
// V =  1 <-> T =  0
// V =  2 <-> T = -1
// V =  3 <-> T = -2
// => T = 1 - V
// => V = 1 - T

//
// Constructor.
//
function TextureCoordinateHelper() {
    // No contents.
}

//
// Static methods.
//
TextureCoordinateHelper.toUV = function(s, t) {
    //
    return {
        u: s,
        v: 1 - t
    };
};

TextureCoordinateHelper.toST = function(u, v) {
    //
    return {
        s: u,
        t: 1 - v
    };
};    

Object.freeze(TextureCoordinateHelper);

//
// Constructor.
//
function ExceptionHelper() {
    // No contents.
}

//
// Static methods.
//
ExceptionHelper.displayMessageOf = function(e) {
    //
    // Test:
    /*
    if (typeof(e) === 'string') {
        alert(e);
    } else if (
        e !== undefine &&
        e.message !== undefine
    ){
        alert(e.message);
    }
    */

    alert(e);
};

Object.freeze(ExceptionHelper);

//
// Constructor.
//
function MouseButton() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
MouseButton.LEFT   = 0;
MouseButton.MIDDLE = 1;
MouseButton.RIGHT  = 2;
 
Object.freeze(MouseButton);

//
// Constructor.
//
function Plane() {
    // No contents.
}

Object.freeze(Plane);

//
// Constructor.
//
function Xcene(_settings) {
    //
    // Note:
    // 'settings' include...
    // - canvas
    // - usesDefaultStyles

    try {
        //
        Object.defineProperty(this, 'settings', {
            get: function() { return _settings; }
        });
        
        var _graphicsManager;
        var _assetManager;

        _graphicsManager = new GraphicsManager(this);
        Object.defineProperty(this, 'graphicsManager', {
            get: function() { return _graphicsManager; }
        });
        
        _assetManager = new AssetManager(this);
        Object.defineProperty(this, 'assetManager', {
            get: function() { return _assetManager; }
        });

        // Sets up the timers.
        setUpTimers();

        // Hooks the events.        
        hookEvents();

        // Calls onResize() immediately at the end of Xcene's constructor.
        onResize();
        
    } catch (e) {
        //
        console.error('Cybo.Xcene: ' + e);
        
        throw e;
    }

    //
    // Private methods.
    //
    function setUpTimers() {
        //
        // Note:
        // Provides requestAnimationFrame in a cross browser way.
        // @author paulirish / http://paulirish.com/

        if (window.requestAnimationFrame === undefined) {

            window.requestAnimationFrame = (function() {
                //
                return (
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (
                        callback, // function FrameRequestCallback
                        element   // DOMElement Element
                    ){
                        window.setTimeout(callback, 1000/60);
                    }
                );
            })();
        }
    }

    function hookEvents() {
        //
        window.addEventListener('resize', onResize);

        // window.addEventListener('error', onError)
        // window.addEventListener('beforeunload', onBeforeUnload);
    }

    //
    // Event handlers.
    //
    function onResize() {
        _graphicsManager.resize();
    }    

    // function onError(errorMsg, url, lineNumber) {
    //     //
    //     alert (
    //         'Error: ' + errorMsg +
    //         ', Script: ' + url +
    //         ', Line: ' + lineNumber
    //     );
    // }

    // function onBeforeUnload() {
    //     // No contents.
    // }

    //
    // Privileged methods.
    //
    this.run = function(update, draw) {
        //
        render();

        function render() {
            //
            requestAnimationFrame(render);

            if (update !== undefined) {
                update();
            }

            if (draw !== undefined) {
                draw();
            }
        }
    };
}

Object.freeze(Xcene);

//
// Constructor.
//
function EaseMode() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
EaseMode.EASE_IN     = 0;
EaseMode.EASE_OUT    = 1;
EaseMode.EASE_IN_OUT = 2;

Object.freeze(EaseMode);

// Note:
// Adapted from
// https://gist.github.com/electricg/4372563

//
// Constructor.
//
function Stopwatch() {
    //
    var _startTime = 0; // Time of last start / resume. (0 if not running)
    var _baseTime = 0; // Time on the clock when last stopped in milliseconds

    //
    // Properties.
    //
    Object.defineProperty(this, 'isRunning', {
        get: function() { return (_startTime !== 0) ? true: false; }
    });

    Object.defineProperty(this, 'elapsedMilliseconds', {
        //
        get: function() {
            //
            return (
                _baseTime +
                (this.isRunning===true) ? now()-_startTime : 0
            ); 
        }
    });

    //
    // Private methods.
    //
    // var now = function() {
    //     return (new Date()).getTime();
    // };        
    function now() {
        return (new Date()).getTime();
    }

    //
    // Privileged methods.
    //
    // Start or resume
    this.start = function() {
        //_startAt = _startAt ? _startAt : now();
        _startTime = (this.isRunning===true) ? _startTime : now();
    };

    // Stop or pause
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        //_lastDuration = _startAt ? _lastDuration + now() - _startAt : _lastDuration;
        _baseTime = (
            (this.isRunning === true) ?
            _baseTime + (now() - _startTime) :
            _baseTime
        );

        _startTime = 0; // Paused
    };

    // Reset
    this.reset = function() {
        _startTime = 0;
        _baseTime = 0;
    };

    // // Duration
    // this.elapsedMilliseconds = function() {
    //     //
    //     return (
    //         _baseTime +
    //         (this.isRunning===true) ? now()-_startTime : 0
    //     ); 
    // }
}

Object.freeze(Stopwatch);

//
// Constructor.
//
function SineEase(_easeMode, _duration, _isLooped) {
    //
    var _startAngle;
    var _finishAngle;
    var _stopwatch;

    switch (_easeMode)
    {
        case EaseMode.EASE_IN: {
            //
            _startAngle  = -MathHelper.PI_OVER_TWO;
            _finishAngle =  0;
            break;
        }

        case EaseMode.EASE_OUT: {
            //
            _startAngle  = 0;
            _finishAngle = MathHelper.PI_OVER_TWO;
            break;
        }

        case EaseMode.EASE_IN_OUT: {
            //
            _startAngle  = -MathHelper.PI_OVER_TWO;
            _finishAngle =  MathHelper.PI_OVER_TWO;
            break;
        }

        default: {
            throw 'A not-supported exception raised.';
        }
    }

    // Creates the stopwatch. But don't start it immediately.
    _stopwatch = new Stopwatch();

    //
    // Properties.
    //
    Object.defineProperty(this, 'easeMode', {
        get: function() { return _easeMode; }
    });

    Object.defineProperty(this, 'duration', {
        get: function() { return _duration; }
    });

    Object.defineProperty(this, 'sineOfStartAngle', {
        get: function() { return Math.sin(_startAngle); }
    });

    Object.defineProperty(this, 'sineOfCurrentAngle', {
        //
        get: function() {
            //
            var angleOffset = _finishAngle - _startAngle;

            return Math.sin (
                _startAngle +
                angleOffset * this.ratioOfCurrentToTotalTimeOffset
            );
        }
    });

    Object.defineProperty(this, 'sineOfFinishAngle', {
        get: function() { return Math.sin(_finishAngle); }
    });

    /// <summary>
    /// Ratio of 'current time offset' to 'total time offset (that is, the
    /// duration)'. For instance, the current time offset = 500 (in milli-
    /// seconds), the duration = 2000 (in milliseconds) => Ratio = 500 / 2000
    /// = 0.25
    /// </summary>
    Object.defineProperty(this, 'ratioOfCurrentToTotalTimeOffset', {
        //
        get: function() {
            //
            if (_isLooped === false) {
                //
                if (this.isFinished === true) {
                    return 1;
                } else { // this.isFinished === false
                    return _stopwatch.elapsedMilliseconds / _duration;
                }

            } else { // _isLooped === true
                //
                var elapsedMilliseconds =
                    _stopwatch.elapsedMilliseconds % _duration;

                return elapsedMilliseconds / _duration;
            }
        }
    });

    /// <summary>
    /// Ratio of 'current sine-of-angle offset' to 'total sine-of-angle offset'.
    /// For instance, the current sine-of-angle offset = 0.125, the total sine-
    /// of-angle offset = 1 => Ratio = 0.125 / 1 = 0.125
    /// </summary>
    Object.defineProperty(this, 'ratioOfCurrentToTotalSineOfAngleOffset', {
        //
        get: function() {
            //
            var currentSineOfAngleOffset =
                this.sineOfCurrentAngle - this.sineOfStartAngle;

            var totalSineOfAngleOffset =
                this.sineOfFinishAngle - this.sineOfStartAngle;

            return currentSineOfAngleOffset / totalSineOfAngleOffset;
        }
    });

    Object.defineProperty(this, 'isRunning', {
        get: function() { return _stopwatch.isRunning; }
    });

    Object.defineProperty(this, 'isFinished', {
        //
        get: function() {
            //
            if (_isLooped === true) {
                return false;
            }

            var isFinished = (
                (_duration <= _stopwatch.elapsedMilliseconds) ?
                true :
                false
            );

            if (isFinished === true) {
                _stopwatch.stop();
            }

            return isFinished;
        }
    });

    //
    // Privileged methods.
    //
    this.start = function() {
        //
        if (_stopwatch.isRunning === true) {
            return;
        }

        _stopwatch.start();
    };

    this.pause = function() {
        //
        if (_stopwatch.isRunning === false) {
            return;
        }

        // Note:
        // Stopwatch's stop() is like media player's pause(). After calling
        // Stopwatch's start(), the playing continues.

        _stopwatch.stop();
    };

    this.resume = function() {
        //
        if (_stopwatch.isRunning === true) {
            return;
        }

        _stopwatch.start();
    };

    this.stop = function() {
        //
        // Note:
        // Stopwatch's reset() is like media player's stop(). After calling
        // Stopwatch.reset(), everything resets, and this is what we want for
        // SineEase's stop().

        _stopwatch.reset();
    };
}

Object.freeze(SineEase);

// Assets.

exports.PositionColor = PositionColor;
exports.PositionOnly = PositionOnly;
exports.PositionTextureCoordinates = PositionTextureCoordinates;
exports.TransformedPositionColor = TransformedPositionColor;
exports.TransformedPositionColorTextureCoordinates = TransformedPositionColorTextureCoordinates;
exports.TransformedPositionTextureCoordinates = TransformedPositionTextureCoordinates;
exports.AssetManager = AssetManager;
exports.Camera = Camera;
exports.ClearOptions = ClearOptions;
exports.Color = Color;
exports.Colors = Colors;
exports.DepthBufferValues = DepthBufferValues;
exports.GraphicsManager = GraphicsManager;
exports.NormalizedDeviceCoordinates = NormalizedDeviceCoordinates;
exports.PrimitiveType = PrimitiveType;
exports.ScreenCoordinateHelper = ScreenCoordinateHelper;
exports.ShaderType = ShaderType;
exports.TextureCoordinateHelper = TextureCoordinateHelper;
exports.ExceptionHelper = ExceptionHelper;
exports.MouseButton = MouseButton;
exports.AxisGroup = AxisGroup;
exports.MathHelper = MathHelper;
exports.Vector2D = Vector2D;
exports.Vector3D = Vector3D;
exports.Vector4D = Vector4D;
exports.Matrix4x4 = Matrix4x4;
exports.CartesianAxis = CartesianAxis;
exports.Plane = Plane;
exports.Quaternion = Quaternion;
exports.ViewFrustum = ViewFrustum;
exports.Xcene = Xcene;
exports.EaseMode = EaseMode;
exports.SineEase = SineEase;
exports.Stopwatch = Stopwatch;

}((this.Cybo = this.Cybo || {})));
