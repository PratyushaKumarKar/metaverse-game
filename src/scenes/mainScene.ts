import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders'; // For glTF loading
import { WebXRDefaultExperience } from '@babylonjs/core/XR/webXRDefaultExperience';
import { initializeGun } from '../components/gun';

export function initializeMainScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);

    // Basic lighting and camera
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Load the gun model
    BABYLON.SceneLoader.Append("./assets/", "scene.gltf", scene, () => {
        console.log("Gun model loaded!");
    });

    // Enable WebXR
    WebXRDefaultExperience.CreateAsync(scene).then((xr) => {
        initializeGun(scene, xr);
    });

    return scene;
}
