// src/content/content.js
// Injected on every page — detects text selection and shows floating popup

(function () {
  'use strict';

  // Prevent double injection
  if (window.__highlightVaultInjected) return;
  window.__highlightVaultInjected = true;

  let popup = null;
  let hideTimer = null;
  let currentSelection = null;

  // ── Create the floating popup element ──────────────────────────────────────
  function createPopup() {
    const el = document.createElement('div');
    el.id = 'hv-popup';
    el.setAttribute('data-hv', 'true');
    el.innerHTML = `
      <button id="hv-save-btn" title="Save to HighlightVault">
        <span class="hv-icon">💾</span>
        <span class="hv-label">Save</span>
      </button>
      <div class="hv-divider"></div>
      <button id="hv-dismiss-btn" title="Dismiss">
        <span class="hv-icon">✖</span>
      </button>
      <div id="hv-toast" class="hv-toast"></div>
    `;
    document.body.appendChild(el);

    el.querySelector('#hv-save-btn').addEventListener('click', handleSave);
    el.querySelector('#hv-dismiss-btn').addEventListener('click', hidePopup);

    return el;
  }

  // ── Position popup near the selection ──────────────────────────────────────
  function positionPopup(rect) {
    if (!popup) return;

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const popupWidth = 130;
    const popupHeight = 40;
    const gap = 10;

    let top = rect.top + scrollY - popupHeight - gap;
    let left = rect.left + scrollX + rect.width / 2 - popupWidth / 2;

    // Keep within viewport
    if (top < scrollY + 8) {
      top = rect.bottom + scrollY + gap;
    }
    left = Math.max(scrollX + 8, Math.min(left, scrollX + window.innerWidth - popupWidth - 8));

    popup.style.top = `${top}px`;
    popup.style.left = `${left}px`;
  }

  // ── Show the popup ──────────────────────────────────────────────────────────
  function showPopup(rect) {
    if (!popup) {
      popup = createPopup();
    }
    positionPopup(rect);
    popup.classList.remove('hv-hidden', 'hv-hiding');
    popup.classList.add('hv-visible');
  }

  // ── Hide the popup ──────────────────────────────────────────────────────────
  function hidePopup() {
    if (!popup) return;
    popup.classList.add('hv-hiding');
    setTimeout(() => {
      if (popup) {
        popup.classList.remove('hv-visible', 'hv-hiding');
        popup.classList.add('hv-hidden');
      }
    }, 250);
  }

  // ── Show inline toast ────────────────────────────────────────────────────────
  function showToast(message, type = 'success') {
    const toast = document.getElementById('hv-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `hv-toast hv-toast-${type} hv-toast-show`;
    setTimeout(() => {
      toast.className = 'hv-toast';
    }, 2000);
  }

  // ── Handle save action ──────────────────────────────────────────────────────
  async function handleSave() {
    if (!currentSelection) return;

    const saveBtn = document.getElementById('hv-save-btn');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.querySelector('.hv-label').textContent = 'Saving…';
    }

    try {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            type: 'SAVE_HIGHLIGHT',
            payload: {
              text: currentSelection,
              url: window.location.href,
              title: document.title,
            },
          },
          (res) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(res);
            }
          }
        );
      });

      if (response?.success) {
        showToast('✓ Saved!', 'success');
        setTimeout(hidePopup, 1200);
      } else {
        throw new Error(response?.error || 'Unknown error');
      }
    } catch (err) {
      console.error('[HighlightVault] Save error:', err);
      showToast('Save failed', 'error');
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.querySelector('.hv-label').textContent = 'Save';
      }
    }
  }

  // ── Selection change listener ────────────────────────────────────────────────
  document.addEventListener('mouseup', (e) => {
    // Ignore clicks on our own popup
    if (e.target?.closest?.('[data-hv="true"]')) return;

    clearTimeout(hideTimer);

    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString()?.trim();

      if (text && text.length > 2) {
        currentSelection = text;
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        showPopup(rect);
      } else {
        hideTimer = setTimeout(hidePopup, 200);
      }
    }, 10);
  });

  // Hide when clicking away
  document.addEventListener('mousedown', (e) => {
    if (e.target?.closest?.('[data-hv="true"]')) return;
    const selection = window.getSelection()?.toString()?.trim();
    if (!selection) {
      hideTimer = setTimeout(hidePopup, 150);
    }
  });

  // Hide on scroll
  document.addEventListener('scroll', () => {
    hideTimer = setTimeout(hidePopup, 100);
  }, { passive: true });

  // Hide on keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePopup();
  });

  // Listen for context-menu save confirmation
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'HIGHLIGHT_SAVED_CONTEXT_MENU') {
      // Could show a toast here too
    }
  });
})();
