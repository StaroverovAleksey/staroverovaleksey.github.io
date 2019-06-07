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

	<template class="admin-upload__subscribe-template--multiple">
		<label class="admin-upload__subscribe--multiple">
			<input type="radio" class="admin-upload__subscribe-input--multiple visually-hidden" name="admin-upload__subscribe-input--multiple">
		</label>
	</template>

	<template class="redact-cart__old-fhoto-template">
		<div class="template__photo-wrapper">
			<label class="admin-upload__subscribe--multiple">
				<img  class="template__photo-img" src="#" alt="" width="85px">
				<div class="template__photo-img-wrapper">
				</div>
				<input type="radio" class="template__photo-input admin-upload__subscribe-input--multiple visually-hidden" name="admin-upload__subscribe-input--multiple">
			</label>
			<div class="template__photo-cancel">
				<span class="template__photo-cancel--span"></span>
			</div>
		</div>
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
			<ul class="cart-redact_list">

				<li class="cart-redact__item redact-item">
					<button class="cart-redact__title admin-subbutton">Добавить товар</button>
					<div class="cart-redact__add-cart">
						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="add-cart__form admin-form">
							<div class="add-cart__name-wrapper">
								<input type="text" class="add-cart__name admin-input" placeholder="Название" name="add-cart__name">
								<input type="text" class="add-cart__code admin-input" placeholder="Код" name="add-cart__code">
							</div>
							<div class="add-cart__prace-wrapper">
								<input type="text" class="add-cart__new-price admin-input" placeholder="Цена" name="add-cart__new-price">
								<label class="add-cart__sale-label admin-input">%
									<input type="checkbox" class="add-cart__sale visually-hidden" name="add-cart__sale">
								</label>
								<input type="text" class="add-cart__old-price admin-input" placeholder="Цена %" name="add-cart__old-price">
							</div>
							<input type="text" class="add-cart__manufactured admin-input" placeholder="Производитель" name="add-cart__manufactured">
							<input type="text" class="add-cart__material admin-input" placeholder="Материал" name="add-cart__material">
							<textarea class="add-cart__discription admin-input" placeholder="Описание" name="add-cart__discription"></textarea>
							<textarea class="add-cart__subscribe admin-input" placeholder="Информация" name="add-cart__subscribe"></textarea>
							<div class="add-cart__foto admin-upload">
								<p class="add-cart__foto-name">Загрузить фото</p>
								<label class="add-cart__foto-label input-choise">Выбрать<input type="file" class="add-cart__foto-input visually-hidden upload-input--multiple" name="add-cart__foto[]" multiple></label>
								<div class="admin-upload__subscribe-wrapper--multiple">
									
								</div>
								<p class="admin-upload__invalid--multiple"></p>
							</div>
							<p class="add-cart__chose-category-subscribe">Выбрать категорию</p>
							<div class="add-cart__chose-category chose-wrapper">
								<button class="add-cart__chose-category-button chose__button">Выбрать</button>
								<div class="add-cart__chose-category-wrapper">
									<?php
										require 'PHP/clientData.php';
										foreach ($choseCategoryResult as $value) {
											echo "<label class='add-cart__chose-category-label chose__label'>";
											echo $value[0];
											echo "<input type='radio' name='add-cart__chose-category-input'
											class='add-cart__chose-category-input chose__input visually-hidden' value=";
											echo "'$value[0]'";
											echo "><p class='visually-hidden'>";
											echo $value[1];
											echo "</p></label>";
										};
									?>
								</div>
							</div>
							<p class="add-cart__chose-category-discript"></p>
							<p class="add-cart__chose-subcategory-subscribe visually-hidden">Выбрать подкатегорию</p>
							<div class="add-cart__chose-subcategory chose-wrapper visually-hidden">
								<button class="add-cart__chose-subcategory-button chose__button">Выбрать</button>
								<div class="add-cart__chose-subcategory-wrapper">
									<?php
										foreach ($choseSubcategoryResult as $value) {
											echo "<label class='add-cart__chose-subcategory-label chose__label visually-hidden'>";
											echo $value[0];
											echo "<input type='radio' name='add-cart__chose-subcategory-input' class='add-cart__chose-subcategory-input chose__input visually-hidden' value=";
											echo "'$value[0]'";
											echo "><p class='add-cart__chose-subcategory-id visually-hidden'>";
											echo $value[1];
											echo "</p></label>";
										};
									?>
								</div>
							</div>
							<p class="add-cart__chose-subcategory-discript"></p>
							<button class="add-cart__submit button submit-button">Добавить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
								<?php
									print_r($errorConnect);
								?>
							</p>
						</form>
					</div>
				</li>

				<li class="cart-redact__item redact-item">
					<button class="cart-redact__title admin-subbutton">Изменить товар</button>
					<div class="cart-redact__redact-cart">

						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="redact-cart__form admin-form">
							<input type="text" class="redact-cart__name admin-input" placeholder="Код товара" name="redact-cart__code">
							<button class="redact-cart__submit button submit-button">Найти</button>
							<p class="submit-status"></p>
							<p class="sql-status">
								<?php
									print_r($errorConnect);
								?>
							</p>
						</form>

						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="redact-cart__form-two admin-form visually-hidden">
							<input type="text" class="redact-cart__id-two admin-input visually-hidden" name="redact-cart__id-two">
							<div class="redact-cart__name-wrapper">
								<input type="text" class="redact-cart__name-two admin-input" placeholder="Название" name="redact-cart__name-two">
								<input type="text" class="redact-cart__code-two admin-input" placeholder="Код" name="redact-cart__code-two">
							</div>
							<div class="redact-cart__prace-wrapper">
								<input type="text" class="redact-cart__new-price-two admin-input" placeholder="Цена" name="redact-cart__new-price-two">
								<label class="redact-cart__sale-label-two admin-input">%
									<input type="checkbox" class="redact-cart__sale-two visually-hidden" name="redact-cart__sale-two">
								</label>
								<input type="text" class="redact-cart__old-price-two admin-input" placeholder="Цена %" name="redact-cart__old-price-two">
							</div>
							<input type="text" class="redact-cart__manufactured-two admin-input" placeholder="Производитель" name="redact-cart__manufactured-two">
							<input type="text" class="redact-cart__material-two admin-input" placeholder="Материал" name="redact-cart__material-two">
							<textarea class="redact-cart__discription-two admin-input" placeholder="Описание" name="redact-cart__discription-two"></textarea>
							<textarea class="redact-cart__subscribe-two admin-input" placeholder="Информация" name="redact-cart__subscribe-two"></textarea>
							<input type="text" class="redact-cart__old-fhoto-del visually-hidden" name="redact-cart__old-fhoto-del">
							<div class="redact-cart__old-fhoto-wrapper">


							</div>
							<div class="redact-cart__foto admin-upload">
								<p class="redact-cart__foto-name-two">Добавить фото</p>
								<label class="redact-cart__foto-label-two input-choise">Выбрать<input type="file" class="redact-cart__foto-input-two  upload-input--multiple visually-hidden" name="add-cart__foto[]" multiple></label>
								<div class="admin-upload__subscribe-wrapper--multiple">
									
								</div>
								<p class="admin-upload__invalid--multiple"></p>
							</div>
							<p class="redact-cart__chose-category-subscribe-two">Выбрать категорию</p>
							<div class="redact-cart__chose-category chose-wrapper">
								<button class="redact-cart__chose-category-button-two chose__button">Выбрать</button>
								<div class="redact-cart__chose-category-wrapper">
									<?php
										foreach ($choseCategoryResult as $value) {
											echo "<label class='redact-cart__chose-category-label chose__label'>";
											echo $value[0];
											echo "<input type='radio' name='redact-cart__chose-category-input'
											class='redact-cart__chose-category-input chose__input visually-hidden' value=";
											echo "'$value[0]'";
											echo "><p class='visually-hidden'>";
											echo $value[1];
											echo "</p></label>";
										};
									?>
								</div>
							</div>
							<p class="redact-cart__chose-category-discript-two"></p>
							<p class="redact-cart__chose-subcategory-subscribe-two visually-hidden">Выбрать подкатегорию</p>
							<div class="redact-cart__chose-subcategory chose-wrapper visually-hidden">
								<button class="redact-cart__chose-subcategory-button-two chose__button">Выбрать</button>
								<div class="redact-cart__chose-subcategory-wrapper">
									<?php
										foreach ($choseSubcategoryResult as $value) {
											echo "<label class='redact-cart__chose-subcategory-label chose__label visually-hidden'>";
											echo $value[0];
											echo "<input type='radio' name='redact-cart__chose-subcategory-input' class='redact-cart__chose-subcategory-input chose__input visually-hidden' value=";
											echo "'$value[0]'";
											echo "><p class='redact-cart__chose-subcategory-id visually-hidden'>";
											echo $value[1];
											echo "</p></label>";
										};
									?>
								</div>
							</div>
							<p class="redact-cart__chose-subcategory-discript-two"></p>
							<button class="redact-cart__submit-two button submit-button">Добавить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
								<?php
									print_r($errorConnect);
								?>
							</p>
						</form>

					</div>
				</li>

				<li class="cart-redact__item redact-item">
					<button class="cart-redact__title admin-subbutton">Удалить товар</button>
					<div class="cart-redact__remove-cart">
						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="remove-cart__form admin-form">
							<input type="text" class="remove-cart__name admin-input" placeholder="Код товара" name="remove-cart__code">
							<button class="remove-cart__submit button submit-button">Удалить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
								<?php
									print_r($errorConnect);
								?>
							</p>
						</form>
					</div>
				</li>

			</ul>
		</section>

		<section class="menu-redact admin-section">
			<button class="menu-redact__button admin-button">Работа с меню</button>
			<ul class="menu-redact__list">

				<li class="menu-redact__item redact-item">
					<button class="menu-reduct__title admin-subbutton">Добавить категорию</button>
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

				<li class="menu-redact__item redact-item">
					<button class="menu-reduct__title admin-subbutton">Изменить категорию</button>
					<div class="menu-redact__redact-category">

						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="redact-category__form admin-form">
							<div class="redact-category__chose chose-wrapper">
								<button class="redact-category__chose-button chose__button">Выбрать</button>
								<div class="chose__label-wrapper">
									<?php
										foreach ($delCategoryResult as $value) {
											echo "<label class='redact-category__chose-label chose__label'>";
											echo $value[0];
											echo "<input type='radio' name='redact-category'
											class='redact-category__chose-input chose__input visually-hidden' value=";
											echo "'$value[0]'>";
											echo "</label>";
										};
									?>
								</div>
							</div>
							<button class="redact-category__submit button submit-button">Изменить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
							</p>
						</form>

						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="redact-category__form-two admin-form visually-hidden">
							<div class="redact-category__name-wrapper">
								<input type="text" class="redact-category__name admin-input" placeholder="Название" name="redact-category__name">
								<div class="redact-category__spot">
									<div class="redact-category__spot-left"></div>
									<label class="redact-category__spot-label">
										<div class="redact-category__label-info"></div>
										<input type="number" class="redact-category__spot-input visually-hidden" name="redact-category__spot">
									</label>
									<div class="redact-category__spot-right"></div>
								</div>
							</div>
							<input type="text" class="redact-category__subscribe admin-input" placeholder="Описание" name="redact-category__subscribe">
							<div class="redact-category__foto admin-upload">
								<p class="redact-category__foto-name">Фото категории</p>
								<label class="redact-category__foto-label input-choise"> Выбрать<input type="file" class="redact-category__foto-input visually-hidden upload-input" name="redact-category__foto"></label>
								<p class="admin-upload__subscribe"></p>
								<p class="admin-upload__invalid"></p>
							</div>
							<div class="redact-subcategory__wrapper">
								<p class="redact-subcategory__title">Подкатегории</p>

								<div class="redact-subcategory__item">
									<input type="text" class="redact-subcategory__input admin-input" placeholder="Название" name="redact-subcategory__name-1">
									<div class="redact-subcategory__plus"></div>
									<div class="redact-subcategory__minus"></div>
								</div>
								
							</div>
							<button class="redact-category__submit button submit-button">Изменить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
								<?php
									print_r($errorConnect);
								?>
							</p>
						</form>

					</div>
				</li>

				<li class="menu-redact__item redact-item">
					<button class="menu-reduct__title admin-subbutton">Удалить категорию</button>
					<div class="menu-redact__remove-category">
						<form action="PHP/clientData.php" method="post" enctype="multipart/form-data" class="remove-category__form admin-form">
							<div class="remove-category__chose chose-wrapper">
								<button class="remove-category__chose-button chose__button">Выбрать</button>
								<div class="chose__label-wrapper-del">
									<?php
										foreach ($delCategoryResult as $value) {
											print '<label class="remove-category__chose-label chose__label">' . $value[0] . '<input type="checkbox" name=' . $value[1] . ' class="remove-category__chose-input chose__input visually-hidden"></label>';
										};
									?>
									<input type="checkbox" class="visually-hidden" name="remove-category" checked="checked">
								</div>
							</div>
							<button class="remove-category__submit button submit-button">Удалить</button>
							<p class="submit-status"></p>
							<p class="sql-status">
							</p>
						</form>
					</div>
				</li>

			</ul>
		</section>

		<section class="title-page-redact admin-section">
			<button class="title-page-redact__button admin-button">Редактирование титульной страницы</button>
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
	<script src="js/checkCookie.js"></script>
</body>
</html>
