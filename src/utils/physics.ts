import * as BABYLON from '@babylonjs/core';

export function initializePhysics(scene: BABYLON.Scene) {
    const gravity = new BABYLON.Vector3(0, -9.81, 0);
    const physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravity, physicsPlugin);
}
