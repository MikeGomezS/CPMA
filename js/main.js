const d = document;

// Menu hamburgesa

function hamburgerMenu(panelBtn, panel, menuLink) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
      // Cualquier elemento hijo que esté en el área del botón, incluidas las 3 rayitas de la hamburguesa
      d.querySelector(panel).classList.toggle("is-active");
      d.querySelector(panelBtn).classList.toggle("is-active");
    }

    if (e.target.matches(menuLink) || e.target.matches(`${menuLink} *`)) {
      d.querySelector(panel).classList.remove("is-active"); // Se repliega el panel
      d.querySelector(panelBtn).classList.remove("is-active"); // Se resetea el botón
    }
  });
}

hamburgerMenu(".panel-btn", ".menu1", ".navbar-menu li");

// Responsive Slider

function slider(contenedor) {
  const diapositivas = document.querySelectorAll(contenedor);
  let contador = 0;

  const next = function next() {
    if (contador === diapositivas.length - 1) {
      diapositivas[contador].classList.remove("active");
      contador = 0;
      diapositivas[contador].classList.add("active");
    } else {
      diapositivas[contador].classList.remove("active");
      contador++;
      diapositivas[contador].classList.add("active");
    }
  };

  const autoplay = setInterval(() => {
    next();
  }, 4000);
}

slider(".slider-slide");
