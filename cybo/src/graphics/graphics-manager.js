import { ClearOptions  }      from './clear-options';
import { Color  }             from './color';
import { Colors }             from './colors';
import { DepthBufferValues }  from './depth-buffer-values';
import { MathHelper }         from '../math/helpers/math-helper';
import { Matrix4x4 }          from '../math/4x4-matrix';
import { Viewport }           from './viewport';

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
        _clearDepth = GraphicsManager.DEFAULT_CLEAR_DEPTH;;
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
    };

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
    }

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

export { GraphicsManager };
