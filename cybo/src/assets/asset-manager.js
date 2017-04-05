import { MathHelper } from '../math/helpers/math-helper';
import { ShaderType } from '../graphics/fx/shader-type';

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

export { AssetManager };
