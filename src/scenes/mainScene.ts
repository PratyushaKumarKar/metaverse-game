import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

export function initializeMainScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    const scene = new BABYLON.Scene(engine);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    
    BABYLON.SceneLoader.Append("./assets/", "gun_model.glb", scene, () => {
        console.log("Gun model loaded!");
    });

    return scene;
}
