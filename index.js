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

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js");
    }

});