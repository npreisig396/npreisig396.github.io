fetch('education/education.html').then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const container = document.getElementById('education-container');
    const template = document.getElementById('education-template');

    const education = [
        { title: 'Computer Science M.S. - Western Washington University', asset: 'assets/education/wwu.png',
            years: '2024-2026' },
        { title: 'Computer Science B.S. - Western Washington University', asset: 'assets/education/wwu.png',
            years: '2020-2024' },
    ]

    education.forEach(education => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.education-title').textContent = education.title;
        clone.querySelector('.education-subtitle').textContent = education.years;
        const mediaContainer = clone.querySelector('.education-media');
        if (education.asset.endsWith('.png')) {
            const img = document.createElement('img');
            img.src = education.asset;
            img.alt = education.title;
            mediaContainer.appendChild(img);
        } else if (education.asset.endsWith('.mp4')) {
            const vid = document.createElement('video');
            vid.src = education.asset;

            vid.autoplay = true;
            vid.loop = true;
            vid.muted = true;
            vid.playsInline = true;
            mediaContainer.appendChild(vid);
        } else if (education.asset.endsWith('.js')) {
            import(`/${education.asset}`).then(module => {
                mediaContainer.append(module.default());
            });
        }
        container.append(clone);
    });
});
