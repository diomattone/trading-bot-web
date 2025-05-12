
let chart;
let isRunning = false;
let currentStrategy = 'moving_average';

function startBot() {
  isRunning = true;
  currentStrategy = document.getElementById('strategySelector').value;
  updateStatus();
  simulateBacktest(currentStrategy);
}

function stopBot() {
  isRunning = false;
  updateStatus();
}

function updateStatus() {
  const statusEl = document.getElementById('statusOutput');
  statusEl.textContent = isRunning ? `Running (${currentStrategy})` : 'Idle';
}

function simulateBacktest(strategy) {
  let prices = Array.from({length: 20}, (_, i) => 100 + Math.sin(i / 2) * 5 + Math.random() * 3);
  renderChart(prices);
}

function renderChart(prices) {
  const ctx = document.getElementById('chart').getContext('2d');
  const labels = prices.map((_, i) => i + 1);
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Simulated Price',
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }]
    }
  });
}

document.getElementById('strategySelector').addEventListener('change', (e) => {
  currentStrategy = e.target.value;
  if (isRunning) simulateBacktest(currentStrategy);
});
