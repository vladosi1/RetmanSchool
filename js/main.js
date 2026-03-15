// burger
(function () {
	const burger = document.querySelector('.burger');
	const drawer = document.getElementById('mobileMenu');
	const overlay = document.getElementById('menuOverlay');
	const closeBtn = document.querySelector('.drawer__close');

	if (!burger || !drawer || !overlay) return;

	let scrollTop = 0;

	const lockScroll = () => {
		scrollTop = window.pageYOffset || window.scrollY || 0;

		document.body.classList.add('menu-open');
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollTop}px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';
	};

	const unlockScroll = () => {
		document.body.classList.remove('menu-open');
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.right = '';
		document.body.style.width = '';

		window.scrollTo(0, scrollTop);
	};

	const openMenu = () => {
		lockScroll();
		overlay.hidden = false;
		burger.setAttribute('aria-expanded', 'true');
		drawer.setAttribute('aria-hidden', 'false');
	};

	const closeMenu = () => {
		burger.setAttribute('aria-expanded', 'false');
		drawer.setAttribute('aria-hidden', 'true');

		window.setTimeout(() => {
			overlay.hidden = true;
			unlockScroll();
		}, 250);
	};

	burger.addEventListener('click', () => {
		const isOpen = document.body.classList.contains('menu-open');
		isOpen ? closeMenu() : openMenu();
	});

	overlay.addEventListener('click', closeMenu);

	if (closeBtn) {
		closeBtn.addEventListener('click', closeMenu);
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
			closeMenu();
		}
	});

	drawer.addEventListener('click', (e) => {
		const link = e.target.closest('a');
		if (link) closeMenu();
	});

	// фикс при ресайзе: если ушли на десктоп — закрываем меню корректно
	window.addEventListener('resize', () => {
		if (window.innerWidth > 1000 && document.body.classList.contains('menu-open')) {
			drawer.setAttribute('aria-hidden', 'true');
			overlay.hidden = true;
			burger.setAttribute('aria-expanded', 'false');
			unlockScroll();
		}
	});
})();


// main counter
document.addEventListener('DOMContentLoaded', function () {
	const statsSection = document.querySelector('.hero__stats');
	if (!statsSection) return;

	const counters = statsSection.querySelectorAll('.stat__number');
	if (!counters.length) return;

	let hasAnimated = false;

	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect();
		return rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
	}

	function animateCounter(el) {
		const target = parseInt(el.dataset.target, 10) || 0;
		const suffix = el.dataset.suffix || '';
		const duration = 1800;
		let startTime = null;

		function step(now) {
			if (!startTime) startTime = now;
			const progress = Math.min((now - startTime) / duration, 1);

			// лёгкий easing, чтобы было красивее
			const eased = 1 - Math.pow(1 - progress, 3);
			const value = Math.floor(eased * target);

			el.textContent = value + suffix;

			if (progress < 1) requestAnimationFrame(step);
			else el.textContent = target + suffix;
		}

		requestAnimationFrame(step);
	}

	function onScrollCheck() {
		if (hasAnimated) return;

		if (isElementInViewport(statsSection)) {
			counters.forEach(animateCounter);
			hasAnimated = true;
			window.removeEventListener('scroll', onScrollCheck);
		}
	}

	window.addEventListener('scroll', onScrollCheck);
	onScrollCheck();
});
// main counter

//swiper
document.addEventListener('DOMContentLoaded', () => {
	const el = document.querySelector('.popular__slider.swiper');
	if (!el) return;

	new Swiper(el, {
		slidesPerView: 1.05,
		spaceBetween: 16,
		speed: 450,
		watchOverflow: true,


		breakpoints: {
			576: { slidesPerView: 1.7, spaceBetween: 18 },
			768: { slidesPerView: 2, spaceBetween: 20 },
			1000: { slidesPerView: 2.2, spaceBetween: 24 },
			1200: { slidesPerView: 2.5, spaceBetween: 28 },
			1400: { slidesPerView: 3, spaceBetween: 28 },
		},
		navigation: {
			nextEl: '.popular__arrow--next',
			prevEl: '.popular__arrow--prev',
		},
	});
});



//popup__btn-presentation1-2

function openYoutubePopup(videoId) {
	const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
 
	const width = 760;
	const height = 515;
	const left = Math.max(0, (window.innerWidth - width) / 2);
	const top = Math.max(0, (window.innerHeight - height) / 2);
 
	window.open(
	  url,
	  "video-popup",
	  `width=${width},height=${height},left=${left},top=${top}`
	);
 }
 
 const watchVideoButton1 = document.querySelector("#watch-presentation1");
 const watchVideoButton2 = document.querySelector("#watch-presentation2");
 
 if (watchVideoButton1) {
	watchVideoButton1.addEventListener("click", (e) => {
	  e.preventDefault();
	  openYoutubePopup("VR10kAWHKfE");
	});
 }
 
 if (watchVideoButton2) {
	watchVideoButton2.addEventListener("click", (e) => {
	  e.preventDefault();
	  openYoutubePopup("sGEPbzECOI0");
	});
 }



//animations 
document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.js-reveal.reveal');
	if (!items.length) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			const el = entry.target;

			// задержка из data-delay (в миллисекундах)
			const delay = parseInt(el.dataset.delay, 10) || 0;
			el.style.animationDelay = `${delay}ms`;

			el.classList.add('is-visible');

			// один раз
			observer.unobserve(el);
		});
	}, {
		threshold: 0.4,
	});

	items.forEach((el) => observer.observe(el));
});

//teachers
(() => {
	const root = document.querySelector("[data-teachers]");
	if (!root) return;
 
	const els = {
	  photoImg: root.querySelector(".teachers__photo-img"),
	  name: root.querySelector("[data-teacher-name]"),
	  about: root.querySelector("[data-teacher-about]"),
	  courses: root.querySelector("[data-teacher-courses]"),
	  collage: root.querySelector("[data-teacher-collage]"),
	  prev: root.querySelector("[data-teachers-prev]"),
	  next: root.querySelector("[data-teachers-next]")
	};
 
	const TEACHERS = [
	  {
		 name: "Світлана Ретьман",
		 about:
			"Засновниця Школи та викладач школи. Досвід понад 12 років. Понад 50 сертифікатів різних напрямків.",
		 photo: "./assets/img/sviper_SR-mobile.png",
		 courses: ["Авторський масаж обличчя", "Базовий курс масажу", "Міофасціальний масаж тіла та обличчя"],
		 collage: [
			"./assets/img/teachers_teacher-3.jpg",
			"./assets/img/teachers_teacher-2.jpg",
			"./assets/img/teachers_teacher-4.jpg",
			"./assets/img/teachers_teacher-1.jpg"
		 ]
	  },
	  {
		 name: "Андрій Маслій",
		 about:
			"Практикуючий реабілітолог з медичною освітою. Досвід понад 12 років. 9 сертифікатів підвищення кваліфікації та опанування нових технік.",
		 photo: "./assets/img/teachers_teacher-2.jpg",
		 courses: ["Базові принципи мануальної терапії"],
		 collage: [
			"./assets/img/teachers_teacher-3.jpg",
			"./assets/img/teachers_teacher-1.jpg",
			"./assets/img/teachers_teacher-4.jpg",
			"./assets/img/teachers_teacher-2.jpg"
		 ]
	  },
	  {
		 name: "Олександр Зінчук",
		 about:
			"Практикуючий майстер 5-го дану та єдиний офіційний представник від міжнародної федерації Юмейхо в Україні (головний офіс м.Токіо, Японія). Досвід понад 25 років.",
		 photo: "./assets/img/teachers_teacher-3.jpg",
		 courses: ["Юмейхо терапія"],
		 collage: [
			"./assets/img/teachers_teacher-1.jpg",
			"./assets/img/teachers_teacher-2.jpg",
			"./assets/img/teachers_teacher-4.jpg",
			"./assets/img/teachers_teacher-3.jpg"
		 ]
	  },
	  {
		 name: "Олександра Вакула",
		 about:
			"Практикуючий майстер масажу, остеопат. Досвід понад 11 років. Понад 20 сертифікатів різних напрямків.",
		 photo: "./assets/img/teachers_teacher-4.jpg",
		 courses: ["Вісцеральний масаж"],
		 collage: [
			"./assets/img/teachers_teacher-3.jpg",
			"./assets/img/teachers_teacher-2.jpg",
			"./assets/img/teachers_teacher-1.jpg",
			"./assets/img/teachers_teacher-4.jpg"
		 ]
	  }
	];
 
	let index = 0;
	let isAnimating = false;
 
	const setButtonsDisabled = (v) => {
	  els.prev.disabled = v;
	  els.next.disabled = v;
	};
 
	const renderCourses = (courses) => {
	  els.courses.innerHTML = courses.map((t) => `<span class="teachers__chip">${t}</span>`).join("");
	};
 
	const renderCollage = (imgs) => {
	  els.collage.innerHTML = imgs
		 .slice(0, 3)
		 .map(
			(src, i) => `
			  <div class="teachers-collage__card" style="transition-delay:${i * 40}ms">
				 <img src="${src}" alt="" loading="lazy" />
			  </div>
			`
		 )
		 .join("");
	};
 
	const applyData = (t) => {
	  els.photoImg.src = t.photo;
	  els.photoImg.alt = t.name;
 
	  els.name.textContent = t.name;
	  els.about.textContent = t.about;
 
	  renderCourses(t.courses);
	  renderCollage(t.collage);
	};
 
	const go = (dir) => {
	  if (isAnimating) return;
	  isAnimating = true;
	  setButtonsDisabled(true);
 
	  root.classList.remove("is-entering", "is-entering-active");
	  root.classList.add("is-leaving");
 
	  window.setTimeout(() => {
		 index = (index + dir + TEACHERS.length) % TEACHERS.length;
		 applyData(TEACHERS[index]);
 
		 root.classList.remove("is-leaving");
		 root.classList.add("is-entering");
 
		 requestAnimationFrame(() => {
			root.classList.add("is-entering-active");
		 });
 
		 window.setTimeout(() => {
			root.classList.remove("is-entering", "is-entering-active");
			isAnimating = false;
			setButtonsDisabled(false);
		 }, 360);
	  }, 280);
	};
 
	els.prev.addEventListener("click", () => go(-1));
	els.next.addEventListener("click", () => go(1));
 
	applyData(TEACHERS[index]);
 })();
////////////////////////////////////

// Teachers mobile slider (Swiper)
(() => {
	const sliderEl = document.querySelector("[data-teachers-mobile]");
	if (!sliderEl) return;
 
	const prev = document.querySelector(".teachers-m__arrow--prev");
	const next = document.querySelector(".teachers-m__arrow--next");
 
	// eslint-disable-next-line no-undef
	const swiper = new Swiper(sliderEl, {
	  slidesPerView: 1,
	  spaceBetween: 16,
	  speed: 520,
	  loop: false,
	  autoHeight: true,
	  navigation: {
		 prevEl: prev,
		 nextEl: next
	  },
	  // приятный свайп
	  grabCursor: true,
	  watchOverflow: true
	});
 
	// опционально: дизейблим кнопки на краях (чтобы выглядело аккуратно)
	const syncDisabled = () => {
	  if (!prev || !next) return;
 
	  prev.classList.toggle("is-disabled", swiper.isBeginning);
	  next.classList.toggle("is-disabled", swiper.isEnd);
 
	  prev.disabled = swiper.isBeginning;
	  next.disabled = swiper.isEnd;
	};
 
	swiper.on("init", syncDisabled);
	swiper.on("slideChange", syncDisabled);
	swiper.on("reachBeginning", syncDisabled);
	swiper.on("reachEnd", syncDisabled);
 
	// Swiper init hook sometimes needs explicit call
	syncDisabled();
 })();


//teachers

//_rs-mission
document.addEventListener("DOMContentLoaded", () => {
	const section = document.querySelector(".rs-mission");
	const text = document.querySelector(".rs-mission__text");
	if (!section || !text) return;
 
	// если пользователь просит уменьшить анимации — просто делаем текст “ярким”
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduceMotion) {
	  text.style.backgroundPosition = "0% 0%";
	  return;
	}
 
	let ticking = false;
 
	function clamp01(v) {
	  return Math.max(0, Math.min(1, v));
	}
 
	function update() {
	  ticking = false;
 
	  const rect = section.getBoundingClientRect();
	  const vh = window.innerHeight || document.documentElement.clientHeight;
 
	  // Прогресс “прожига”:
	  // 0 — когда секция ещё не вошла
	  // 1 — когда секция почти полностью прошла экран
	  // Подстрой коэффициенты под вкус
	  const start = vh * 0.85;   // когда начинаем “греть”
	  const end   = -vh * 0.15;  // когда заканчиваем
 
	  const t = (start - rect.top) / (start - end);
	  const progress = clamp01(t);
 
	  // Двигаем фон: справа-низу -> влево-вверх
	  // (как в твоём примере diagonal reveal)
	  const x = 100 - progress * 100;
	  const y = 100 - progress * 100;
 
	  text.style.backgroundPosition = `${x}% ${y}%`;
	}
 
	function onScrollOrResize() {
	  if (ticking) return;
	  ticking = true;
	  requestAnimationFrame(update);
	}
 
	window.addEventListener("scroll", onScrollOrResize, { passive: true });
	window.addEventListener("resize", onScrollOrResize);
 
	// на старт
	update();
 
	// если Fancybox открывается/закрывается и меняет overflow/скролл — обновим ещё раз
	document.addEventListener("visibilitychange", update);
 });
//_rs-mission

/* =====================================
   Product page JS (fixed Fancybox gallery)
   - Gallery slider (thumbs + prev/next + swipe)
   - Fancybox opens on main click with FULL gallery
   - Qty counter (+ / - / sanitize)

   Supports:
   - Fancybox v3 (jQuery): $.fancybox.open()
   - Fancybox v4+: Fancybox.show()
===================================== */

document.addEventListener("DOMContentLoaded", () => {
	initProductGallery();
	initQtyCounter();
 });
 
 /* =========================
	 GALLERY + FANCYBOX (FIXED)
 ========================= */
 function initProductGallery() {
	const root = document.querySelector("[data-gallery]");
	if (!root) return;
 
	const mainLink = root.querySelector(".product-gallery__main");
	const mainImg = root.querySelector(".product-gallery__main-img");
 
	const thumbsWrap = root.querySelector("[data-thumbs]");
	const thumbs = thumbsWrap ? Array.from(thumbsWrap.querySelectorAll("[data-thumb]")) : [];
 
	const prevBtn = root.querySelector("[data-gallery-prev]");
	const nextBtn = root.querySelector("[data-gallery-next]");
 
	if (!mainLink || !mainImg || !thumbs.length) return;
 
	// Fancybox group name from HTML (important)
	const fancyGroup = mainLink.getAttribute("data-fancybox") || "product-gallery";
 
	// Build slides from thumbs (source of truth)
	const slides = thumbs
	  .map((btn) => ({
		 large: btn.getAttribute("data-large") || "",
		 // prefer explicit fancybox src, else large
		 src: btn.getAttribute("data-fancybox-src") || btn.getAttribute("data-large") || "",
		 caption:
			btn.getAttribute("data-caption") ||
			mainLink.getAttribute("data-caption") ||
			"",
	  }))
	  .filter((s) => s.src);
 
	if (!slides.length) return;
 
	// Determine initial index
	let currentIndex = Math.max(
	  0,
	  thumbs.findIndex((t) => t.classList.contains("is-active"))
	);
 
	const mainSrc = mainImg.getAttribute("src") || "";
	const byMain = slides.findIndex((s) => s.large === mainSrc || s.src === mainSrc);
	if (byMain >= 0) currentIndex = byMain;
 
	const setActiveThumb = (idx) => {
	  thumbs.forEach((t) => t.classList.remove("is-active"));
	  if (thumbs[idx]) thumbs[idx].classList.add("is-active");
	};
 
	const setMain = (idx, { focusThumb = true } = {}) => {
	  const slide = slides[idx];
	  if (!slide) return;
 
	  mainImg.src = slide.large || slide.src;
	  mainLink.href = slide.src;
 
	  if (slide.caption) mainLink.setAttribute("data-caption", slide.caption);
 
	  currentIndex = idx;
	  setActiveThumb(idx);
 
	  if (focusThumb && thumbsWrap && thumbs[idx]) {
		 thumbs[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
	  }
	};
 
	const go = (dir) => {
	  const next = (currentIndex + dir + slides.length) % slides.length;
	  setMain(next);
	};
 
	// Init
	setMain(currentIndex, { focusThumb: false });
 
	// Thumb click
	thumbs.forEach((btn, idx) => {
	  btn.addEventListener("click", () => setMain(idx));
	});
 
	// Prev/Next
	if (prevBtn) prevBtn.addEventListener("click", () => go(-1));
	if (nextBtn) nextBtn.addEventListener("click", () => go(1));
 
	// Keyboard
	document.addEventListener("keydown", (e) => {
	  const tag = e.target?.tagName?.toLowerCase?.() || "";
	  if (tag === "input" || tag === "textarea") return;
 
	  if (e.key === "ArrowLeft") go(-1);
	  if (e.key === "ArrowRight") go(1);
	});
 
	// Swipe on main (doesn't block click for fancybox)
	let startX = 0;
	let startY = 0;
	let tracking = false;
 
	mainLink.addEventListener(
	  "touchstart",
	  (e) => {
		 if (!e.touches || e.touches.length !== 1) return;
		 tracking = true;
		 startX = e.touches[0].clientX;
		 startY = e.touches[0].clientY;
	  },
	  { passive: true }
	);
 
	mainLink.addEventListener(
	  "touchend",
	  (e) => {
		 if (!tracking) return;
		 tracking = false;
 
		 const touch = e.changedTouches?.[0];
		 if (!touch) return;
 
		 const dx = touch.clientX - startX;
		 const dy = touch.clientY - startY;
 
		 if (Math.abs(dx) > 40 && Math.abs(dy) < 60) {
			if (dx < 0) go(1);
			else go(-1);
		 }
	  },
	  { passive: true }
	);
 
	// =========================
	// FANCYBOX OPEN (FULL GALLERY)
	// =========================
	mainLink.addEventListener("click", (e) => {
	  // If Fancybox exists — open it programmatically with full set
	  const hasJqFancybox = !!(window.jQuery && window.jQuery.fancybox);
	  const hasModernFancybox = !!window.Fancybox;
 
	  if (!hasJqFancybox && !hasModernFancybox) {
		 // fallback: normal link open
		 return;
	  }
 
	  e.preventDefault();
 
	  // items format for both versions
	  const items = slides.map((s) => ({
		 src: s.src,
		 type: "image",
		 caption: s.caption || "",
		 // for fancybox v3 compatibility (it accepts src)
		 opts: { caption: s.caption || "" },
	  }));
 
	  // Fancybox v3 (jQuery)
	  if (hasJqFancybox) {
		 window.jQuery.fancybox.open(
			items.map((it) => ({
			  src: it.src,
			  opts: { caption: it.caption || "" },
			})),
			{
			  loop: true,
			  // group name is optional here, but keeps semantic
			  baseClass: `fbx-${fancyGroup}`,
			},
			currentIndex
		 );
		 return;
	  }
 
	  // Fancybox v4+
	  if (hasModernFancybox) {
		 window.Fancybox.show(
			items.map((it) => ({
			  src: it.src,
			  type: "image",
			  caption: it.caption || "",
			})),
			{
			  startIndex: currentIndex,
			  infinite: true,
			}
		 );
	  }
	});
 }
 
 // =====================================
// PRODUCT QTY COUNTER (+ / -) for .product-qty

(function () {
	const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
 
	function initQty(root) {
	  const minus = root.querySelector('.product-qty__btn--minus');
	  const plus = root.querySelector('.product-qty__btn--plus');
	  const input = root.querySelector('.product-qty__input');
 
	  if (!input || !minus || !plus) return;
 
	  const min = Number(root.getAttribute('data-min') || 1);
	  const max = Number(root.getAttribute('data-max') || 99);
	  const step = Number(root.getAttribute('data-step') || 1);
 
	  // ensure input settings
	  input.setAttribute('inputmode', 'numeric');
	  input.setAttribute('autocomplete', 'off');
	  input.setAttribute('aria-live', 'polite');
 
	  const getValue = () => {
		 const raw = String(input.value || '').replace(/[^\d]/g, '');
		 const num = raw === '' ? min : Number(raw);
		 return clamp(num, min, max);
	  };
 
	  const setValue = (val) => {
		 const v = clamp(val, min, max);
		 input.value = String(v);
		 input.dispatchEvent(new CustomEvent('qty:change', { bubbles: true, detail: { value: v } }));
	  };
 
	  // init default
	  setValue(getValue());
 
	  minus.addEventListener('click', (e) => {
		 e.preventDefault();
		 setValue(getValue() - step);
	  });
 
	  plus.addEventListener('click', (e) => {
		 e.preventDefault();
		 setValue(getValue() + step);
	  });
 
	  // sanitize typing
	  input.addEventListener('input', () => {
		 const raw = String(input.value || '').replace(/[^\d]/g, '');
		 input.value = raw; // keep only digits while typing
	  });
 
	  input.addEventListener('blur', () => {
		 setValue(getValue());
	  });
 
	  // allow arrows
	  input.addEventListener('keydown', (e) => {
		 if (e.key === 'ArrowUp') {
			e.preventDefault();
			setValue(getValue() + step);
		 }
		 if (e.key === 'ArrowDown') {
			e.preventDefault();
			setValue(getValue() - step);
		 }
		 if (e.key === 'Enter') {
			input.blur();
		 }
	  });
	}
 
	function boot() {
	  document.querySelectorAll('[data-qty]').forEach(initQty);
	}
 
	if (document.readyState === 'loading') {
	  document.addEventListener('DOMContentLoaded', boot);
	} else {
	  boot();
	}
 })();
 // PRODUCT QTY COUNTER (+ / -) for .product-qty

 //////////

 // ===============================
// Splide v3: Main + Thumbnails (no Fancybox)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
	const mainEl = document.getElementById('product-main');
	const thumbsEl = document.getElementById('product-thumbs');
	if (!mainEl || !thumbsEl) return;
 
	const main = new Splide('#product-main', {
	  type: 'slide',
	  rewind: true,
	  pagination: false,
	  arrows: true,
	  drag: true,
	  speed: 450,
	  gap: '12px',
	});
 
	const thumbnails = new Splide('#product-thumbs', {
		fixedWidth: 92,
		fixedHeight: 92,
		gap: 10,
		rewind: true,
		pagination: false,
		arrows: false,
		isNavigation: true,
		drag: true,
	  breakpoints: {
		 600: {
			fixedWidth: 72,
			fixedHeight: 72,
			gap: 8,
		 },
		 420: {
			fixedWidth: 64,
			fixedHeight: 64,
			gap: 8,
		 },
	  },
	});
 
	main.sync(thumbnails); // важно: до mount()
	thumbnails.mount();
	main.mount();
 });

 //pop-up courses
 $(document).on('click', '.js-course-popup-trigger', function (e) {
	e.preventDefault();

	var $trigger = $(this);

	var courseId = $trigger.data('course-id') || '';
	var courseName = $trigger.data('course-name') || 'Назва курсу';
	var courseFormat = $trigger.data('course-format') || '—';

	$('#coursePopupTitle').text(courseName);
	$('#coursePopupFormat').text(courseFormat);

	$('#coursePopupId').val(courseId);
	$('#coursePopupNameField').val(courseName);
	$('#coursePopupFormatField').val(courseFormat);

	if ($.fancybox) {
		$.fancybox.open({
			src: '#courseSignupPopup',
			type: 'inline',
			touch: false
		});
	} else {
		$('#courseSignupPopup').show();
	}
});
 //pop-up courses
