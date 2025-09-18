export function buildPage(name) {
    fetch('templates/page.html').then(r => r.text()).then(html => {
        document.body.insertAdjacentHTML('beforeend', html);

        const container = document.getElementById(name + '-container');
        const template = document.getElementById('page-template');

        fetch('data/' + name + '.json')
            .then(response => response.json())
            .then(cards => cards.forEach(card => {
                const clone = template.content.cloneNode(true);
                if (card.title.length > 0) clone.querySelector('.page-title').innerHTML = card.title;
                if (card.subtitle.length > 0) clone.querySelector('.page-subtitle').innerHTML = card.subtitle;
                if (card.description.length > 0) clone.querySelector('.page-description').innerHTML = card.description;
                if (card.media.length == 0) card.media = 'placeholder.png';
                const mediaContainer = clone.querySelector('.page-media');
                if (card.media.endsWith('.png')) {
                    const img = document.createElement('img');
                    img.src = 'assets/' + card.media;
                    img.alt = card.title;
                    mediaContainer.appendChild(img);
                } else if (card.media.endsWith('.mp4')) {
                    const vid = document.createElement('video');
                    vid.src = 'assets/' + card.media;
                    vid.autoplay = true;
                    vid.loop = true;
                    vid.muted = true;
                    vid.playsInline = true;
                    mediaContainer.appendChild(vid);
                } else if (card.media.endsWith('.js')) {
                    import(`/assets/${card.media}`).then(module => {
                        mediaContainer.append(module.default());
                    });
                }
                container.append(clone);
            }));
    });
}
