
<form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
	<p>
		<label>Rouge</label>
		<input type="textarea" name="rouge"/>
	</p>
	<p>
		<label>Vert</label>
		<input type="textarea" name="vert"/>
	</p>
	<p>
		<label>Bleu</label>
		<input type="textarea" name="bleu"/>
	</p>
	<p>
		<input type="submit" name="couleurRVB" value="Couleur RVB">
	</p>

	<?php

		if(isset($_POST['couleurRVB'])){

			if(empty($_POST['rouge'])){
				$_POST['rouge'] = 0;
			}

			if(empty($_POST['vert'])){
				$_POST['vert'] = 0;
			}

			if(empty($_POST['bleu'])){
				$_POST['bleu'] = 0;
			}

			if(is_numeric($_POST['rouge']) &&
			is_numeric($_POST['vert']) &&
			is_numeric($_POST['bleu'])){

				if(dansIntervalle($_POST['rouge'], $_POST['vert'], $_POST['bleu'])){

					echo "<div class='blockCouleur'>
							<style> 
								.blockCouleur{
									margin: auto;
									height: 5em;
									width: 5em;
									background-color : rgb(".$_POST['rouge'].",".$_POST['vert'].",".$_POST['rouge'].");
								}
							</style>
							</div>";
				}else{
					echo "<p>Les valeurs doivent comprises entre 0 et 255.</p>";
				}
			}else{
				echo "<p>Les valeurs doivent etre des entiers.</p>";
			}
		}

	?>

	<?php
	function dansIntervalle($c1, $c2, $c3){
		return ($c1 >= 0) && ($c1 <= 255)
				&& ($c2 >= 0) && ($c2 <= 255)
				&& ($c3 >= 0) && ($c3 <= 255);
	}

	?>

</form>
