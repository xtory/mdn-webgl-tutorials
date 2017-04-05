// Note:
// NDC stands for 'normalized device coordinates'.

// Note:
// Projection transform converts positions from view space to 'clip space'. OpenGL
// and Direct3D have slightly different rules for clip space. In OpenGL, everything
// that is viewable must be within an axis-aligned cube such that the x, y, and
// z components of its clip-space position are <= its corresponding w component.
// This implies that -w <= x <= w, -w <= y <= w, -w <= z <= w. Direct3D has the
// same clipping requirement for x and y, but the z requirement is 0 <= z <= w.

// Note:
// Clip coordinates are in the homogenous form of <x, y, z, w>, but we need to
// compute a 2D position (an x and y pair) along with a depth value. Dividing x,
// y, and z by w (, which is called 'perspective division') accomplishes this.
// The resulting coordinates are called 'normalized device coordinates'. Now all
// the visible geometric data lies in a cube with positions between <-1, -1, -1>
// and <1, 1, 1> in OpenGL, and between <-1, -1, 0> and <1, 1, 1> in Direct3D.

// Note:
// We don't have to do perspective division ourselves, Direct3D/OpenGL do it for
// us automatically in the pipeline. Besides, Direct3D/OpenGL converts positions
// from NDC to screen space by 'viewport transform' automatically in the pipeline
// as well.

// Note:
// For instance, the values we pass to gl_Position are not divided by w yet. OpenGL
// takes care of 'perspective division' for us later in the pipeline.

// Note:
// Direct3D uses viewport transform; OpenGL uses viewport transform plus depth-
// range transform to convert positions from NDC to screen space.

// Note:
// Conventionally, Direct3D and OpenGL's depth buffers both use 0.0 to represent
// positions on the near clip plane; 1.0 to represent positions on the far clip
// plane, as default values.

//
// Constructor.
//
function NormalizedDeviceCoordinates() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
NormalizedDeviceCoordinates.MIN_X = -1; // Left.
NormalizedDeviceCoordinates.MAX_X =  1; // Right.
NormalizedDeviceCoordinates.MIN_Y = -1; // Bottom.
NormalizedDeviceCoordinates.MAX_Y =  1; // Top.
NormalizedDeviceCoordinates.MIN_Z = -1; // Near.
NormalizedDeviceCoordinates.MAX_Z =  1; // Far.

Object.freeze(NormalizedDeviceCoordinates);

export { NormalizedDeviceCoordinates };
