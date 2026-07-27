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

    var filterBar   = document.getElementById("filterBar");
    var productList = document.getElementById("productList");
    var emptyState  = document.getElementById("emptyState");

    if (!filterBar || !productList) return;

    var buttons = filterBar.querySelectorAll(".filter-btn");
    var items   = productList.querySelectorAll(".product-item");

    filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;

        var category = btn.getAttribute("data-filter");
        filterProducts(category);

        buttons.forEach(function (b) {
            var active = b === btn;
            b.classList.toggle("is-active", active);
            b.setAttribute("aria-selected", active ? "true" : "false");
        });
    });

    function filterProducts(category) {
        var visibleCount = 0;

        items.forEach(function (item) {
            var matches = category === "all" || item.getAttribute("data-category") === category;
            item.style.display = matches ? "" : "none";
            if (matches) visibleCount++;
        });

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    }
});