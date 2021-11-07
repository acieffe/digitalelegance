function screenshot(img, technologies) {
	const techSplit = technologies.split(',');
	var tech = [];

	techSplit.forEach((element) => {
		if (element == 'html') {
			tech.push('&#xe636');
		} else if (element == 'css') {
			tech.push('&#xe649');
		} else if (element == 'bootstrap') {
			tech.push('&#xe647');
		} else if (element == 'javascript') {
			tech.push('&#xe681');
		} else if (element == 'npm') {
			tech.push('&#xe61e');
		} else if (element == 'react') {
			tech.push('&#xe6ba');
		} else if (element == 'nodejs') {
			tech.push('&#xe618');
		} else if (element == 'github') {
			tech.push('&#xe609');
		} else if (element == 'dontnet') {
			tech.push('&#xe67f');
		} else if (element == 'mongodb') {
			tech.push('&#xe6a4');
		} else if (element == 'firebase') {
			tech.push('&#xe687');
		} else if (element == 'php') {
			tech.push('&#xe63d');
		} else if (element == 'postgres') {
			tech.push('&#xe66e');
		} else if (element == 'mysql') {
			tech.push('&#xe604');
		} else if (element == 'heroku') {
			tech.push('&#xe67b');
		}
	});

	document.getElementById('screenshot').src = `../img/${img}.png`;
	document.getElementById('technologies').innerHTML = `${tech.join(' ')}`;
}
