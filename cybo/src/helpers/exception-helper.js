//
// Constructor.
//
function ExceptionHelper() {
    // No contents.
}

//
// Static methods.
//
ExceptionHelper.displayMessageOf = function(e) {
    //
    // Test:
    /*
    if (typeof(e) === 'string') {
        alert(e);
    } else if (
        e !== undefine &&
        e.message !== undefine
    ){
        alert(e.message);
    }
    */

    alert(e);
}

Object.freeze(ExceptionHelper);

export { ExceptionHelper };
