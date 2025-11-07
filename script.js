document.addEventListener("DOMContentLoaded", () => {
  console.log("Real e-commerce JS loaded");

  const trendingContainer = document.querySelector(".trending-on-ebay .trending-items");
  if (trendingContainer) {
    async function loadTrendingProducts() {
      try {
        const data = await fetchProducts(6);
        trendingContainer.innerHTML = "";
        data.forEach((item) => {
          const card = document.createElement("a");
          card.href = "#";
          card.className = "trending-card fade-in";
          card.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <span>${item.title.slice(0, 20)}...</span>
        `;
          trendingContainer.appendChild(card);
        });
      } catch (error) {
        console.error("Failed to load trending products:", error);
        trendingContainer.innerHTML = "<p>Failed to load products.</p>";
      }
    }
    loadTrendingProducts();
  }

  const dealsGrid = document.querySelector(".today-deals .deals-grid");
  if (dealsGrid) {
    async function loadTodaysDeals() {
      try {
        const data = await fetchProducts(4); // Fetch 4 items for the grid
        dealsGrid.innerHTML = ''; // Clear existing content
        data.forEach(item => {
            const price = item.price.toFixed(2);
            const oldPrice = (price * 1.3).toFixed(2);
            const discount = "23% OFF";
    
            const card = document.createElement("div");
            card.className = "deal-card product-item fade-in";
            card.innerHTML = `
              <img src="${item.image}" alt="${item.title}">
              <div class="discount">${discount}</div>
              <p class="title">${item.title.slice(0, 40)}...</p>
              <p class="price">$${price} <del>$${oldPrice}</del></p>
            `;
            dealsGrid.appendChild(card);
        });
      } catch (error) {
        console.error("Failed to load today's deals:", error);
        dealsGrid.innerHTML = "<p>Failed to load deals.</p>";
      }
    }
    loadTodaysDeals();
  }

  const searchInput = document.querySelector('.search-area input[type="text"]');
  const searchBox = document.querySelector(".search-area");
  if (searchInput) {
    let suggestionBox = searchBox.querySelector(".suggestions");
    if (!suggestionBox) {
      suggestionBox = document.createElement("ul");
      suggestionBox.className = "suggestions";
      searchBox.appendChild(suggestionBox);
    }

    searchInput.addEventListener("input", async (e) => {
      const query = e.target.value.trim().toLowerCase();
      suggestionBox.innerHTML = "";

      if (query.length < 2) return; 

      try {
        const data = await fetchProducts(20);
        const results = data.filter((p) =>
        p.title.toLowerCase().includes(query)
      );

      results.slice(0, 5).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.title;
        li.onclick = () => {
          searchInput.value = item.title;
          suggestionBox.innerHTML = "";
        };
        suggestionBox.appendChild(li);
      });
      } catch (error) {
        console.error("Failed to fetch search suggestions:", error);
      }
    }); 

    document.addEventListener("click", (e) => {
      if (!searchBox.contains(e.target)) suggestionBox.innerHTML = "";
    });
  }

  // ====== HEADER SCROLL EFFECT ======
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".main-header");
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // ====== FADE-IN ANIMATION ======
  const fadeEls = document.querySelectorAll(".fade-in");
  window.addEventListener("scroll", () => {
    fadeEls.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85)
        el.classList.add("visible");
    });
  });

  // ====== HERO SLIDER ======
  const heroBanner = document.querySelector(".hero-banner .container");
  if (heroBanner) {
    const slides = heroBanner.querySelectorAll(".hero-slide");
    let currentSlide = 0;

    function showSlide() {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide();
    }

    showSlide(); // Initial display
    setInterval(nextSlide, 2000); // Change slide every 2 seconds
  }


  // ====== MOBILE NAV MENU ======
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (window.innerWidth < 900) {
        item.classList.toggle("active");
        const menu = item.querySelector(".mega-menu");
        if (menu) menu.classList.toggle("show");
      }
    });
  });
});
