const menu = document.querySelector(".header-enlaces")


document.querySelector(".menu-barra").addEventListener("click", () => menu.classList.add("active"))
document.querySelector(".menu-x").addEventListener("click", () => menu.classList.remove("active"))

const contenedorServicio = document.querySelector(".contenedor-servicio")
const esTactil = window.matchMedia("(hover: none) and (pointer: coarse)").matches

if (esTactil) {
    contenedorServicio.addEventListener("click", () => {
        contenedorServicio.classList.toggle("esta-invertido")
    } )
};

( () => { 
    const track = document.getElementById("track")
    const dotsEl = document.getElementById("dots")
    
    const slides = Array.from(track.children)
    
    const dots = slides.map((_, i) => {
        const btn = document.createElement("button")
        btn.className= "dots__item"
        btn.addEventListener("click", () => {
            slides[i].scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        })
        dotsEl.appendChild(btn)
        return btn 
    })

    function setActive (index) {
        dots.forEach((d, i) => d.setAttribute("aria-current", i === index ? "true" : "false"))
    }
    
    setActive(0)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                setActive(slides.indexOf(entry.target))
            }
        })
    }, {
        root: track,
        threshold: [0.6]
    })

    slides.forEach((slide) => observer.observe(slide))

    track.addEventListener("keydown", (e) => {
        if (e.repeat) return;
        const current = dots.findIndex((d)=> d.getAttribute("aria-current") === "true")
        if (e.key === "ArrowRight" && current < slides.length - 1 ) {
            slides[current + 1 ].scrollIntoView({
                behavior: "smooth",
                inline: "center",
            })
        } else if (e.key === "ArrowLeft" && current > 0) {
            slides[current - 1 ].scrollIntoView({
                behavior: "smooth",
                inline: "center",
            })
        }
    })

})()

