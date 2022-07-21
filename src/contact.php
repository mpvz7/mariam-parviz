<!DOCTYPE HTML>

<html>
	<head>
		<title>Contact</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link rel="stylesheet" href="assets/css/main.css" />
	</head>
	<body id="contact">
		
		<?php 
			include("header.php");
		?>
		
		<!-- Heading -->
			<div id="heading" >
				<h1>Contact</h1>
			</div>

		<!-- Main -->
		
		<section class="wrapper">
			<div class="highlights">
				<section>
					<div class="content">
						<a href="mailto:parvizmariam@gmail.com" class="icon fa-envelope"><span class="label">Icon</span></a>
						<h3>Envoyez un email</h3>
					</div>
				</section>
				<section>
					<div class="content">
						<a href="https://www.linkedin.com/in/mariam-parviz-b86660201" class="icon fa-linkedin"><span class="label">Icon</span></a>
						<h3>Connectons-nous</h3>
					</div>
				</section>

				<!-- Form -->
				<div class="content">
					<h3>Formulaire de contact</h3>
					<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
						<div>
							<div>
								<input type="text" name="name" placeholder="Name" />
							</div>
							<div>
								<input type="email" name="email" placeholder="Email" />
							</div>
							<div>
								<input type="text" name="objet" placeholder="Objet du contact" />
							</div>
							<div>
								<textarea name="message" id="textarea" placeholder="Primi igitur omnium statuuntur Epigonus et  Eusebius ob nominum gentilitatem oppressi. praediximus enim Montium sub ipso vivendi termino his vocabulis appellatos fabricarum culpasse tribunos ut adminicula futurae molitioni pollicitos." rows="6"></textarea>
							</div>
							<div class="button">
								<input type="reset" value="Annuler" />
								<input type="submit" name="envoyer" value="Envoyer" class="primary" />
							</div>
						</div>
						<?php
						    if(isset($_POST['envoyer'])){
						    	if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message'])){
							        $entete  = 'MIME-Version: 1.0' . "\r\n";
							        $entete .= 'Content-type: text/html; charset=utf-8' . "\r\n";
							        $entete .= 'From: ' . $_POST['email'] . "\r\n";

							        $message = '<h1>Message envoyé depuis la page Contact de mariam-parviz.fr</h1>
							        <p><b>Nom : </b>' . $_POST['name'] . '<br>
							        <b>Email : </b>' . $_POST['email'] . '<br>
							        <b>Objet : </b>' . $_POST['objet'] . '<br>
							        <b>Message : </b>' . $_POST['message'] . '</p>';

							        $retour = mail('mafghane@live.fr', 'Envoi depuis page Contact de mariam-parviz.fr', $message, $entete);

							        if($retour) {
							            echo '<p>Votre message a bien été envoyé.</p>';
							        }
						    	}else{
						    		echo "<p>Veuillez renseigner au moins votre nom, votre e-mail et votre message.</p>";
						    	}
						    }
						 ?>
					</form>
				</div>
			</div>
		</section>
		
		<?php 
			include("footer.php");
		?>

	</body>
</html>