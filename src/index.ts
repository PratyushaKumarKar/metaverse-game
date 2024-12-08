import * as BABYLON from '@babylonjs/core';
import { initializeMainScene } from './scenes/mainScene';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);


const scene = initializeMainScene(engine, canvas);

engine.runRenderLoop(() => scene.render());
