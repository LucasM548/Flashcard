document.addEventListener('DOMContentLoaded', () => {
    const testimonials = [
        {
            name: "Lucas M.",
            school: "Lycée Jean-Zay, Jarny",
            grades: {
                math: "18.2/20",
                physics: "17/20",
                mathExpert: "15.4/20",
                bacMath: "16/20",
                bacPhysics: "17/20"
            },
            quote: "Les flashcards m'ont permis de consolider mes connaissances et d'aborder le bac en toute sérénité. Un outil indispensable !"
        },
        {
            name: "Théo F.",
            school: "Lycée Jean-Zay, Jarny",
            grades: {
                math: "19/20",
                physics: "18/20",
                mathExpert: "19/20",
                bacMath: "20/20",
                bacPhysics: "19/20"
            },
            quote: "Une méthode de révision incroyablement efficace. J'ai gagné un temps précieux et mes notes ont grimpé en flèche."
        },
        {
            name: "Thomas B.",
            school: "Lycée Jean-Zay, Jarny",
            grades: {
                math: "17/20",
                physics: "19/20",
                mathExpert: "18/20",
                bacMath: "18/20",
                bacPhysics: "20/20"
            },
            quote: "Grâce à ces flashcards, j'ai pu réviser de manière ludique et ciblée. Je recommande à tous les lycéens !"
        },
    ];

    const sliderContainer = document.querySelector('.testimonials-slider');
    if (!sliderContainer) return;

    sliderContainer.innerHTML = '';

    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.classList.add('testimonial-card');

        let gradesHTML = `
            <p>Maths: <span>${testimonial.grades.math}</span></p>
            <p>Physique: <span>${testimonial.grades.physics}</span></p>
            <p>Maths Expertes: <span>${testimonial.grades.mathExpert}</span></p>
            <p>Bac Maths: <span class="highlight-grade">${testimonial.grades.bacMath}</span></p>
            <p>Bac Physique: <span class="highlight-grade">${testimonial.grades.bacPhysics}</span></p>
        `;

        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-author">
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.school}</span>
                </div>
            </div>
            <p class="testimonial-quote">"${testimonial.quote}"</p>
            <div class="testimonial-grades">
                <h5>Résultats</h5>
                ${gradesHTML}
            </div>
        `;
        sliderContainer.appendChild(card);
    });

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.testimonial-card');
    const slider = document.querySelector('.testimonials-slider');
    let currentIndex = 0;

    function getVisibleCardsCount() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function updateSlider() {
        if (cards.length === 0) return;

        const visibleCards = getVisibleCardsCount();
        const totalCards = cards.length;

        if (currentIndex > totalCards - visibleCards) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = totalCards - visibleCards;
        }

        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(slider).gap) || 30;
        const offset = currentIndex * (cardWidth + gap);
        
        slider.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCardsCount();
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        currentIndex = 0; 
        updateSlider();
    });

    updateSlider();
});
