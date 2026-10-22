/**
 * FADHIL RAIHAN — EDITORIAL-TECH PORTFOLIO
 * Vanilla JavaScript for Multi-Page Navigation, Project Filtering, and Clipboard Utilities
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Highlight Active Navigation Item Based on Current Page URL
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    
    // Match current page
    if (href === currentPath || (currentPath === "" && href === "index.html") || (currentPath === "index.php" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 2. Mobile Navigation Auto-Collapse
  const navMenu = document.getElementById("navMenu");
  document.querySelectorAll("#navMenu .nav-link, #navMenu .btn").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("show") && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(navMenu) || new window.bootstrap.Collapse(navMenu);
        bsCollapse.hide();
      }
    });
  });

  // 3. Project Filter & Search System (for projects.html)
  const filterButtons = document.querySelectorAll(".btn-filter");
  const projectItems = document.querySelectorAll(".project-archive-item");
  const searchInput = document.getElementById("projectSearchInput");
  const noProjectsMsg = document.getElementById("noProjectsFound");

  let activeFilter = "all";
  let searchKeyword = "";

  const applyProjectFilters = () => {
    if (!projectItems.length) return;
    let visibleCount = 0;

    projectItems.forEach((item) => {
      const category = item.dataset.category || "";
      const textContent = (item.textContent || "").toLowerCase();

      const matchesCategory = activeFilter === "all" || category === activeFilter;
      const matchesSearch = !searchKeyword || textContent.includes(searchKeyword.toLowerCase());

      if (matchesCategory && matchesSearch) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (noProjectsMsg) {
      noProjectsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter || "all";
      applyProjectFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.trim();
      applyProjectFilters();
    });
  }

  // 4. Clipboard Utility for Contact Summary
  const copyButtons = document.querySelectorAll(".copy-contact-btn");
  const feedbackEls = document.querySelectorAll(".copy-feedback-msg");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.dataset.copy || "Fadhil Raihan | Junior Full-Stack Developer | Email: reyhanfadil555@gmail.com | Phone: +6283173775097 | GitHub: https://github.com/kenyongid | LinkedIn: https://www.linkedin.com/in/fadhil-raihan-f74/";
      try {
        await navigator.clipboard.writeText(textToCopy);
        feedbackEls.forEach((el) => {
          el.textContent = "✓ Professional contact summary copied to clipboard.";
          el.style.color = "var(--color-cobalt)";
        });
      } catch (err) {
        feedbackEls.forEach((el) => {
          el.textContent = "Unable to copy automatically. Please copy directly.";
          el.style.color = "#dc2626";
        });
      }

      setTimeout(() => {
        feedbackEls.forEach((el) => {
          el.textContent = "";
        });
      }, 4000);
    });
  });

  // 5. Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
