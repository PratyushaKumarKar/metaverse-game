import * as BABYLON from '@babylonjs/core';
import { initializeMainScene } from './scenes/mainScene';

export function initializeApp() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);

    const scene = initializeMainScene(engine, canvas);

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });
}
