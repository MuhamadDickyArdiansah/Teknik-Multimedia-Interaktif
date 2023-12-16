document.addEventListener("DOMContentLoaded", function() {
    var videos = document.querySelectorAll('.video-container video');
    var index = 0;

    function playVideoWithDelay(videoIndex, delay) {
        setTimeout(function() {
            videos[videoIndex].style.display = 'block';
            videos[videoIndex].play();

            videos[videoIndex].addEventListener('ended', function() {
                videos[videoIndex].style.display = 'none';
                index++;
                if (index < videos.length) {
                    playVideoWithDelay(index, 3000); // Delay before playing the next video
                }
            });
        }, delay);
    }

    // Hide all videos initially
    videos.forEach(function(video) {
        video.style.display = 'none';
    });

    // Start displaying videos after a delay
    setTimeout(function() {
        playVideoWithDelay(0, 5000); // Start playing the first video after a delay
    }, 5000); // Initial delay before showing the first video

    // Function to start videos immediately
    window.startVideos = function() {
        videos[index].style.display = 'block';
        videos[index].play();
    };

    // Function to stop videos immediately
    window.stopVideos = function() {
        videos.forEach(function(video) {
            video.style.display = 'none';
            video.pause();
        });
    };
});