<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&amp;subset=cyrillic" rel="stylesheet">
	<link rel="stylesheet" href="css/Nolmalize.css">
	<link rel="stylesheet" href="css/style.css">
</head>
<body>

<template class="menu__template">
		<li class="main-navigation__category-item">
					<a class="main-navigation__category-link">
						<button class="main-navigation__category-button">
							<span class="main-navigation__category-icon"></span>
						</button>
					</a>
					<ul class="main-navigation__subcategory-list hidden-menu">

						<div class="main-navigation__subcategory-wrapper">

						</div>

						<li class="main-navigation__category-accent">
							<img src="" alt="" class="main-navigation__accent-image" width="364">
							<div class="main-navigation__accent-wrapper">
								<span class="main-navigation__accent-signature"></span>
							</div>
						</li>

					</ul>
				</li>
	</template>

	<template class="subcategory__template">
		<li class="main-navigation__subcategory-item">
			<a href="#" class="main-navigation__subcategory-link"></a>
		</li>
	</template>
	
	<header class="main-header">
		<div class="main-header__content-wrapper">
			<a href="#" class="version">
				<span class="version__span">Полная версия сайта</span>
			</a>
			<a href="#" class="delivery">
				<span class="delivery__span">Доставка и контакты</span>
			</a>
			<div class="social-header social">
				<a href="#" class="social__vk"></a>
				<a href="#" class="social__instagram"></a>
			</div>
			<nav class="user-navigation">
				<a href="#" class="user-navigation__login user-navigation__item"></a>
				<a href="#" class="user-navigation__likes user-navigation__item"></a>
				<a href="basket.php" class="user-navigation__basket user-navigation__item">
					<span class="user-navigation__value user-navigation__item"></span>
				</a>
				<div class="user-navigation__user-menu">

					<div class="user-navigation__enter">
						<div class="user-menu__social">
							<button class="user-menu__vk button">Вконтакте</button>
							<button class="user-menu__fb button">Facebook</button>	
						</div>
						<div class="user-menu__servis">
							<span class="user-menu__servis-or">или</span>
						</div>
						<form action="POST" class="user-menu__user-form">
							<input type="login" class="user-form__login input" placeholder="Почтовый ящик">
							<input type="password" class="user-form__password input" placeholder="Пароль">
							<button class="user-form__submit button">Войти</button>
						</form>
						<div class="user-menu__link">
							<button class="user-menu__forget">Забыли пароль?</button>
							<button class="user-menu__reg">Регистрация</button>	
						</div>
					</div>

					<div class="user-navigation__reg hidden">
						<button class="user-navigation__back user-navigation__back-reg">
							<span class="user-navigation__back-paint"></span>
						</button>
						<div class="user-menu__social">
							<button class="user-menu__vk button">Вконтакте</button>
							<button class="user-menu__fb button">Facebook</button>	
						</div>
						<div class="user-menu__servis">
							<span class="user-menu__servis-or">или</span>
						</div>
						<form action="POST" class="user-menu__user-form">
							<input type="login" class="user-form__login input" placeholder="Почтовый ящик">
							<input type="password" class="user-form__password input" placeholder="Пароль">
							<input type="password" class="user-form__password input" placeholder="Повторите пароль">
							<button class="user-form__submit button">Регистрация</button>
						</form>
						<div class="user-menu__link">
						</div>
					</div>

					<div class="user-navigation__forget hidden">
						<button class="user-navigation__back user-navigation__back-forget">
							<span class="user-navigation__back-paint"></span>
						</button>
						<span class="user-menu__forget-title">Мы вышлем Ваш пароль на почту</span>
						<form action="POST" class="user-menu__user-form">
							<input type="login" class="user-form__login input" placeholder="Почтовый ящик">
							<button class="user-form__submit button">Отправить пароль</button>
						</form>
						<div class="user-menu__link">
						</div>
					</div>

				</div>
			</nav>
		</div>
		<nav class="main-navigation">
			<a href="index.html" class="logo-header">
				<img src="images/icons/logo.png" alt="Logo" class="logo__image" width="100%">
			</a>
			<div class="search">
					<div class="search__wrapper">
						<form action="POST" class="search__form">
							<input type="text" class="search-form__input">
							<button class="search-form__button button">Найти</button>
						</form>
						<div class="search__result-wrapper">
							
						</div>
					</div>
				</div>		
			<ul class="main-navigation__category-list">

			</ul>
		</nav>
	</header>

	<script src="js/render_menu.js"></script>
	<script src="js/getCookies.js"></script>
	<script src="js/render_list.js"></script>

	<main class="main-content list-content">
		<h1 class="site-name visually-hidden">Магазин детских вещей Baby-shop</h1>
		<section class="buttons">
			<div class="buttons-wrapper">

				<button class="navigation-button">
					<span class="navigation-button__paint"></span>
				</button>
				<button class="search-button"></button>
				<button class="filter-button"></button>	

			</div>
		</section>
		<div class="left-side">
			<section class="list-filtres"></section>
			<section class="advertising"></section>
		</div>
		<div class="right-side">
			<section class="list-buttons">
				<button class="list-buttons__grid list-buttons--active">
					<span class="list-buttons__grid-paint"></span>
					<span class="list-buttons__grid-paint"></span>
					<span class="list-buttons__grid-paint"></span>
				</button>
				<button class="list-buttons__list">
					<span class="list-buttons__list-paint"></span>
					<span class="list-buttons__list-paint"></span>
					<span class="list-buttons__list-paint"></span>
				</button>
			</section>
			<section class="grid">

			</section>
		</div>
	</main>

	<template class="product-template">
		<div class="product-item">
			<span class="product-item__id visually-hidden"></span>
			<span class="product-item__category visually-hidden"></span>
			<span class="product-item__subcategory visually-hidden"></span>
			<a class="product-item__foto-wrapper">
				<img class="product-item__foto" src="images/pp003/low/5.jpg" alt="" width="100%">
					<span class="product-item__discount"></span>
					<span class="product-item__like"></span>
			</a>
			<div class="product-item__right-side">
				<p class="product-item__name">Картошка</p>
				<p class="product-item__price">
					<span class="product-item__price-new">345</span>
					<span class="product-item__price-old">567</span>
							Руб
				</p>
				<div class="product-item__rating">
					<span class="product-item__rating-item"></span>
					<span class="product-item__rating-item"></span>
					<span class="product-item__rating-item"></span>
					<span class="product-item__rating-item"></span>
					<span class="product-item__rating-item"></span>
				</div>
				<p class="product-item__discription">Picked from various organic farms when ripe and in season. Picked from various organic farms when ripe and in season. Picked from various.farms when ripe and in season. Picked from various.</p>	
				<button class="product-item__button button">В корзину</button>
			</div>
		</div>
	</template>

	<footer class="main-footer">
		<div class="footer-wrapper">
			<a href="#" class="logo-footer">
			<img src="images/icons/logo.png" alt="logo" class="logo__image" width="100%">
			</a>
			<div class="pay">
				<span class="pay__item pay--visa"></span>
				<span class="pay__item pay--mastercard"></span>
				<span class="pay__item pay--paypal"></span>
			</div>
			<div class="social-footer social">
				<a href="#" class="social__vk"></a>
				<a href="#" class="social__instagram"></a>
			</div>
			<a href="#" class="adout">О нас</a>
			<a href="#" class="policy">Политика</br>конфеденциальности</a>
			<a href="#" class="backup">Обмен и возврат</a>
			<a href="#" class="map">Карта сайта</a>
			<a href="#" class="contact">Контакты</a>
			<a href="#" class="webmaster">Веб технологии:<br>Алексей Староверов</a>
		</div>
		<span class="copy">&copy; Copyrights 2019</span>
	</footer>
	<script src="js/sistem.js"></script>
	<script src="js/server.js"></script>
	<script src="js/checkCookie.js"></script>
</body>
</html>
