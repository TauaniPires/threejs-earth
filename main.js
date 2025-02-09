import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // FOV (campo de visão)
  window.innerWidth / window.innerHeight, // proporção da tela
  0.1, // near (plano de recorte próximo)
  1000 // far (plano de recorte distante)
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Carregando a textura
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("planeta.jpg");

// Criando a esfera
const geometry = new THREE.SphereGeometry(1, 32, 32); // Geometria da esfera
const material = new THREE.MeshStandardMaterial({ map: texture }); // Usando MeshStandardMaterial para efeitos de iluminação
const sphere = new THREE.Mesh(geometry, material); // Cria a esfera com o material

scene.add(sphere); // Adiciona a esfera à cena

// Adicionando luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Cor suave e intensidade
scene.add(ambientLight);

// Adicionando luz direcional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz branca com intensidade 1
directionalLight.position.set(5, 5, 5); // Posicionando a luz para iluminar a cena
directionalLight.castShadow = true; // Ativa sombras para a luz direcional
scene.add(directionalLight);

// Ajuste na posição da câmera
camera.position.z = 3; // Colocamos a câmera um pouco mais distante para ver a esfera

// Função de animação
function animate() {
  requestAnimationFrame(animate); // Faz o loop de animação funcionar
  sphere.rotation.y += 0.005; // Rotaciona a esfera
  renderer.render(scene, camera); // Renderiza a cena
}
animate();
