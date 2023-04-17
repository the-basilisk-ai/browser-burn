import '../app.css';
import Layout from './Layout.svelte';

const target = document.getElementById('app');

async function render() {
  new Layout({target});
}

document.addEventListener('DOMContentLoaded', render);
