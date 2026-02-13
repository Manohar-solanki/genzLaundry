// Removed import to use global THREE from CDN
// import * as THREE from 'three';

class HeroAnimation {
    constructor() {
        console.log("HeroAnimation: Initializing...");

        if (typeof THREE === 'undefined') {
            console.error("HeroAnimation: THREE is not defined!");
            // Silently fail - no alert popup
            return;
        }

        this.container = document.getElementById('hero-3d-container');
        if (!this.container) {
            console.error("HeroAnimation: Container #hero-3d-container not found!");
            return;
        }

        this.width = this.container.clientWidth || window.innerWidth;
        this.height = this.container.clientHeight || window.innerHeight;

        console.log(`HeroAnimation: Container size ${this.width}x${this.height}`);

        this.scene = new THREE.Scene();
        // DEBUG: Bright pink background to confirm 3D canvas is visible
        this.scene.background = new THREE.Color(0xff00ff);

        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 5;

        // alpha: false for debug to ensure we see the background
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;

        // Clear anything in container just in case
        while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
        this.container.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.bubbles = [];

        this.initLights();
        this.initObjects();
        this.initEvents();
        this.animate();

        console.log("HeroAnimation: Started");
    }

    initLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;

        // Improve shadow quality
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.scene.add(dirLight);

        const pointLight = new THREE.PointLight(0x06B6D4, 0.8);
        pointLight.position.set(-5, 2, 5);
        this.scene.add(pointLight);
    }


    initObjects() {
        console.log("HeroAnimation: Creating objects...");

        // SIMPLE DEBUG CUBE
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.shirt = new THREE.Mesh(geometry, material);
        this.scene.add(this.shirt);

        console.log("HeroAnimation: Red cube added");

        this.phase = 'debug';
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Simple rotation
        if (this.shirt) {
            this.shirt.rotation.x += 0.01;
            this.shirt.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroAnimation();
});
