// Dark Mode Toggle
        function toggleMode() {
            const body = document.body;
            const toggleButton = document.querySelector('.mode-toggle');

            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                toggleButton.textContent = '☀️';
                toggleButton.classList.add('light');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                toggleButton.textContent = '🌙';
                toggleButton.classList.remove('light');
                localStorage.setItem('darkMode', 'disabled');
            }
        }

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            document.querySelector('.mode-toggle').textContent = '☀️';
            document.querySelector('.mode-toggle').classList.add('light');
        }

    // Menu Functionality
    document.addEventListener('DOMContentLoaded', function() {
      const menuBtn = document.getElementById('menuBtn');
      const sideMenu = document.getElementById('sideMenu');
      const overlay = document.getElementById('overlay');

      // Toggle menu
      menuBtn.addEventListener('click', function() {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('active');
      });

      // Close menu when clicking overlay
      overlay.addEventListener('click', function() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('active');
      });

      // Swipe to close functionality for touch devices
      let touchStartX = 0;
      let touchEndX = 0;

      document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, false);

      document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, false);

      function handleSwipe() {
        if (touchEndX < touchStartX - 50 && sideMenu.classList.contains('open')) {
          sideMenu.classList.remove('open');
          overlay.classList.remove('active');
        }
      }
    });

    // Swiping logic for both sliders
    const sliders = [document.getElementById("iframeSlider1"), document.getElementById("iframeSlider2")];

    sliders.forEach(slider => {
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener("mouseleave", () => {
        isDown = false;
      });

      slider.addEventListener("mouseup", () => {
        isDown = false;
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });

      slider.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener("touchend", () => {
        isDown = false;
      });

      slider.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
    }); 
