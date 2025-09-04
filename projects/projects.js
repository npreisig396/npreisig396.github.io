fetch('projects/projects.html').then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const container = document.getElementById('projects-container');
    const template = document.getElementById('project-template');

    const projects = [
        { title: 'CrewsOutThere', img: 'projects/assets/crews.png' },
        { title: 'DeepNeuralNetwork', img: 'projects/assets/crews.png' },
        { title: 'Multi-Spectral Rendering', img: 'projects/assets/crews.png' },
    ]

    projects.forEach(project => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.project-title').textContent = project.title;
        clone.querySelector('img').src = project.img;
        container.append(clone);
    });
});
