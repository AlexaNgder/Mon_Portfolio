// --- LOGIQUE JAVASCRIPT ULTRA-OPTIMISÉE ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Matrix "Eco" (Moins de colonnes, caractères fixes)
    const matrixContainer = document.getElementById('matrix-container');
    if (matrixContainer) {
        const width = window.innerWidth;
        const cols = Math.floor(width / 40); // Espacement doublé (40px)
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+'.split('');
        const frag = document.createDocumentFragment();
        
        for(let i=0; i<cols; i++){
            const div = document.createElement('div');
            div.className = 'matrix-char';
            div.textContent = chars[Math.floor(Math.random() * chars.length)];
            div.style.left = (i * 40) + 'px';
            div.style.animationDuration = (Math.random() * 10 + 5) + 's';
            div.style.fontSize = (Math.random() * 10 + 10) + 'px';
            frag.appendChild(div);
        }
        matrixContainer.appendChild(frag);
    }

    // 2. Preloader Simple
    const preloader = document.getElementById('preloader');
    const percentTxt = document.getElementById('loader-percentage');
    if (preloader && percentTxt) {
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            percentTxt.textContent = p + '%';
            if(p >= 100) {
                clearInterval(interval);
                preloader.classList.add('preloader-explode');
                setTimeout(() => preloader.classList.add('preloader-hidden'), 600);
            }
        }, 16);
    }

    // 3. Typing Effect Factory
    function createTypeWriter(elementId, phrases) {
        const textElement = document.getElementById(elementId);
        if (!textElement) return;
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; 
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; 
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; 
            }

            setTimeout(type, typingSpeed);
        }
        type();
    }

    // Init Typing Effects
    createTypeWriter('typing-text', [
        "Futur Ingénieur Informatique & Réseaux", 
        "Transformer la théorie en solutions concrètes"
    ]);
    
    createTypeWriter('typing-contact', [
        "Prêt à collaborer ?", 
        "Discutons de votre projet",
        "Disponible Septembre 2026"
    ]);

    // 4. Scroll Logic (Barre + BackToTop)
    const progressBar = document.getElementById('scroll-progress');
    const backBtn = document.getElementById('back-to-top');
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if(!ticking) {
            window.requestAnimationFrame(() => {
                const scroll = window.scrollY;
                const height = document.documentElement.scrollHeight - window.innerHeight;
                
                if(progressBar) progressBar.style.width = (scroll / height * 100) + '%';
                
                if(backBtn) {
                    if(scroll > 300) backBtn.classList.remove('opacity-0', 'invisible');
                    else backBtn.classList.add('opacity-0', 'invisible');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 5. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobMenu = document.getElementById('mobile-menu');
    if(menuBtn && mobMenu) {
        const toggle = () => {
            mobMenu.classList.toggle('opacity-0');
            mobMenu.classList.toggle('invisible');
        };
        menuBtn.onclick = toggle;
        mobMenu.querySelectorAll('a').forEach(a => a.onclick = toggle);
    }

    // 6. Smooth Scroll 750ms Vanilla JS
    document.querySelectorAll('.js-scrollTo').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 750;
                let start = null;

                window.requestAnimationFrame(step);

                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    // Easing swing-like
                    const t = progress / duration;
                    const ease = (t) => 0.5 - Math.cos(t * Math.PI) / 2;
                    
                    const currentProgress = Math.min(progress / duration, 1);
                    const easeValue = ease(currentProgress);
                    
                    window.scrollTo(0, startPosition + distance * easeValue);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
            }
        });
    });

    // 7. Curseur PC Uniquement
    if (window.matchMedia("(pointer: fine)").matches) {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        let mx=0, my=0, ox=0, oy=0;
        
        // Dot moves instantly
        window.addEventListener('mousemove', e => { 
            mx=e.clientX; my=e.clientY; 
            if(dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
        }, { passive: true });
        
        // Outline follows smoothly
        function loop() {
            ox += (mx - ox) * 0.15;
            oy += (my - oy) * 0.15;
            if(outline) outline.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%,-50%)`;
            requestAnimationFrame(loop);
        }
        loop();

        // Hover triggers
        document.querySelectorAll('.hover-trigger, a, button').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    // 8. Scroll Reveal Observer (CONSERVÉ)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
});