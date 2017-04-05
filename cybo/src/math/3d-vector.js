import { MathHelper } from './helpers/math-helper';
import { Quaternion } from './quaternion';
import { Vector2D }   from './2d-vector';
import { Vector4D }   from './4d-vector';

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
}

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
}

Vector3D.negateVector = function (v) {
    return new Vector3D(-v.x, -v.y, -v.z);
}

Vector3D.addVectors = function(v1, v2) {
    return new Vector3D(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
}

Vector3D.subtractVectors = function(v1, v2) {
    return new Vector3D(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z);
}

Vector3D.multiplyVectorByScalar = function(v, s) {
    return new Vector3D(v.x*s, v.y*s, v.z*s);
}

Vector3D.calculateLengthOf = function(v) {
    return Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
}

Vector3D.calculateLengthSquaredOf = function(v) {
    return v.x*v.x + v.y*v.y + v.z*v.z;
}

Vector3D.calculateDotProductOf = function(v1, v2) {
    return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
}

Vector3D.calculateCrossProductOf = function(v1, v2) {
    //
    return new Vector3D (
        v1.y*v2.z - v1.z*v2.y,
        v1.z*v2.x - v1.x*v2.z,
        v1.x*v2.y - v1.y*v2.x
    );
}

Vector3D.transformPoint = function(m, p) {
    //
    var v = new Vector4D(p.x, p.y, p.z, 1);
    var v2 = Vector4D.Transform(m, v);

    var s = 1 / v2.w;
    return new Vector3D(v2.x*s, v2.y*s, v2.z*s);
}

Vector3D.transformVector = function(m, v) {
    //
    var v2 = new Vector4D(v.x, v.y, v.z, 0);
    v = Vector4D.Transform(m, v2);

    return new Vector3D(v.x, v.y, v.z);
}

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
}

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
}

Object.freeze(Vector3D);

export { Vector3D };
