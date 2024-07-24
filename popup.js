document.addEventListener('DOMContentLoaded', () => {
  refreshData();

  document.getElementById('refresh').addEventListener('click', refreshData);
});

function refreshData() {
  chrome.storage.local.get(['clicks', 'day', 'week', 'month', 'year'], (data) => {
    console.log('Data retrieved', data);
    document.getElementById('liveCount').textContent = `Total Clicks: ${data.clicks || 0}`;
    updateDisplay(data);
  });
}

function updateDisplay(data) {
  const dayCounts = formatCounts(data.day);
  const weekCounts = formatCounts(data.week);
  const monthCounts = formatCounts(data.month);
  const yearCounts = formatCounts(data.year);

  document.getElementById('dayCounts').textContent = `Day: ${dayCounts}`;
  document.getElementById('weekCounts').textContent = `Week: ${weekCounts}`;
  document.getElementById('monthCounts').textContent = `Month: ${monthCounts}`;
  document.getElementById('yearCounts').textContent = `Year: ${yearCounts}`;
}

function formatCounts(counts) {
  return Object.entries(counts).map(([key, value]) => `${key}: ${value}`).join(', ');
}