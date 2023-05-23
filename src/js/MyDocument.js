function updatePlaceholder(input) {
    let placeholder = document.getElementById("placeholder");
    if (input.files && input.files[0]) {
        placeholder.textContent = input.files[0].name;
    } else {
        placeholder.textContent = "No file chosen";
    }
}

let selectCheckbox = document.getElementById('select-checkbox');
let selectableDiv = document.getElementById('selectable-div');

selectCheckbox.addEventListener('change', function() {
    selectableDiv.classList.toggle('selected', this.checked);
});

