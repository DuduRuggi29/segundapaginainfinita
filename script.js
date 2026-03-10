document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(0, 102, 255, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(0, 102, 255, 0.1)';
        }
    });

    // 5. Interactive Generator Logic
    const btnGenerate = document.getElementById('btn-generate');
    const generatorForm = document.getElementById('generator-form');
    const resultArea = document.getElementById('result-area');
    const genStatus = document.querySelector('.generating-status');
    const blurredQuestion = document.querySelector('.blurred-question');
    
    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const banca = document.getElementById('select-banca').value;
            const nivel = document.getElementById('select-nivel').value;
            
            // Hide form and show result area
            generatorForm.classList.add('hidden');
            resultArea.classList.remove('hidden');
            genStatus.classList.remove('hidden');
            blurredQuestion.classList.add('hidden');
            
            // Update result tags
            document.getElementById('res-banca').textContent = banca;
            document.getElementById('res-nivel').textContent = `Nível: ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
            
            // Simulate IA processing
            setTimeout(() => {
                genStatus.classList.add('hidden');
                blurredQuestion.classList.remove('hidden');
            }, 2500);
        });
    }

    // 7. Interactive Feature Cards (3D Tilt & Spotlight)
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update Spotlight position
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            item.style.setProperty('--mouse-x', `${xPercent}%`);
            item.style.setProperty('--mouse-y', `${yPercent}%`);

            // 3D Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10; // Adjust for intensity
            const rotateY = (x - centerX) / 10;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
});
