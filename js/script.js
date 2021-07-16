const codeFront = document.querySelector('.codeFront');
const artFront = document.querySelector('.artFront');

artFront.addEventListener('mouseover', function () {
	const codeBack = document.querySelector('.codeBack');
	const artBack = document.querySelector('.artBack');

	artBack.style.background = '#222';
	codeBack.style.background = '#ddd';
});

codeFront.addEventListener('mouseover', function () {
	const codeBack = document.querySelector('.codeBack');
	const artBack = document.querySelector('.artBack');

	codeBack.style.background = '#222';
	artBack.style.background = '#ddd';
});
