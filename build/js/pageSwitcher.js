window.addEventListener('resize', function() {
	const src = window.location.href;
	if (window.innerWidth <= 767 && !src.includes('chat')) {
		window.location.href = './chat.html'; 
	}
});
