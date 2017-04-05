//
// Constructor.
//
function CartesianAxis() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
CartesianAxis.X = 0;
CartesianAxis.Y = 1;
CartesianAxis.Z = 2;

Object.freeze(CartesianAxis);

export { CartesianAxis };
