<template>
  <!-- 要给外层div指定合适的宽度 -->
  <div id="container"></div>
</template>
<script setup lang="ts">
import * as THREE from 'three';

import Stats from "three/examples/jsm/libs/stats.module";

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment";

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {onMounted} from "vue";


onMounted(() => {
  let mixer: any;

  const clock = new THREE.Clock();
  const container = document.getElementById('container');

  const stats = Stats();
  container!.appendChild(stats.dom);

  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container!.appendChild(renderer.domElement);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe3dd);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.set(5, 2, 8);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(new URL('../../assets/jsm/libs/draco/gltf/', import.meta.url).href);

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(new URL('../../assets/models/gltf/LittlestTokyo.glb', import.meta.url).href, function (gltf) {

    const model = gltf.scene;
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate();

  }, undefined, function (e) {

    console.error(e);

  });


  // window.onresize = function () {
  //
  //   // camera.aspect = window.innerWidth / window.innerHeight;
  //   // camera.updateProjectionMatrix();
  //
  //   // renderer.setSize(window.innerWidth, window.innerHeight);
  //
  // };


  function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixer.update(delta);

    controls.update();

    stats.update();

    renderer.render(scene, camera);

  }
})


</script>
<style scoped>
:deep(.op-calendar-pc-backtoday) {
  height: auto;
}

:deep(.op-calendar-pc-left) {
  border: 2px solid #f0f0f0;
  border-right: none;
}

:deep(.op-calendar-pc-right) {
  border: 2px solid #d5d5d5;
}
:deep(#container >div){
  position: absolute !important;
}

</style>

