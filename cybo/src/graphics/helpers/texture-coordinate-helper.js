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
}

TextureCoordinateHelper.toST = function(u, v) {
    //
    return {
        s: u,
        t: 1 - v
    };
}    

Object.freeze(TextureCoordinateHelper);

export { TextureCoordinateHelper };
