chrome.runtime.onInstalled.addListener(() => {
  initializeStorage();
});

function initializeStorage() {
  const now = new Date().toISOString();
  chrome.storage.local.set({
    clicks: 0,
    day: {},
    week: {},
    month: {},
    year: {},
    lastUpdate: now
  });
}

function updateCounts() {
  const now = new Date();
  chrome.storage.local.get(['clicks', 'day', 'week', 'month', 'year', 'lastUpdate'], (data) => {
    const clicks = data.clicks + 1;
    const lastUpdate = new Date(data.lastUpdate);

    const dayKey = now.toISOString().split('T')[0];
    const weekKey = getWeekNumber(now);
    const monthKey = now.toISOString().slice(0, 7);
    const yearKey = now.getFullYear();

    data.day[dayKey] = (data.day[dayKey] || 0) + 1;
    data.week[weekKey] = (data.week[weekKey] || 0) + 1;
    data.month[monthKey] = (data.month[monthKey] || 0) + 1;
    data.year[yearKey] = (data.year[yearKey] || 0) + 1;

    chrome.storage.local.set({
      clicks,
      day: data.day,
      week: data.week,
      month: data.month,
      year: data.year,
      lastUpdate: now.toISOString()
    });
  });
}

function getWeekNumber(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'click') {
    updateCounts();
  }
});