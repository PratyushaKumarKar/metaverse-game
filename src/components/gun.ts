import * as BABYLON from '@babylonjs/core';

export function initializeGun(scene: BABYLON.Scene, xr: BABYLON.WebXRDefaultExperience) {
    xr.input.onControllerAddedObservable.add((controller) => {
        if (controller.inputSource.targetRayMode === "tracked-pointer") {
            const gunMesh: BABYLON.AbstractMesh | null = scene.getMeshByName("Barrel_Body_Base_Color_0") ?? null;

            if (gunMesh) {
                //@ts-ignore
                gunMesh.parent = controller.grip;
            } else {
                console.error("Gun mesh not found in the scene.");
            }

            // Access the motion controller for the trigger state
            controller.onMotionControllerInitObservable.add((motionController) => {
                const triggerComponent = motionController.getComponent("xr-standard-trigger");
                console.log(motionController.getComponentIds());

                if (triggerComponent) {
                    triggerComponent.onButtonStateChangedObservable.add(() => {
                        if (triggerComponent.pressed) {
                            shootBullet(scene, gunMesh);
                        }
                    });
                } else {
                    console.error("Trigger component not found on the controller.");
                }
            });
        }
    });
}

function shootBullet(scene: BABYLON.Scene, gunMesh: BABYLON.AbstractMesh | null) {
    if (!gunMesh) {
        console.error("Gun mesh is not available for shooting.");
        return;
    }

    // Create and shoot a bullet
    const bullet = BABYLON.MeshBuilder.CreateSphere("bullet", { diameter: 0.1 }, scene);
    bullet.position = gunMesh.getAbsolutePosition().clone();
    const forward = new BABYLON.Vector3(0, 0, -1); // Adjust forward direction as needed
    bullet.physicsImpostor = new BABYLON.PhysicsImpostor(
        bullet,
        BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1 },
        scene
    );
    bullet.physicsImpostor.applyImpulse(forward.scale(10), bullet.getAbsolutePosition());
}
