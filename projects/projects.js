fetch('projects/projects.html').then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const container = document.getElementById('projects-container');
    const template = document.getElementById('project-template');

    const projects = [
        { title: 'DeepNeuralNetwork', asset: 'projects/assets/nn.mp4',
            description: 'An arbitrarily deep feed-forward neural network written in python using numpy from scratch. Capable of handling minibatching, hidden dimensions, layers, and activation functions as hyperparameters allowing for regression or classification.' },
        { title: 'Multi-Spectral Rendering', asset: 'projects/assets/rays.png',
            description: 'A ray tracing engine written in Julia capable of multispectral rendering utilizing a bounding volume hierarchy for optimization. Multi-spectral rendering allowing for fluorescence, caustics, as well as realistic refraction and dispersion.' },
        { title: 'Cellular Automota', asset: 'projects/assets/automota.js',
            description: 'A passion project based on conways game of life. Originally written in Fortran for a school project, I implemented a modular framwework to apply a variety of kernels and rules to. Each state is a transformation of the previous state until the pattern converges. Both the set of rules and the number of different groups of cells are variable.' },
        { title: 'CrewsOutThere', asset: 'projects/assets/crew.mp4', 
            description: 'An SMS based app handling the scheduling and organizing of flight crews for the Civil Air Patrol. Written in GoLang, handled flight requests and matched users to flights where their jobs were required.' },
    ]

    projects.forEach(project => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.project-title').textContent = project.title;
        clone.querySelector('.project-description').textContent = project.description;
        const mediaContainer = clone.querySelector(".project-media");
        if (project.asset.endsWith('.png')) {
            const img = document.createElement('img');
            img.src = project.asset;
            img.alt = project.title;
            mediaContainer.appendChild(img);
        } else if (project.asset.endsWith('.mp4')) {
            const vid = document.createElement('video');
            vid.src = project.asset;

            vid.autoplay = true;
            vid.loop = true;
            vid.muted = true;
            vid.playsInline = true;
            mediaContainer.appendChild(vid);
        } else if (project.asset.endsWith('.js')) {
            import(`/${project.asset}`).then(module => {
                mediaContainer.append(module.default());
            });
        }
        container.append(clone);
    });
});
