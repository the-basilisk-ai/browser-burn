import '../app.css';
import Roast from '../components/Roast.svelte';

const target = document.getElementById('app');

async function render() {
  new Roast({target});
}

document.addEventListener('DOMContentLoaded', render);
