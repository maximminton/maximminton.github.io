function populate() {
  fetch('https://semegenkep.github.io/itca/superheroes.json')
    .then(response => response.json())
    .then(data => {
      populateHeader(data);
      populateHeroes(data);
    })
    .catch(error => console.error('Помилка отримання даних:', error));
}
function populateHeader(obj) {
  const header = document.querySelector('header');
  
  const SH_header_H1 = document.createElement('h1');
  SH_header_H1.textContent = obj.squadName;
  header.appendChild(SH_header_H1);

  const SH_header_P = document.createElement('p');
  SH_header_P.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
  header.appendChild(SH_header_P);
}
function populateHeroes(obj) {
  const section = document.querySelector('section');

  obj.members.forEach(hero => {
    const article = document.createElement('article');

    const name = document.createElement('h2');
    name.textContent = hero.name;
    article.appendChild(name);

    const secret = document.createElement('p');
    secret.textContent = `Secret Identity: ${hero.secretIdentity}`;
    article.appendChild(secret);

    const age = document.createElement('p');
    age.textContent = `Age: ${hero.age}`;
    article.appendChild(age);

    const powers = document.createElement('p');
    powers.textContent = 'Superpowers:';
    article.appendChild(powers);

    const list = document.createElement('ul');
    hero.powers.forEach(power => {
      const item = document.createElement('li');
      item.textContent = power;
      list.appendChild(item);
    });
    article.appendChild(list);

    section.appendChild(article);
  });
}
