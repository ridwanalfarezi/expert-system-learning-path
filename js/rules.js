/**
 * Knowledge Base - Expert System Rules
 * Contains all the rules for the learning path recommendation system
 */

// Level 1: Determine Domain based on general interests
export const rules_level_1 = [
  {
    if: { MINAT_KREATIF: true },
    then: { REKOMENDASI_DOMAIN: "Kreatif_Media" },
  },
  {
    if: { MINAT_ANALITIKAL: true },
    then: { REKOMENDASI_DOMAIN: "Teknologi_Digital" },
  },
  {
    if: { MINAT_ANALITIKAL: true },
    then: { REKOMENDASI_DOMAIN: "Data_Science" },
  },
  {
    if: { MINAT_BISNIS: true },
    then: { REKOMENDASI_DOMAIN: "Bisnis_Manajemen" },
  },
  {
    if: { MINAT_SOSIAL: true },
    then: { REKOMENDASI_DOMAIN: "Sosial_Komunikasi" },
  },
];

// Level 2: Determine Sub-Specialization based on domain and preferences
export const rules_level_2 = [
  // Kreatif_Media
  {
    if: {
      REKOMENDASI_DOMAIN: "Kreatif_Media",
      PREFERENSI_VISUAL: true,
      PREFERENSI_PSIKOLOGI_PENGGUNA: true,
    },
    then: { SUB_SPESIALISASI: "UI_UX_Designer" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Kreatif_Media",
      PREFERENSI_VISUAL: true,
    },
    then: { SUB_SPESIALISASI: "Desainer_Grafis" },
  },
  {
    if: { REKOMENDASI_DOMAIN: "Kreatif_Media", PREFERENSI_TULISAN: true },
    then: { SUB_SPESIALISASI: "Penulis_Konten_SEO" },
  },

  // Teknologi_Digital
  {
    if: {
      REKOMENDASI_DOMAIN: "Teknologi_Digital",
      PREFERENSI_KEAMANAN: true,
    },
    then: { SUB_SPESIALISASI: "Cyber_Security_Analyst" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Teknologi_Digital",
      PREFERENSI_KODE: true,
      MINAT_KREATIF: true,
    },
    then: { SUB_SPESIALISASI: "Frontend_Developer" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Teknologi_Digital",
      PREFERENSI_KODE: true,
    },
    then: { SUB_SPESIALISASI: "Backend_Developer" },
  },

  // Data_Science
  {
    if: {
      REKOMENDASI_DOMAIN: "Data_Science",
      PREFERENSI_INFRASTRUKTUR: true,
    },
    then: { SUB_SPESIALISASI: "Data_Engineer" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Data_Science",
      PREFERENSI_DATA: true,
    },
    then: { SUB_SPESIALISASI: "Data_Analyst" },
  },

  // Bisnis_Manajemen - Enhanced with preferences
  {
    if: {
      REKOMENDASI_DOMAIN: "Bisnis_Manajemen",
      PREFERENSI_VISUAL: true,
      MINAT_KREATIF: true,
    },
    then: { SUB_SPESIALISASI: "Digital_Marketer" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Bisnis_Manajemen",
      PREFERENSI_DATA: true,
    },
    then: { SUB_SPESIALISASI: "Business_Analyst" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Bisnis_Manajemen",
      PREFERENSI_TULISAN: true,
    },
    then: { SUB_SPESIALISASI: "Content_Strategist" },
  },
  // Fallback for Business with just MINAT
  {
    if: { REKOMENDASI_DOMAIN: "Bisnis_Manajemen", MINAT_KREATIF: true },
    then: { SUB_SPESIALISASI: "Digital_Marketer" },
  },
  {
    if: { REKOMENDASI_DOMAIN: "Bisnis_Manajemen", MINAT_ANALITIKAL: true },
    then: { SUB_SPESIALISASI: "Business_Analyst" },
  },

  // Sosial_Komunikasi - Enhanced with preferences
  {
    if: {
      REKOMENDASI_DOMAIN: "Sosial_Komunikasi",
      PREFERENSI_TULISAN: true,
    },
    then: { SUB_SPESIALISASI: "Public_Relations" },
  },
  {
    if: {
      REKOMENDASI_DOMAIN: "Sosial_Komunikasi",
      PREFERENSI_VISUAL: true,
    },
    then: { SUB_SPESIALISASI: "Social_Media_Manager" },
  },
];

// Level 3: Determine Complete Learning Path based on sub-specialization
export const rules_level_3 = [
  {
    if: { SUB_SPESIALISASI: "Desainer_Grafis" },
    then: {
      LEARNING_PATH:
        "1. Pahami Prinsip Desain (Warna, Tipografi, Layout) <br> 2. Kuasai Software (Adobe Illustrator) <br> 3. Kuasai Software (Adobe Photoshop) <br> 4. Bangun Portofolio Branding & Marketing Kit",
    },
  },
  {
    if: { SUB_SPESIALISASI: "UI_UX_Designer" },
    then: {
      LEARNING_PATH:
        "1. Pahami Prinsip Desain & Psikologi Pengguna <br> 2. Riset Pengguna & Empathy Map <br> 3. Kuasai Wireframing & Prototyping (Figma) <br> 4. Pelajari Desain Sistem & Usability Testing <br> 5. Bangun Portofolio Studi Kasus",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Penulis_Konten_SEO" },
    then: {
      LEARNING_PATH:
        "1. Pahami Riset Keyword (Ahrefs/Semrush) <br> 2. Pelajari SEO On-Page vs Off-Page <br> 3. Teknik Copywriting & Storytelling <br> 4. Kuasai CMS (Wordpress) <br> 5. Analisis Performa (Google Analytics)",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Frontend_Developer" },
    then: {
      LEARNING_PATH:
        "1. Dasar (HTML, CSS, Git) <br> 2. JavaScript (ES6+) <br> 3. Framework (React.js/Vue.js) <br> 4. State Management (Redux/Pinia) <br> 5. Pahami API & Testing (Jest)",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Backend_Developer" },
    then: {
      LEARNING_PATH:
        "1. Bahasa (Python/Go/Node.js) <br> 2. Database (SQL/NoSQL) <br> 3. Konsep REST API <br> 4. Otentikasi & Keamanan <br> 5. Pelajari Docker & Deployment",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Cyber_Security_Analyst" },
    then: {
      LEARNING_PATH:
        "1. Dasar Jaringan (TCP/IP, OSI) <br> 2. Sistem Operasi (Linux) <br> 3. Keamanan (Firewall, IDS/IPS) <br> 4. *Tools* (Wireshark, Nmap) <br> 5. Pelajari Penetration Testing & Sertifikasi (CompTIA Security+)",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Data_Analyst" },
    then: {
      LEARNING_PATH:
        "1. Kuasai Excel & SQL <br> 2. Bahasa Pemrograman (Python) <br> 3. Library (Pandas, Numpy, Matplotlib) <br> 4. Alat Visualisasi (Tableau/Power BI) <br> 5. Pahami Statistik & Bangun Portofolio",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Data_Engineer" },
    then: {
      LEARNING_PATH:
        "1. Kuasai Python & SQL Lanjutan <br> 2. Database Engineering (OLTP, OLAP) <br> 3. Pahami *Data Warehouse* & *Data Lake* <br> 4. *Tools* ETL & *Pipeline* (Airflow) <br> 5. Pelajari Big Data (Spark, Hadoop)",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Digital_Marketer" },
    then: {
      LEARNING_PATH:
        "1. Pahami Marketing Funnel <br> 2. Kuasai SEO/SEM (Google Ads) <br> 3. Pelajari Content Marketing <br> 4. Kuasai Social Media Marketing (Meta Ads, TikTok Ads) <br> 5. Analisis (Google Analytics 4)",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Business_Analyst" },
    then: {
      LEARNING_PATH:
        "1. Pahami Proses Bisnis (BPMN) <br> 2. Kuasai SQL & Excel Lanjutan <br> 3. Pelajari Analisis Kebutuhan (Requirement Gathering) <br> 4. Alat Visualisasi (Tableau/Power BI) <br> 5. Teknik Presentasi & Storytelling",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Public_Relations" },
    then: {
      LEARNING_PATH:
        "1. Pahami Teori Komunikasi Massa <br> 2. Teknik Menulis (Siaran Pers, Pidato) <br> 3. Manajemen Krisis & Citra <br> 4. Pelajari Media Relations <br> 5. Kuasai Komunikasi Digital & Media Sosial",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Content_Strategist" },
    then: {
      LEARNING_PATH:
        "1. Pahami Content Marketing Fundamentals <br> 2. Kuasai SEO & Keyword Research <br> 3. Teknik Storytelling & Copywriting <br> 4. Pelajari Analytics & Performance Metrics <br> 5. Content Calendar & Planning Tools",
    },
  },
  {
    if: { SUB_SPESIALISASI: "Social_Media_Manager" },
    then: {
      LEARNING_PATH:
        "1. Pahami Platform Media Sosial (Instagram, TikTok, LinkedIn) <br> 2. Kuasai Content Creation & Visual Design <br> 3. Pelajari Social Media Analytics <br> 4. Community Management & Engagement <br> 5. Paid Advertising (Meta Ads, TikTok Ads)",
    },
  },
];

export const all_rule_levels = [rules_level_1, rules_level_2, rules_level_3];
