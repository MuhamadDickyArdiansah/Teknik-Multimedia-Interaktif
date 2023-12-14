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

    // Navigate to the page based on the button text
    window.location.href = '/' + pageClassName + '.html';
  }

