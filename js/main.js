document.addEventListener('DOMContentLoaded', () => {

    // --- Données des dossiers de flashcards ---
    const decksDataTerminale = [
        {
            name: "Physique-Chimie - Terminale",
            price: "14,99",
            cardCount: 212,
            features: ["Flashcards", "Les 22 démonstrations exigibles au BAC", "Cours numérique rigoureux"],
            chapters: [
                "Rappels de première",
                "Transformation Acide-Base et pH",
                "Méthodes physiques d'Analyse : Spectroscopie UV-Visible ; Conductimétrie",
                "Méthodes Chimiques d'Analyse : Titrages pH-métrique et Conductimétrique",
                "Description d'un mouvement - Cinématique",
                "Deuxième loi de Newton",
                "Phénomènes caractéristiques des ondes",
                "Évolution d’un système chimique : cinétique chimique",
                "Physique chimique et sens d'évolution",
                "Équation du mouvement dans un champ uniforme",
                "Équilibre acido-basique - Force des acides et des bases",
                "Stratégies de synthèse en chimie organique",
                "Loi de Kepler",
                "Formation d'images avec une lunette astronomique",
                "Dynamique d'un système électrique : circuit RC",
                "Thermodynamique",
                "Radioactivité",
                "Forcer le sens d'évolution d'un système chimique",
                "Modélisation de l'écoulement d'un fluide",
                "Effet photoélectrique",
            ]
        },
        {
            name: "Mathématiques - Terminale",
            price: "14,99",
            cardCount: 170,
            features: ["Flashcards", "Les 16 démonstrations exigibles au BAC", "Cours numérique rigoureux"],
            chapters: [
                "Rappels de première",
                "Raisonnement par récurrence",
                "Dénombrement (1)",
                "Les Suites",
                "Géométrie dans l’espace (1ère partie)",
                "Fonction exponentielle",
                "Complément sur la dérivation",
                "Géométrie dans l'espace (2ème partie)",
                "Limites et asymptotes",
                "Loi binomiale",
                "Étude de fonction : continuité",
                "Logarithme Népérien",
                "Produit Scalaire dans l'Espace",
                "Primitives",
                "Équations différentielles",
                "Dénombrement (2)",
                "Fonctions cosinus et sinus",
                "Intégration et Aire",
                "Somme de variables aléatoires",
                "Inégalité de Bienaymé-Tchebychev",
            ]
        },
        {
            name: "Maths Expertes - Terminale",
            price: "7,99",
            cardCount: 47,
            features: ["Flashcards", "Cours numérique rigoureux"],
            chapters: [
                "Symboles mathématiques",
                "La logique et rédaction mathématique",
                "Divisibilité dans ℤ",
                "Nombres Complexe (Part. 1)",
                "Matrices",
                "Nombres Complexes (Part. 2)",
            ]
        },
        {
            name: "Histoire - Terminale",
            price: "9,99",
            cardCount: 80,
            features: ["Flashcards", "Cours numérique rigoureux"],
            chapters: [
                "L'impact de la crise de 1929 : déséquilibres économiques et sociaux",
                "Les régimes totalitaires",
                "La Seconde Guerre mondiale",
            ]
        }
    ];

    const decksDataPremiere = [
        {
            name: "Physique-Chimie - Première",
            price: "14,99",
            cardCount: 170,
            isLowerQuality: true,
            isUnderConstruction: true,
            features: ["Flashcards", "Cours numérique rigoureux", "TP", "Exercices + corrections"],
            chapters: []
        },
        {
            name: "Mathématiques - Première",
            price: "8,99",
            cardCount: 63,
            isLowerQuality: true,
            isUnderConstruction: true,
            features: ["Flashcards", "Cours numérique rigoureux", "TP", "Exercices + corrections"],
            chapters: []
        },
        {
            name: "Français - Première",
            price: "8,99",
            cardCount: 99,
            isLowerQuality: true,
            isUnderConstruction: true,
            features: ["Flashcards", "Méthodes"],
            chapters: []
        }
    ];

    // --- Fonction pour générer les cartes ---
    function createDeckElements(decks, containerId, idPrefix) {
        const container = document.getElementById(containerId);
        if (!container) return;

        decks.forEach((deck, index) => {
            const deckId = `${idPrefix}-${index}`;
            const deckElement = document.createElement('div');
            deckElement.className = 'deck-item';

            let note = '';
            if (deck.isUnderConstruction) {
                note = `<div class="note-construction">En construction</div>`;
            } else if (deck.isLowerQuality) {
                note = `<div class="note-lower-quality">Qualité inférieure</div>`;
            }

            const featuresHTML = deck.features
                ? `<ul class="deck-features">
                    ${deck.features.map(feature => `<li>${feature}</li>`).join('')}
                   </ul>`
                : '';

            const qualityNoteHTML = deck.isLowerQuality && !deck.isUnderConstruction
                ? `<div class="quality-note">Qualité légèrement inférieure (1ère édition)</div>`
                : '';

            deckElement.innerHTML = `
                ${note}
                <div class="deck-header">
                    <div>
                        <h4 class="deck-title">${deck.name}</h4>
                        <span class="deck-card-count">${deck.cardCount} flashcards</span>
                    </div>
                    <div class="deck-actions">
                        <button class="btn btn-secondary btn-toggle-chapters" data-deck-id="${deckId}" ${deck.isUnderConstruction ? 'disabled' : ''}>Voir les chapitres</button>
                        <button class="btn btn-primary btn-purchase" data-deck-name="${deck.name}" data-deck-price="${deck.price}" ${deck.isUnderConstruction ? 'disabled' : ''}>🛒 Acheter - ${deck.price}€</button>
                    </div>
                </div>
                ${featuresHTML}
                ${qualityNoteHTML}
                <ul class="chapters-list" id="chapters-${deckId}">
                    ${deck.chapters.map(chapter => `<li>${chapter}</li>`).join('')}
                </ul>
            `;
            container.appendChild(deckElement);
        });
    }

    // --- Génération des deux sections ---
    createDeckElements(decksDataTerminale, 'decks-list-terminale', 't');
    createDeckElements(decksDataPremiere, 'decks-list-premiere', 'p');

    // --- Gestion de l'événement pour dérouler les chapitres (fonctionne pour toute la page) ---
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-toggle-chapters')) {
            const button = event.target;
            const deckId = button.dataset.deckId;
            const chaptersList = document.getElementById(`chapters-${deckId}`);

            if (chaptersList) {
                chaptersList.classList.toggle('open');
                button.textContent = chaptersList.classList.contains('open')
                    ? 'Masquer les chapitres'
                    : 'Voir les chapitres';
            }
        }
    });

    // --- Logique du Modal d'Achat ---
    const modalOverlay = document.getElementById('purchase-modal');
    const purchaseForm = document.getElementById('purchase-form');
    const closeBtn = document.querySelector('.modal-close-btn');
    const deckNameInput = document.getElementById('form-deck-name');
    const deckPriceInput = document.getElementById('form-deck-price');

    if (modalOverlay) {
        const openModal = (deckName, deckPrice) => {
            deckNameInput.value = deckName;
            deckPriceInput.value = deckPrice;
            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.classList.add('active'), 10);
        };

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            setTimeout(() => modalOverlay.style.display = 'none', 300);
        };

        document.body.addEventListener('click', (event) => {
            const purchaseBtn = event.target.closest('.btn-purchase');
            if (purchaseBtn) {
                const deckName = purchaseBtn.dataset.deckName;
                const deckPrice = purchaseBtn.dataset.deckPrice;
                openModal(deckName, deckPrice);
            }
        });

        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });

        purchaseForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const submitButton = purchaseForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';

            const scriptURL = 'https://script.google.com/macros/s/AKfycbxVx_qVHq8CjXr8Gre5cl-IMUv3kk0ojgxHEozOvS5Pk59XEP_qtgM8sKeTpLZFBeE5nA/exec';

            const formData = new FormData(purchaseForm);
            const priceWithComma = formData.get('price');
            const priceWithDot = priceWithComma.replace(',', '.');
            formData.set('price', priceWithDot);

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    const modalContent = document.querySelector('.modal-content');

                    modalContent.innerHTML = `
                        <h3>Merci !</h3>
                        <p>Votre demande a été enregistrée. Cliquez sur le bouton ci-dessous pour finaliser votre commande.</p>
                        <a href="https://www.paypal.me/LucasM54/${priceWithDot}" target="_blank" class="btn btn-primary btn-paypal">
                            Payer ${priceWithDot}€ avec PayPal
                        </a>
                        <p style="margin-top: 20px; font-size: 0.9rem;">Vous recevrez l'accès par email après confirmation du paiement.</p>
                        <button class="btn btn-secondary" onclick="location.reload()" style="margin-top:10px;">Fermer</button>
                    `;
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    const modalContent = document.querySelector('.modal-content');
                    modalContent.innerHTML = `
                        <h3>Erreur</h3>
                        <p>Une erreur est survenue. Veuillez réessayer ou me contacter directement.</p>
                        <button class="btn btn-secondary" onclick="location.reload()">Fermer</button>
                    `;
                });
        });
    }

    // --- Effet 3D Hero Image (Individual Cards) ---
    const heroCards = document.querySelectorAll('.hero-card');
    const maxRotate = 8; // A bit more subtle for individual cards

    heroCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const { width, height } = rect;
            const middleX = width / 2;
            const middleY = height / 2;

            const offsetX = (x - middleX) / middleX;
            const offsetY = (y - middleY) / middleY;

            const rotateY = offsetX * maxRotate;
            const rotateX = -1 * offsetY * maxRotate;

            window.requestAnimationFrame(() => {
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
                card.style.zIndex = '2';
            });
        });

        card.addEventListener('mouseleave', () => {
            window.requestAnimationFrame(() => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
                card.style.zIndex = '1';
            });
        });
    });

    // --- Testimonials Slider Logic ---
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
    if (sliderContainer) {
        sliderContainer.innerHTML = '';

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.classList.add('testimonial-card');

            let gradesHTML = `
                <p>Maths: <span>${testimonial.grades.math}</span></p>
                <p>Physique: <span>${testimonial.grades.physics}</span></p>
                <p>Maths Expertes: <span>${testimonial.grades.mathExpert}</span></p>
                <p>Bac Maths: <span class=\"highlight-grade\">${testimonial.grades.bacMath}</span></p>
                <p>Bac Physique: <span class=\"highlight-grade\">${testimonial.grades.bacPhysics}</span></p>
            `;

            card.innerHTML = `
                <div class=\"testimonial-header\">
                    <div class=\"testimonial-author\">
                        <h4>${testimonial.name}</h4>
                        <span>${testimonial.school}</span>
                    </div>
                </div>
                <p class=\"testimonial-quote\">\"${testimonial.quote}\"</p>
                <div class=\"testimonial-grades\">
                    <h5>Résultats</h5>
                    ${gradesHTML}
                </div>
            `;
            sliderContainer.appendChild(card);
        });

        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const slider = document.querySelector('.testimonials-slider');
        function scrollSlider(direction) {
            if (!slider) return;
            const cardWidth = slider.querySelector('.testimonial-card').offsetWidth;
            const gap = parseInt(getComputedStyle(slider).gap) || 30;
            const scrollAmount = cardWidth + gap;

            slider.scrollLeft += direction * scrollAmount;
        }

        nextBtn.addEventListener('click', () => {
            scrollSlider(1); // Scroll vers la droite
        });

        prevBtn.addEventListener('click', () => {
            scrollSlider(-1); // Scroll vers la gauche
        });
    }
});
