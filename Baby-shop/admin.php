<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&amp;subset=cyrillic" rel="stylesheet">
	<link rel="stylesheet" href="css/Nolmalize.css">
	<link rel="stylesheet" href="css/style.css">
	<?php
		require 'PHP/clientData.php';
	?>
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
				<a href="#" class="user-navigation__basket user-navigation__item">
					<span class="user-navigation__value user-navigation__item">12</span>
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

	<main class="main-content admin-content">
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

		<section class="cart-redact admin-section">
			<button class="cart-redact__button admin-button">Работа с карточками товара</button>
			<form action="" class="cart-redact__form">
				<div class="qwerty"></div>
			</form>
		</section>

		<section class="menu-redact admin-section">
			<button class="menu-redact__button admin-button">Работа с меню</button>
			<ul class="menu-redact__list">

				<li class="menu-redact__item">
					<button class="menu-reduct__title">Добавить категорию</button>
					<div class="menu-redact__add-category">
						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="add-category__form admin-form">
							<div class="add-category__name-wrapper">
								<input type="text" class="add-category__name admin-input" placeholder="Название" name="add-category__name">
								<div class="add-category__spot">
									<div class="add-category__spot-left"></div>
									<label class="add-category__spot-label">
										<div class="add-category__label-info">
											<?php
												$addCategorySpot = mysqli_fetch_all(mysqli_query(connect(), "SELECT COUNT(*) FROM category"))[0][0] + 1;
												print_r($addCategorySpot);
											?>
										</div>
										<input type="number" class="add-category__spot-input visually-hidden" name="add-category__spot">
									</label>
									<div class="add-category__spot-right"></div>
								</div>
							</div>
							<input type="text" class="add-category__subscribe admin-input" placeholder="Описание" name="add-category__subscribe">
							<div class="add-category__foto admin-upload">
								<p class="add-category__foto-name">Фото категории</p>
								<label class="add-category__foto-label input-choise"> Выбрать<input type="file" class="add-category__foto-input visually-hidden upload-input" name="add-category__foto"></label>
								<p class="admin-upload__subscribe"></p>
								<p class="admin-upload__invalid"></p>
							</div>
							<div class="add-subcategory__wrapper">
								<p class="add-subcategory__title">Подкатегории</p>

								<div class="add-subcategory__item">
									<input type="text" class="add-subcategory__input admin-input" placeholder="Название" name="add-subcategory__name-1">
									<div class="add-subcategory__plus"></div>
									<div class="add-subcategory__minus"></div>
								</div>
								
							</div>
							<button class="add-category__submit button submit-button">Добавить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
								<?php
									print_r($errorConnect);
								?>
							</p>
						</form>
					</div>
				</li>

				<li class="menu-redact__item">
					<button class="menu-reduct__title">Удалить категорию</button>
					<div class="menu-redact__remove-category">
						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="remove-category__form admin-form">
							<div class="remove-category__chose chose-wrapper">
								<button class="remove-category__chose-button chose__button">Выбрать</button>
								<div class="chose__label-wrapper">
									<?php
										foreach ($delCategoryResult as $value) {
											print '<label class="remove-category__chose-label chose__label">' . $value[0] . '<input type="checkbox" name=' . $value[0] . ' class="remove-category__chose-input chose__input visually-hidden"></label>';
										};
									?>
									<input type="checkbox" class="visually-hidden" name="remove-category" checked="checked">
								</div>
							</div>
							<button class="remove-category__submit button submit-button">Удалить</button>
							<p class="submit-status"></p>
							<p class="sql-status"></p>
						</form>
					</div>
				</li>

				<li class="menu-redact__item">
					<button class="menu-reduct__title">Переместить категорию</button>
					<div class="menu-redact__move-category">
						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="move-category__form admin-form">
							<div class="move-category__chose chose-wrapper">
								<button class="move-category__chose-button chose__button">Выбрать</button>
								<div class="chose__label-wrapper">
									<?php
										foreach ($delCategoryResult as $value) {
											print '<label class="move-category__chose-label chose__label">' . $value[0] . '<input type="checkbox" name=' . $value[0] . ' class="move-category__chose-input chose__input visually-hidden"></label>';
										}
									?>
									<input type="checkbox" class="visually-hidden" name="move-category" checked="checked">
								</div>
							</div>
							<button class="move-category__submit button submit-button">Переместить</button>
							<p class="submit-status"></p>
							<p class="sql-status"></p>
						</form>
					</div>
				</li>

				<li class="menu-redact__item">
					<button class="menu-reduct__title">Добавить подкатегорию</button>
					<div class="menu-redact__add-subcategory"></div>
				</li>

				<li class="menu-redact__item">
					<button class="menu-reduct__title">Удалить подкатегорию</button>
					<div class="menu-redact__remove-subcategory"></div>
				</li>

				<li class="menu-redact__item">
					<button class="menu-reduct__title">Переместить подкатегорию</button>
					<div class="menu-redact__move-subcategory"></div>
				</li>

			</ul>
		</section>

		<section class="title-page-redact admin-section">
			<button class="title-page-redact__button admin-button">Редактирование титульной страницы</button>
			<form action="" class="cart-redact__form">
				<div class="qwerty"></div>
			</form>
		</section>

		<section class="user-redact admin-section">
			<button class="user-redact__button admin-button">Работа с пользователями</button>
			<form action="" class="cart-redact__form">
				<div class="qwerty"></div>
			</form>
		</section>

	</main>
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

	<template class="del-category__template">
		<label class="remove-category__chose-label chose__label">
			<input type="checkbox" class="remove-category__chose-input chose__input visually-hidden">
		</label>
	</template>

	<script src="js/sistem.js"></script>
	<script src="js/server.js"></script>
	<script src="js/admin.js"></script>

</body>
</html>
