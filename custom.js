
/* =========================
   REVEAL
========================= */

const revealItems =
    document.querySelectorAll(
        ".reveal-up, .reveal-left, .reveal-right, .reveal-scale"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealItems.forEach(item => {
    observer.observe(item);
});


/* =========================
   COUNTDOWN
========================= */

const weddingDate =
    new Date("2026-11-20T20:30:00+05:30").getTime();

function updateCountdown() {

    let distance =
        weddingDate - Date.now();

    if (distance < 0) {
        distance = 0;
    }

    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================
   PETALS
========================= */

const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

function createPetal() {

    if (reduceMotion) return;

    const petal =
        document.createElement("div");

    petal.className =
        "petal";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.animationDuration =
        7 + Math.random() * 7 + "s";

    petal.style.opacity =
        .25 + Math.random() * .55;

    document.body.appendChild(petal);

    setTimeout(
        () => petal.remove(),
        15000
    );

}

if (!reduceMotion) {

    setInterval(
        createPetal,
        500
    );

}


/* =========================
   LIGHTBOX
========================= */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

document
    .querySelectorAll(".gallery-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                lightboxImage.src =
                    item.dataset.large;

                lightbox.classList.add("active");

                document.body.classList.add(
                    "lightbox-open"
                );

            }
        );

    });

function closeLightbox() {

    lightbox.classList.remove("active");

    lightboxImage.src = "";

    document.body.classList.remove(
        "lightbox-open"
    );

}

lightboxClose.addEventListener(
    "click",
    closeLightbox
);

lightbox.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    }
);
