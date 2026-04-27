// Course Data
const courses = [
    {
        id: 1,
        title: "Introduction to Mathematics",
        category: "elementary",
        description: "Learn fundamental math concepts including numbers, operations, and basic geometry.",
        icon: "📚",
        duration: "8 weeks"
    },
    {
        id: 2,
        title: "English Language Basics",
        category: "elementary",
        description: "Build reading and writing skills with interactive lessons and exercises.",
        icon: "📖",
        duration: "10 weeks"
    },
    {
        id: 3,
        title: "Science Fundamentals",
        category: "elementary",
        description: "Explore the wonders of science through experiments and visual learning.",
        icon: "🔬",
        duration: "12 weeks"
    },
    {
        id: 4,
        title: "Advanced Mathematics",
        category: "secondary",
        description: "Master algebra, geometry, and trigonometry for higher education.",
        icon: "🧮",
        duration: "14 weeks"
    },
    {
        id: 5,
        title: "History and Social Studies",
        category: "secondary",
        description: "Understand world history, cultures, and social systems.",
        icon: "🗺️",
        duration: "12 weeks"
    },
    {
        id: 6,
        title: "Digital Literacy",
        category: "skills",
        description: "Learn essential computer skills and digital tools for modern work.",
        icon: "💻",
        duration: "6 weeks"
    },
    {
        id: 7,
        title: "Web Development Basics",
        category: "skills",
        description: "Start your coding journey with HTML, CSS, and JavaScript.",
        icon: "🌐",
        duration: "16 weeks"
    },
    {
        id: 8,
        title: "Environmental Science",
        category: "secondary",
        description: "Understand ecosystems, climate, and sustainable development.",
        icon: "🌍",
        duration: "10 weeks"
    },
    {
        id: 9,
        title: "Professional Communication",
        category: "skills",
        description: "Develop public speaking, writing, and presentation skills.",
        icon: "🎤",
        duration: "8 weeks"
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadCourses('all');
    animateCounter('learners-count', 2500000, 2000);
    animateCounter('courses-count', 150, 1500);
    animateCounter('countries-count', 195, 1800);
    animateCounter('certificates-count', 450000, 2200);
});

// Load and display courses
function loadCourses(filter) {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';

    let filteredCourses = courses;
    if (filter !== 'all') {
        filteredCourses = courses.filter(course => course.category === filter);
    }

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-header">${course.icon}</div>
            <div class="course-content">
                <span class="course-category">${capitalizeFirst(course.category)}</span>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">⏱️ ${course.duration}</span>
                    <span class="enroll-link" onclick="showEnrollmentForm()">Enroll →</span>
                </div>
            </div>
        `;
        container.appendChild(courseCard);
    });

    // Animate course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Filter courses
function filterCourses(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load filtered courses
    loadCourses(category);
}

// Capitalize first letter
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show enrollment modal
function showEnrollmentForm() {
    document.getElementById('enrollmentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('enrollmentModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle enrollment form submission
function handleEnrollment(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const interest = form.elements[2].value;

    // Validate form
    if (!name || !email || !interest) {
        alert('Please fill out all fields');
        return;
    }

    // Show success message
    const originalContent = form.innerHTML;
    form.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--success-color);">
            <p style="font-size: 2rem; margin-bottom: 1rem;">✓</p>
            <h3>Welcome to EduConnect!</h3>
            <p style="color: var(--text-light); margin-top: 1rem;">
                A confirmation email has been sent to ${email}. 
                Start learning today!
            </p>
            <button type="button" onclick="closeModal()" style="
                margin-top: 1.5rem;
                padding: 0.8rem 2rem;
                background-color: var(--primary-color);
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
            ">Close</button>
        </div>
    `;

    // Reset form after 3 seconds
    setTimeout(() => {
        closeModal();
        form.innerHTML = originalContent;
        form.reset();
    }, 3000);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animate counter numbers
function animateCounter(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const increment = targetValue / (duration / 16);
    let currentValue = 0;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
        }
        element.textContent = Math.floor(currentValue).toLocaleString();
    }, 16);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('enrollmentModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href.substring(1));
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Observe elements for scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe problem cards and feature cards
document.querySelectorAll('.problem-card, .feature-card, .course-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    observer.observe(element);
});

// Animate progress bars on scroll
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stats-section').forEach(element => {
    progressObserver.observe(element);
});
