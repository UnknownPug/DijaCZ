// Define a namespace for the application
const MyApp = {};

// Document module
MyApp.DocumentModule = (function () {

    // Function to update the file placeholder for a specific card
    function updatePlaceholder(event) {
        const fileInput = event.target;
        const card = fileInput.closest('.card');
        const placeholder = card.querySelector('.placeholder');

        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                // Display the file name and show the image preview
                placeholder.textContent = file.name;
            });

            // Read the file as data URL
            reader.readAsDataURL(file);
        } else {
            placeholder.textContent = 'No file chosen';
        }
    }

    // Function to save card data to LocalStorage
    function saveCardData(card) {
        const cardId = card.dataset.cardId;
        const inputs = card.querySelectorAll('input, select');
        const cardData = {};
        inputs.forEach((input) => {
            cardData[input.id] = input.value;
        });
        localStorage.setItem(`card-${cardId}`, JSON.stringify(cardData));
    }

    // Function to delete card data from LocalStorage
    function deleteCardData(card) {
        const cardId = card.dataset.cardId;
        localStorage.removeItem(`card-${cardId}`);
    }

    // Function to delete a card and update the URL
    function deleteCardAndUpdateURL(card, remainingDocuments) {
        deleteCardData(card); // Delete card data from LocalStorage
        card.remove();

        // Update the URL with the new card count using the History API
        const state = {cardCount: remainingDocuments - 1};
        const url = `?cardCount=${remainingDocuments - 1}`;
        history.pushState(state, '', url);
    }

    // Function to validate document fields
    function validateDocFields(card) {
        const docNumInput = card.querySelector('#doc-num');
        const docExpInput = card.querySelector('#doc-exp');
        const docNumValue = docNumInput.value;
        const docExpValue = docExpInput.value;

        // Reset border colors to default
        docNumInput.style.borderColor = '';
        docExpInput.style.borderColor = '';

        if (docNumValue.trim() === '' || !docNumValue.startsWith('#')) {
            docNumInput.style.borderColor = 'red';
            card.style.borderColor = 'red';
        }

        const docExpDate = new Date(docExpValue);
        const minDate = new Date('1952-01-01');
        const maxDate = new Date('2050-01-01');

        if (
            docExpValue.trim() === '' ||
            docExpDate < minDate ||
            docExpDate > maxDate
        ) {
            docExpInput.style.borderColor = 'red';
            card.style.borderColor = 'red';
        }

        // Check if any input fields have red border color
        const inputs = card.querySelectorAll('input');
        let hasInvalidFields = false;
        inputs.forEach((input) => {
            if (input.style.borderColor === 'red') {
                hasInvalidFields = true;
            }
        });

        // Check if any previous documents have information
        const previousCards = document.querySelectorAll('.card');
        let hasPreviousData = false;
        previousCards.forEach((previousCard) => {
            if (previousCard !== card) {
                const previousDocNumInput = previousCard.querySelector('#doc-num');
                const previousDocNumValue = previousDocNumInput.value;
                if (previousDocNumValue.trim() !== '') {
                    hasPreviousData = true;
                }
            }
        });

        // Change the border color of the HTML code
        const htmlCode = document.querySelector('.html-code');
        if (hasInvalidFields || !hasPreviousData) {
            htmlCode.style.borderColor = 'red';
        } else {
            htmlCode.style.borderColor = '';
        }
    }

    // Function to load card data from LocalStorage
    function loadCardData(card) {
        const cardId = card.dataset.cardId;
        const cardData = localStorage.getItem(`card-${cardId}`);
        if (cardData) {
            const inputs = card.querySelectorAll('input, select');
            const parsedData = JSON.parse(cardData);
            inputs.forEach((input) => {
                input.value = parsedData[input.id] || '';
            });

            // Validate the document fields after loading card data
            validateDocFields(card);
        }
    }

    // Function to reset card data and borders
    function resetCardData(card) {
        // Reset the input fields in the card
        const inputs = card.querySelectorAll('input');
        inputs.forEach((input) => {
            input.value = '';
            input.style.borderColor = 'black'; // Set border color to black
        });

        // Reset the select element in the card
        const select = card.querySelector('select');
        select.selectedIndex = 0;
        select.style.borderColor = 'black'; // Set border color to black

        // Reset the placeholder for the image input in the card
        const fileInput = card.querySelector('.file-input');
        fileInput.value = '';
        const placeholder = card.querySelector('.placeholder');
        placeholder.textContent = 'No file chosen';
        fileInput.style.borderColor = 'black'; // Set border color to black

        // Uncheck the checkbox in the card
        const checkbox = card.querySelector('input[name="delete-button"]');
        checkbox.checked = false;

        // Reset the checkbox label color in the card
        const checkboxLabel = card.querySelector('.btn-group label');
        checkboxLabel.classList.remove('active');
    }


    // Public methods
    return {
        // Function to delete selected documents
        deleteSelectedDocuments: function () {
            // Get all the checkboxes for document deletion
            const checkboxes = document.querySelectorAll('input[name="delete-button"]:checked');
            const remainingDocuments = document.querySelectorAll('.card').length;

            if (remainingDocuments <= 1) {
                alert('You must have at least one document remaining.');
                return;
            }

            if (checkboxes.length === 1) {
                // Show confirmation dialog
                const confirmDelete = confirm('Are you sure you want to delete the selected document?');
                if (confirmDelete) {
                    // Remove the parent card of each selected checkbox
                    checkboxes.forEach((checkbox) => {
                        const card = checkbox.closest('.card');
                        deleteCardAndUpdateURL(card, remainingDocuments);
                    });
                }
            } else {
                // Add a disabled class to visually disable the button
                alert('You can only delete one document.');
                MyApp.ButtonModule.disableButton('delete-selected');
            }
        },

        // Function to delete all selected documents
        deleteAllSelectedDocuments: function () {
            // Get all the checkboxes for document deletion
            const checkboxes = document.querySelectorAll('input[name="delete-button"]:checked');
            const totalDocuments = document.querySelectorAll('.card').length;
            const selectedDocuments = checkboxes.length;
            const remainingDocuments = totalDocuments - selectedDocuments;

            if (remainingDocuments < 1) {
                alert('You must have at least one document remaining.');
                return;
            }

            // Show confirmation dialog
            if (checkboxes.length > 1) {
                const confirmDelete = confirm('Are you sure you want to delete all selected documents?');
                if (confirmDelete) {
                    // Remove the parent card of each selected checkbox
                    checkboxes.forEach((checkbox) => {
                        const card = checkbox.closest('.card');
                        deleteCardAndUpdateURL(card, remainingDocuments);
                    });
                }
            } else {
                alert('You must select at least two documents.');
                MyApp.ButtonModule.disableButton('delete-all');
            }
        },

        // Function to add a new document
        addNewDocument: function () {
            // Clone the card element
            const cardClone = document.querySelector('.card').cloneNode(true);

            // Get the total number of existing cards
            const cards = document.querySelectorAll('.card');
            // Update the dataset attribute with the new card ID
            cardClone.dataset.cardId = String(cards.length + 1);

            // Reset the input fields in the cloned card
            const inputs = cardClone.querySelectorAll('input');
            inputs.forEach((input) => {
                input.value = '';
            });

            // Reset the select element in the cloned card
            const select = cardClone.querySelector('select');
            select.selectedIndex = 0;

            // Reset the placeholder for the image input in the cloned card
            const fileInput = cardClone.querySelector('.file-input');
            fileInput.value = '';
            const placeholder = cardClone.querySelector('.placeholder');
            placeholder.textContent = 'No file chosen';

            // Uncheck the checkbox in the cloned card
            const checkbox = cardClone.querySelector('input[name="delete-button"]');
            checkbox.checked = false;

            // Reset the checkbox label color in the cloned card
            const checkboxLabel = cardClone.querySelector('.btn-group label');
            checkboxLabel.classList.remove('active');

            // Add the cloned card to the card-grid container
            const cardGrid = document.querySelector('.card-grid');
            cardGrid.appendChild(cardClone);

            // Save card data to LocalStorage
            saveCardData(cardClone);

            // Update the URL with the new card count using the History API
            const remainingDocuments = cards.length + 1;
            const state = {cardCount: remainingDocuments};
            const url = `?cardCount=${remainingDocuments}`;
            history.pushState(state, '', url);

            // Add event listeners for file input change event and card data saving
            const fileInputClone = cardClone.querySelector('.file-input');
            fileInputClone.addEventListener('change', updatePlaceholder);
            fileInputClone.addEventListener('change', function () {
                saveCardData(cardClone);
            });

            // Add event listener for validating the document fields
            const docNumInput = cardClone.querySelector('#doc-num');
            const docExpInput = cardClone.querySelector('#doc-exp');

            docNumInput.addEventListener('blur', function () {
                validateDocFields(cardClone);
            });

            docExpInput.addEventListener('blur', function () {
                validateDocFields(cardClone);
            });

            // Reset the data and borders in the cloned card
            resetCardData(cardClone);
            validateDocFields(cardClone);
            // Load card data from LocalStorage
            loadCardData(cardClone);

            // Validate the document fields in the cloned card
            validateDocFields(cardClone);

            docNumInput.addEventListener('blur', function () {
                validateDocFields(cardClone);
            });

            docExpInput.addEventListener('blur', function () {
                validateDocFields(cardClone);
            });

            // Reset the data and borders in the cloned card
            resetCardData(cardClone);

            // Append the cloned card to the card-grid container
            cardGrid.appendChild(cardClone);
        },
        // Function to validate document fields
        updatePlaceholder: updatePlaceholder
    };
})();

// Button module
    MyApp.ButtonModule = (function () {
        // Private variables and functions

        // Public methods
        return {
            // Function to disable a button by id
            disableButton: function (buttonId) {
                const button = document.getElementById(buttonId);
                button.classList.add('disabled');
            },
        };
    })();

// Wrap the JavaScript code in an event listener
    document.addEventListener('DOMContentLoaded', function () {
        // Get references to the buttons
        const addButton = document.getElementById('add-doc');
        const deleteSelectedButton = document.getElementById('delete-selected');
        const deleteAllButton = document.getElementById('delete-all');

        // Add click event listener to the "Add new Document" button
        addButton.addEventListener('click', MyApp.DocumentModule.addNewDocument);

        // Add click event listener to the "Delete Document" button
        deleteSelectedButton.addEventListener('click', MyApp.DocumentModule.deleteSelectedDocuments);

        // Add click event listener to the "Delete all documents selected" button
        deleteAllButton.addEventListener('click', MyApp.DocumentModule.deleteAllSelectedDocuments);

        // Add event listener for file input change event
        const fileInput = document.getElementById('doc-img');

        fileInput.addEventListener('change', MyApp.DocumentModule.updatePlaceholder);

        // Drag and Drop functionality
        const cardGrid = document.querySelector('.card-grid');

        cardGrid.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', event.target.dataset.cardId);
        });

        cardGrid.addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        cardGrid.addEventListener('drop', function (event) {
            event.preventDefault();
            const cardId = event.dataTransfer.getData('text/plain');
            const card = document.querySelector(`[data-card-id="${cardId}"]`);
            const targetCard = event.target.closest('.card');
            if (targetCard) {
                cardGrid.insertBefore(card, targetCard);
            } else {
                cardGrid.appendChild(card);
            }
        });

        // Initialize the application
        MyApp.DocumentModule.init();
    });
