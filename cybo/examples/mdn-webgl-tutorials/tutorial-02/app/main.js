function main() {
    //
    'use strict';

    var scene;
    var gl;
    var camera;
    var program;
    var vertexPositionAttributeLocation;
    var transformUniformLocation;
    var vertexPositionBuffer;
    var transform;
    
    try {
        //
        scene = new Cybo.Xcene();
        gl = scene.graphicsManager.webGLContext;

        setUpCamera();
        
        setUpShaders();

        setUpGeometries(0, 0, 100, 100);

        transform = Cybo.Matrix4x4.createIdentityMatrix();
        
        scene.run(undefined, drawScene);

    } catch (e) {
        //
        Cybo.ExceptionHelper.displayMessageOf(e);

        return;
    }

    //
    // Functions.
    //
    function setUpCamera() {
        //
        var p = new Cybo.Vector3D(0, 0, 275);
        var origin = new Cybo.Vector3D(0, 0, 0);

        camera = new Cybo.Camera (
            scene,
            p,
            Cybo.Vector3D.subtractVectors(origin, p)
        );
    }

    function setUpShaders() {
        //
        program = scene.assetManager.setUpProgram (
            Cybo.PositionOnly.VERTEX_SHADER_SOURCE,
            Cybo.PositionOnly.FRAGMENT_SHADER_SOURCE
        );

        vertexPositionAttributeLocation = (
            scene.graphicsManager.getAttributeLocation (
                program,
               'vertexPosition'
            )
        );
        
        transformUniformLocation = (
            scene.graphicsManager.getUniformLocation (
                program,
               'transform'
            )
        );
    }

    function setUpGeometries(x, y, w, h) {
        //
        vertexPositionBuffer = gl.createBuffer();

        var halfWidth = w * 0.5;
        var halfHeight = h * 0.5;
            
        var vertexPositions = [
            x+halfWidth, y-halfHeight, 0,
            x+halfWidth, y+halfHeight, 0,
            x-halfWidth, y-halfHeight, 0,
            x-halfWidth, y+halfHeight, 0
        ];

        scene.graphicsManager.setUpVertexBuffer (
            vertexPositionBuffer,
            vertexPositions
        );
    }

    function drawScene() {
        //
        scene.graphicsManager.clear (
            undefined,
            new Cybo.Color(0.75, 0.5, 0.5, 1)
        );

        scene.graphicsManager.program = program;

        scene.graphicsManager.setAttribute (
            vertexPositionAttributeLocation,
            vertexPositionBuffer,
            3
        );

        camera.getTransform(transform);

        scene.graphicsManager.setUniform (
            transformUniformLocation,
            transform
        );
        
        scene.graphicsManager.drawPrimitives (
            Cybo.PrimitiveType.TRIANGLE_STRIP,
            0,
            4
        );
    }
}
