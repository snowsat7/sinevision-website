document.addEventListener('DOMContentLoaded', () => {

    // 1. Active Navigation Link Highlighting
    const navLinks = document.querySelectorAll('header nav a');
    // Handle potential trailing slash and ensure index.html is default
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === undefined) {
        currentPath = 'index.html';
    }

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        // Ensure comparison works even if href is just "index.html" or empty
        const effectiveLinkPath = (linkPath === '' || linkPath === undefined) ? 'index.html' : linkPath;

        if (effectiveLinkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure others are not active
        }
    });

    // 2. Intersection Observer for fade-in/slide-up animations
    const sections = document.querySelectorAll('.section, .hero-content'); // Target sections and hero content

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Add small delay for effect if desired
            const delay = entry.target.dataset.animationDelay || 0;

            if (entry.isIntersecting) {
                 setTimeout(() => {
                    entry.target.classList.add('visible');
                 }, parseInt(delay));
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Example: Add incremental delay to cards within a grid
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        const cards = grid.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.dataset.animationDelay = index * 100; // 100ms delay per card
            observer.observe(card); // Also observe cards if they aren't .section
        });
    });


    // Add more JS interactivity here if needed
    // e.g., handling a contact form, interactive charts, etc.

});