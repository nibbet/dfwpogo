fetch('communities.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('community-list');
    data.forEach(group => {
      const li = document.createElement('li');
      li.className = group.hasAmbassador ? 'ambassador' : 'no-ambassador';

      const link = document.createElement('a');
      link.href = group.url;
      link.textContent = group.name;
      link.target = '_blank';

      const status = document.createElement('span');
      status.textContent = group.hasAmbassador
        ? ' : Has a Niantic Community Ambassador'
        : ' : Does Not Have a Community Ambassador';

      li.appendChild(link);
      li.appendChild(status);
      list.appendChild(li);
    });
  })
  .catch(err => {
    console.error('Failed to load communities:', err);
  });
