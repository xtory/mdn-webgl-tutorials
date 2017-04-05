function main() {
    //
    'use strict';

    var scene;
    var gl;
    var camera;
    var program;
    var vertexPositionAttributeLocation;
    var vertexColorAttributeLocation;
    var transformUniformLocation;
    var vertexPositionBuffer;
    var vertexColorBuffer;
    var indexBuffer;
    var sineEase;
    var sineEase2;
    var transform;

    try {
        //
        scene = new Cybo.Xcene();
        gl = scene.graphicsManager.webGLContext;

        setUpCamera();
        
        setUpShaders();

        setUpGeometries();

        transform = Cybo.Matrix4x4.createIdentityMatrix();

        sineEase = new Cybo.SineEase (
            Cybo.EaseMode.EASE_IN_OUT,
            1500,
            true
        );

        sineEase.start();

        sineEase2 = new Cybo.SineEase (
            Cybo.EaseMode.EASE_IN_OUT,
            3000,
            true
        );
        
        sineEase2.start();

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
        var p = new Cybo.Vector3D(0, 0, 325);
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
            Cybo.PositionColor.VERTEX_SHADER_SOURCE,
            Cybo.PositionColor.FRAGMENT_SHADER_SOURCE
        );

        vertexPositionAttributeLocation = (
            scene.graphicsManager.getAttributeLocation (
                program,
               'vertexPosition'
            )
        );

        vertexColorAttributeLocation = (
            scene.graphicsManager.getAttributeLocation (
                program,
               'vertexColor'
            )
        );

        transformUniformLocation = (
            scene.graphicsManager.getUniformLocation (
                program,
               'transform'
            )
        );
    }
   
    function setUpGeometries() {
        //
        // Vertex positions.
        //
        vertexPositionBuffer = gl.createBuffer();

        var vertexPositions = [
            //
            // Front face.
            50, -50,  50,
            50,  50,  50,
           -50,  50,  50,
           -50, -50,  50,
            
            // Back face.
           -50, -50, -50,
           -50,  50, -50,
            50,  50, -50,
            50, -50, -50,
            
            // Top face.
            50,  50,  50,
            50,  50, -50,
           -50,  50, -50,
           -50,  50,  50,
            
            // Bottom face.
            50, -50, -50,
            50, -50,  50,
           -50, -50,  50,
           -50, -50, -50,
            
            // Right face.
            50, -50, -50,
            50,  50, -50,
            50,  50,  50,
            50, -50,  50,
            
            // Left face.
           -50, -50,  50,
           -50,  50,  50,
           -50,  50, -50,
           -50, -50, -50
        ];

        scene.graphicsManager.setUpVertexBuffer (
            vertexPositionBuffer,
            vertexPositions
        );

        //
        // Vertex colors.
        //
        vertexColorBuffer = gl.createBuffer();

        var faceColors = [
            Cybo.Colors.PHOTOSHOP_DARK_RED.toArray(),
            Cybo.Colors.PHOTOSHOP_DARK_YELLOW_ORANGE.toArray(),
            Cybo.Colors.PHOTOSHOP_DARK_GREEN.toArray(),
            Cybo.Colors.PHOTOSHOP_DARK_GREEN_CYAN.toArray(),
            Cybo.Colors.PHOTOSHOP_DARK_BLUE.toArray(),
            Cybo.Colors.PHOTOSHOP_DARK_VIOLET.toArray(),
        ];

        var vertexColors = [];

        for (var i=0; i<6; i++) {
            //
            var item = faceColors[i];

            // Repeat each color four times for the four vertices of the face

            for (var j=0; j<4; j++) {
                vertexColors = vertexColors.concat(item);
            }
        }

        scene.graphicsManager.setUpVertexBuffer (
            vertexColorBuffer,
            vertexColors
        );

        //
        // Vertex indices.
        //
        indexBuffer = gl.createBuffer();

        var vertexIndices = [
            //
            // Front face.
            0,  1,  2,
            0,  2,  3,

            // Back face.
            4,  5,  6,
            4,  6,  7,

            // Top face.
            8,  9,  10,
            8,  10, 11,

            // Bottom face.
            12, 13, 14,
            12, 14, 15,

            // Right face.
            16, 17, 18,
            16, 18, 19,

            // Left face.
            20, 21, 22,
            20, 22, 23
        ];

        scene.graphicsManager.setUpIndexBuffer (
            indexBuffer,
            vertexIndices
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

        scene.graphicsManager.setAttribute (
            vertexColorAttributeLocation,
            vertexColorBuffer,
            4
        );

        setUpTransform();
        
        scene.graphicsManager.drawIndexedPrimitives (
            indexBuffer,
            Cybo.PrimitiveType.TRIANGLE_LIST,
            36
        );
    }

    function setUpTransform() {
        //
        var modelMatrix = Cybo.Matrix4x4.createRotationMatrix (
            // Part 1.
            Cybo.CartesianAxis.Y,
            // Part 2.
            Cybo.MathHelper.RADIANS_OF_THREE_SIXTY_DEGREES *
            sineEase.ratioOfCurrentToTotalTimeOffset
        );

        modelMatrix = Cybo.Matrix4x4.multiplyMatrices (
            Cybo.Matrix4x4.createRotationMatrix (
                // Part 1.
                Cybo.CartesianAxis.X,
                // Part 2.
               -Cybo.MathHelper.RADIANS_OF_THREE_SIXTY_DEGREES *
                sineEase2.ratioOfCurrentToTotalTimeOffset
            ),
            modelMatrix
        );

        camera.getTransform(transform);

        transform = Cybo.Matrix4x4.multiplyMatrices (
            transform,
            modelMatrix
        );

        scene.graphicsManager.setUniform (
            transformUniformLocation,
            transform
        );
    }
}
