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
        }
    }

    // Function to delete card data from LocalStorage
    function deleteCardData(card) {
        const cardId = card.dataset.cardId;
        localStorage.removeItem(`card-${cardId}`);
    }

    // Public methods
    return {
        // Function to delete selected documents
        deleteSelectedDocuments: function () {
            // Get all the checkboxes for document deletion
            const checkboxes = document.querySelectorAll('input[name="delete-button"]:checked');
            if (checkboxes.length === 1) {
                // Show confirmation dialog
                const confirmDelete = confirm('Are you sure you want to delete the selected document?');
                if (confirmDelete) {
                    // Remove the parent card of each selected checkbox
                    checkboxes.forEach((checkbox) => {
                        const card = checkbox.closest('.card');
                        deleteCardData(card); // Delete card data from LocalStorage
                        card.remove();
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
            if (checkboxes.length > 1) {
                // Show confirmation dialog
                const confirmDelete = confirm('Are you sure you want to delete all selected documents?');
                if (confirmDelete) {
                    // Remove the parent card of each selected checkbox
                    checkboxes.forEach((checkbox) => {
                        const card = checkbox.closest('.card');
                        deleteCardData(card); // Delete card data from LocalStorage
                        card.remove();
                    });
                }
            } else {
                // Add a disabled class to visually disable the button
                alert('You can delete several selected documents.');
                MyApp.ButtonModule.disableButton('delete-all');
            }
        },

        // Function to add a new document
        addNewDocument: function () {
            // Clone the card element
            const cardClone = document.querySelector('.card').cloneNode(true);

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

            // Add event listeners for file input change event and card data saving/loading
            fileInput.addEventListener('change', MyApp.DocumentModule.updatePlaceholder);
            cardClone.addEventListener('change', function (event) {
                saveCardData(event.target.closest('.card'));
            });
            cardClone.addEventListener('DOMContentLoaded', function (event) {
                loadCardData(event.target.closest('.card'));
            });
        },

        updatePlaceholder: updatePlaceholder,
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
});
