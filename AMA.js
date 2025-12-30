document.addEventListener("DOMContentLoaded", () => {
    // --------------------------
    // SIDEBAR TOGGLE + DROPDOWNS
    // --------------------------
    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const body = document.body;
    const buttons = document.querySelectorAll(".sidebar-btn");

    // Toggle sidebar
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        body.classList.toggle("sidebar-open");
        if (!sidebar.classList.contains("active")) closeAllDropdowns();
    });

    // Close all sidebar dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll(".sidebar-dropdown").forEach(dropdown => {
            dropdown.style.maxHeight = null;
        });
    }

    // Sidebar dropdown toggle
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const dropdown = btn.nextElementSibling;
            if (!dropdown || !dropdown.classList.contains("sidebar-dropdown")) return;

            if (dropdown.style.maxHeight) {
                dropdown.style.maxHeight = null;
            } else {
                closeAllDropdowns();
                dropdown.style.maxHeight = dropdown.scrollHeight + "px";
            }
        });
    });

    // Close sidebar if click outside
    document.addEventListener("click", e => {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            sidebar.classList.remove("active");
            body.classList.remove("sidebar-open");
            closeAllDropdowns();
        }
    });

    // --------------------------
    // INFO BUTTONS (MODAL / TOOLTIP / INFO BOX)
    // --------------------------
    const infoButtons = document.querySelectorAll(".info-button");

    function toggleModal(modal) {
        if (!modal) return;
        modal.classList.toggle("show");
        document.body.style.overflow = modal.classList.contains("show") ? "hidden" : "";
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function toggleTooltip(tooltip) {
        if (!tooltip) return;
        tooltip.classList.toggle("show");
        document.querySelectorAll(".info-box.tooltip").forEach(t => {
            if (t !== tooltip) t.classList.remove("show");
        });
    }

    function toggleInfo(infoBox) {
        if (!infoBox) return;
        infoBox.classList.toggle("show");
        document.querySelectorAll(".info-box:not(.tooltip)").forEach(box => {
            if (box !== infoBox) box.classList.remove("show");
        });
    }

    // Attach info button events
    infoButtons.forEach(btn => {
        const targetId = btn.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        btn.addEventListener("click", () => {
            if (targetEl.classList.contains("modal-overlay")) toggleModal(targetEl);
            else if (targetEl.classList.contains("tooltip")) toggleTooltip(targetEl);
            else toggleInfo(targetEl);
        });

        btn.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (targetEl.classList.contains("modal-overlay")) toggleModal(targetEl);
                else if (targetEl.classList.contains("tooltip")) toggleTooltip(targetEl);
                else toggleInfo(targetEl);
            }
        });
    });

    // Close modal on overlay click or close button
    document.querySelectorAll(".modal-overlay").forEach(modal => {
        modal.addEventListener("click", e => {
            if (e.target === modal) closeModal(modal);
        });
        const closeBtn = modal.querySelector(".modal-close");
        if (closeBtn) closeBtn.addEventListener("click", () => closeModal(modal));
    });

    // Close everything on Escape key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            document.querySelectorAll(".modal-overlay.show").forEach(modal => closeModal(modal));
            document.querySelectorAll(".info-box.show").forEach(box => box.classList.remove("show"));
        }
    });

    // Clicking outside tooltips/info boxes closes them
    document.addEventListener("click", e => {
        if (!e.target.closest(".info-wrapper")) {
            document.querySelectorAll(".info-box.show").forEach(box => box.classList.remove("show"));
        }
    });

    // --------------------------
    // TABLE OF CONTENTS (TOC)
    // --------------------------
    const tocBtn = document.querySelector(".table-of-contents-btn");
    const tocContent = document.querySelector(".table-of-contents-content");
    const tocDropdowns = document.querySelectorAll(".toc-dropdown");

    // 1️⃣ Toggle the whole TOC
    tocBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        tocContent.style.display =
            tocContent.style.display === "block" ? "none" : "block";
    });

    // 2️⃣ Toggle dropdowns, close others
    const tocButtons = document.querySelectorAll(".toc-btn");
    tocButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const dropdown = btn.nextElementSibling;

            tocDropdowns.forEach((d) => {
                if (d !== dropdown) d.classList.remove("show");
            });

            dropdown.classList.toggle("show");
        });
    });

    // 3️⃣ Close TOC when clicking outside
    document.addEventListener("click", () => {
        tocContent.style.display = "none";
        tocDropdowns.forEach((d) => d.classList.remove("show"));
    });

    // 4️⃣ Close TOC when a link inside a dropdown is clicked
    tocDropdowns.forEach((dropdown) => {
        dropdown.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                tocContent.style.display = "none";
                tocDropdowns.forEach((d) => d.classList.remove("show"));
            });
        });
    });

    let calcScrollValue = () => {
        let scrollProgress = document.getElementById("progress");
        let pos = document.documentElement.scrollTop;
        let calcHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollValue = Math.round((pos * 100) / calcHeight);

        // Show/hide button after 100px
        if (pos > 100) {
            scrollProgress.style.display = "grid";
        } else {
            scrollProgress.style.display = "none";
        }

        // Update circle background only (arrow stays)
        scrollProgress.style.background = `conic-gradient(#5e63ff ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;

        // Scroll back to top smoothly
        scrollProgress.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    };

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js");
    }

    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;


});
