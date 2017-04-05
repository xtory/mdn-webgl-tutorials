import { MathHelper } from './helpers/math-helper';

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
}

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
}

Vector2D.negateVector = function (v) {
    return new Vector2D(-v.x, -v.y);
}

Vector2D.addVectors = function(v1, v2) {
    return new Vector2D(v1.x+v2.x, v1.y+v2.y);
}

Vector2D.subtractVectors = function(v1, v2) {
    return new Vector2D(v1.x-v2.x, v1.y-v2.y);
}

Vector2D.multiplyVectorByScalar = function(v, s) {
    return new Vector2D(v.x*s, v.y*s);
}

Vector2D.calculateLengthOf = function(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y);
}

Vector2D.calculateLengthSquaredOf = function(v) {
    return v.x*v.x + v.y*v.y;
}

Vector2D.calculateDotProductOf = function(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y;
}

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
}

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
}

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
}

Object.freeze(Vector2D);

export { Vector2D };
