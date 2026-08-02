// ^ Write your JavaScript code here
var scrollBtn = document.querySelector("#scrollBtn");
var themeBtn = document.querySelector("#theme-toggle-button");
var html = document.documentElement;
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav-links a");
var filterBtns = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");
var carousel = document.querySelector("#testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var indicators = document.querySelectorAll(".carousel-indicator");
var nextBtn = document.querySelector("#next-testimonial");
var prevBtn = document.querySelector("#prev-testimonial");
var settingsBtn = document.querySelector("#settings-toggle");
var sidebar = document.querySelector("#settings-sidebar");
var closeBtn = document.querySelector("#close-settings");
var colorsGrid = document.querySelector("#theme-colors-grid");
var fontBtns = document.querySelectorAll(".font-option");
var resetBtn = document.getElementById("reset-settings");

var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  html.classList.add("dark");
}
themeBtn.addEventListener("click", function () {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light",
  );
});

window.addEventListener("scroll", function () {
  var currentScroll = window.scrollY;
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    if (
      currentScroll >= sectionTop - 100 &&
      currentScroll < sectionTop + sectionHeight - 100
    ) {
      var currentSection = section.getAttribute("id");
      navLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY >= 600) {
    scrollBtn.classList.remove("invisible", "opacity-0");
    scrollBtn.classList.add("visible", "opacity-100");
  } else {
    scrollBtn.classList.remove("visible", "opacity-100");
    scrollBtn.classList.add("invisible", "opacity-0");
  }
});
scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (btn) {
      btn.classList.remove(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    });
    this.classList.add(
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );
    this.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    var filter = this.getAttribute("data-filter");
    portfolioItems.forEach(function (item) {
      var category = item.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

settingsBtn.addEventListener("click", function () {
  sidebar.classList.remove("translate-x-full");
  settingsBtn.classList.add("move-btn");
});
closeBtn.addEventListener("click", function () {
  sidebar.classList.add("translate-x-full");
  settingsBtn.classList.remove("move-btn");
});
document.addEventListener("click", function (e) {
  if (!sidebar.contains(e.target) && !settingsBtn.contains(e.target)) {
    sidebar.classList.add("translate-x-full");
    settingsBtn.classList.remove("move-btn");
  }
});
var themes = [
  {
    primary: "#6366F1",
    secondary: "#8B5CF6",
    accent: "#7C3AED",
  },
  {
    primary: "#EC4899",
    secondary: "#F97316",
    accent: "#FB7185",
  },
  {
    primary: "#10B981",
    secondary: "#14B8A6",
    accent: "#059669",
  },
  {
    primary: "#3B82F6",
    secondary: "#0EA5E9",
    accent: "#38BDF8",
  },
  {
    primary: "#F43F5E",
    secondary: "#FB7185",
    accent: "#EF4444",
  },
  {
    primary: "#F59E0B",
    secondary: "#FB8500",
    accent: "#EA580C",
  },
];
var savedColor = localStorage.getItem("colorTheme");
if (savedColor !== null ) {
  var savedColorTheme = themes[savedColor];

  document.documentElement.style.setProperty(
    "--color-primary",
    savedColorTheme.primary,
  );

  document.documentElement.style.setProperty(
    "--color-secondary",
    savedColorTheme.secondary,
  );

  document.documentElement.style.setProperty(
    "--color-accent",
    savedColorTheme.accent,
  );
}
themes.forEach(function (theme, index) {
  colorsGrid.innerHTML += `

    <button
      class="color-option rounded-full shadow"
      data-color="${index}"
      style="background: linear-gradient(45deg,${theme.primary}, ${theme.secondary})"
    ></button>

  `;
});
var colorBtns = document.querySelectorAll(".color-option");
if (savedColor !== null) {
  colorBtns[savedColor].classList.add("active");
}
colorBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var index = this.getAttribute("data-color");
    var selectedTheme = themes[index];
    document.documentElement.style.setProperty(
      "--color-primary",
      selectedTheme.primary,
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      selectedTheme.secondary,
    );

    document.documentElement.style.setProperty(
      "--color-accent",
      selectedTheme.accent,
    );
    localStorage.setItem("colorTheme", index);
    colorBtns.forEach(function (btn) {
      btn.classList.remove("active");
    });

    this.classList.add("active");
  });
});
var savedFont = localStorage.getItem("font");
if (savedFont) {
  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );

  document.body.classList.add("font-" + savedFont);

  fontBtns.forEach(function (btn) {
    btn.classList.remove("active");
    btn.setAttribute("aria-checked", "false");

    if (btn.getAttribute("data-font") === savedFont) {
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
    }
  });
}
fontBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var font = this.getAttribute("data-font");

    document.body.classList.remove(
      "font-alexandria",
      "font-tajawal",
      "font-cairo",
    );

    document.body.classList.add("font-" + font);

    localStorage.setItem("font", font);

    fontBtns.forEach(function (btn) {
      btn.classList.remove("active");
      btn.setAttribute("aria-checked", "false");
    });

    this.classList.add("active");
    this.setAttribute("aria-checked", "true");
  });
});
resetBtn.addEventListener("click", function () {
  var defaultTheme = themes[0];

  document.documentElement.style.setProperty(
    "--color-primary",
    defaultTheme.primary,
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    defaultTheme.secondary,
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    defaultTheme.accent,
  );

  colorBtns.forEach(function (btn) {
    btn.classList.remove("active");
  });

  colorBtns[0].classList.add("active");

  localStorage.setItem("colorTheme", 0);

  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );
  document.body.classList.add("font-tajawal");
  var tajawalBtn = document.querySelector('[data-font="tajawal"]');
  fontBtns.forEach(function (btn) {
    btn.classList.remove("active");
    btn.setAttribute("aria-checked", "false");
  });
  tajawalBtn.classList.add("active");
  tajawalBtn.setAttribute("aria-checked", "true");

  localStorage.setItem("font", "tajawal");
});

var currentIndex = 0;
showSlide();
function getCardsPerView() {
  if (window.innerWidth < 639) {
    return 1;
  }
  if (window.innerWidth < 1024) {
    return 2;
  }
  return 3;
}
function showSlide() {
  var cardsPerView = getCardsPerView();
  carousel.style.transform = `translateX(${(currentIndex * 100) / cardsPerView}%)`;
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}
window.addEventListener("resize", function () {
  showSlide();
});
function getMaxSlides() {
  return cards.length - getCardsPerView();
}
nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex > getMaxSlides()) {
    currentIndex = 0;
  }
  showSlide();
});
prevBtn.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = getMaxSlides();
  }
  showSlide();
});
indicators.forEach(function (indicator) {
  indicator.addEventListener("click", function () {
    currentIndex = Number(this.getAttribute("data-index"));

    showSlide();
  });
});
