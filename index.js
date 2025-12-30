document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const sidebar = document.querySelector(".sidebar");
    const body = document.body;
    const buttons = document.querySelectorAll(".sidebar-btn");

    // ✅ Toggle Sidebar
    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        body.classList.toggle("sidebar-open");
        if (!sidebar.classList.contains("active")) {
            closeAllDropdowns(); // Close dropdowns when sidebar closes
        }
    });

    // ✅ Close all dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll(".sidebar-dropdown").forEach(dropdown => {
            dropdown.style.maxHeight = null;
        });
    }

    // ✅ Dropdown toggle
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const dropdown = btn.nextElementSibling;

            if (!dropdown || !dropdown.classList.contains("sidebar-dropdown")) return;

            // If dropdown already open, close it
            if (dropdown.style.maxHeight) {
                dropdown.style.maxHeight = null;
            } else {
                // Close others first
                closeAllDropdowns();
                // Open this one
                dropdown.style.maxHeight = dropdown.scrollHeight + "px";
            }
        });
    });

    // ✅ Close sidebar if click outside
    document.addEventListener("click", (e) => {
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

    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    const thumbnail = document.getElementById("thumbnail");
    const closeBtn = document.querySelector(".close");

    // Open modal + go full-screen
    thumbnail.addEventListener("click", () => {
        modal.classList.add("show");
        modalImage.src = thumbnail.src;

        // Request full-screen if supported
        if (modal.requestFullscreen) {
            modal.requestFullscreen();
        } else if (modal.webkitRequestFullscreen) { // Safari
            modal.webkitRequestFullscreen();
        } else if (modal.msRequestFullscreen) { // IE11
            modal.msRequestFullscreen();
        }
    });

    // Close modal + exit full-screen
    function closeModal() {
        modal.classList.remove("show");

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js");
    }

});