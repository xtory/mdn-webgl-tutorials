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
}

Object.freeze(Color);

export { Color };
