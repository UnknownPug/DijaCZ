// Wrap the JavaScript code in an event listener
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the buttons
    const addButton = document.getElementById('add-doc');
    const deleteSelectedButton = document.getElementById('delete-selected');
    const deleteAllButton = document.getElementById('delete-all');

    // Add click event listener to the "Add new Document" button
    addButton.addEventListener('click', addNewDocument);

    // Add click event listener to the "Delete Document" button
    deleteSelectedButton.addEventListener('click', deleteSelectedDocuments);

    // Add click event listener to the "Delete all documents selected" button
    deleteAllButton.addEventListener('click', deleteAllSelectedDocuments);

    // Add a delegated event listener for the file input change event
    document.addEventListener('change', function (event) {
        const target = event.target;
        if (target && target.matches('.file-input')) {
            const card = target.closest('.card');
            if (card) {
                if (card.classList.contains('new-card')) {
                    // Clear the value of the file input in the new card
                    target.value = '';
                }
                updatePlaceholder(card, target);
            }
        }
    });

// Function to delete selected documents
    function deleteSelectedDocuments() {
        // Get all the checkboxes for document deletion
        const checkboxes = document.querySelectorAll('input[name="delete-button"]:checked');
        if (checkboxes.length === 1) {
            // Show confirmation dialog
            const confirmDelete = confirm("Are you sure you want to delete the selected documents?");
            if (confirmDelete) {
                // Remove the parent card of each selected checkbox
                checkboxes.forEach((checkbox) => {
                    const card = checkbox.closest('.card');
                    card.remove();
                });
            }
        } else {
            // Add a disabled class to visually disable the button
            alert("You can only delete one document.");
            deleteSelectedButton.classList.add('disabled');
        }
    }

    // Function to delete all selected documents
    function deleteAllSelectedDocuments() {
        // Get all the checkboxes for document deletion
        const checkboxes = document.querySelectorAll('input[name="delete-button"]:checked');
        if (checkboxes.length > 1) {
            // Show confirmation dialog
            const confirmDelete = confirm("Are you sure you want to delete all selected documents?");
            if (confirmDelete) {
                // Remove the parent card of each selected checkbox
                checkboxes.forEach((checkbox) => {
                    const card = checkbox.closest('.card');
                    card.remove();
                });
            }
        } else {
            // Add a disabled class to visually disable the button
            alert("You can delete several selected documents.");
            deleteAllButton.classList.add('disabled');
        }
    }
});

// Function to add a new document
function addNewDocument() {
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
}

// Function to update the image placeholder for a specific card
function updatePlaceholder(card, input) {
    const placeholder = card.querySelector('.placeholder');
    if (input.files && input.files[0]) {
        placeholder.textContent = input.files[0].name;
    } else {
        placeholder.textContent = "No file chosen";
    }
}