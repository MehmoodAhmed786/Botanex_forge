document.addEventListener("DOMContentLoaded", function () {

    /* ---------- nav: scroll shadow ---------- */
    var siteNav = document.getElementById("siteNav");
    if (siteNav) {
        var onScroll = function () {
            siteNav.classList.toggle("nav-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---------- nav: mobile hamburger ---------- */
    var navToggle = document.getElementById("navToggle");
    var navLinks  = document.getElementById("navLinks");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            var isOpen = navLinks.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    /* ---------- nav: dropdown (tap on mobile, hover on desktop via CSS) ---------- */
    var dropdown = document.querySelector("#siteNav .dropdown");
    if (dropdown) {
        var dropbtn = dropdown.querySelector(".dropbtn");
        dropbtn.addEventListener("click", function (e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                dropdown.classList.toggle("dropdown-open");
            }
        });

        document.addEventListener("click", function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("dropdown-open");
            }
        });
    }
});