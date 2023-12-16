document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const correctCount = urlParams.get('correctCount');
  const incorrectCount = urlParams.get('incorrectCount');

  console.log('correctCount:', correctCount);
  console.log('incorrectCount:', incorrectCount);

  // Update nilai di halaman
  document.getElementById('correctCount').textContent = correctCount || 0;
  document.getElementById('incorrectCount').textContent = incorrectCount || 0;

});

function goToIndex(){
  window.location.href = 'index.html';
}
