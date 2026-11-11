/* =========================================
   🇮🇳 INDIA — INDEPENDENCE DAY 2026
========================================= */


/* =========================================
   PARTICLES
========================================= */

const particleContainer =
    document.getElementById("particles");


for (let i = 0; i < 90; i++) {

    const particle =
        document.createElement("span");

    particle.className =
        "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        8 + Math.random() * 18 + "s";

    particle.style.animationDelay =
        Math.random() * 12 + "s";

    particle.style.opacity =
        .15 + Math.random() * .55;

    particleContainer.appendChild(
        particle
    );
}


/* =========================================
   FIREWORK CANVAS
========================================= */

const canvas =
    document.getElementById(
        "fireworks"
    );

const ctx =
    canvas.getContext("2d");


function resizeCanvas() {

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        window.innerWidth * dpr;

    canvas.height =
        window.innerHeight * dpr;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   FIREWORK PARTICLES
========================================= */

let fireworks = [];


const tricolor = [
    "#ff9933",
    "#ffffff",
    "#138808"
];


function createFirework(
    x,
    y,
    force = 1
) {

    const particlesCount =
        Math.floor(
            75 * force
        );


    for (
        let i = 0;
        i < particlesCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI * 2;


        const speed =
            (Math.random() * 5 + 2)
            * force;


        const color =
            tricolor[
                Math.floor(
                    Math.random() *
                    tricolor.length
                )
            ];


        fireworks.push({

            x,

            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                100 +
                Math.random() * 30,

            maxLife:
                100 +
                Math.random() * 30,

            size:
                Math.random() * 2 + 1,

            color

        });

    }
}


/* =========================================
   FIREWORK ANIMATION
========================================= */

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    fireworks.forEach(
        (particle, index) => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            particle.vy +=
                .045;


            particle.vx *=
                .985;

            particle.vy *=
                .985;


            particle.life -=
                1.2;


            const alpha =
                Math.max(
                    particle.life /
                    particle.maxLife,
                    0
                );


            ctx.globalAlpha =
                alpha;


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                particle.color;

            ctx.shadowBlur = 10;

            ctx.shadowColor =
                particle.color;

            ctx.fill();


            ctx.shadowBlur = 0;


            if (
                particle.life <= 0
            ) {

                fireworks.splice(
                    index,
                    1
                );

            }

        }
    );


    ctx.globalAlpha = 1;


    requestAnimationFrame(
        animateFireworks
    );
}


animateFireworks();


/* =========================================
   CLICK → FIREWORK
========================================= */

document.addEventListener(
    "click",
    (event) => {

        createFirework(
            event.clientX,
            event.clientY,
            1
        );

    }
);


/* =========================================
   CELEBRATION BUTTON
========================================= */

const celebrateBtn =
    document.getElementById(
        "celebrateBtn"
    );


celebrateBtn.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();


        const centerX =
            window.innerWidth / 2;

        const centerY =
            window.innerHeight * .35;


        for (
            let i = 0;
            i < 12;
            i++
        ) {

            setTimeout(
                () => {

                    createFirework(

                        centerX +
                        (Math.random() - .5)
                        * 650,

                        centerY +
                        (Math.random() - .5)
                        * 320,

                        1.25

                    );

                },

                i * 130
            );

        }


        celebrateBtn.innerHTML =
            `
            <span class="flag-mini">
                🇮🇳
            </span>

            VANDE MATARAM

            <span class="arrow">
                ✦
            </span>
            `;


        setTimeout(
            () => {

                celebrateBtn.innerHTML =
                    `
                    <span class="flag-mini">
                        🇮🇳
                    </span>

                    CELEBRATE INDIA

                    <span class="arrow">
                        ↗
                    </span>
                    `;

            },

            2500
        );

    }
);


/* =========================================
   AUTOMATIC FIREWORKS
========================================= */

function randomFirework() {

    const x =
        window.innerWidth *
        (.15 + Math.random() * .7);


    const y =
        window.innerHeight *
        (.12 + Math.random() * .4);


    createFirework(
        x,
        y,
        .8
    );
}


setInterval(
    randomFirework,
    4800
);


/* =========================================
   FLAG PARALLAX
========================================= */

const flag =
    document.querySelector(
        ".flag-wrapper"
    );


document.addEventListener(
    "mousemove",
    (event) => {

        if (
            window.innerWidth <= 900
        ) {
            return;
        }


        const x =
            event.clientX /
            window.innerWidth -
            .5;


        const y =
            event.clientY /
            window.innerHeight -
            .5;


        flag.style.transform =
            `
            translate(
                ${x * 12}px,
                ${y * 8}px
            )
            rotate(
                ${x * 2}deg
            )
            `;

    }
);


/* =========================================
   TOUCH → FIREWORK
========================================= */

document.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.touches[0];


        createFirework(
            touch.clientX,
            touch.clientY,
            .8
        );

    },
    {
        passive: true
    }
);


/* =========================================
   STARTUP CELEBRATION
========================================= */

setTimeout(
    () => {

        createFirework(
            window.innerWidth * .78,
            window.innerHeight * .22,
            .9
        );

    },
    1000
);