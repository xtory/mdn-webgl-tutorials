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

export { ClearOptions };
