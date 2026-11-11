/**
 * Mom's Kitchen Cookbook — Application Logic
 * Implements accessible modal handling, serving scaler, kitchen cook mode,
 * smart paste import, Web Audio timer, and local persistence.
 */

// State
let recipes = [];
let currentCategory = 'all';
let searchQuery = '';
let activeRecipe = null;
let currentServings = 4;
let kitchenStepIndex = 0;

// Kitchen Timer State
let timerDuration = 0; // in seconds
let timerRemaining = 0;
let timerInterval = null;
let isTimerRunning = false;

// Audio Context for Alarm
let audioCtx = null;

// DOM Elements
const gridEl = document.getElementById('recipeGrid');
const emptyStateEl = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const btnClearSearch = document.getElementById('btnClearSearch');
const categoryPillsEl = document.getElementById('categoryPills');
const recipesFoundCount = document.getElementById('recipesFoundCount');
const recipesHeading = document.getElementById('recipesHeading');
const countAllEl = document.getElementById('countAll');
const countFavsEl = document.getElementById('countFavs');

// Modals
const recipeDetailDialog = document.getElementById('recipeDetailDialog');
const recipeDetailContent = document.getElementById('recipeDetailContent');
const kitchenModeDialog = document.getElementById('kitchenModeDialog');
const recipeFormDialog = document.getElementById('recipeFormDialog');
const quickPasteDialog = document.getElementById('quickPasteDialog');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadStoredRecipes();
  setupTextSizeControls();
  setupDialogHandlers();
  setupSearchAndFilters();
  setupFormModals();
  setupQuickPaste();
  setupDataBackupControls();
  renderRecipes();
});

/* ==========================================================================
   1. Data Persistence & Loading
   ========================================================================== */

const CURRENT_DATA_VERSION = 2;

function loadStoredRecipes() {
  const version = parseInt(localStorage.getItem('moms_cookbook_version') || '1', 10);
  const stored = localStorage.getItem('moms_cookbook_recipes');

  if (version < CURRENT_DATA_VERSION || !stored) {
    recipes = [...DEFAULT_RECIPES];
    localStorage.setItem('moms_cookbook_version', CURRENT_DATA_VERSION.toString());
    saveRecipes();
    return;
  }

  try {
    const parsed = JSON.parse(stored);
    if (parsed.some(r => r.id === 'classic-lasagna') || parsed.length === 0) {
      recipes = [...DEFAULT_RECIPES];
      saveRecipes();
    } else {
      recipes = parsed;
    }
  } catch (e) {
    console.warn('Could not parse stored recipes, using default seed:', e);
    recipes = [...DEFAULT_RECIPES];
    saveRecipes();
  }
}

function saveRecipes() {
  localStorage.setItem('moms_cookbook_recipes', JSON.stringify(recipes));
  updateCounts();
}

function updateCounts() {
  if (countAllEl) countAllEl.textContent = recipes.length;
  if (countFavsEl) {
    const favCount = recipes.filter(r => r.isFavorite).length;
    countFavsEl.textContent = favCount;
  }
}

/* ==========================================================================
   2. Accessible Dialog & Modern Web Guidance Fallback
   ========================================================================== */

function setupDialogHandlers() {
  // Wire all close buttons with data-close-dialog attribute
  document.querySelectorAll('[data-close-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialogId = btn.getAttribute('data-close-dialog');
      const dialog = document.getElementById(dialogId);
      if (dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  });

  // Modern Web Guidance: Light-dismiss fallback for browsers without native closedBy support
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    document.querySelectorAll('dialog[closedby="any"]').forEach(dialog => {
      dialog.addEventListener('click', (event) => {
        // Clicks on child elements inside dialog are ignored
        if (event.target !== dialog) return;

        // Check if click was on backdrop outside bounding rect
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
          dialog.close();
        }
      });
    });
  }

  // Kitchen Mode keyboard arrows
  kitchenModeDialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextKitchenStep();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevKitchenStep();
    }
  });
}

/* ==========================================================================
   3. Text Size Adjuster (for Mom's Comfort)
   ========================================================================== */

function setupTextSizeControls() {
  const btnSm = document.getElementById('btnFontSm');
  const btnMd = document.getElementById('btnFontMd');
  const btnLg = document.getElementById('btnFontLg');
  const buttons = [btnSm, btnMd, btnLg];

  const savedSize = localStorage.getItem('moms_cookbook_fontsize') || 'font-size-md';
  document.body.className = savedSize;

  function setSize(sizeClass, activeBtn) {
    document.body.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg');
    document.body.classList.add(sizeClass);
    localStorage.setItem('moms_cookbook_fontsize', sizeClass);
    buttons.forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  if (savedSize === 'font-size-sm') btnSm.classList.add('active');
  else if (savedSize === 'font-size-lg') btnLg.classList.add('active');
  else btnMd.classList.add('active');

  btnSm.addEventListener('click', () => setSize('font-size-sm', btnSm));
  btnMd.addEventListener('click', () => setSize('font-size-md', btnMd));
  btnLg.addEventListener('click', () => setSize('font-size-lg', btnLg));
}

/* ==========================================================================
   4. Search and Filters
   ========================================================================== */

function setupSearchAndFilters() {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    btnClearSearch.classList.toggle('hidden', searchQuery.length === 0);
    renderRecipes();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    btnClearSearch.classList.add('hidden');
    searchInput.focus();
    renderRecipes();
  });

  categoryPillsEl.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    categoryPillsEl.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    currentCategory = pill.getAttribute('data-category');
    renderRecipes();
  });

  document.getElementById('btnResetFilters')?.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    btnClearSearch.classList.add('hidden');
    currentCategory = 'all';
    categoryPillsEl.querySelectorAll('.pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-category') === 'all');
    });
    renderRecipes();
  });
}

function getFilteredRecipes() {
  return recipes.filter(recipe => {
    // Category match (supports primary category and tags like Paneer & Tofu or Soya Specials)
    if (currentCategory === 'favorites' && !recipe.isFavorite) return false;
    if (currentCategory !== 'all' && currentCategory !== 'favorites') {
      const matchCat = recipe.category && recipe.category.toLowerCase() === currentCategory.toLowerCase();
      const matchTag = (recipe.tags || []).some(t => t.toLowerCase() === currentCategory.toLowerCase());
      if (!matchCat && !matchTag) return false;
    }

    // Search query match
    if (searchQuery) {
      const titleMatch = recipe.title.toLowerCase().includes(searchQuery);
      const subtitleMatch = (recipe.subtitle || '').toLowerCase().includes(searchQuery);
      const categoryMatch = (recipe.category || '').toLowerCase().includes(searchQuery);
      const tagMatch = (recipe.tags || []).some(t => t.toLowerCase().includes(searchQuery));
      const ingredientMatch = (recipe.ingredients || []).some(i => i.name.toLowerCase().includes(searchQuery));
      const tipMatch = (recipe.tip || '').toLowerCase().includes(searchQuery);
      return titleMatch || subtitleMatch || categoryMatch || tagMatch || ingredientMatch || tipMatch;
    }

    return true;
  });
}

/* ==========================================================================
   5. Recipe Grid Rendering
   ========================================================================== */

function renderRecipes() {
  updateCounts();
  const filtered = getFilteredRecipes();

  // Update counts and headers
  if (currentCategory === 'favorites') {
    recipesHeading.textContent = 'Favorite Recipes ❤️';
  } else if (currentCategory === 'all') {
    recipesHeading.textContent = 'All Recipes';
  } else {
    recipesHeading.textContent = currentCategory;
  }

  recipesFoundCount.textContent = `Showing ${filtered.length} of ${recipes.length} recipe${recipes.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    gridEl.innerHTML = '';
    emptyStateEl.classList.remove('hidden');
    return;
  }

  emptyStateEl.classList.add('hidden');
  gridEl.innerHTML = filtered.map(recipe => {
    const isFav = recipe.isFavorite;
    const defaultImg = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
    const imgSrc = recipe.image || defaultImg;

    return `
      <article class="recipe-card" data-recipe-id="${recipe.id}">
        <div class="card-media">
          <img src="${imgSrc}" alt="${escapeHtml(recipe.title)}" class="card-img" loading="lazy" onerror="this.src='${defaultImg}'">
          <span class="card-category-badge">${escapeHtml(recipe.category || 'Kitchen')}</span>
          <button type="button" class="btn-fav-card ${isFav ? 'is-active' : ''}" data-fav-id="${recipe.id}" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="card-body">
          <h4 class="card-title">${escapeHtml(recipe.title)}</h4>
          <p class="card-desc">${escapeHtml(recipe.subtitle || 'A delicious, high-protein homemade meal.')}</p>
          <div class="card-meta">
            <span class="card-meta-item">⏱️ ${escapeHtml(recipe.totalTime || recipe.cookTime || '10 mins')}</span>
            ${recipe.calories ? `<span class="card-meta-item card-calorie-badge">🔥 ${escapeHtml(recipe.calories)}</span>` : ''}
            ${recipe.macros && recipe.macros.protein ? `<span class="card-meta-item card-protein-badge">💪 ${escapeHtml(recipe.macros.protein)}</span>` : ''}
            <span class="card-meta-item">🍽️ ${recipe.servings || 1} serv</span>
          </div>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-secondary btn-view-recipe" data-view-id="${recipe.id}">
            View Recipe
          </button>
          <button type="button" class="btn btn-primary btn-quick-cook" data-cook-id="${recipe.id}">
            🍳 Cook
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach card event listeners
  gridEl.querySelectorAll('.recipe-card').forEach(card => {
    const id = card.getAttribute('data-recipe-id');

    card.querySelector('.btn-fav-card')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(id);
    });

    card.querySelector('.btn-view-recipe')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openRecipeDetail(id);
    });

    card.querySelector('.btn-quick-cook')?.addEventListener('click', (e) => {
      e.stopPropagation();
      openKitchenCookMode(id);
    });

    card.addEventListener('click', () => {
      openRecipeDetail(id);
    });
  });
}

function toggleFavorite(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;
  recipe.isFavorite = !recipe.isFavorite;
  saveRecipes();
  renderRecipes();

  // If detail view is open for this recipe, update heart button
  if (activeRecipe && activeRecipe.id === recipeId) {
    const detailFavBtn = document.getElementById('btnDetailFav');
    if (detailFavBtn) {
      detailFavBtn.innerHTML = recipe.isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites';
    }
  }
}

/* ==========================================================================
   6. Recipe Detail View & Servings Scaler
   ========================================================================== */

function openRecipeDetail(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  activeRecipe = recipe;
  currentServings = recipe.servings || 4;

  renderDetailContent();
  recipeDetailDialog.showModal();
}

function renderDetailContent() {
  if (!activeRecipe) return;

  const defaultImg = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
  const imgSrc = activeRecipe.image || defaultImg;
  const originalServings = activeRecipe.servings || 4;
  const ratio = currentServings / originalServings;

  recipeDetailContent.innerHTML = `
    <div class="detail-hero-group">
      <div class="detail-meta-pills">
        <span class="detail-pill primary">${escapeHtml(activeRecipe.category || 'Family Classic')}</span>
        ${(activeRecipe.tags || []).map(t => `<span class="detail-pill">${escapeHtml(t)}</span>`).join('')}
      </div>
      <h2 id="detailTitle" class="detail-title">${escapeHtml(activeRecipe.title)}</h2>
      <p class="detail-subtitle">${escapeHtml(activeRecipe.subtitle || '')}</p>
    </div>

    <!-- Action Toolbar -->
    <div class="detail-toolbar">
      <button type="button" id="btnLaunchCookMode" class="btn btn-cook-mode btn-lg">
        🍳 Kitchen Cook Mode
      </button>
      <button type="button" id="btnPrintRecipe" class="btn btn-secondary">
        🖨️ Print Recipe
      </button>
      <button type="button" id="btnDetailFav" class="btn btn-secondary">
        ${activeRecipe.isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
      </button>
      <button type="button" id="btnEditRecipe" class="btn btn-secondary">
        ✏️ Edit
      </button>
      <button type="button" id="btnDeleteRecipe" class="btn btn-secondary" style="color: #a83232;">
        🗑️ Delete
      </button>
    </div>

    <!-- Prep & Cook Time Stats -->
    <div class="detail-stats-grid">
      <div class="stat-item">
        <span class="stat-label">Prep Time</span>
        <span class="stat-value">⏱️ ${escapeHtml(activeRecipe.prepTime || '5 mins')}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Cook Time</span>
        <span class="stat-value">🔥 ${escapeHtml(activeRecipe.cookTime || '5 mins')}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Total Time</span>
        <span class="stat-value">⏳ ${escapeHtml(activeRecipe.totalTime || '10 mins')}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Portion Size</span>
        <span class="stat-value">🍽️ 1 Serving</span>
      </div>
    </div>

    <!-- Nutrition & Macros Grid -->
    ${activeRecipe.calories || activeRecipe.macros ? `
      <div class="nutrition-grid">
        ${activeRecipe.calories ? `
          <div class="nutrition-item">
            <span class="nutrition-label">Calories</span>
            <span class="nutrition-val">${escapeHtml(activeRecipe.calories)}</span>
          </div>
        ` : ''}
        ${activeRecipe.macros?.protein ? `
          <div class="nutrition-item">
            <span class="nutrition-label">Protein</span>
            <span class="nutrition-val">${escapeHtml(activeRecipe.macros.protein)}</span>
          </div>
        ` : ''}
        ${activeRecipe.macros?.fiber ? `
          <div class="nutrition-item">
            <span class="nutrition-label">Fiber</span>
            <span class="nutrition-val">${escapeHtml(activeRecipe.macros.fiber)}</span>
          </div>
        ` : ''}
        ${activeRecipe.macros?.netCarbs ? `
          <div class="nutrition-item">
            <span class="nutrition-label">Net Carbs</span>
            <span class="nutrition-val">${escapeHtml(activeRecipe.macros.netCarbs)}</span>
          </div>
        ` : ''}
        ${activeRecipe.macros?.fat ? `
          <div class="nutrition-item">
            <span class="nutrition-label">Healthy Fat</span>
            <span class="nutrition-val">${escapeHtml(activeRecipe.macros.fat)}</span>
          </div>
        ` : ''}
      </div>
    ` : ''}

    <!-- Serving Scaler -->
    <div class="scaler-box">
      <div class="scaler-info">
        <span class="scaler-title">Serving Size Scaler</span>
        <span class="scaler-subtitle">Ingredient amounts automatically adjust below</span>
      </div>
      <div class="scaler-controls">
        <button type="button" id="btnScaleDown" class="btn-scale" aria-label="Decrease servings">-</button>
        <span class="scaler-count" id="scalerServingNum">${currentServings} Serving${currentServings > 1 ? 's' : ''}</span>
        <button type="button" id="btnScaleUp" class="btn-scale" aria-label="Increase servings">+</button>
      </div>
    </div>

    <!-- Columns: Ingredients & Directions -->
    <div class="detail-columns">
      <!-- Ingredients Checklist -->
      <section class="ingredients-section" aria-label="Ingredients">
        <h4>🛒 Ingredients (${activeRecipe.ingredients ? activeRecipe.ingredients.length : 0})</h4>
        <p class="form-help" style="margin-bottom: 0.6rem;">Tap to check off as you prep in the kitchen:</p>
        <ul class="ingredients-list" id="detailIngredientsList">
          ${(activeRecipe.ingredients || []).map((ing, idx) => {
            const scaledQty = scaleQuantity(ing.amount, ratio);
            const displayQty = formatAmount(scaledQty);
            const unit = ing.unit ? escapeHtml(ing.unit) + ' ' : '';
            return `
              <li class="ingredient-item" data-index="${idx}">
                <input type="checkbox" id="ing_${idx}">
                <label for="ing_${idx}" class="ingredient-text">
                  <strong>${displayQty} ${unit}</strong>${escapeHtml(ing.name)}
                </label>
              </li>
            `;
          }).join('')}
        </ul>
      </section>

      <!-- Step-by-Step Directions -->
      <section class="directions-section" aria-label="Step-by-step directions">
        <h4>👩‍🍳 Directions</h4>
        <ol class="directions-list">
          ${(activeRecipe.instructions || []).map((step, idx) => `
            <li class="direction-item">
              <span class="step-num">${idx + 1}</span>
              <div class="step-content">${escapeHtml(step)}</div>
            </li>
          `).join('')}
        </ol>

        <!-- Mom's Tip & Meal Prep Strategy -->
        ${activeRecipe.tip ? `
          <div class="mom-tip-card">
            <span class="mom-tip-icon" aria-hidden="true">💡</span>
            <div>
              <div class="mom-tip-title">Meal Prep &amp; Storage Strategy</div>
              <div class="mom-tip-text">${escapeHtml(activeRecipe.tip)}</div>
            </div>
          </div>
        ` : ''}

        <!-- Built-in Kitchen Timer -->
        <div class="kitchen-timer-card">
          <div class="timer-header">
            <h4>⏱️ Kitchen Timer</h4>
            <span id="detailTimerStatus" style="font-size: 0.85rem; color: var(--color-text-muted);">Ready</span>
          </div>
          <div class="timer-preset-pills">
            <button type="button" class="btn-preset" data-mins="1">+1 min</button>
            <button type="button" class="btn-preset" data-mins="5">+5 min</button>
            <button type="button" class="btn-preset" data-mins="10">+10 min</button>
            <button type="button" class="btn-preset" data-mins="15">+15 min</button>
            <button type="button" class="btn-preset" data-mins="30">+30 min</button>
          </div>
          <div class="timer-clock-row">
            <div class="timer-clock" id="detailTimerClock">00:00</div>
            <button type="button" id="btnDetailTimerToggle" class="btn btn-primary">Start Timer</button>
            <button type="button" id="btnDetailTimerReset" class="btn btn-secondary">Reset</button>
          </div>
        </div>
      </section>
    </div>
  `;

  // Attach detail listeners
  document.getElementById('btnLaunchCookMode').addEventListener('click', () => {
    recipeDetailDialog.close();
    openKitchenCookMode(activeRecipe.id);
  });

  document.getElementById('btnPrintRecipe').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btnDetailFav').addEventListener('click', () => {
    toggleFavorite(activeRecipe.id);
  });

  document.getElementById('btnEditRecipe').addEventListener('click', () => {
    recipeDetailDialog.close();
    openEditRecipeModal(activeRecipe.id);
  });

  document.getElementById('btnDeleteRecipe').addEventListener('click', () => {
    if (confirm(`Are you sure you want to delete "${activeRecipe.title}" from your cookbook?`)) {
      recipes = recipes.filter(r => r.id !== activeRecipe.id);
      saveRecipes();
      recipeDetailDialog.close();
      renderRecipes();
    }
  });

  // Scaler buttons
  document.getElementById('btnScaleDown').addEventListener('click', () => {
    if (currentServings > 1) {
      currentServings--;
      renderDetailContent();
    }
  });

  document.getElementById('btnScaleUp').addEventListener('click', () => {
    if (currentServings < 30) {
      currentServings++;
      renderDetailContent();
    }
  });

  // Interactive Checklist
  document.querySelectorAll('.ingredient-item').forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      item.classList.toggle('checked', checkbox.checked);
    });
  });

  // Timer presets in Detail view
  document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const mins = parseInt(btn.getAttribute('data-mins'), 10);
      setTimer(mins * 60);
    });
  });

  document.getElementById('btnDetailTimerToggle').addEventListener('click', toggleTimer);
  document.getElementById('btnDetailTimerReset').addEventListener('click', resetTimer);
  updateTimerUI();
}

function scaleQuantity(amount, ratio) {
  if (amount == null || isNaN(amount)) return '';
  return Math.round(amount * ratio * 100) / 100;
}

function formatAmount(amount) {
  if (amount === '' || amount == null) return '';
  // Convert common fractions for comfort
  const whole = Math.floor(amount);
  const frac = Math.round((amount - whole) * 100) / 100;

  if (frac === 0) return whole.toString();
  if (frac === 0.25) return whole > 0 ? `${whole} ¼` : '¼';
  if (frac === 0.33 || frac === 0.34) return whole > 0 ? `${whole} ⅓` : '⅓';
  if (frac === 0.5) return whole > 0 ? `${whole} ½` : '½';
  if (frac === 0.66 || frac === 0.67) return whole > 0 ? `${whole} ⅔` : '⅔';
  if (frac === 0.75) return whole > 0 ? `${whole} ¾` : '¾';

  return amount.toString();
}

/* ==========================================================================
   7. Fullscreen Countertop "Kitchen Cook Mode"
   ========================================================================== */

function openKitchenCookMode(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  activeRecipe = recipe;
  kitchenStepIndex = 0;

  document.getElementById('cookModeHeading').textContent = recipe.title;
  document.getElementById('kmTotalSteps').textContent = recipe.instructions.length;

  // Render Ingredients checklist for sidebar
  const kmIngredientsList = document.getElementById('kmIngredientsList');
  kmIngredientsList.innerHTML = (recipe.ingredients || []).map((ing, idx) => `
    <li class="ingredient-item">
      <input type="checkbox" id="km_ing_${idx}">
      <label for="km_ing_${idx}" class="ingredient-text">
        <strong>${formatAmount(ing.amount)} ${ing.unit || ''}</strong> ${escapeHtml(ing.name)}
      </label>
    </li>
  `).join('');

  kmIngredientsList.querySelectorAll('.ingredient-item').forEach(item => {
    const cb = item.querySelector('input[type="checkbox"]');
    cb.addEventListener('change', () => item.classList.toggle('checked', cb.checked));
  });

  // Setup navigation
  document.getElementById('btnKmPrevStep').onclick = prevKitchenStep;
  document.getElementById('btnKmNextStep').onclick = nextKitchenStep;
  document.getElementById('btnKmTimerToggle').onclick = toggleTimer;
  document.getElementById('btnKmTimerReset').onclick = resetTimer;

  updateKitchenStepUI();
  kitchenModeDialog.showModal();
}

function updateKitchenStepUI() {
  if (!activeRecipe || !activeRecipe.instructions) return;

  const total = activeRecipe.instructions.length;
  const currentNum = kitchenStepIndex + 1;

  document.getElementById('kmCurrentStepNum').textContent = currentNum;
  document.getElementById('kmStepText').textContent = activeRecipe.instructions[kitchenStepIndex];

  const fillPercent = ((kitchenStepIndex + 1) / total) * 100;
  document.getElementById('kmProgressFill').style.width = `${fillPercent}%`;

  const btnPrev = document.getElementById('btnKmPrevStep');
  const btnNext = document.getElementById('btnKmNextStep');

  btnPrev.disabled = kitchenStepIndex === 0;

  if (kitchenStepIndex === total - 1) {
    btnNext.textContent = '🎉 All Done! Enjoy Your Meal!';
    btnNext.classList.remove('btn-primary');
    btnNext.classList.add('btn-cook-mode');
  } else {
    btnNext.textContent = 'Next Step →';
    btnNext.classList.add('btn-primary');
    btnNext.classList.remove('btn-cook-mode');
  }
}

function nextKitchenStep() {
  if (!activeRecipe) return;
  if (kitchenStepIndex < activeRecipe.instructions.length - 1) {
    kitchenStepIndex++;
    updateKitchenStepUI();
  } else {
    kitchenModeDialog.close();
  }
}

function prevKitchenStep() {
  if (kitchenStepIndex > 0) {
    kitchenStepIndex--;
    updateKitchenStepUI();
  }
}

/* ==========================================================================
   8. Kitchen Timer with Web Audio API Chime
   ========================================================================== */

function setTimer(seconds) {
  timerDuration = seconds;
  timerRemaining = seconds;
  isTimerRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  updateTimerUI();
  startTimer();
}

function toggleTimer() {
  if (timerRemaining <= 0) {
    setTimer(5 * 60); // default to 5 min
    return;
  }

  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (timerRemaining <= 0) return;
  isTimerRunning = true;
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timerRemaining--;
    updateTimerUI();

    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      playTimerChime();
      updateTimerUI();
      alert(`⏰ Ding! Kitchen timer is done for ${activeRecipe ? activeRecipe.title : 'your dish'}!`);
    }
  }, 1000);

  updateTimerUI();
}

function pauseTimer() {
  isTimerRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  updateTimerUI();
}

function resetTimer() {
  isTimerRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  timerRemaining = 0;
  timerDuration = 0;
  updateTimerUI();
}

function updateTimerUI() {
  const mins = Math.floor(timerRemaining / 60);
  const secs = timerRemaining % 60;
  const timeString = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const detailClock = document.getElementById('detailTimerClock');
  const detailToggleBtn = document.getElementById('btnDetailTimerToggle');
  const detailStatus = document.getElementById('detailTimerStatus');
  const kmTimer = document.getElementById('kmTimerDisplay');
  const kmToggleBtn = document.getElementById('btnKmTimerToggle');

  if (detailClock) detailClock.textContent = timeString;
  if (kmTimer) kmTimer.textContent = timeString;

  if (detailToggleBtn) {
    detailToggleBtn.textContent = isTimerRunning ? 'Pause' : (timerRemaining > 0 ? 'Resume' : 'Start Timer');
  }

  if (detailStatus) {
    detailStatus.textContent = isTimerRunning ? '⏳ Cooking...' : (timerRemaining > 0 ? 'Paused' : 'Ready');
  }

  if (kmToggleBtn) {
    kmToggleBtn.textContent = isTimerRunning ? '⏸' : '▶';
  }
}

function playTimerChime() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Play a friendly warm 3-tone culinary chime (C5 -> E5 -> G5)
    const tones = [523.25, 659.25, 783.99, 1046.50];
    tones.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = audioCtx.currentTime + (idx * 0.18);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (err) {
    console.warn('Audio chime note could not be played:', err);
  }
}

/* ==========================================================================
   9. Add / Edit Recipe Form
   ========================================================================== */

function setupFormModals() {
  document.getElementById('btnOpenAddModal').addEventListener('click', () => {
    document.getElementById('formTitle').textContent = 'Add a New Recipe';
    document.getElementById('recipeForm').reset();
    document.getElementById('formRecipeId').value = '';
    document.getElementById('formServings').value = 4;
    recipeFormDialog.showModal();
  });

  document.getElementById('recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveRecipeFromForm();
  });
}

function openEditRecipeModal(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  document.getElementById('formTitle').textContent = 'Edit Recipe';
  document.getElementById('formRecipeId').value = recipe.id;
  document.getElementById('formTitleInput').value = recipe.title || '';
  document.getElementById('formCategorySelect').value = recipe.category || 'Main Dishes';
  document.getElementById('formSubtitleInput').value = recipe.subtitle || '';
  document.getElementById('formPrepTime').value = recipe.prepTime || '';
  document.getElementById('formCookTime').value = recipe.cookTime || '';
  document.getElementById('formServings').value = recipe.servings || 4;
  document.getElementById('formImageUrl').value = recipe.image || '';
  document.getElementById('formTipInput').value = recipe.tip || '';

  // Serialize ingredients
  const ingLines = (recipe.ingredients || []).map(ing => {
    const qty = ing.amount ? `${ing.amount} ` : '';
    const unit = ing.unit ? `${ing.unit} ` : '';
    return `${qty}${unit}${ing.name}`.trim();
  }).join('\n');
  document.getElementById('formIngredientsText').value = ingLines;

  // Serialize instructions
  document.getElementById('formInstructionsText').value = (recipe.instructions || []).join('\n');

  recipeFormDialog.showModal();
}

function saveRecipeFromForm() {
  const id = document.getElementById('formRecipeId').value || ('recipe-' + Date.now());
  const title = document.getElementById('formTitleInput').value.trim();
  const category = document.getElementById('formCategorySelect').value;
  const subtitle = document.getElementById('formSubtitleInput').value.trim();
  const prepTime = document.getElementById('formPrepTime').value.trim() || '15 mins';
  const cookTime = document.getElementById('formCookTime').value.trim() || '20 mins';
  const servings = parseInt(document.getElementById('formServings').value, 10) || 4;
  const image = document.getElementById('formImageUrl').value.trim() || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';
  const tip = document.getElementById('formTipInput').value.trim();

  // Parse ingredients
  const ingLines = document.getElementById('formIngredientsText').value
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const ingredients = ingLines.map(line => parseIngredientLine(line));

  // Parse instructions
  const instructions = document.getElementById('formInstructionsText').value
    .split('\n')
    .map(l => l.trim().replace(/^\d+[\.\)]\s*/, '')) // remove leading 1. or 1)
    .filter(l => l.length > 0);

  const existingIndex = recipes.findIndex(r => r.id === id);
  const isFavorite = existingIndex >= 0 ? recipes[existingIndex].isFavorite : false;

  const newRecipe = {
    id,
    title,
    subtitle: subtitle || 'A cherished homemade dish.',
    category,
    tags: [category, 'Mom\'s Kitchen'],
    prepTime,
    cookTime,
    totalTime: `${prepTime} prep, ${cookTime} cook`,
    servings,
    difficulty: 'Easy',
    isFavorite,
    image,
    tip,
    ingredients,
    instructions
  };

  if (existingIndex >= 0) {
    recipes[existingIndex] = newRecipe;
  } else {
    recipes.unshift(newRecipe);
  }

  saveRecipes();
  recipeFormDialog.close();
  renderRecipes();
  openRecipeDetail(id);
}

function parseIngredientLine(line) {
  // Matches "2 cups flour", "1.5 lbs ground beef", "1/2 tsp salt", or bare "salt to taste"
  const cleanLine = line.replace(/^[-*•]\s*/, '').trim();
  const match = cleanLine.match(/^([\d\/\.]+)\s*([a-zA-Z]+)?\s+(.*)$/);

  if (match) {
    let amount = parseFloat(match[1]);
    if (match[1].includes('/')) {
      const parts = match[1].split('/');
      amount = parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return {
      amount: isNaN(amount) ? null : amount,
      unit: match[2] || '',
      name: match[3] || cleanLine
    };
  }

  return {
    amount: null,
    unit: '',
    name: cleanLine
  };
}

/* ==========================================================================
   10. Smart Paste / Gemini Import Logic
   ========================================================================== */

function setupQuickPaste() {
  document.getElementById('btnOpenPasteModal').addEventListener('click', () => {
    document.getElementById('quickPasteForm').reset();
    quickPasteDialog.showModal();
  });

  document.getElementById('quickPasteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = document.getElementById('pasteRawText').value;
    importRawRecipe(raw);
  });
}

function importRawRecipe(text) {
  if (!text.trim()) return;

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  let title = 'Mom\'s New Recipe';
  let category = 'Main Dishes';
  let ingredients = [];
  let instructions = [];
  let tip = '';

  let mode = 'header'; // 'header', 'ingredients', 'instructions', 'notes'

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect Title from first non-header line
    if (i === 0 && !line.toLowerCase().startsWith('ingredients') && !line.toLowerCase().startsWith('instructions')) {
      title = line.replace(/^#+\s*/, '').replace(/\*+/g, '').trim();
      continue;
    }

    // Detect section headers
    if (/^#*\s*ingredients/i.test(line)) {
      mode = 'ingredients';
      continue;
    } else if (/^#*\s*(instructions|directions|steps|method|preparation)/i.test(line)) {
      mode = 'instructions';
      continue;
    } else if (/^#*\s*(tip|note|notes|mom's tip)/i.test(line)) {
      mode = 'notes';
      continue;
    }

    if (mode === 'ingredients') {
      ingredients.push(parseIngredientLine(line));
    } else if (mode === 'instructions') {
      const cleaned = line.replace(/^\d+[\.\)]\s*/, '').replace(/^[-*•]\s*/, '').trim();
      if (cleaned.length > 0) instructions.push(cleaned);
    } else if (mode === 'notes') {
      tip += (tip ? ' ' : '') + line;
    }
  }

  // Fallbacks if formatting was loose
  if (ingredients.length === 0) {
    ingredients = [
      { amount: 1, unit: 'portion', name: 'Ingredients listed in original notes' }
    ];
  }
  if (instructions.length === 0) {
    instructions = [
      'Follow your family cooking steps as instructed.'
    ];
  }

  const id = 'pasted-' + Date.now();
  const newRecipe = {
    id,
    title,
    subtitle: 'Imported recipe saved into your cookbook collection.',
    category,
    tags: ['Imported', 'Family Recipe'],
    prepTime: '15 mins',
    cookTime: '25 mins',
    totalTime: '40 mins',
    servings: 4,
    difficulty: 'Easy',
    isFavorite: false,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
    tip: tip || 'Handcrafted and saved to Mom\'s recipe collection!',
    ingredients,
    instructions
  };

  recipes.unshift(newRecipe);
  saveRecipes();
  quickPasteDialog.close();
  renderRecipes();
  openRecipeDetail(id);
}

/* ==========================================================================
   11. Backup, Restore, and Reset
   ========================================================================== */

function setupDataBackupControls() {
  // Export backup
  document.getElementById('btnExportData')?.addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(recipes, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `moms-cookbook-backup-${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  });

  // Restore backup
  const importInput = document.getElementById('importFileInput');
  document.getElementById('btnImportData')?.addEventListener('click', () => {
    importInput.click();
  });

  importInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          recipes = imported;
          saveRecipes();
          renderRecipes();
          alert('✨ Recipes restored successfully!');
        } else {
          alert('Invalid recipe backup file format.');
        }
      } catch (err) {
        alert('Could not read backup file.');
      }
    };
    reader.readAsText(file);
  });

  // Reset to seed recipes
  document.getElementById('btnResetData')?.addEventListener('click', () => {
    if (confirm('Reset your cookbook back to the original delicious default recipes? Any custom additions will be replaced.')) {
      recipes = [...DEFAULT_RECIPES];
      saveRecipes();
      renderRecipes();
      alert('✨ Cookbook has been restored to default recipes!');
    }
  });
}

/* ==========================================================================
   Utility Helpers
   ========================================================================== */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
