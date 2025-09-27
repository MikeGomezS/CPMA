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

// Responsive Slider

function slider(contenedor, btnNext, btnPrev, circle) {
  const diapositivas = document.querySelectorAll(contenedor);
  const circles = document.querySelectorAll(circle);
  let contador = 0;

  const next = function next() {
    if (contador === diapositivas.length - 1) {
      diapositivas[contador].classList.remove("active");
      circles[contador].classList.remove("active_circle");
      contador = 0;
      diapositivas[contador].classList.add("active");
      circles[contador].classList.add("active_circle");
    } else {
      diapositivas[contador].classList.remove("active");
      circles[contador].classList.remove("active_circle");
      contador++;
      diapositivas[contador].classList.add("active");
      circles[contador].classList.add("active_circle");
    }
  };

  const prev = function prev() {
    if (contador === 0) {
      diapositivas[contador].classList.remove("active");
      circles[contador].classList.remove("active_circle");
      contador = diapositivas.length - 1;
      diapositivas[contador].classList.add("active");
      circles[contador].classList.add("active_circle");
    } else {
      diapositivas[contador].classList.remove("active");
      circles[contador].classList.remove("active_circle");
      contador--;
      diapositivas[contador].classList.add("active");
      circles[contador].classList.add("active_circle");
    }
  };
  document.addEventListener("click", (e) => {
    if (e.target.matches(btnNext)) {
      e.preventDefault();
      next();
      clearInterval(autoplay);
    }
    if (e.target.matches(btnPrev)) {
      e.preventDefault();
      prev();
      clearInterval(autoplay);
    }
  });

  const autoplay = setInterval(() => {
    next();
  }, 4000);
}

/*==================== VALIDACION FORMULARIO ====================*/

function contactFormValidations() {
  const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");

  // console.log($inputs);

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      const $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        const regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        // console.log('El input NO tiene patrón');
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();

    const $loader = d.querySelector(".contact-form-loader"),
      $reponse = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/cpmacomercial@cpma.mx", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))

      .then((json) => {
        $laoder.classList.add("none");
        $enviado.classList.remove("none");
        $enviado.innerHTML = `<p>${json.message} </p>`;
        $formulario.reset();
      })
      .catch((err) => {
        let message =
          err.statusText ||
          "Ocurrió un error al enviar el formulario, intenta nuevamente";
        $enviado.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
      })
      .finally(() =>
        setTimeout(() => {
          $loader.classList.add("none");
          $form.reset();
          $reponse.classList.remove("none");
          setTimeout(() => $reponse.classList.add("none"), 1000);
          $enviado.innerHTML = "";
        }, 1000)
      );
  });
}

hamburgerMenu(".panel-btn", ".menu1", ".navbar-menu li");

slider(".slider-slide1", ".next1", ".prev1", ".circle");
slider(".slider-slide2", ".next2", ".prev2", ".circle2");
slider(".slider-slide3", ".next3", ".prev3", ".circle2");

contactFormValidations();
