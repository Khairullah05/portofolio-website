// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  
  // Animate links
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
    }
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
});

// Animate Skills Progress Bars
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
  skillBars.forEach(skillBar => {
    const width = skillBar.style.width;
    skillBar.style.width = '0';
    setTimeout(() => {
      skillBar.style.width = width;
    }, 100);
  });
};

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      if (entry.target.classList.contains('skills-grid')) {
        animateSkills();
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-item, .skill-item, .education-item, .experience-item').forEach(el => {
  observer.observe(el);
});

// Form Handling
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Simple validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Here you would typically send the data to a server
  // For now, we'll just show a success message
  alert('Message sent successfully!');
  contactForm.reset();
});

// Add animation classes
const addAnimationClasses = () => {
  const elements = document.querySelectorAll('.service-item, .skill-item, .education-item, .experience-item');
  elements.forEach(el => {
    el.classList.add('fade-in');
  });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  addAnimationClasses();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .animate {
    opacity: 1;
    transform: translateY(0);
  }

  .service-item, .skill-item, .education-item, .experience-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .service-item.animate, .skill-item.animate, .education-item.animate, .experience-item.animate {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

// Education Section Animation
document.addEventListener('DOMContentLoaded', () => {
  const educationItems = document.querySelectorAll('.education-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  educationItems.forEach(item => {
    observer.observe(item);
  });

  // Add hover effect for achievements
  const achievements = document.querySelectorAll('.achievement');
  achievements.forEach(achievement => {
    achievement.addEventListener('mouseenter', () => {
      achievement.style.transform = 'scale(1.05)';
      achievement.style.transition = 'transform 0.3s ease';
    });
    
    achievement.addEventListener('mouseleave', () => {
      achievement.style.transform = 'scale(1)';
    });
  });
}); 
