document.addEventListener("DOMContentLoaded", () => {
    const heroTitle = document.querySelector('.hero-title');
    const overlayImages = document.querySelectorAll('.overlay-image');

   
    gsap.fromTo(heroTitle, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: "power3.out" }
    );
    
    gsap.fromTo(overlayImages, 
        { opacity: 0, scale: 0.9 },
        { opacity: 0.3, scale: 1, duration: 1.5, delay: 1, ease: "power3.out", stagger: 0.3 }
    );

   
    overlayImages.forEach((image) => {
        image.addEventListener('mouseenter', () => {
           
            overlayImages.forEach((otherImage) => {
                if (otherImage !== image) {
                    otherImage.classList.add('vector-like');
                }
            });

            
            gsap.to(image, { opacity: 1, scale: 1.1, filter: 'none', duration: 0.3 });

            heroTitle.classList.add('hovered');

            const followMouse = (e) => {
                const rect = image.getBoundingClientRect();
                const moveX = (e.clientX - rect.left - rect.width / 2) * 0.1;
                const moveY = (e.clientY - rect.top - rect.height / 2) * 0.1;

                gsap.to(image, {
                    x: moveX,
                    y: moveY,
                    duration: 0.1,
                    ease: "power1.out"
                });
            };

           
            image.addEventListener('mousemove', followMouse);

            
            image.addEventListener('mouseleave', () => {
                
                image.removeEventListener('mousemove', followMouse);
                gsap.to(image, { x: 0, y: 0, opacity: 0.3, scale: 1, duration: 0.3 });

            
                overlayImages.forEach((otherImage) => {
                    otherImage.classList.remove('vector-like');
                });

               
                heroTitle.classList.remove('hovered');
            });
        });
    });
});
