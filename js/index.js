const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const burger = document.querySelector('.hamburger');
const arrow = document.querySelector('.arrow');
const rootElement = document.documentElement;

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
});

window.onscroll = function () {
	scrollFunction();
};

const scrollFunction = () => {
	let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
	if (rootElement.scrollTop / scrollTotal > 0.8) {
		arrow.classList.add('arrowShow');
	} else {
		arrow.classList.remove('arrowShow');
	}
};
