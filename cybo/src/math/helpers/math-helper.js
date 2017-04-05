// Note:
// The equivelant of this value in C is 'FLT_EPSILON', and in the GNU C Library,
// http://www.gnu.org/software/libc/manual/html_node/Floating-Point-Parameters.html
// FLT_EPSILON is the difference between 1 and the smallest floating point number
// of type float that is greater than 1. It's not supposed to be greater than 1E-5.

// Note:
// C# float.Epsilon = 1.4013e-045f, which represents the smallest positive System.
// Single value greater than zero.

// Note:
// FLT_EPSILON is 1.192092896e-07F in <float.h>

// Note:
// SlimDX, Fly3D both define this value as 1e-06f and XNA uses 1e-04f, 1e-05f, or
// 1e-06f (in difference places) as epsilons. Cybo selects 1e-05f.

// Note:
// SlimDX uses the term ZeroTolerance to represent Epsilon.

// Note:
// In XNA, there is no such term called Epsilon. XNA directly uses 1e-04f, 1e-05f,
// 1e-06f or as epsilon. For instance...
// Ray.Intersects() directly uses 1e-05f as epsilon
// BoundingBox.Intersects() directly uses 1e-06f as epsilon, etc.

// Note:
// The equivelant in Fly3D of this value is 'FY_EPS'.
    
//
// Constructor.
//
function MathHelper() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//

// PI.

// Note:
// Pi = 3.1415926535897932 radians = 180 degrees.

MathHelper.PI                             = 3.1415926535897932;
MathHelper.PI_OVER_TWO                    = 1.5707963267948966;      // = pi / 2
MathHelper.PI_OVER_FOUR                   = 0.7853981633974483;      // = pi / 4
MathHelper.TWO_PI                         = 6.2831853071795864;      // = pi * 2
MathHelper.PI_OVER_ONE_EIGHTY             = 0.0174532925199432;      // = pi / 180
MathHelper.ONE_EIGHTY_OVER_PI             = 57.2957795130823208;     // = 180 / pi
MathHelper.RADIANS_OF_FORTY_FIVE_DEGREES  = MathHelper.PI_OVER_FOUR; // = MathHelper.toRadians(45)
MathHelper.RADIANS_OF_NINETY_DEGREES      = MathHelper.PI_OVER_TWO;  // = MathHelper.toRadians(90)
MathHelper.RADIANS_OF_ONE_EIGHTY_DEGREES  = MathHelper.PI;           // = MathHelper.toRadians(180)
MathHelper.RADIANS_OF_THREE_SIXTY_DEGREES = MathHelper.TWO_PI;       // = MathHelper.toRadians(360)

// Epsilon.
MathHelper.EPSILON = 0.00001; // = 1e-5;

//
// Static methods.
//

//
// Angles.
//
MathHelper.toRadians = function(degrees) {
    //
    // Note:
    // 1 radian = (180 / pi) degrees.
    // => 1 degree = (pi / 180) radians.
    // => n degrees = (pi / 180) * n radians.

    if (typeof(degrees) !== 'number') {
        throw 'typeof(degrees) !== \'number\'';
    }

    return MathHelper.PI_OVER_ONE_EIGHTY * degrees;
}

MathHelper.toDegrees = function(radians) {
    //
    // Note:
    // 1 radian = (180 / pi) degrees.
    // => n radians = (180 / pi) * n degrees.

    if (typeof(radians) !== 'number') {
        throw 'typeof(degrees) !== \'number\'';
    }

    return MathHelper.ONE_EIGHTY_OVER_PI * radians;
}

//
// Epsilon.
//
MathHelper.isZero = function(s) {
    //
    if (typeof(s) !== 'number') {
        throw 'typeof(s) !== \'number\'';
    }

    if (s <= -MathHelper.EPSILON ||
        MathHelper.EPSILON <= s) {
        return false;
    } else { // -MathHelper.EPSILON < s < MathHelper.EPSILON
        return true;
    }
}

MathHelper.areEqual = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    var s = s1 - s2;

//#if DEBUG
    /*
    if (MathHelper.IsZero(s) == false) {
        return false;
    } else { // MathHelper.IsZero(s) == true
        return true;
    }
    */

//#else // RELEASE

    if (s <= -MathHelper.EPSILON ||
        MathHelper.EPSILON <= s) {
        return false;
    } else { // -MathHelper.EPSILON < s < MathHelper.EPSILON
        return true;
    }

//#endif // DEBUG
}

MathHelper.isScalar1LessThanScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    if (s1 - s2 <= -MathHelper.EPSILON) {
        //
        // which equals to 's1 - s2 < 0',
        // that is, 's1 < s2'

        return true;

    } else {
        //
        // -MathHelper.EPSILON < s1 - s2, which includes
        // A. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON
        // B. MathHelper.EPSILON <= s1 - s2, and
        // A means 's1 - s2 = 0', B means '0 < s1 - s2',
        // so '0 <= s1 - s2', that is, 's2 <= s1'

        return false;
    }
}

MathHelper.isScalar1LessThanOrEqualToScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    if (s1 - s2 < MathHelper.EPSILON) {
        //
        // which includes
        // A. s1 - s2 <= -MathHelper.EPSILON, and
        // B. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON
        // A means 's1 - s2 < 0', B means 's1 - s2 = 0',
        // so 's1 - s2 <= 0', that is, 's1 <= s2'

        return true;

    } else {
        //
        // MathHelper.EPSILON <= s1 - s2, which equals to '0 < s1 - s2',
        // that is, 's2 < s1'

        return false;
    }
}

MathHelper.isScalar1GreaterThanScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }

    if (MathHelper.EPSILON <= s1 - s2) {
        //
        // which equals to '0 < s1 - s2',
        // that is, 's2 < s1'

        return true;

    } else {
        //
        // s1 - s2 < MathHelper.EPSILON, which includes
        // A. s1 - s2 <= -MathHelper.EPSILON, and
        // B. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON
        // A means 's1 - s2 < 0', B means 's1 - s2 = 0',
        // so 's1 - s2 <= 0', that is, 's1 <= s2'

        return false;
    }
}

MathHelper.isScalar1GreaterThanOrEqualToScalar2 = function(s1, s2) {
    //
    if (typeof(s1) !== 'number') {
        throw 'typeof(s1) !== \'number\'';
    }

    if (typeof(s2) !== 'number') {
        throw 'typeof(s2) !== \'number\'';
    }
    
    if (-MathHelper.EPSILON < s1 - s2) {
        //
        // which includes
        // A. -MathHelper.EPSILON < s1 - s2 < MathHelper.EPSILON, and
        // B. MathHelper.EPSILON <= s1 - s2
        // A means 's1 - s2 = 0', B means '0 < s1 - s2',
        // so '0 <= s1 - s2', that is, 's2 <= s1'

        return true;

    } else {
        //
        // s1 - s2 <= -MathHelper.EPSILON, which equals to 's1 - s2 < 0',
        // that is, 's1 < s2'

        return false;
    }
}

//
// Textures.
//
MathHelper.isPowerOfTwo = function(s) {
    //
    if (typeof(s) !== 'number') {
        throw 'typeof(s) !== \'number\'';
    }
    
    // Note:
    // For instance,
    // 2  = 00000010 
    // 4  = 00000100 
    // 8  = 00001000 
    // 16 = 00010000
    //
    // => 
    // 2 - 1 = 1 = 00000001 
    // 4 - 1 = 3 = 00000011 
    // 8 - 1 = 7 = 00000111
    //
    // =>
    // 2 & 1 = 00000010 & 00000001 = 0 
    // 8 & 7 = 00001000 & 00000111 = 0

    if (s !== 0 &&
       (s & (s - 1)) === 0) {
        return true;
    } else {
        return false;
    }
}

Object.freeze(MathHelper);

export { MathHelper };
