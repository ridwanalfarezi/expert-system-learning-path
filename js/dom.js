/**
 * DOM Manipulation Module
 * Handles all UI updates, step navigation, and user interactions
 */

import { get_full_path, getValidPreferences } from "./inference.js";

// Step management
let currentStep = 1;
const totalSteps = 3;

// User selections storage
let userSelections = {
  interests: {},
  preferences: {},
};

/**
 * Initialize DOM event listeners and setup
 */
export function initializeDOM() {
  setupEventListeners();
  showStep(1);
  updateProgressBar();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Next button on step 1
  const nextBtn1 = document.getElementById("next-step-1");
  if (nextBtn1) {
    nextBtn1.addEventListener("click", handleStep1Next);
  }

  // Back button on step 2
  const backBtn2 = document.getElementById("back-step-2");
  if (backBtn2) {
    backBtn2.addEventListener("click", () => goToStep(1));
  }

  // Next button on step 2
  const nextBtn2 = document.getElementById("next-step-2");
  if (nextBtn2) {
    nextBtn2.addEventListener("click", handleStep2Next);
  }

  // Back button on step 3
  const backBtn3 = document.getElementById("back-step-3");
  if (backBtn3) {
    backBtn3.addEventListener("click", () => goToStep(2));
  }

  // Start over button
  const startOverBtn = document.getElementById("start-over");
  if (startOverBtn) {
    startOverBtn.addEventListener("click", resetForm);
  }
}

/**
 * Handle next button click on step 1 (General Interests)
 */
function handleStep1Next() {
  // Collect selected interests
  const interests = {
    MINAT_ANALITIKAL:
      document.getElementById("MINAT_ANALITIKAL")?.checked || false,
    MINAT_KREATIF: document.getElementById("MINAT_KREATIF")?.checked || false,
    MINAT_SOSIAL: document.getElementById("MINAT_SOSIAL")?.checked || false,
    MINAT_BISNIS: document.getElementById("MINAT_BISNIS")?.checked || false,
  };

  // Check if at least one interest is selected
  const hasSelection = Object.values(interests).some((val) => val);

  if (!hasSelection) {
    alert("Silakan pilih setidaknya satu minat umum!");
    return;
  }

  // Count selected interests
  const selectedCount = Object.values(interests).filter((val) => val).length;
  console.log(`User selected ${selectedCount} interest(s)`);

  userSelections.interests = interests;

  // Filter and show only valid preferences
  const validPrefsCount = filterPreferences(interests);

  // Show helpful message if multiple interests selected
  if (selectedCount > 1) {
    console.log(
      "Multiple interests selected - showing combined preferences from all matching domains"
    );
  }

  goToStep(2);
}

/**
 * Filter preferences based on selected interests
 * @returns {number} Number of visible preferences
 */
function filterPreferences(interests) {
  console.log("Filtering preferences with interests:", interests);

  // Get all valid preferences based on selected interests
  const validPrefs = getValidPreferences(interests);

  console.log("Valid preferences to show:", validPrefs);

  // Get all preference checkboxes
  const allPreferences = [
    "PREFERENSI_VISUAL",
    "PREFERENSI_TULISAN",
    "PREFERENSI_KODE",
    "PREFERENSI_DATA",
    "PREFERENSI_INFRASTRUKTUR",
    "PREFERENSI_KEAMANAN",
    "PREFERENSI_PSIKOLOGI_PENGGUNA",
  ];

  let visibleCount = 0;

  allPreferences.forEach((prefId) => {
    const prefElement = document.getElementById(prefId);
    const prefLabel = prefElement?.closest("label");

    if (prefLabel) {
      if (validPrefs.includes(prefId)) {
        prefLabel.style.display = "flex";
        visibleCount++;
        console.log("Showing:", prefId);
      } else {
        prefLabel.style.display = "none";
        console.log("Hiding:", prefId);
        // Uncheck hidden preferences
        if (prefElement) {
          prefElement.checked = false;
        }
      }
    } else {
      console.warn("Label not found for:", prefId);
    }
  });

  console.log(
    `Total visible preferences: ${visibleCount} of ${validPrefs.length}`
  );

  return visibleCount;
}

/**
 * Handle next button click on step 2 (Specific Preferences)
 */
function handleStep2Next() {
  // Collect selected preferences
  const preferences = {
    PREFERENSI_VISUAL:
      document.getElementById("PREFERENSI_VISUAL")?.checked || false,
    PREFERENSI_TULISAN:
      document.getElementById("PREFERENSI_TULISAN")?.checked || false,
    PREFERENSI_KODE:
      document.getElementById("PREFERENSI_KODE")?.checked || false,
    PREFERENSI_DATA:
      document.getElementById("PREFERENSI_DATA")?.checked || false,
    PREFERENSI_INFRASTRUKTUR:
      document.getElementById("PREFERENSI_INFRASTRUKTUR")?.checked || false,
    PREFERENSI_KEAMANAN:
      document.getElementById("PREFERENSI_KEAMANAN")?.checked || false,
    PREFERENSI_PSIKOLOGI_PENGGUNA:
      document.getElementById("PREFERENSI_PSIKOLOGI_PENGGUNA")?.checked ||
      false,
  };

  // Check if at least one preference is selected
  const hasSelection = Object.values(preferences).some((val) => val);

  if (!hasSelection) {
    alert("Silakan pilih setidaknya satu preferensi spesifik!");
    return;
  }

  userSelections.preferences = preferences;

  // Generate and display results
  displayResults();

  goToStep(3);
}

/**
 * Generate and display results
 */
function displayResults() {
  // Combine all facts
  const allFacts = {
    ...userSelections.interests,
    ...userSelections.preferences,
  };

  console.log("--- USER FACTS ---", allFacts);

  // Run inference engine
  const result = get_full_path(allFacts);

  console.log("--- INFERENCE RESULT ---", result);

  // Display results
  const resultDiv = document.getElementById("hasil");

  if (result.LEARNING_PATH) {
    // Format the specialization name
    const specialization = result.SUB_SPESIALISASI.replace(/_/g, " ");

    resultDiv.innerHTML = `
      <div class="result-card">
        <div class="result-icon">🎯</div>
        <h2 class="result-title">${specialization}</h2>
        <div class="result-domain">${result.REKOMENDASI_DOMAIN.replace(
          /_/g,
          " "
        )}</div>
        <div class="learning-path">
          <h3>Learning Path:</h3>
          ${result.LEARNING_PATH}
        </div>
      </div>
    `;
  } else if (result.SUB_SPESIALISASI) {
    // We have a specialization but no learning path
    const specialization = result.SUB_SPESIALISASI.replace(/_/g, " ");

    resultDiv.innerHTML = `
      <div class="result-card">
        <div class="result-icon">🎯</div>
        <h2 class="result-title">${specialization}</h2>
        <div class="result-domain">${result.REKOMENDASI_DOMAIN.replace(
          /_/g,
          " "
        )}</div>
        <div class="learning-path">
          <h3>Jalur Karir Teridentifikasi</h3>
          <p>Spesialisasi: <strong>${specialization}</strong></p>
          <p style="color: var(--text-secondary); margin-top: 1rem;">
            Learning path untuk spesialisasi ini sedang dalam pengembangan.
          </p>
        </div>
      </div>
    `;
  } else if (result.REKOMENDASI_DOMAIN) {
    // We only have a domain
    resultDiv.innerHTML = `
      <div class="result-card">
        <div class="result-icon">💡</div>
        <h2>Domain Teridentifikasi</h2>
        <div class="result-domain">${result.REKOMENDASI_DOMAIN.replace(
          /_/g,
          " "
        )}</div>
        <div class="learning-path">
          <p style="color: var(--text-secondary);">
            Kombinasi preferensi Anda tidak menghasilkan spesialisasi spesifik. 
            Silakan coba pilih preferensi yang berbeda untuk mendapatkan rekomendasi lebih spesifik.
          </p>
        </div>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="result-card error">
        <div class="result-icon">⚠️</div>
        <h2>Tidak Ada Rekomendasi</h2>
        <p>Maaf, tidak ada rekomendasi yang cocok dengan kombinasi minat Anda. Silakan coba kombinasi yang lain.</p>
      </div>
    `;
  }
}

/**
 * Navigate to a specific step
 */
function goToStep(stepNumber) {
  currentStep = stepNumber;
  showStep(stepNumber);
  updateProgressBar();
}

/**
 * Show specific step and hide others
 */
function showStep(stepNumber) {
  // Hide all steps
  for (let i = 1; i <= totalSteps; i++) {
    const step = document.getElementById(`step-${i}`);
    if (step) {
      step.classList.remove("active");
    }
  }

  // Show current step with animation
  const currentStepElement = document.getElementById(`step-${stepNumber}`);
  if (currentStepElement) {
    setTimeout(() => {
      currentStepElement.classList.add("active");
    }, 10);
  }
}

/**
 * Update progress bar
 */
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  if (progressBar) {
    const progressPercentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }

  if (progressText) {
    progressText.textContent = `Langkah ${currentStep} dari ${totalSteps}`;
  }

  // Update step indicators
  for (let i = 1; i <= totalSteps; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    if (indicator) {
      if (i < currentStep) {
        indicator.className = "step-indicator completed";
      } else if (i === currentStep) {
        indicator.className = "step-indicator active";
      } else {
        indicator.className = "step-indicator";
      }
    }
  }
}

/**
 * Reset form to initial state
 */
function resetForm() {
  // Reset user selections
  userSelections = {
    interests: {},
    preferences: {},
  };

  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((cb) => (cb.checked = false));

  // Show all preference options
  const allPreferences = [
    "PREFERENSI_VISUAL",
    "PREFERENSI_TULISAN",
    "PREFERENSI_KODE",
    "PREFERENSI_DATA",
    "PREFERENSI_INFRASTRUKTUR",
    "PREFERENSI_KEAMANAN",
    "PREFERENSI_PSIKOLOGI_PENGGUNA",
  ];

  allPreferences.forEach((prefId) => {
    const prefElement = document.getElementById(prefId);
    const prefLabel = prefElement?.closest("label");
    if (prefLabel) {
      prefLabel.style.display = "flex";
    }
  });

  // Go back to step 1
  goToStep(1);
}
