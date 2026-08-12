/* ==========================================================================
   contact.js — Formspree submission with real success and error states.

   ┌──────────────────────────────────────────────────────────────────────┐
   │ PLACEHOLDER — REPLACE BEFORE LAUNCH                                  │
   │                                                                      │
   │ 1. Create a free form at https://formspree.io                        │
   │ 2. Copy the endpoint it gives you (looks like https://formspree.io/  │
   │    f/abcdwxyz)                                                       │
   │ 3. Paste it into FORM_ENDPOINT below.                                │
   │                                                                      │
   │ Until that's done the form stays enabled but shows an honest         │
   │ "not connected yet" error instead of pretending to send. It must     │
   │ never look like it worked when it didn't.                            │
   └──────────────────────────────────────────────────────────────────────┘
   ========================================================================== */

(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://formspree.io/f/REPLACE_ME'; // PLACEHOLDER

  var form = document.getElementById('contact-form');
  if (!form) return;

  var status    = document.getElementById('form-status');
  var statusMsg = document.getElementById('form-status-msg');
  var submitBtn = form.querySelector('[type="submit"]');
  var btnLabel  = submitBtn ? submitBtn.querySelector('.btn__label') : null;
  var defaultLabel = btnLabel ? btnLabel.textContent : 'Send';

  var isConfigured = FORM_ENDPOINT.indexOf('REPLACE_ME') === -1;

  function setStatus(state, message) {
    if (!status) return;
    status.setAttribute('data-state', state);
    if (statusMsg) statusMsg.textContent = message;
    var icon = status.querySelector('.form-status__icon');
    if (icon) icon.textContent = state === 'success' ? '✓' : '!';
    // Move focus so screen readers and keyboard users land on the result.
    status.setAttribute('tabindex', '-1');
    status.focus({ preventScroll: false });
  }

  function clearStatus() {
    if (status) status.removeAttribute('data-state');
  }

  function setBusy(busy) {
    if (!submitBtn) return;
    submitBtn.setAttribute('aria-busy', String(busy));
    submitBtn.disabled = busy;
    if (btnLabel) btnLabel.textContent = busy ? 'Sending…' : defaultLabel;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearStatus();

    // Let the browser's native validation UI run first.
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      var firstBad = form.querySelector(':invalid');
      if (firstBad) firstBad.focus();
      return;
    }

    // Honeypot: a bot filled the hidden field. Fake a success so it doesn't
    // learn anything, and send nothing.
    if (form.elements['_gotcha'] && form.elements['_gotcha'].value) {
      setStatus('success', 'Thanks — your message is on its way.');
      form.reset();
      return;
    }

    if (!isConfigured) {
      setStatus(
        'error',
        'This form isn’t connected to its mail service yet. ' +
        'Email me directly in the meantime — the address is in the footer.'
      );
      return;
    }

    setBusy(true);

    var data = new FormData(form);

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; })
          .then(function (body) { return { ok: res.ok, body: body }; });
      })
      .then(function (result) {
        if (result.ok) {
          setStatus('success', 'Got it. I’ll get back to you within one business day.');
          form.reset();
          form.classList.remove('was-validated');
          return;
        }

        // Formspree returns a structured error list when it can.
        var detail = '';
        if (result.body && Array.isArray(result.body.errors)) {
          detail = result.body.errors.map(function (err) { return err.message; }).join(' ');
        }
        setStatus(
          'error',
          detail || 'Something went wrong sending that. Try again, or email me directly — ' +
                    'the address is in the footer.'
        );
      })
      .catch(function () {
        // Network failure, offline, blocked request.
        setStatus(
          'error',
          'That didn’t send — looks like a connection problem. Check your network and ' +
          'try again, or email me directly.'
        );
      })
      .finally(function () {
        setBusy(false);
      });
  });
})();
