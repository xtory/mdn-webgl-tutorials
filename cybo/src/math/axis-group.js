import { Vector3D } from '../math/3d-vector';

//
// Constructor.
//
function AxisGroup() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
AxisGroup.X_AXIS = new Vector3D(1, 0, 0);
AxisGroup.Y_AXIS = new Vector3D(0, 1, 0);
AxisGroup.Z_AXIS = new Vector3D(0, 0, 1);

Object.freeze(AxisGroup);

export { AxisGroup };
