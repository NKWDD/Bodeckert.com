// Get the modal, image elements, and navigation buttons
var modal = document.getElementById("modal");
var modalImage = document.getElementById("modal-image");
var closeBtn = document.getElementsByClassName("close")[0];
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var modalWrapper = modal.querySelector('.modal-content-wrapper');

// Get all images inside .main-artwork
var images = document.querySelectorAll(".grid-container img, .artwork-image");

// Store the currently active image index
var currentIndex = -1;
var isAnimating = false;

// Function to open the modal with the selected image
function openModal(index) {
  modal.style.display = "flex";
  currentIndex = index;
  document.body.classList.add('modal-open');
  
  // Reset any previous animation classes
  modalWrapper.classList.remove('slide-out-left', 'slide-in-left', 'slide-out-right', 'slide-in-right');
  
  // Set the image and trigger entrance animation
  modalImage.src = images[index].src;
  modalWrapper.style.transform = 'translateX(100%)';
  
  requestAnimationFrame(() => {
    modalWrapper.style.transform = 'translateX(0)';
  });
}

// Function to change image with animation
function changeImage(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const nextIndex = direction === 'next' 
    ? (currentIndex + 1) % images.length 
    : (currentIndex - 1 + images.length) % images.length;

  // Set up the exit animation
  modalWrapper.style.transition = 'transform 0.5s ease-in-out';
  modalWrapper.style.transform = direction === 'next' 
    ? 'translateX(-100%)' 
    : 'translateX(100%)';

  // Wait for exit animation to complete
  setTimeout(() => {
    // Update image
    modalImage.src = images[nextIndex].src;
    
    // Set up entrance position
    modalWrapper.style.transition = 'none';
    modalWrapper.style.transform = direction === 'next' 
      ? 'translateX(100%)' 
      : 'translateX(-100%)';
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
      modalWrapper.style.transition = 'transform 0.5s ease-in-out';
      modalWrapper.style.transform = 'translateX(0)';
      currentIndex = nextIndex;
      
      // Reset animation flag after transition
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });
  }, 500);
}

// Event Listeners
images.forEach(function(image, index) {
  image.onclick = function(event) {
    event.preventDefault();
    openModal(index);
  };
});

closeBtn.onclick = function() {
  modalWrapper.style.transform = 'translateX(100%)';
  setTimeout(() => {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
    modalWrapper.style.transform = 'translateX(0)';
  }, 500);
};

window.onclick = function(event) {
  if (event.target == modal) {
    closeBtn.onclick();
  }
};

nextBtn.onclick = () => changeImage('next');
prevBtn.onclick = () => changeImage('prev');

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowRight") changeImage('next');
    if (e.key === "ArrowLeft") changeImage('prev');
    if (e.key === "Escape") closeBtn.onclick();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Get all the links in the navigation
  const links = document.querySelectorAll('.nav-link');

  // Function to remove 'active' class from all links
  function removeActiveClass() {
    links.forEach(link => {
      link.classList.remove('active');
    });
  }

  // Function to add 'active' class to the current link
  function setActiveLink() {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Remove the 'active' class from all links
    removeActiveClass();

    // Add 'active' class to the matching link
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath || link.getAttribute('href') === `.${currentPath}`) {
        link.classList.add('active');
      }
    });
  }

  // Set the active link when the page loads
  setActiveLink();

  // Update the active link when navigation occurs (if using dynamic navigation)
  window.addEventListener('popstate', setActiveLink);
});

