import * as BABYLON from '@babylonjs/core';
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience';
import '@babylonjs/loaders';

export function initializeApp() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 2,
        5,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.SceneLoader.Append("./assets/", "scene.gltf", scene, () => {
        const gunMesh = scene.getMeshByName("Barrel_Body_Base_Color_0");
        if (gunMesh) {
            gunMesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
            // gunMesh.position = new BABYLON.Vector3(0, 1, 0);
            console.log("Gun model loaded and positioned!");
        } else {
            console.error("Gun mesh not found!");
        }
    });

    WebXRDefaultExperience.CreateAsync(scene).then((xr) => {
        console.log("WebXR experience enabled!");

        xr.input.onControllerAddedObservable.add((controller) => {
            console.log("Controller added:", controller);

            // Attach gun to the grip of the controller
            const gunMesh = scene.getMeshByName("Barrel_Body_Base_Color_0");
            if (gunMesh) {
                //@ts-ignore
                gunMesh.parent = controller.grip; 
                gunMesh.position = new BABYLON.Vector3(0, 0, 0); 
            } else {
                console.error("Gun mesh not found to attach!");
            }
        });
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return { scene, engine };
}
