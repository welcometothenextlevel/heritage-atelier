/* =============================================================
   Heritage Atelier — main.js
   Vanilla JS. No dependencies.
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Sticky header shrink
     --------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     Mobile navigation overlay
     --------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navOverlay = document.getElementById('nav-overlay');

  function setNav(open) {
    document.body.classList.toggle('nav-open', open);
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (navOverlay) navOverlay.setAttribute('aria-hidden', String(!open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function () {
      setNav(!document.body.classList.contains('nav-open'));
    });
    navOverlay.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        setNav(false);
        navToggle.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900 && document.body.classList.contains('nav-open')) setNav(false);
    });
  }

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if (!revealables.length) {
    /* nothing to do */
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     Accessible modal: enquiry
     --------------------------------------------------------- */
  var modal = document.getElementById('enquiry-modal');
  var lastFocused = null;

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function trapFocus(e) {
    if (e.key !== 'Tab' || !modal || !modal.classList.contains('is-open')) return;
    var nodes = modal.querySelectorAll(FOCUSABLE);
    if (!nodes.length) return;
    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', trapFocus, true);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function openModal(data) {
    if (!modal) return;
    lastFocused = document.activeElement;

    var img = modal.querySelector('[data-modal-image]');
    var name = modal.querySelector('[data-modal-name]');
    var house = modal.querySelector('[data-modal-house]');
    var price = modal.querySelector('[data-modal-price]');
    var hidden = modal.querySelector('[data-modal-field]');
    var form = modal.querySelector('form');
    var success = modal.querySelector('.form-success');

    if (img) { img.src = data.image; img.alt = data.alt || data.name; }
    if (name) name.textContent = data.name;
    if (house) house.textContent = data.house;
    if (price) price.textContent = data.price;
    if (hidden) hidden.value = data.name;
    if (form) { form.reset(); form.hidden = false; if (hidden) hidden.value = data.name; }
    if (success) success.classList.remove('is-visible');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', trapFocus, true);

    var target = modal.querySelector('input, textarea, button');
    if (target) target.focus();
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-enquire]');
    if (trigger) {
      e.preventDefault();
      openModal({
        name:  trigger.getAttribute('data-name') || 'Heritage Atelier piece',
        house: trigger.getAttribute('data-house') || 'Heritage Atelier',
        price: trigger.getAttribute('data-price') || '',
        image: trigger.getAttribute('data-image') || '',
        alt:   trigger.getAttribute('data-alt') || ''
      });
      return;
    }
    if (e.target.closest('[data-modal-close]')) {
      e.preventDefault();
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------------------------------------------------------
     Inline form success states (no backend)
     --------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-inline-success]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var id = form.getAttribute('data-inline-success');
      var panel = document.getElementById(id);
      if (panel) {
        var nameField = form.querySelector('[name="name"]');
        var slot = panel.querySelector('[data-success-name]');
        if (slot) slot.textContent = nameField && nameField.value ? nameField.value.split(' ')[0] : 'there';
        panel.classList.add('is-visible');
        panel.setAttribute('tabindex', '-1');
        panel.focus({ preventScroll: false });
      }
      if (form.getAttribute('data-hide-on-success') !== 'false') form.hidden = true;
      form.reset();
    });
  });

  /* ---------------------------------------------------------
     Shop filtering
     --------------------------------------------------------- */
  var chipBar = document.querySelector('[data-filter-bar]');
  if (chipBar) {
    var cards = document.querySelectorAll('[data-house-key]');
    var counter = document.querySelector('[data-result-count]');

    var applyFilter = function (key) {
      var shown = 0;
      Array.prototype.forEach.call(cards, function (card) {
        var match = key === 'all' || card.getAttribute('data-house-key') === key;
        card.hidden = !match;
        if (match) shown++;
      });
      if (counter) counter.textContent = shown + (shown === 1 ? ' piece' : ' pieces');
    };

    chipBar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      Array.prototype.forEach.call(chipBar.querySelectorAll('.chip'), function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      applyFilter(chip.getAttribute('data-filter'));
    });

    applyFilter('all');
  }

  /* ---------------------------------------------------------
     Heritage Gift Finder
     --------------------------------------------------------- */
  var finder = document.getElementById('gift-finder');
  if (finder && window.HA_PRODUCTS) {
    var answers = { recipient: null, occasion: null, budget: null };
    var steps = finder.querySelectorAll('.finder-step');
    var bar = finder.querySelector('.finder-progress .bar i');
    var label = finder.querySelector('[data-step-label]');
    var results = document.getElementById('finder-results');
    var resultGrid = document.getElementById('finder-result-grid');
    var resultNote = document.getElementById('finder-result-note');
    var current = 0;

    var showStep = function (i) {
      current = i;
      Array.prototype.forEach.call(steps, function (s, n) {
        s.classList.toggle('is-active', n === i);
      });
      if (bar) bar.style.width = ((i + 1) / steps.length) * 100 + '%';
      if (label) label.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
      if (results) results.classList.remove('is-visible');
    };

    finder.addEventListener('click', function (e) {
      var opt = e.target.closest('.option');
      if (opt) {
        var group = opt.closest('.option-grid');
        Array.prototype.forEach.call(group.querySelectorAll('.option'), function (o) {
          o.setAttribute('aria-pressed', String(o === opt));
        });
        answers[group.getAttribute('data-answer')] = opt.getAttribute('data-value');
        var next = finder.querySelector('.finder-step.is-active [data-next]');
        if (next) next.disabled = false;
        return;
      }

      if (e.target.closest('[data-next]')) {
        if (current < steps.length - 1) showStep(current + 1);
        return;
      }
      if (e.target.closest('[data-back]')) {
        if (current > 0) showStep(current - 1);
        return;
      }
      if (e.target.closest('[data-reveal]')) {
        revealMatches();
        return;
      }
      if (e.target.closest('[data-restart]')) {
        answers = { recipient: null, occasion: null, budget: null };
        Array.prototype.forEach.call(finder.querySelectorAll('.option'), function (o) {
          o.setAttribute('aria-pressed', 'false');
        });
        Array.prototype.forEach.call(finder.querySelectorAll('[data-next]'), function (b) { b.disabled = true; });
        showStep(0);
        window.scrollTo({ top: finder.offsetTop - 90, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });

    function scoreProduct(p) {
      var score = 0;
      if (answers.recipient && p.recipients.indexOf(answers.recipient) !== -1) score += 3;
      if (answers.occasion && p.occasions.indexOf(answers.occasion) !== -1) score += 2;
      if (answers.budget) {
        var b = answers.budget;
        var inBand =
          (b === 'under-75' && p.price < 75) ||
          (b === '75-150' && p.price >= 75 && p.price <= 150) ||
          (b === '150-plus' && p.price > 150);
        if (inBand) score += 2;
      }
      return score;
    }

    function revealMatches() {
      if (!resultGrid) return;
      var scored = window.HA_PRODUCTS.map(function (p) {
        return { p: p, s: scoreProduct(p) };
      }).filter(function (x) { return x.s >= 3; })
        .sort(function (a, b) { return b.s - a.s || a.p.price - b.p.price; });

      if (scored.length < 3) {
        scored = window.HA_PRODUCTS.map(function (p) { return { p: p, s: scoreProduct(p) }; })
          .sort(function (a, b) { return b.s - a.s || a.p.price - b.p.price; });
      }

      var picks = scored.slice(0, 6).map(function (x) { return x.p; });

      resultGrid.innerHTML = picks.map(function (p) {
        return (
          '<article class="product">' +
            '<figure><img src="assets/images/' + p.image + '" alt="' + p.alt + '" width="1000" height="1250" loading="lazy"></figure>' +
            '<span class="product-house">' + p.house + '</span>' +
            '<h3>' + p.name + '</h3>' +
            '<p>' + p.blurb + '</p>' +
            '<div class="product-foot">' +
              '<span class="price">$' + p.price + ' <span>AUD</span></span>' +
              '<button type="button" class="btn btn--enquire" data-enquire data-name="' + p.name +
                '" data-house="' + p.house + '" data-price="$' + p.price + ' AUD" data-image="assets/images/' + p.image +
                '" data-alt="' + p.alt + '">Enquire</button>' +
            '</div>' +
          '</article>'
        );
      }).join('');

      if (resultNote) {
        resultNote.textContent = 'Six pieces chosen for ' + phraseFor('recipient', answers.recipient) +
          ', for ' + phraseFor('occasion', answers.occasion) + '.';
      }

      results.classList.add('is-visible');
      results.setAttribute('tabindex', '-1');
      results.focus({ preventScroll: true });
      results.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }

    /* Reads the option's data-phrase so the sentence stays grammatical —
       "Pappou" stays capitalised, "For Her" becomes "her". */
    function phraseFor(group, value) {
      var el = finder.querySelector('[data-answer="' + group + '"] .option[data-value="' + value + '"]');
      var phrase = el && el.getAttribute('data-phrase');
      if (phrase) return phrase;
      return group === 'occasion' ? 'the occasion' : 'someone special';
    }

    showStep(0);
  }
})();
