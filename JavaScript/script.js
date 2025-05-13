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
            const menuItems = document.querySelectorAll('.menu-item');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            // Set active menu item based on current page
            menuItems.forEach(item => {
                if (item.getAttribute('href') === currentPage) {
                    item.classList.add('active');
                }
            });

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

                // Form submission handler
        document.getElementById('ministryForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const form = e.target;
            const submitBtn = document.getElementById('submitBtn');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
            
            // Hide any previous messages
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('errorMessage').style.display = 'none';
            
            // Create a hidden iframe for submission
            const iframe = document.createElement('iframe');
            iframe.name = 'formTarget';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Set form target to the iframe
            form.target = 'formTarget';
            
            // Handle the load event of the iframe
            iframe.onload = function() {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Registration';
                
                // Show success message
                document.getElementById('ministryForm').style.display = 'none';
                document.getElementById('successMessage').style.display = 'block';
                
                // Remove the iframe after submission
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 3000);
            };
            
            // Submit the form
            form.submit();
        });

        // Populate date of birth field with a reasonable range
        document.addEventListener('DOMContentLoaded', function() {
            const dobInput = document.getElementById('dob');
            const today = new Date();
            const minDate = new Date();
            minDate.setFullYear(today.getFullYear() - 100); // 100 years ago
            const maxDate = new Date();
            maxDate.setFullYear(today.getFullYear() - 4); // At least 4 years old
            
            dobInput.min = minDate.toISOString().split('T')[0];
            dobInput.max = maxDate.toISOString().split('T')[0];
        });
