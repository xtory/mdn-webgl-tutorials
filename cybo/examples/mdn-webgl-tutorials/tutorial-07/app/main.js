function main() {
    //
    'use strict';

    var scene;
    var gl;
    var camera;
    var program;
    var vertexPositionAttributeLocation;
    var vertexNormalAttributeLocation;
    var vertexTextureCoordinateAttributeLocation;
    var transformUniformLocation;
    var transposeOfInverseOfModelMatrixUniformLocation;
    var samplerUniformLocation;
    var vertexPositionBuffer;
    var vertexNormalBuffer;
    var vertexTextureCoordinateBuffer;
    var indexBuffer;
    var sineEase;
    var sineEase2;
    var transform;
    var mainTexture;

    try {
        //
        scene = new Cybo.Xcene();
        gl = scene.graphicsManager.webGLContext;

        setUpCamera();
        
        setUpShaders();

        setUpGeometries();

        setUpTextures();

        transform = Cybo.Matrix4x4.createIdentityMatrix();

        sineEase = new Cybo.SineEase (
            Cybo.EaseMode.EASE_IN_OUT,
            3750,
            true
        );

        sineEase.start();

        sineEase2 = new Cybo.SineEase (
            Cybo.EaseMode.EASE_IN_OUT,
            7500,
            true
        );

        sineEase2.start();

        scene.run(updateScene, drawScene);

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
            PhongShading.VERTEX_SHADER_SOURCE,
            PhongShading.FRAGMENT_SHADER_SOURCE
        );

        vertexPositionAttributeLocation = (
            scene.graphicsManager.getAttributeLocation (
                program,
               'vertexPosition'
            )
        );

        vertexNormalAttributeLocation = (
            scene.graphicsManager.getAttributeLocation (
                program,
               'vertexNormal'
            )
        );
        
        vertexTextureCoordinateAttributeLocation = (
            scene.graphicsManager.getAttributeLocation (
                program,
               'vertexTextureCoordinates'
            )
        );
        
        transformUniformLocation = (
            scene.graphicsManager.getUniformLocation (
                program,
               'transform'
            )
        );

        transposeOfInverseOfModelMatrixUniformLocation = (
            scene.graphicsManager.getUniformLocation (
                program,
               'transposeOfInverseOfModelMatrix'
            )
        );

        samplerUniformLocation = (
            scene.graphicsManager.getUniformLocation (
                program,
               'sampler'
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
        // Vertex normals.
        //
        vertexNormalBuffer = gl.createBuffer();

        var vertexNormals = [
            //
            // Front face.
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,

            // Back face.
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,

            // Top face.
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,

            // Bottom face.
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,

            // Right face.
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,

            // Left face.
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0
        ];

        scene.graphicsManager.setUpVertexBuffer (
            vertexNormalBuffer,
            vertexNormals
        );

        //
        // Vertex texture coordinates.
        //
        vertexTextureCoordinateBuffer = gl.createBuffer();

        var vertexTextureCoordinates = [
            //
            // Front face.
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,

            // Back face.
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,

            // Top face.
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,

            // Bottom face.
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,

            // Right face.
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,

            // Left face.
            1.0,  0.0,
            1.0,  1.0,
            0.0,  1.0,
            0.0,  0.0,
        ];

        scene.graphicsManager.setUpVertexBuffer (
            vertexTextureCoordinateBuffer,
            vertexTextureCoordinates
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
        ]
        
        scene.graphicsManager.setUpIndexBuffer (
            indexBuffer,
            vertexIndices
        );
    }

    function setUpTextures() {
        //
        var url = // which is relative to index.html, not main.js
            '../../assets/images/market-street.jpg';

        mainTexture = scene.assetManager.loadTexture2D(url);
    }

    function updateScene() {
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
            vertexTextureCoordinateAttributeLocation,
            vertexTextureCoordinateBuffer,
            2
        );

        scene.graphicsManager.setAttribute (
            vertexNormalAttributeLocation,
            vertexNormalBuffer,
            3
        );

        setUpTransform();
        
        scene.graphicsManager.setSampler (
            samplerUniformLocation,
            mainTexture
        );

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

        var transposeOfInverseOfModelMatrix =
            Cybo.Matrix4x4.invertMatrix(modelMatrix);

        transposeOfInverseOfModelMatrix =
            Cybo.Matrix4x4.transposeMatrix(transposeOfInverseOfModelMatrix);
        
        scene.graphicsManager.setUniform (
            transposeOfInverseOfModelMatrixUniformLocation,
            transposeOfInverseOfModelMatrix
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
