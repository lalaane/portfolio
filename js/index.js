const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.hamburger');

navToggle.addEventListener('click', () => {
	document.body.classList.toggle('nav-open');
	burger.classList.toggle('hamburgerColor');
});

navLinks.forEach(link => {
	link.addEventListener('click', () => {
		document.body.classList.remove('nav-open');
	});
});

AOS.init({
  duration: 1200,
})
