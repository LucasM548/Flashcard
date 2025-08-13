document.addEventListener('DOMContentLoaded', () => {

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
});