fetch('experience/experience.html').then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const container = document.getElementById('experience-container');
    const template = document.getElementById('experience-template');

    const experiences = [
        { title: '', asset: '', dates: '',
            description: '' },
        { title: '', asset: '', dates: '',
            description: '' },
    ]

    experiences.forEach(experience => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.experience-title').textContent = experience.title;
        clone.querySelector('.experience-subtitle').textContent = experience.dates;
        clone.querySelector('.experience-description').textContent = experience.description;
        const mediaContainer = clone.querySelector(".experience-media");
        if (experience.asset.length == 0) {
            experience.asset = 'assets/placeholder.png';
        }
        if (experience.asset.endsWith('.png')) {
            const img = document.createElement('img');
            img.src = experience.asset;
            img.alt = experience.title;
            mediaContainer.appendChild(img);
        } else if (experience.asset.endsWith('.mp4')) {
            const vid = document.createElement('video');
            vid.src = experience.asset;

            vid.autoplay = true;
            vid.loop = true;
            vid.muted = true;
            vid.playsInline = true;
            mediaContainer.appendChild(vid);
        } else if (experience.asset.endsWith('.js')) {
            import(`/${experience.asset}`).then(module => {
                mediaContainer.append(module.default());
            });
        }
        container.append(clone);
    });
});
