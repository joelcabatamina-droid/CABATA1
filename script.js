// === Verificar IP ===
async function checkIP() {
  const btn = document.getElementById('checkBtn');
  const result = document.getElementById('result');
  const error = document.getElementById('error');

  // Reset
  result.classList.add('hidden');
  error.classList.add('hidden');
  btn.textContent = 'Verificando...';
  btn.classList.add('loading');

  try {
    const response = await fetch('https://ipapi.co/json/');

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.reason || 'Falha ao obter IP');
    }

    // Preenche os dados
    document.getElementById('ip').textContent = data.ip;
    document.getElementById('location').textContent = `${data.city}, ${data.region}`;
    document.getElementById('country').textContent = data.country_name;
    document.getElementById('isp').textContent = data.org;
    document.getElementById('timezone').textContent = data.timezone;

    result.classList.remove('hidden');

  } catch (err) {
    error.textContent = `❌ ${err.message}`;
    error.classList.remove('hidden');
  } finally {
    btn.textContent = 'Verificar Meu IP';
    btn.classList.remove('loading');
  }
}

// === Compartilhar no WhatsApp ===
function shareWhatsApp() {
  const text = encodeURIComponent('🔍 Descubra informações sobre seu IP com o Blip!\n👉 https://joelcabatamina-droid.github.io/CABATA1/');
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

// === PWA Install ===
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').classList.remove('hidden');
});

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('installBanner').classList.add('hidden');
}

function dismissInstall() {
  document.getElementById('installBanner').classList.add('hidden');
}

// === Service Worker ===
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/CABATA1/sw.js');
}
