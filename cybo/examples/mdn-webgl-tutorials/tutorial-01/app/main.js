function main() {
    //
    'use strict';

    var scene;

    try {
        //
        scene = new Cybo.Xcene();
        
        scene.graphicsManager.clear (
            Cybo.ClearOptions.COLOR_BUFFER,
            new Cybo.Color(0.75, 0.5, 0.5, 1)
        );

    } catch (e) {
        //
        Cybo.ExceptionHelper.displayMessageOf(e);

        return;
    }
}
