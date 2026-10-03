// =====================================================
// LOAD PORTFOLIO DATA
// =====================================================

async function loadPortfolio() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error(
                `Could not load data.json: ${response.status}`
            );
        }

        const data = await response.json();


        // Generate both sections
        renderProjects(data.projects);
        renderMusic(data.music);


    } catch (error) {

        console.error(
            "Error loading portfolio data:",
            error
        );

    }

}


// =====================================================
// PROJECTS
// =====================================================

function renderProjects(projects) {

    const projectGrid =
        document.getElementById("project-grid");


    // Make sure the container exists
    if (!projectGrid) {
        console.error(
            "Could not find #project-grid"
        );
        return;
    }


    projectGrid.innerHTML = "";


    projects.forEach(project => {

        const card =
            document.createElement("article");

        card.className = "project-card";


        // Technologies
        const technologies =
            project.technologies
                .join(" · ");


        // Optional image
        const imageHTML =
            project.image
                ? `
                    <div class="card-image">
                        <img
                            src="${project.image}"
                            alt="${project.title}"
                        >
                    </div>
                  `
                : "";


        // Optional link
        const linkHTML =
            project.link
                ? `
                    <a
                        href="${project.link}"
                        class="card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View project
                        <span>→</span>
                    </a>
                  `
                : "";


        card.innerHTML = `

            ${imageHTML}

            <div class="card-content">

                <h3>
                    ${project.title}
                </h3>

                <div class="card-meta">

                    ${project.type || ""}
                    ${project.type ? " · " : ""}
                    ${project.year}

                </div>

                <div class="card-technologies">

                    ${technologies}

                </div>

                <p class="card-description">

                    ${project.description}

                </p>

                ${linkHTML}

            </div>

        `;


        projectGrid.appendChild(card);

    });

}


// =====================================================
// MUSIC
// =====================================================

function renderMusic(works) {

    const musicContainer =
        document.getElementById("music-container");


    if (!musicContainer) {
        console.error(
            "Could not find #music-container"
        );
        return;
    }


    musicContainer.innerHTML = "";


    // Create cards in the order they appear
    // in data.json.

    works.forEach(work => {

        const card =
            createMusicCard(work);

        musicContainer.appendChild(card);

    });

}


// =====================================================
// MUSIC CARD
// =====================================================

function createMusicCard(work) {

    const card =
        document.createElement("article");

    card.className = "music-card";


    // Optional image
    const imageHTML =
        work.image
            ? `
                <div class="card-image">

                    <img
                        src="${work.image}"
                        alt="Cover artwork for ${work.title}"
                    >

                </div>
              `
            : "";


    // Optional audio
    const audioHTML =
        work.audio
            ? `
                <audio
                    controls
                    preload="none"
                    class="music-player"
                >

                    <source
                        src="${work.audio}"
                        type="audio/mpeg"
                    >

                    Your browser does not support
                    audio playback.

                </audio>
              `
            : "";


    // Optional score
    const scoreHTML =
        work.score
            ? `
                <a
                    href="${work.score}"
                    class="score-button"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Check Score
                    <span>→</span>
                </a>
              `
            : "";


    card.innerHTML = `

        ${imageHTML}

        <div class="card-content">

            <h3>
                ${work.title}
            </h3>


            <div class="card-meta">

                ${work.ensemble}
                ·
                ${work.type}
                ·
                ${work.year}

            </div>


            <p class="card-description">

                ${work.description}

            </p>


            ${audioHTML}


            ${scoreHTML}

        </div>

    `;


    return card;

}


// =====================================================
// START
// =====================================================

loadPortfolio();

/*
            Automatically highlights the navigation item
            corresponding to the section currently visible.
        */

        const sections =
            document.querySelectorAll(
                "main section"
            );


        const navLinks =
            document.querySelectorAll(
                "nav a"
            );


        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        navLinks.forEach(link => {
                            link.classList.remove("active");
                        });


                        const activeLink =
                            document.querySelector(
                                `nav a[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {
                            activeLink.classList.add("active");
                        }

                    });

                },

                {
                    rootMargin:
                        "-25% 0px -60% 0px",

                    threshold:
                        0
                }

            );


        sections.forEach(section => {
            observer.observe(section);
        });



        /*
            Prevent the prototype contact form from
            actually submitting anywhere yet.

            Later, this can be connected to:
            - Formspree
            - EmailJS
            - a custom backend
            - another form service
        */

        const form =
            document.querySelector("form");


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                alert(
                    "The contact form is not connected yet."
                );

            }
        );