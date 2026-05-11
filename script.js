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
    const response = await fetch('http://ip-api.com/json/?fields=status,message,country,regionName,city,isp,timezone,query');

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();

    if (data.status === 'fail') {
      throw new Error(data.message || 'Falha ao obter IP');
    }

    // Preenche os dados
    document.getElementById('ip').textContent = data.query;
    document.getElementById('location').textContent = `${data.city}, ${data.regionName}`;
    document.getElementById('country').textContent = data.country;
    document.getElementById('isp').textContent = data.isp;
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
