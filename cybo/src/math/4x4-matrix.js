import { Camera }        from '../cameras/camera';
import { CartesianAxis } from './cartesian-axis';
import { Vector3D }      from './3d-vector';

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
}

Matrix4x4.createIdentityMatrix = function() {
    //
    return new Matrix4x4 (
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );
}

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
}

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
}

Matrix4x4.createScaleMatrix = function(v) {
    //
    return new Matrix4x4 (
        v.x, 0,   0,   0,
        0,   v.y, 0,   0,
        0,   0,   v.z, 0,
        0,   0,   0,   1
    );
}

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
}

Matrix4x4.createTranslationMatrix = function(v) {
    //
    return new Matrix4x4 (
        1, 0, 0, v.x,
        0, 1, 0, v.y,
        0, 0, 1, v.z,
        0, 0, 0,   1
    );
}

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
}

Matrix4x4.transposeMatrix = function(m) {
    //
    return new Matrix4x4 (
        m.s11, m.s21, m.s31, m.s41,
        m.s12, m.s22, m.s32, m.s42,
        m.s13, m.s23, m.s33, m.s43,
        m.s14, m.s24, m.s34, m.s44
    );
}

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
}

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
}

Object.freeze(Matrix4x4);

export { Matrix4x4 };
