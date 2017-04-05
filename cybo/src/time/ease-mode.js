//
// Constructor.
//
function EaseMode() {
    // No contents.
}

//
// Static constants (after Object.freeze()).
//
EaseMode.EASE_IN     = 0;
EaseMode.EASE_OUT    = 1;
EaseMode.EASE_IN_OUT = 2;

Object.freeze(EaseMode);

export { EaseMode };
