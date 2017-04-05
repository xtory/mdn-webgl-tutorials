import { MathHelper } from './helpers/math-helper';
import { Matrix4x4 }  from './4x4-matrix';
import { Vector3D }   from './3d-vector';

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
}

Quaternion.fromArray = function(a) {
    return new Quaternion(a[0], a[1], a[2], a[3]);
}

Quaternion.createIdentityQuaternion = function() {
    return new Quaternion(0, 0, 0, 1);
}

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
}

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
}

Object.freeze(Quaternion);

export { Quaternion };
