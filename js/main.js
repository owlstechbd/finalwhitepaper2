let player;

// Variable to store the name of the clicked button
let clickedButtonName = "";

// Select all elements with the class 'openPopup' and add event listeners to each
document.querySelectorAll(".openPopup").forEach(function (element) {
  element.addEventListener("click", function () {
    // Capture the button name from the data attribute
    clickedButtonName = element.getAttribute("data-button-name");

    // Set the hidden input field value
    document.getElementById("buttonName").value = clickedButtonName;

    // Display the popup form
    document.getElementById("popupForm").style.display = "flex";
  });
});

// Close button within the popup
document
  .querySelector(".popup-content .close-button")
  .addEventListener("click", function () {
    document.getElementById("popupForm").style.display = "none";
  });

// Close the popup when clicking outside the popup content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("popupForm")) {
    document.getElementById("popupForm").style.display = "none";
  }
});

// Declare player variable in the global scope

// This function creates an <iframe> and YouTube player after the API code downloads.
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("youtubePlayer", {
//     height: "390", // Adjust as needed
//     width: "640", // Adjust as needed
//     videoId: "90s_m3A0pDs", // Replace with your YouTube Video ID
//     playerVars: {
//       autoplay: 0, // Autoplay disabled initially
//       controls: 1,
//       mute: 1, // Start muted to allow autoplay if needed
//     },
//     events: {
//       onStateChange: onPlayerStateChange,
//     },
//   });
// }

document.addEventListener("DOMContentLoaded", function () {
  // Select all forms with the shared class "form" (update your HTML to use class="form" for the forms)
  const forms = document.querySelectorAll(".form");

  // Attach submit event listener to each form
  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission

      try {
        const formData = new FormData(form); // Collect form data

        // Send data to the server
        const response = await fetch("smtp.php", {
          method: "POST",
          body: formData,
        });

        // Parse JSON response
        const data = await response.json();

        if (data.status === "success") {
          // Redirect to the thank-you page upon success
          window.location.href = "thankyou.html";
        } else {
          // Show error message for failed submission
          alert(data.message || "There was an error. Please try again.");
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Submission error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    });
  });
});

// Handle YouTube player state changes
// function onPlayerStateChange(event) {
//   if (event.data === YT.PlayerState.ENDED) {
//     // Close video popup and open share popup
//     const sharePopup = document.querySelector(".share-popup");
//     if (sharePopup) {
//       sharePopup.classList.remove("hidden");
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form1");

//   // Handle form submission
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(form);

//     fetch("smtp.php", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status == "success") {
//           // Close the popup form
//           document.getElementById("popupForm").style.display = "none";

//           // Open the PDF in the same tab
//           window.location.href = "/original.pdf";
//         } else {
//           alert("There was an error. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Select all forms with the shared class "form1"
  const forms = document.querySelectorAll(".form1");

  // Attach submit event listener to each form
  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission

      try {
        const formData = new FormData(form); // Collect form data

        // Send data to the server
        const response = await fetch("smtp.php", {
          method: "POST",
          body: formData,
        });

        // Parse JSON response
        const data = await response.json();

        if (data.status === "success") {
          // Redirect to the thank-you page upon success
          window.location.href = "/original.pdf";
        } else {
          // Show error message for failed submission
          alert(data.message || "There was an error. Please try again.");
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Submission error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    });
  });
});
