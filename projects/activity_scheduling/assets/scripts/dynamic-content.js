// table-feature
fetch('assets/data/table-features.json')
  .then(res => res.json())
  .then(data => {
    const section = document.getElementById('table-feature-section');
    if (!section) return;
    const LIMIT = 8;
    if (data.length > LIMIT) {
      console.warn(`Переповнення: отримано ${data.length} елементів, показано лише перші ${LIMIT}.`);
      const warning = document.createElement('div');
      warning.className = 'content-overflow-warning';
      warning.style.color = 'red';
      warning.style.margin = '10px 0';
      warning.textContent = `Увага: забагато елементів у секції! Показано лише перші ${LIMIT}.`;
      section.parentNode.insertBefore(warning, section);
    }
    const visibleData = data.slice(0, LIMIT);
    section.innerHTML = visibleData.map(item => `
      <div class="table-feature-item" onclick="openModal('${item.id}')" style="position:relative;">
        <h3>${item.number}</h3>
        <p>${item.title} <br> <span>${item.desc}</span></p>
        <div id="${item.id}" class="modal" style="position:absolute; top:100%; left:0;">
          <span class="close" onclick="closeModal('${item.id}')">×</span>
          <span class="icon ${item.modal.icon}"></span>
          <p>${item.modal.text}</p>
        </div>
      </div>
    `).join('');
  });

// third-party-apps
fetch('assets/data/third-party-apps.json')
  .then(res => res.json())
  .then(data => {
    const iconsDiv = document.getElementById('third-party-apps-icons');
    if (!iconsDiv) return;
    const LIMIT = 5;
    if (data.length > LIMIT) {
      console.warn(`Переповнення: отримано ${data.length} іконок, показано лише перші ${LIMIT}.`);
      const warning = document.createElement('div');
      warning.className = 'content-overflow-warning';
      warning.style.color = 'red';
      warning.style.margin = '10px 0';
      warning.textContent = `Увага: забагато іконок у секції! Показано лише перші ${LIMIT}.`;
      iconsDiv.parentNode.insertBefore(warning, iconsDiv);
    }
    const visibleData = data.slice(0, LIMIT);
    iconsDiv.innerHTML = visibleData.map(app => `
      <div class="icons-item d-flex ${app.name.toLowerCase()}">
        <a href="#" aria-label="${app.name}">
          <img src="${app.img}" alt="${app.alt}">
        </a>
      </div>
    `).join('');
  }); 