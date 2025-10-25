/**
 * Inference Engine - Forward Chaining Algorithm
 * Processes facts through rules to derive conclusions
 */

import { all_rule_levels } from "./rules.js";

/**
 * Execute forward chaining inference
 * @param {Object} facts - Initial facts from user input
 * @returns {Object} - Working memory with all derived facts
 */
/**
 * Execute forward chaining inference
 * Processes facts through rules to derive conclusions
 * Enhanced to handle multiple domains and find the best match
 * @param {Object} facts - Initial facts from user input
 * @returns {Object} - Working memory with all derived facts
 */
export function get_full_path(facts) {
  let working_memory = { ...facts };
  const possiblePaths = [];

  console.log("=== Starting Inference Engine ===");
  console.log("Initial facts:", facts);

  // Level 1: Find all possible domains
  console.log("\n--- Level 1: Determining Domains ---");
  const domains = [];

  all_rule_levels[0].forEach((rule) => {
    let match = true;

    for (const condition in rule.if) {
      if (working_memory[condition] !== rule.if[condition]) {
        match = false;
        break;
      }
    }

    if (match) {
      const domain = rule.then.REKOMENDASI_DOMAIN;
      domains.push(domain);
      console.log(`✓ Matched domain: ${domain}`);
    }
  });

  if (domains.length === 0) {
    console.log("✗ No domains matched");
    return working_memory;
  }

  // Level 2: For each domain, find matching sub-specializations
  console.log("\n--- Level 2: Finding Sub-Specializations ---");
  const specializations = [];

  domains.forEach((domain) => {
    const domainFacts = { ...working_memory, REKOMENDASI_DOMAIN: domain };

    all_rule_levels[1].forEach((rule) => {
      let match = true;

      for (const condition in rule.if) {
        if (domainFacts[condition] !== rule.if[condition]) {
          match = false;
          break;
        }
      }

      if (match) {
        const subSpec = rule.then.SUB_SPESIALISASI;
        specializations.push({
          domain: domain,
          specialization: subSpec,
          facts: { ...domainFacts, ...rule.then },
        });
        console.log(`✓ Matched specialization: ${subSpec} (Domain: ${domain})`);
      }
    });
  });

  if (specializations.length === 0) {
    console.log("✗ No specializations matched");
    // Return at least the domain
    working_memory.REKOMENDASI_DOMAIN = domains[0];
    return working_memory;
  }

  // Level 3: For each specialization, find learning path
  console.log("\n--- Level 3: Finding Learning Paths ---");

  specializations.forEach((spec) => {
    all_rule_levels[2].forEach((rule) => {
      let match = true;

      for (const condition in rule.if) {
        if (spec.facts[condition] !== rule.if[condition]) {
          match = false;
          break;
        }
      }

      if (match) {
        possiblePaths.push({
          ...spec.facts,
          ...rule.then,
        });
        console.log(`✓ Complete path found: ${spec.specialization}`);
      }
    });
  });

  // Select the best path (first match for now, could be enhanced with scoring)
  if (possiblePaths.length > 0) {
    working_memory = possiblePaths[0];
    console.log("\n=== Selected Path ===");
    console.log("Domain:", working_memory.REKOMENDASI_DOMAIN);
    console.log("Specialization:", working_memory.SUB_SPESIALISASI);
    console.log("Has Learning Path:", !!working_memory.LEARNING_PATH);
  } else {
    // Fallback: use first specialization even without level 3 match
    console.log("\n⚠ No complete learning path found, using specialization");
    working_memory = specializations[0].facts;
  }

  console.log("\n=== Inference Complete ===\n");
  return working_memory;
}

/**
 * Get available preferences based on selected interests
 * This ensures we only show preferences that can lead to valid results
 * Handles multiple interest selections and all domain combinations
 * @param {Object} selectedInterests - Selected general interests
 * @returns {Array} - Array of valid preference IDs
 */
export function getValidPreferences(selectedInterests) {
  const validPreferences = new Set();
  const matchedDomains = new Set();

  console.log("Getting valid preferences for:", selectedInterests);

  // Get all active interests
  const activeInterests = Object.keys(selectedInterests).filter(
    (key) => selectedInterests[key] === true
  );

  console.log("Active interests:", activeInterests);

  // Find all domains that match the selected interests
  all_rule_levels[0].forEach((rule) => {
    let matches = true;

    // Check if all rule conditions match selected interests
    for (const condition in rule.if) {
      if (condition.startsWith("MINAT_")) {
        if (selectedInterests[condition] !== rule.if[condition]) {
          matches = false;
          break;
        }
      }
    }

    if (matches) {
      const domain = rule.then.REKOMENDASI_DOMAIN;
      matchedDomains.add(domain);
      console.log("Matched domain:", domain);
    }
  });

  console.log("All matched domains:", Array.from(matchedDomains));

  // For each matched domain, find all relevant preferences
  matchedDomains.forEach((domain) => {
    let foundPreferences = false;

    // Find all preferences needed for this domain in level 2 rules
    all_rule_levels[1].forEach((level2Rule) => {
      if (level2Rule.if.REKOMENDASI_DOMAIN === domain) {
        // Add all preferences mentioned in this rule
        Object.keys(level2Rule.if).forEach((key) => {
          if (key.startsWith("PREFERENSI_")) {
            validPreferences.add(key);
            foundPreferences = true;
            console.log(`Added preference: ${key} (from ${domain})`);
          }
        });
      }
    });

    // Domain-specific fallback for domains that use MINAT_ conditions in level 2
    if (!foundPreferences) {
      console.log(
        `No PREFERENSI_ found for ${domain}, adding domain-specific preferences`
      );

      switch (domain) {
        case "Bisnis_Manajemen":
          // Business paths need these skills
          validPreferences.add("PREFERENSI_DATA"); // For Business Analyst
          validPreferences.add("PREFERENSI_VISUAL"); // For Digital Marketing
          validPreferences.add("PREFERENSI_TULISAN"); // For Content Marketing
          console.log("Added business-related preferences");
          break;

        case "Sosial_Komunikasi":
          // Social/Communication paths
          validPreferences.add("PREFERENSI_TULISAN"); // For PR/Communication
          validPreferences.add("PREFERENSI_VISUAL"); // For Social Media
          console.log("Added social/communication-related preferences");
          break;

        default:
          console.warn(`No preferences configured for domain: ${domain}`);
      }
    }
  });

  const result = Array.from(validPreferences);
  console.log("Final valid preferences:", result);
  return result;
}
