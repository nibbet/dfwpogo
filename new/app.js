let currentTab = 0;
let tabIds = [];

async function loadDynamicContent() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    const tabButtons = document.getElementById('tab-buttons');
    const tabContentsContainer = document.getElementById('tab-contents');

    tabButtons.innerHTML = '';
    tabContentsContainer.innerHTML = '';
    tabIds = [];

    data.tabs.forEach((tab, index) => {
      tabIds.push(tab.id);

      const button = document.createElement('button');
      button.className = 'tab-button' + (index === 0 ? ' active' : '');
      button.setAttribute('onclick', `showTab('${tab.id}', event)`);
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', index === 0);
      button.innerHTML = tab.label;
      tabButtons.appendChild(button);

      const tabDiv = document.createElement('div');
      tabDiv.id = tab.id;
      tabDiv.className = 'tab-content' + (index === 0 ? ' active' : '');
      tabDiv.innerHTML = `<h2>${tab.title}</h2>`;

      if (tab.html) tabDiv.innerHTML += tab.html;

      if (tab.meetups) {
        tabDiv.innerHTML += '<ul>' + tab.meetups.map(m => `<li><a href="${m.link}" target="_blank">${m.location}</a></li>`).join('') + '</ul>';
      }

      if (tab.raids) {
        tabDiv.innerHTML += '<h3>🔍 Raids</h3>';
        Object.entries(tab.raids).forEach(([tier, mons]) => {
          tabDiv.innerHTML += `<details><summary>${tier} Raids</summary><ul>${mons.map(mon => `<li>${mon}</li>`).join('')}</ul></details>`;
        });
      }

      tabContentsContainer.appendChild(tabDiv);
    });
  } catch (err) {
    console.error('Failed to load JSON:', err);
  }
}

function showTab(tabId, event) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');
  tabs.forEach(tab => tab.classList.remove('active'));
  buttons.forEach((btn, idx) => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
    if (tabIds[idx] === tabId) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }
  });
  document.getElementById(tabId).classList.add('active');
  currentTab = tabIds.indexOf(tabId);
}

document.addEventListener('DOMContentLoaded', loadDynamicContent);