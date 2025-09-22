

  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');

  videoModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
    const videoSrc = button.getAttribute('data-video-src');
    modalVideo.src = videoSrc;
  });

  videoModal.addEventListener('hidden.bs.modal', () => {
    modalVideo.pause();
    modalVideo.src = ''; // Stop video when modal closes
  });


  
