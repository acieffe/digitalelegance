<?php
if (isset($_POST['Email'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "ace@digitalelegance.com";
    $email_subject = "New contact form submission";

    function problem($error)
    {
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br><br>";
        echo $error . "<br><br>";
        echo "Please go back and fix these errors.<br><br>";
        die();
    }

    // validation expected data exists
    if (
        !isset($_POST['Name']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Message'])
    ) {
        problem('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $name = $_POST['Name']; // required
    $email = $_POST['Email']; // required
    $message = $_POST['Message']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email)) {
        $error_message .= 'The Email address you entered does not appear to be valid.<br>';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if (!preg_match($string_exp, $name)) {
        $error_message .= 'The Name you entered does not appear to be valid.<br>';
    }

    if (strlen($message) < 2) {
        $error_message .= 'The Message you entered do not appear to be valid.<br>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: " . clean_string($name) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Message: " . clean_string($message) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
?>

    <!-- include your success message below -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Digital Elegance | Fine Code | Messege Sent</title>
		<!-- Required meta tags -->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <link rel="shortcut icon" href="/finecode/img/favicon.ico" type="image/x-icon">

		<!-- Bootstrap CSS -->
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
			crossorigin="anonymous"
		/>

		<link href="/finecode/css/all.css" rel="stylesheet">
		<link rel="stylesheet" href="/finecode/css/style.css" />
	</head>

	<body>
		<!-- NAVBAR -->
		<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-gold border-gold" id="mainNavbar">
			<div class="container-fluid">
				<!-- Navbar Logo -->
				<div class="ps-2">
					<a href="/index.html" class="navbar-brand header-logo"><span class="font-raleway text-black">Digital</span>Elegance</a>
				</div>
				<button
					class="navbar-toggler border-gold"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<!-- Navbar Links -->
				<div class="collapse navbar-collapse flex-grow-1 text-right" id="navbarNavDropdown">
					<ul class="navbar-nav ms-auto flex-nowrap mb-md-0">
						
						<!-- Link - Home -->
						<li class="nav-item px-3 px-lg-0">
							<a class="nav-link active" aria-current="page" id="homeLink" href="#home"
								><i class="fas fa-code h4 pe-1"></i>Fine Code</a
							>
						</li>

						<!-- Link - About -->
						<li class="nav-item px-3 px-lg-0">
							<a class="nav-link" id="aboutLink" href="#aboutMe"
								><i class="fas fa-user-tie h4 pe-1"></i>About</a
							>
						</li>

						<!-- Link - Portfolio > Dropdown -->
						<li class="nav-item px-3 px-lg-0 dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="portfolioLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"
								><i class="fas fa-folder h4 pe-1"></i>Portfolio</a
							>

							<!-- Dropdown in Portfolio -->
							<ul class="dropdown-menu bg-steel mb-2" aria-labelledby="portfolioLink">
								<li><a class="dropdown-item" href="#projects">Personal Projects</a></li>
								<li><a class="dropdown-item" href="#projects">School Projects</a></li>
								<li><a class="dropdown-item" href="#projects">Udemy Bootcamp Projects</a></li>
								<li><a class="dropdown-item" href="#projects">Coder Foundry Bootcamp Projects</a></li>
							</ul>
						</li>

						<!-- Link - Blog  -->
						<li class="nav-item px-3 px-lg-0">
							<a class="nav-link" id="blogLink" href="#blog"
								><i class="fas fa-journal-whills h4 pe-1"></i>Blog</a
							>
						</li>

						<!-- Link - Contact -->
						<li class="nav-item px-3 px-lg-0">
							<a class="nav-link" id="contactLink" href="#contact"
								><i class="fas fa-envelope-open-text h4 pe-1"></i>Contact</a
							>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<main class="flex-shrink-0 full-height full-width" id="home">
			<div class="container bg-black-8 text-light mt-4 pb-4 text-center">
				<h1>Message Sent!</h1>
				<p>Thank you for contacting us. We will be in touch with you very soon.</p>
                <p>Feel free to keep exploring or simply go back to the <a class="text-gold text-gw" href="https://digitalelegance.com/finecode/">main page</a>.</p>
            </div>


			<!-- ====== Footer =======  -->
			<footer class="full-width footer-radius fixed-bottom bg-black border-gold text-gold pb-2">
				<div class="container">
					<div class="row pt-md-2 row-cols-1 row-cols-md-3">
							<div class="col-md-3 d-none d-md-block">
								<h5 class="thick">Site Links</h5>
								<ul class="text-gold no-bullet footer-list">
									<li><a class="text-gold" href="https://digitalelegance.com">Digital Elegance | Home</a></li>
									<li><a class="text-gold" href="https://digitalelegance.com/finecode/index.html">Fine Code | Home</a></li>
									<li><a class="text-gold" href="https://digitalelegance.com/finecode/index.html#about">About</a></li>
									<li><a class="text-gold" href="https://digitalelegance.com/finecode/index.html#portfolio">Portfolio</a></li>
									<li><a class="text-gold" href="https://digitalelegance.com/finecode/blog/index.html#blog">Blog</a></li>
									<li><a class="text-gold" href="https://digitalelegance.com/finecode/index.html#contact">Conatct</a></li>
								</ul>
							</div>
							<div class="col-12 col-md-6 p-0">
								<div class="bg-steel footer-radius text-center h-100">
									<img id="de-logo" class="img-fluid h-100 p-2" src="img/DigitalElegance.svg" alt="Digital Elegance">
								</div>
							</div>
							<div class="col-12 col-md-3">
								<h5 class="thick d-none d-md-block">Contact Me</h5>
								<ul class="nav flex-md-column text-gold mb-2 footer-list">
									<li>Ace Baugh</li>
									<li class="d-md-none px-1">|</li>
									<li>Orlando, Florida</li>
									<li class="d-md-none px-1">|</li>
									<li>
											<a class="text-gold" href="tel:208-557-9223">(208) 55-79-ACE (223)</a>
									</li>
									<li class="d-md-none px-1">|</li>
									<li class="px-md-0 h-25 d-block-inline">
											<a class="text-gold" href="mailto:ace@digitalelegance.com">ace@digitalelegance.com</a>
									</li>
								</ul>
								<div class="social-icons text-center text-md-start">
									<a href="https://www.linkedin.com/in/acieffe/"
											><i class="fab fa-linkedin h4 text-gold"></i></a>

									<a target="_blank" href="https://twitter.com/acieffe"
										><i class="fab fa-twitter-square h4 text-gold"></i></a>
									<a href="https://github.com/acieffe"
										><i class="fab fa-github-square h4 text-gold"></i></a>
								</div>
							</div>
					</div>
				</div>
				<p class="footer-p text-center">
					Copyright &copy; 2021 Digital Elegance, all rights reserved. Developed by
					<a class="text-gold" href="mailto:ace@digitalelegance.com">Ace Baugh | ace@digitalelegance.com</a>
				</p>
			</footer>
		</main>
    </body>
</html>

<?php
}
?>