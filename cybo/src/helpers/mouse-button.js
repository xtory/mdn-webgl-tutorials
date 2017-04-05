//
// Constructor.
//
function MouseButton() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
MouseButton.LEFT   = 0;
MouseButton.MIDDLE = 1;
MouseButton.RIGHT  = 2;
 
Object.freeze(MouseButton);

export { MouseButton };
