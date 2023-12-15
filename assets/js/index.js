function toggleMusic() {
  var volumeIcon = document.getElementById("volumeIcon");

  if (volumeIcon.classList.contains("fa-volume-up")) {
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-slash");
  } else {
    volumeIcon.classList.remove("fa-volume-slash");
    volumeIcon.classList.add("fa-volume-up");
  }
}

var buttonTextElement = document.getElementById("buttonText");
  var buttonOptions = ["OR", "AND", "XOR", "NOT", "NOR", "NAND", "XNOR"];
  var currentIndex = 1; // Index of the current button text

  function changeText(direction) {

    if (direction === 'up') {
      currentIndex = (currentIndex + 1) % buttonOptions.length;
      buttonTextElement.style.transform = "translateY(-100%)";
    } else if (direction === 'down') {
      buttonTextElement.style.transform = "translateY(100%)";
      currentIndex = (currentIndex - 1 + buttonOptions.length) % buttonOptions.length;
    }

    // buttonTextElement.style.transform = "translateY(100%)";
    setTimeout(function () {
      buttonTextElement.textContent = buttonOptions[currentIndex];
      buttonTextElement.style.transform = "translateY(0)";
    }, 500); // The duration of the transition in milliseconds
  }

  function changePage() {
    var buttonText = buttonTextElement.textContent.toLowerCase();
    var pageClassName = buttonText.replace(/\s+/g, '-'); // Convert spaces to dashes for class name
  
    // Get the current path and remove the current filename
    var currentPath = window.location.pathname;
    var newPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  
    // Navigate to the page based on the button text inside the current folder
    window.location.href = newPath + pageClassName + '.html';
  }
  
  function toggleMusic() {
    var audio = document.getElementById("myAudio");
    if (audio.paused) {
      audio.play();
      document.getElementById("volumeIcon").classList.remove("fa-volume-up");
      document.getElementById("volumeIcon").classList.add("fa-volume-off");
    } else {
      audio.pause();
      document.getElementById("volumeIcon").classList.remove("fa-volume-off");
      document.getElementById("volumeIcon").classList.add("fa-volume-up");
    }
  }

  function toggleText() {
    var toggleIcon = document.getElementById("toggleIcon");
    if (toggleIcon.classList.contains("fad") && toggleIcon.classList.contains("fa-font")) {
      // Show text mode, change icon to 'hide text'
      toggleIcon.classList.remove("fad", "fa-font");
      toggleIcon.classList.add("fas", "fa-eye-slash");
      // Lakukan tindakan lainnya saat teks ditampilkan
      // Misalnya, tampilkan teks yang disembunyikan sebelumnya
    } else {
      // Hide text mode, change icon to 'show text'
      toggleIcon.classList.remove("fas", "fa-eye-slash");
      toggleIcon.classList.add("fad", "fa-font");
      // Lakukan tindakan lainnya saat teks disembunyikan
      // Misalnya, sembunyikan teks yang sebelumnya ditampilkan
    }
  }

  function toggleVideo() {
    var toggleIcon = document.getElementById("playIcon");
    var videoFrame = document.getElementById("videoFrame");

    if (toggleIcon.classList.contains("fal") && toggleIcon.classList.contains("fa-video")) {
      // Show video mode
      toggleIcon.classList.remove("fal", "fa-video");
      toggleIcon.classList.add("far", "fa-video-slash");
      videoFrame.style.display = "none"; // Sembunyikan video
    } else {
      // Hide video mode
      toggleIcon.classList.remove("far", "fa-video-slash");
      toggleIcon.classList.add("fal", "fa-video");
      videoFrame.style.display = "block"; // Tampilkan video
    }
  }
  
  

