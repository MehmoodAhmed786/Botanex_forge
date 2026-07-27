// JavaScript code to handle the review popup and background blur
document.addEventListener("DOMContentLoaded", function () {
    const reviewItems = document.querySelectorAll(".review-item");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-review-content");
    const closeModalButton = document.querySelector(".close");

    // Function to open the modal with the clicked review
    reviewItems.forEach(item => {
        item.addEventListener("click", function () {
            const reviewText = item.getAttribute("data-review");
            modalContent.textContent = reviewText;
            modal.style.display = "flex"; // Show the modal
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        });
    });

    // Close modal when the close button is clicked
    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal
        document.body.style.overflow = "auto"; // Enable scrolling again
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
        const reviewsContainer = document.querySelector(".reviews-container");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    const scrollAmount = 250; // Pixels to scroll per click

    leftArrow.addEventListener("click", () => {
        reviewsContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
        reviewsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});
