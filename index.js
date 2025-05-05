document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
    });
  });
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active navigation link on scroll
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  
  // Change header background on scroll
  const header = document.querySelector('.header');
  
  function updateHeaderBackground() {
    if (window.scrollY > 20) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'transparent';
      header.style.boxShadow = 'none';
    }
  }
  
  window.addEventListener('scroll', updateHeaderBackground);
  
  // Form validation for contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
      });
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validate form
      let isValid = true;
      
      if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
      }
      
      if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
      }
      
      if (company.length < 2) {
        document.getElementById('companyError').textContent = 'Company must be at least 2 characters';
        isValid = false;
      }
      
      if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
        isValid = false;
      }
      
      if (isValid) {
        // In a real implementation, this would send data to a server
        // For this demo, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      }
    });
  }
  
  // Form validation for newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error message
      document.getElementById('newsletterError').textContent = '';
      
      // Get email value
      const email = document.getElementById('newsletterEmail').value.trim();
      
      // Validate email
      if (!validateEmail(email)) {
        document.getElementById('newsletterError').textContent = 'Please enter a valid email address';
      } else {
        // In a real implementation, this would send data to a server
        // For this demo, we'll just show an alert
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      }
    });
  }
  
  // Helper function to validate email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  // Add number counters for statistics
  function animateNumbers() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    statsNumbers.forEach(number => {
      const finalValue = parseFloat(number.textContent);
      let startValue = 0;
      const duration = 2000; // 2 seconds
      const increment = finalValue / (duration / 16); // 60 FPS
      
      function updateNumber() {
        if (startValue < finalValue) {
          startValue += increment;
          if (startValue > finalValue) {
            startValue = finalValue;
          }
          
          // Check if it's an integer or has decimal places
          if (Number.isInteger(finalValue)) {
            number.textContent = Math.floor(startValue);
          } else {
            number.textContent = startValue.toFixed(1);
          }
          
          // Add the + or % symbol if it was there
          if (number.textContent.indexOf('+') > -1) {
            number.textContent = Math.floor(startValue) + '+';
          } else if (number.textContent.indexOf('%') > -1) {
            number.textContent = startValue.toFixed(1) + '%';
          }
          
          requestAnimationFrame(updateNumber);
        }
      }
      
      // Start the animation when the element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateNumber();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(number);
    });
  }
  
  // Wait a bit before starting animations to ensure the page is fully loaded
  setTimeout(animateNumbers, 500);
});