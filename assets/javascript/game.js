$(document).ready(function(){

	var isEmptySelection = true;
	var isEnemyEmpty = true;
	var isSetup = true;
	var wins = 0;
	var losses = 0;
	$('#wins').html("<h2>Wins: " + wins + "</h2>");
	$('#losses').html("<h2>Losses: " + losses + "</h2>");
	
	var setup = function(){
		isSetup = true;
		isEnemyEmpty = true;
		isEmptySelection = true;
		$('#playerArea').html('');
		$('#defenderArea').html('');
		$('#enemyArea').html('');
		$('#playerHit').text('');
		$('#enemyHit').text('');
		//$('#attackResults').html('');


		var char1 =  $('<button>');
		char1.addClass('btn btn-default character');
		//char1.addClass('img-responsive character');
		char1.attr('id', 'Worf');
		char1.attr('pic', 'assets/images/worf.jpg')
		char1.attr('health', 100);
		char1.attr('damage', 13);
		char1.attr('multiplier' , 13);
		char1.attr('counter', 7);
		//char1.html("<h1>" + char1.attr('id') + "</h1><p>" + char1.attr('health') + "</p>");
		char1.html("<img class='img-responsive img-rounded' src=" + char1.attr('pic') + "><h1>" + char1.attr('id') + "</h1><p>" + char1.attr('health') + "</p>");
		//console.log($('#char1').attr('health'));


		$('#startArea').append(char1);
		
		var char2 =  $('<button>');
		char2.addClass('btn btn-default character');
		char2.attr('id', 'Picard');
		char2.attr('pic', 'assets/images/picard.jpg')
		char2.attr('health', 135);
		char2.attr('damage', 3);
		char2.attr('multiplier' , 3);
		char2.attr('counter', 20);
		char2.html("<img class='img-responsive img-rounded' src=" + char2.attr('pic') + "><h1>" + char2.attr('id') + "</h1><p>" + char2.attr('health') + "</p>");

		$('#startArea').append(char2);
		
		var char3 =  $('<button>');
		char3.addClass('btn btn-default character');
		char3.attr('health', 150);
		char3.attr('damage', 4);
		char3.attr('counter', 12);
		char3.attr('multiplier' , 4);
		char3.attr('id', 'Q');
		char3.attr('pic', 'assets/images/q.jpg')
		char3.html("<img class='img-responsive img-rounded' src=" + char3.attr('pic') + "><h1>" + char3.attr('id') + "</h1><p>" + char3.attr('health') + "</p>");

		$('#startArea').append(char3);

		var char4 =  $('<button>');
		char4.addClass('btn btn-default character');
		char4.attr('id', 'Guy');
		char4.attr('pic', 'assets/images/guy.jpg')
		char4.attr('health', 125);
		char4.attr('damage', 7);
		char4.attr('multiplier' , 7);
		char4.attr('counter', 11);
		char4.html("<img class='img-responsive img-rounded' src=" + char4.attr('pic') + "><h1>" + char4.attr('id') + "</h1><p>" + char4.attr('health') + "</p>");

		//$('#startArea').html(char1 + char2 + char3 + char4);
		$('#startArea').append(char4);

		//playerSelect();
	
	
	}

	
	
	var playerSelect = function(){

		isSetup = false;

		
			$('body').on('click', '.character', function(){
				if(isEmptySelection){
					isEmptySelection = false;
					this.classList.add('playerChar', 'btn-success');
					this.classList.remove('character', 'btn-default');


					$('.character').addClass('defender');
					$('.character').addClass('btn-warning');
					$('.defender').removeClass('character');
					$('.defender').removeClass('btn-default');

					//$('#defenderArea').append('.defender');
					$('#playerArea').append($('.playerChar'));
					$('#defenderArea').append($('.defender'));

					//enemySelect();


				}
				
			});
		
	}

	var enemySelect = function(){

			$('body').on('click', '.defender', function(){

				if(isEnemyEmpty){
					//console.log("Hit");
					isEnemyEmpty = false;
					this.classList.add('enemyChar', 'btn-danger');
					this.classList.remove('defender', 'btn-warning');
					$('#enemyArea').append($('.enemyChar'));
					//console.log($('.enemyChar').attr('health'));

				}

			});
		
	}

	var attackEnemy = function(){

			$('body').on('click', '#attack', function(){
				if (($('.enemyChar').attr('health') > 0) && ($('.playerChar').attr('health') > 0)){
					var enemyHealth = $('.enemyChar').attr('health');
					var playerHealth = $('.playerChar').attr('health');
					var playerAttack = $('.playerChar').attr('damage');
					var enemyAttack = $('.enemyChar').attr('counter');
					var playerMult = $('.playerChar').attr('multiplier');
					console.log("hey", playerAttack, playerMult);
					var updatePlayerAttack = (parseInt(playerAttack) + parseInt(playerMult));


					$('.enemyChar').attr('health', (enemyHealth - playerAttack));
					
					$('.enemyChar').html("<img class='img-responsive img-rounded' src=" + $('.enemyChar').attr('pic') + "><h1>" +$('.enemyChar').attr('id') + "</h1><p>" + $('.enemyChar').attr('health') + "</p>");
					
					$('.playerChar').attr('damage', updatePlayerAttack);
					//console.log($('.playerChar').attr('damage'));

					//$('#attackResults').html("<p>You attacked for " + playerAttack + " damage</p>");
					$('#playerHit').text("You attacked for " + playerAttack + " damage");

					if ($('.enemyChar').attr('health') <= 0){
						//alert("Enemy Defeated!");
						$('#enemyHit').text("");
						$('#playerHit').text("Enemy defeated!");
						$('.enemyChar').remove();
						isEnemyEmpty = true;
						gameOver();
						return

					}

					$('.playerChar').attr('health', (playerHealth - enemyAttack));
					$('.playerChar').html("<img class='img-responsive img-rounded' src=" + $('.playerChar').attr('pic') + "><h1>" +$('.playerChar').attr('id') + "</h1><p>" + $('.playerChar').attr('health') + "</p>");

					//$('#attackResults').html("<p>You attacked for " + playerAttack + " damage</p><p>Enemy attacked for " + enemyAttack + " damage</p>");
					$('#enemyHit').text("Enemy attacked for " + enemyAttack + " damage");
					
					if ($('.playerChar').attr('health') <= 0){
						$('#playerHit').text("");
						$('#enemyHit').text("You lost! Click reset to play again");
						losses++;
						$('#losses').html("<h2>Losses: " + losses + "</h2>");

					}

					// console.log($('#enemyArea').is(':empty'));
					// console.log($('#enemyArea').html());
					// console.log($('#defenderArea').html());
					
				}
			

			});
		}


	var gameOver = function() {
		if (($('#defenderArea').is(':empty')) && ($('#enemyArea').is(':empty'))){
			//alert("All enemies defeated!");
			$('#playerHit').text("You win! Click reset to play again");
			wins++;
			$('#wins').html("<h2>Wins: " + wins + "</h2>");
		}
			
	}


	$('body').on('click', '#reset', function(){
		$('#startArea').html('<h2>Select your character</h2>');
		setup();
		
	});


	setup();
	playerSelect();
	enemySelect();
	attackEnemy();

})
