import { MathHelper } from './helpers/math-helper';
import { Vector3D }   from './3d-vector';
    
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
}

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
}

Vector4D.addVectors = function(v1, v2) {
    return new Vector4D(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z, v1.w+v2.w);
}

Vector4D.subtractVectors = function(v1, v2) {
    return new Vector4D(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z, v1.w-v2.w);
}

Vector4D.multiplyVectorByScalar = function(v, s) {
    return new Vector4D(v.x*s, v.y*s, v.z*s, v.w*s);
}

Vector4D.calculateLengthOf = function(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z + v.w*v.w);
}

Vector4D.calculateLengthSquaredOf = function(v) {
    return v.x*v.x + v.y*v.y + v.z*v.z + v.w*v.w;
}

Vector4D.transform = function(m, v) {
    //
    return new Vector4D (
        m.s11*v.x + m.s12*v.y + m.s13*v.z + m.s14*v.w,
        m.s21*v.x + m.s22*v.y + m.s23*v.z + m.s24*v.w,
        m.s31*v.x + m.s32*v.y + m.s33*v.z + m.s34*v.w,
        m.s41*v.x + m.s42*v.y + m.s43*v.z + m.s44*v.w
    );
}

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
}

Object.freeze(Vector4D);

export { Vector4D };
