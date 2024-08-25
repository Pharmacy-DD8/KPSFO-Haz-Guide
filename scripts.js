// Get the modals
var modal = document.getElementById("itemModal");
var largeImageModal = document.getElementById("largeImageModal");

// Get the <span> elements that close the modals
var closeModal = document.getElementsByClassName("close")[0];
var closeLargeImageModal = document.getElementsByClassName("large-image-close")[0];

// Function to open the modal
function openModal(itemTitle, itemDescription, itemPrice, itemImage, tools) {
    document.getElementById("modalTitle").innerText = itemTitle;
    document.getElementById("modalDescription").innerText = ""; // Clear the item description text
    document.getElementById("modalPrice").innerText = itemPrice;
    document.getElementById("modalImage").src = itemImage;
    document.getElementById("toolsList").innerHTML = tools;
    modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x) or outside the modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to open large image modal
function openLargeImageModal(imageSrc) {
    document.getElementById("largeImage").src = imageSrc;
    largeImageModal.style.display = "block";
}

// Close the large image modal when the user clicks on <span> (x) or outside the modal
closeLargeImageModal.onclick = function() {
    largeImageModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == largeImageModal) {
        largeImageModal.style.display = "none";
    }
}

// Add event listeners to each item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        const title = item.querySelector('h3').innerText;
        const description = item.querySelector('p').innerText;
        const price = item.querySelector('.item-details p:last-child').innerText;
        const image = item.querySelector('img').src;
        
        // Define tools for each category
        let tools = "";
        if (item.closest('#regular-tubing')) {
            tools = `
                <div class="tool">Vial Spike<img src="images/Tools/Vial Spike.png" alt="Vial Spike"></div>
                <div class="tool">Syringe Adapter<img src="images/Tools/Syringe Adapter.png" alt="Syringe Adapter"></div>
                <div class="tool">Phaseal Optima<img src="images/Tools/Phaseal Optima.png" alt="Phaseal Optima"></div>
                <div class="tool">Bag Spike<img src="images/Tools/Bag Spike.png" alt="Bag Spike"></div>
                <div class="tool">Regular Tubing<img src="images/Tools/Regular Tubing.png" alt="Regular Tubing"></div>
            `;
        } else if (item.closest('#filtered-tubing')) {
            tools = `
                <div class="tool">Vial Spike<img src="images/Tools/Vial Spike.png" alt="Vial Spike"></div>
                <div class="tool">Syringe Adapter<img src="images/Tools/Syringe Adapter.png" alt="Syringe Adapter"></div>
                <div class="tool">Phaseal Optima<img src="images/Tools/Phaseal Optima.png" alt="Phaseal Optima"></div>
                <div class="tool">Bag Spike<img src="images/Tools/Bag Spike.png" alt="Bag Spike"></div>
                <div class="tool">0.2 Micron Filtered Tubing<img src="images/Tools/0.2 Micron Filtered Tubing.png" alt="0.2 Micron Filtered Tubing"></div>
            `;
        } else if (item.closest('#sq-im-syringe')) {
            tools = `
                <div class="tool">Vial Spike<img src="images/Tools/Vial Spike.png" alt="Vial Spike"></div>
                <div class="tool">Syringe Adapter<img src="images/Tools/Syringe Adapter.png" alt="Syringe Adapter"></div>
                <div class="tool">Phaseal Optima<img src="images/Tools/Phaseal Optima.png" alt="Phaseal Optima"></div>
                <div class="tool">Texium Connector<img src="images/Tools/Texium Connector.png" alt="Texium Connector"></div>

            `;
        }

        openModal(title, description, price, image, tools);
    });
});

// Search functionality with category hiding
document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    let foundMatch = false;

    document.querySelectorAll('section.featured-items').forEach(section => {
        let hasVisibleItems = false;

        section.querySelectorAll('.item').forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase();
            if (title.includes(searchValue)) {
                item.style.display = ''; // Show item
                hasVisibleItems = true;
            } else {
                item.style.display = 'none'; // Hide item
            }
        });

        // Show or hide the section based on if it has visible items
        if (hasVisibleItems) {
            section.style.display = ''; // Show section
            foundMatch = true;
        } else {
            section.style.display = 'none'; // Hide section
        }
    });

    // If no items match, show all sections
    if (!foundMatch && searchValue === '') {
        document.querySelectorAll('section.featured-items').forEach(section => {
            section.style.display = ''; // Show section
        });
        document.querySelectorAll('.item').forEach(item => {
            item.style.display = ''; // Show item
        });
    }
});
