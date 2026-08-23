/**
 * Maa Enterprises — Cyber Cafe & Online Service Center
 * Dynamic Service Data Layer & Real-time Catalog Engine
 * Author: Senior Frontend & Full-Stack Architect
 */

'use strict';

/**
 * Service Categories Definition
 */
const SERVICE_CATEGORIES = Object.freeze([
  "All Services",
  "Government Jobs & Recruitment",
  "College & School Admissions",
  "Identity & Legal",
  "Certificates",
  "Banking & Bill Payments",
  "Business Services",
  "Other Online Services"
]);

/**
 * Complete Baseline Service Catalog Dataset (58 Verified Records)
 */
const SERVICES_DATA = Object.freeze([
  {
    "id": "gov-job-general",
    "name": "Government Job Application Assistance",
    "category": "Government Jobs & Recruitment",
    "icon": "briefcase",
    "shortDescription": "Assistance in filling and submitting central and state government recruitment applications.",
    "description": "We assist candidates with checking eligibility criteria, filling online application forms, uploading required documents, and completing registration fees for central and state recruitment portals.",
    "keywords": [
      "sarkari",
      "naukri",
      "recruitment",
      "job",
      "form"
    ],
    "documents": [
      "Educational Certificates (10th/12th/Degree)",
      "Aadhaar Card",
      "Passport Photo & Signature",
      "Caste/Domicile Certificate (if applicable)"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 1
  },
  {
    "id": "ssc-recruitment",
    "name": "SSC Recruitment Form Assistance",
    "category": "Government Jobs & Recruitment",
    "icon": "file-text",
    "shortDescription": "Online form submission for SSC CGL, CHSL, MTS, GD Constable, and CPO examinations.",
    "description": "Complete guidance for Staff Selection Commission (SSC) OTR registration, application filing, exam center selection, and photo/signature dimension verification.",
    "keywords": [
      "ssc",
      "cgl",
      "chsl",
      "mts",
      "gd constable"
    ],
    "documents": [
      "SSC Registration ID/Password",
      "10th/12th/Degree Certificates",
      "Photo & Signature",
      "Photo ID Proof"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 2
  },
  {
    "id": "railway-recruitment",
    "name": "Railway Recruitment Form (RRB / RRC)",
    "category": "Government Jobs & Recruitment",
    "icon": "navigation",
    "shortDescription": "Application assistance for Railway NTPC, Group D, ALP, and Technician posts.",
    "description": "Assistance with RRB and RRC online applications, trade/post selection, zone choices, document uploads, and payment receipt generation.",
    "keywords": [
      "railway",
      "rrb",
      "rrc",
      "ntpc",
      "group d",
      "alp"
    ],
    "documents": [
      "10th Marksheet",
      "ITI / Diploma / Degree Certificate",
      "Aadhaar Card",
      "Passport Photo & Signature"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 3
  },
  {
    "id": "banking-recruitment",
    "name": "Banking Recruitment Form (IBPS / SBI / RBI)",
    "category": "Government Jobs & Recruitment",
    "icon": "dollar-sign",
    "shortDescription": "Application filing for Bank PO, Clerk, SO, and Assistant examinations.",
    "description": "Guidance for IBPS, SBI, and RBI recruitment, including declaration scanning, thumb impression upload, and preference selection.",
    "keywords": [
      "bank",
      "ibps",
      "sbi",
      "rbi",
      "po",
      "clerk"
    ],
    "documents": [
      "Graduation Details",
      "Passport Photo & Signature",
      "Left Thumb Impression",
      "Handwritten Declaration"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 4
  },
  {
    "id": "police-recruitment",
    "name": "Police & Paramilitary Recruitment Form",
    "category": "Government Jobs & Recruitment",
    "icon": "shield",
    "shortDescription": "Application support for Bihar Police, SI, Constable, CRPF, CISF, and BSF vacancies.",
    "description": "Assistance in filling state police and central paramilitary application forms, physical criteria record entries, and fee payment.",
    "keywords": [
      "police",
      "bihar police",
      "si",
      "daroga",
      "constable",
      "crpf"
    ],
    "documents": [
      "10th/12th/Graduation Certificates",
      "Aadhaar Card",
      "Bihar Domicile Certificate",
      "Passport Photo & Signature"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 5
  },
  {
    "id": "defence-recruitment",
    "name": "Defence Services Form (Army / Navy / Air Force / NDA)",
    "category": "Government Jobs & Recruitment",
    "icon": "award",
    "shortDescription": "Registration assistance for Agniveer Army, Navy, Air Force, NDA, and CDS forms.",
    "description": "Guidance for joining the Armed Forces via Agniveer schemes, UPSC NDA, and CDS portals. We help verify eligibility and rally/exam center choices.",
    "keywords": [
      "army",
      "navy",
      "airforce",
      "agniveer",
      "nda",
      "cds"
    ],
    "documents": [
      "10th & 12th Marksheets",
      "Aadhaar Card",
      "Passport Photo & Signature",
      "Residential Certificate"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 6
  },
  {
    "id": "bihar-gov-recruitment",
    "name": "Bihar State Government Recruitment (BPSC / BSSC / BPSSC)",
    "category": "Government Jobs & Recruitment",
    "icon": "check-square",
    "shortDescription": "Application filing for BPSC Civil Services, BSSC Inter/CGL, and BPSSC vacancies.",
    "description": "Assistance for Bihar state examinations including BPSC, BSSC Inter Level, and BPSSC Sub-Inspector with proper domicile and reservation verification.",
    "keywords": [
      "bpsc",
      "bssc",
      "bpssc",
      "bihar ssc",
      "inter level"
    ],
    "documents": [
      "Educational Certificates",
      "Bihar Domicile Certificate",
      "Caste/NCL/EWS Certificate",
      "Photo & Signatures (Hindi/English)"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 7
  },
  {
    "id": "teacher-recruitment",
    "name": "Teacher Recruitment Form (CTET / STET / BPSC TRE)",
    "category": "Government Jobs & Recruitment",
    "icon": "book-open",
    "shortDescription": "Application assistance for CTET, Bihar STET, and BPSC Teacher Recruitment Exams.",
    "description": "Assistance for teaching eligibility tests and recruitment with subject selection, D.El.Ed / B.Ed qualification entry, and roll number verification.",
    "keywords": [
      "ctet",
      "stet",
      "bpsc tre",
      "teacher",
      "dled",
      "bed"
    ],
    "documents": [
      "D.El.Ed / B.Ed Marksheet",
      "Graduation Marksheet",
      "CTET/STET Scorecard",
      "Aadhaar Card",
      "Photo & Signature"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 8
  },
  {
    "id": "admit-card-download",
    "name": "Recruitment Admit Card Download & Printout",
    "category": "Government Jobs & Recruitment",
    "icon": "download",
    "shortDescription": "Instant search, retrieval, and high-quality printout of examination admit cards.",
    "description": "Assistance in retrieving examination hall tickets from central and state portals with crisp black/white and color printout options.",
    "keywords": [
      "admit card",
      "hall ticket",
      "call letter",
      "exam printout"
    ],
    "documents": [
      "Application / Registration Number",
      "Date of Birth / Password"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 9
  },
  {
    "id": "result-scorecard-download",
    "name": "Exam Result & Scorecard Download Assistance",
    "category": "Government Jobs & Recruitment",
    "icon": "check-circle",
    "shortDescription": "Check competitive and board exam results, download rank cards and marksheets.",
    "description": "Prompt lookup and downloading of competitive examination results, cut-off lists, scorecards, merit lists, and answer keys.",
    "keywords": [
      "result",
      "scorecard",
      "rank card",
      "marksheet"
    ],
    "documents": [
      "Roll Number / Registration Number",
      "Roll Code / Date of Birth"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 10
  },
  {
    "id": "college-admission-form",
    "name": "College Admission Online Application",
    "category": "College & School Admissions",
    "icon": "layers",
    "shortDescription": "Online admission form filling for intermediate (+2), BA, BSc, and BCom courses.",
    "description": "Guidance and submission assistance for OFSS Bihar Intermediate (+2) admissions and degree college registrations across state universities.",
    "keywords": [
      "college admission",
      "ofss bihar",
      "inter admission",
      "degree admission",
      "ba",
      "bsc"
    ],
    "documents": [
      "10th/12th Marksheet & Admit Card",
      "CLC / SLC",
      "Aadhaar Card",
      "Passport Photo"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 11
  },
  {
    "id": "university-ug-pg-admission",
    "name": "University UG / PG Admission Form",
    "category": "College & School Admissions",
    "icon": "award",
    "shortDescription": "Undergraduate and Postgraduate regular and vocational course admission applications.",
    "description": "Assistance with university registration portals (Patliputra University, Magadh University, etc.) for BA, BSc, BCom, MA, MSc, and vocational programs.",
    "keywords": [
      "university admission",
      "ug admission",
      "pg admission",
      "patliputra",
      "magadh"
    ],
    "documents": [
      "12th/Graduation Marksheet",
      "Transfer/Migration Certificate",
      "Aadhaar Card",
      "Passport Photo"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 12
  },
  {
    "id": "school-admission-form",
    "name": "School Admission & Registration Assistance",
    "category": "College & School Admissions",
    "icon": "user-check",
    "shortDescription": "Assistance with Navodaya, Sainik School, Kendriya Vidyalaya (KV), and board admissions.",
    "description": "Online form filling for Jawahar Navodaya Vidyalaya (JNVST), Sainik School (AISSEE), and Kendriya Vidyalaya admissions.",
    "keywords": [
      "school admission",
      "navodaya",
      "jnvst",
      "sainik school",
      "kv"
    ],
    "documents": [
      "Student Birth Certificate",
      "Parents' & Student's Aadhaar Cards",
      "Previous Marksheet",
      "Passport Photo"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 13
  },
  {
    "id": "scholarship-application",
    "name": "Scholarship Application Assistance (NSP / PMS Bihar)",
    "category": "College & School Admissions",
    "icon": "gift",
    "shortDescription": "National Scholarship Portal (NSP) and Bihar Post Matric Scholarship (PMS) filings.",
    "description": "Complete guidance for National Scholarship Portal (NSP), Bihar PMS, and Medhasoft including bonafide upload and fee receipt verification.",
    "keywords": [
      "scholarship",
      "nsp",
      "pms bihar",
      "post matric",
      "chhatravritti"
    ],
    "documents": [
      "Bonafide Certificate",
      "College Fee Receipt",
      "Previous Year Marksheet",
      "Income, Caste & Domicile Certificates",
      "Aadhaar-seeded Bank Passbook"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 14
  },
  {
    "id": "entrance-exam-application",
    "name": "Entrance Exam Application (JEE / NEET / CUET / BCECE)",
    "category": "College & School Admissions",
    "icon": "zap",
    "shortDescription": "Registration for JEE Main/Advanced, NEET UG, CUET UG/PG, BCECE, and Polytechnic exams.",
    "description": "Accurate form submission for engineering, medical, and common university entrance tests with proper center and category choices.",
    "keywords": [
      "jee main",
      "neet",
      "cuet",
      "bcece",
      "polytechnic",
      "entrance"
    ],
    "documents": [
      "10th & 12th Marksheets",
      "Aadhaar Card",
      "Passport Photo & Signature",
      "Category Certificate"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 15
  },
  {
    "id": "college-exam-form",
    "name": "University Semester & Annual Exam Form",
    "category": "College & School Admissions",
    "icon": "edit",
    "shortDescription": "Examination form filling for college and university semester/annual examinations.",
    "description": "Assistance in filling regular, backlog, and ex-student university examination forms with fee verification and acknowledgment printouts.",
    "keywords": [
      "exam form",
      "semester exam",
      "university form",
      "exam fee"
    ],
    "documents": [
      "University Registration Slip",
      "Previous Marksheet",
      "College ID Card",
      "Photo & Signature"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 16
  },
  {
    "id": "admission-counseling",
    "name": "Online Admission Counseling Assistance",
    "category": "College & School Admissions",
    "icon": "compass",
    "shortDescription": "College choice filling, seat allotment check, and counseling registration.",
    "description": "Guidance through counseling phases for BCECE, UGEAC Engineering, NEET Bihar State Quota (UGMAC), and Polytechnic admissions.",
    "keywords": [
      "counseling",
      "choice filling",
      "seat allotment",
      "ugeac",
      "ugmac"
    ],
    "documents": [
      "Entrance Exam Rank Card & Admit Card",
      "10th & 12th Certificates",
      "Caste & Domicile Certificates"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 17
  },
  {
    "id": "migration-academic-doc",
    "name": "Academic Document & Migration Assistance",
    "category": "College & School Admissions",
    "icon": "archive",
    "shortDescription": "Online application for migration certificates, provisional degrees, and duplicate marksheets.",
    "description": "Assistance in applying for university migration certificates, provisional degrees, mark-sheet corrections, and verification records online.",
    "keywords": [
      "migration certificate",
      "provisional degree",
      "duplicate marksheet"
    ],
    "documents": [
      "Final Year Marksheet Copy",
      "Registration Certificate",
      "College Leaving Certificate (CLC)",
      "Aadhaar Card"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 18
  },
  {
    "id": "pan-card-new",
    "name": "New PAN Card Application Assistance",
    "category": "Identity & Legal",
    "icon": "credit-card",
    "shortDescription": "Assistance with Form 49A for new physical and e-PAN card applications.",
    "description": "Guided assistance for new Permanent Account Number (PAN) applications via NSDL/UTIITSL portals for individuals, students, and minors.",
    "keywords": [
      "pan card",
      "new pan",
      "form 49a",
      "nsdl",
      "uti",
      "e-pan"
    ],
    "documents": [
      "Aadhaar Card (matching name & DOB)",
      "Two Passport Size Photos",
      "Active Mobile Number for OTP"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 19
  },
  {
    "id": "pan-card-correction",
    "name": "PAN Card Correction & Reprint Assistance",
    "category": "Identity & Legal",
    "icon": "refresh-cw",
    "shortDescription": "Correction of name, date of birth, father's name, or photo on existing PAN cards.",
    "description": "Assistance with PAN data corrections (CSF Form) to align details with Aadhaar records and reissuing lost or damaged cards.",
    "keywords": [
      "pan correction",
      "pan update",
      "reprint pan",
      "lost pan",
      "pan link"
    ],
    "documents": [
      "Existing PAN Card Copy / Number",
      "Aadhaar Card",
      "Supporting Proof for Correction",
      "Passport Photos"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 20
  },
  {
    "id": "voter-id-new",
    "name": "New Voter ID Registration (Form 6)",
    "category": "Identity & Legal",
    "icon": "user-plus",
    "shortDescription": "New voter registration assistance on Election Commission Voter Service Portal.",
    "description": "Assistance for citizens turning 18 or new voters in submitting Form 6 on the Voter Services portal and tracking enrollment status.",
    "keywords": [
      "voter id",
      "nvsp",
      "form 6",
      "new voter",
      "voter card"
    ],
    "documents": [
      "Age Proof (10th Marksheet/Aadhaar)",
      "Address Proof (Aadhaar/Electricity Bill)",
      "Passport Photo",
      "Family Member Voter ID"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 21
  },
  {
    "id": "voter-id-correction",
    "name": "Voter ID Correction & e-EPIC Download (Form 8)",
    "category": "Identity & Legal",
    "icon": "check-square",
    "shortDescription": "Name, address, or photo correction in Voter ID and digital e-EPIC card download.",
    "description": "Assistance in filing Form 8 for address shifting, data correction, mobile number linking, and instant downloading of digital e-EPIC cards.",
    "keywords": [
      "voter id correction",
      "form 8",
      "epic download",
      "voter download"
    ],
    "documents": [
      "Existing Voter ID (EPIC) Number",
      "Aadhaar Card",
      "Correction Proof",
      "Linked Mobile Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 22
  },
  {
    "id": "passport-application-assistance",
    "name": "Passport Seva Online Application Assistance",
    "category": "Identity & Legal",
    "icon": "globe",
    "shortDescription": "Assistance in filling fresh and reissue Indian Passport applications on Passport Seva.",
    "description": "Step-by-step guidance for normal/tatkaal passport applications, non-ECR verification, document uploads, and appointment booking.",
    "keywords": [
      "passport",
      "passport seva",
      "fresh passport",
      "tatkaal passport"
    ],
    "documents": [
      "Aadhaar Card",
      "10th Passing Certificate (Non-ECR)",
      "PAN Card / Voter ID",
      "Bank Passbook / Address Proof"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 23
  },
  {
    "id": "passport-appointment",
    "name": "Passport Office Appointment Scheduling",
    "category": "Identity & Legal",
    "icon": "calendar",
    "shortDescription": "Appointment booking and rescheduling for PSK / POPSK offices.",
    "description": "Assistance with booking convenience slots, paying official passport appointment fees, slot rescheduling, and receipt generation.",
    "keywords": [
      "passport appointment",
      "psk appointment",
      "popsk",
      "arn receipt"
    ],
    "documents": [
      "Passport Application Reference Number (ARN)",
      "Login Credentials"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 24
  },
  {
    "id": "aadhaar-assistance",
    "name": "Aadhaar-Related Online Assistance",
    "category": "Identity & Legal",
    "icon": "lock",
    "shortDescription": "Assistance with official UIDAI online portal services, PVC card ordering, and verification.",
    "description": "Guidance on UIDAI portal features: ordering official PVC Aadhaar cards, verifying Aadhaar number authenticity, and booking center appointments.",
    "keywords": [
      "aadhaar",
      "uidai",
      "pvc aadhaar",
      "aadhaar check",
      "aadhaar appointment"
    ],
    "documents": [
      "Aadhaar Number / EID",
      "Registered Mobile Number for OTP"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 25
  },
  {
    "id": "photo-signature-resize",
    "name": "Photo & Signature Formatting for Online Forms",
    "category": "Identity & Legal",
    "icon": "image",
    "shortDescription": "Precision cropping, background correction, DPI adjustment, and KB sizing for job portals.",
    "description": "Specialized photo and signature processing matching exact recruitment portal specifications (KB limits, dimensions, white background, date stamps).",
    "keywords": [
      "photo resize",
      "signature crop",
      "photo kb converter",
      "image formatting"
    ],
    "documents": [
      "Original Photograph",
      "Clean Signature on White Paper"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 26
  },
  {
    "id": "income-certificate",
    "name": "Income Certificate Assistance (RTPS Bihar)",
    "category": "Certificates",
    "icon": "file-text",
    "shortDescription": "Online application assistance for Income Certificate (आय प्रमाण पत्र) on RTPS.",
    "description": "Assistance in drafting and submitting Income Certificate applications at CO/SDO/DM levels via the RTPS Bihar portal.",
    "keywords": [
      "income certificate",
      "aay praman patra",
      "rtps",
      "service plus",
      "bihar rtps"
    ],
    "documents": [
      "Aadhaar Card",
      "Passport Size Photograph",
      "Self-Declaration of Income",
      "Active Mobile Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 27
  },
  {
    "id": "caste-certificate",
    "name": "Caste Certificate Assistance (RTPS Bihar)",
    "category": "Certificates",
    "icon": "user-check",
    "shortDescription": "Application filing for Caste Certificate (जाति प्रमाण पत्र) for SC, ST, EBC, and BC categories.",
    "description": "Support for submitting Caste Certificate requests through RTPS Bihar for admission and job reservation requirements.",
    "keywords": [
      "caste certificate",
      "jati praman patra",
      "rtps bihar",
      "ebc",
      "bc",
      "sc",
      "st"
    ],
    "documents": [
      "Aadhaar Card",
      "Passport Photo",
      "Land Record / Family Caste Proof",
      "Self-Declaration"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 28
  },
  {
    "id": "residence-certificate",
    "name": "Residence Certificate Assistance (RTPS Bihar)",
    "category": "Certificates",
    "icon": "map-pin",
    "shortDescription": "Application assistance for Domicile / Residence Certificate (निवास प्रमाण पत्र).",
    "description": "Assistance in applying for official permanent residence / domicile certificates via the RTPS portal for examinations and quota eligibility.",
    "keywords": [
      "residence certificate",
      "domicile",
      "niwas praman patra",
      "rtps bihar"
    ],
    "documents": [
      "Aadhaar Card (with local address)",
      "Passport Photo",
      "Electricity Bill / Land Document",
      "Mobile Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 29
  },
  {
    "id": "ews-certificate",
    "name": "EWS Certificate Application Assistance",
    "category": "Certificates",
    "icon": "award",
    "shortDescription": "Economically Weaker Section (EWS) certificate for 10% general category reservation.",
    "description": "Guidance and online submission assistance for EWS income and asset certificates through state revenue and RTPS portals.",
    "keywords": [
      "ews certificate",
      "economically weaker section",
      "general reservation",
      "rtps ews"
    ],
    "documents": [
      "Aadhaar Card of Applicant & Family",
      "Current Year Income Certificate",
      "Land/Property Document",
      "Passport Photo"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 30
  },
  {
    "id": "obc-ncl-certificate",
    "name": "OBC Non-Creamy Layer (NCL) Certificate",
    "category": "Certificates",
    "icon": "shield",
    "shortDescription": "State and Central OBC-NCL certificate application for BC/EBC categories.",
    "description": "Assistance in applying for Non-Creamy Layer (NCL) certificates at CO, SDO, and DM levels for Bihar state and central formats.",
    "keywords": [
      "obc ncl",
      "non creamy layer",
      "obc certificate",
      "central obc",
      "rtps ncl"
    ],
    "documents": [
      "Existing Caste & Residence Certificates",
      "Current Year Income Certificate",
      "Aadhaar Card",
      "Self-Declaration Form"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 31
  },
  {
    "id": "character-certificate",
    "name": "Character Certificate Online Assistance",
    "category": "Certificates",
    "icon": "check-circle",
    "shortDescription": "Police verification and character certificate application via Bihar Police RTPS.",
    "description": "Assistance in applying for official Character Certificates (चरित्र प्रमाण पत्र) through the Bihar Police online verification system.",
    "keywords": [
      "character certificate",
      "police verification",
      "charitra praman patra"
    ],
    "documents": [
      "Aadhaar Card",
      "Residential Certificate",
      "Passport Photo",
      "Matriculation Certificate",
      "Mobile Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 32
  },
  {
    "id": "birth-certificate-assistance",
    "name": "Birth Certificate Application Assistance",
    "category": "Certificates",
    "icon": "heart",
    "shortDescription": "Online application guidance for municipal and block level birth registrations.",
    "description": "Assistance in compiling documentation and submitting online applications on official civil registration portals (CRS).",
    "keywords": [
      "birth certificate",
      "janam praman patra",
      "crs portal",
      "birth registration"
    ],
    "documents": [
      "Hospital Birth Summary / Discharge Slip",
      "Parents' Aadhaar Cards",
      "Address Proof / Ration Card"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 33
  },
  {
    "id": "death-certificate-assistance",
    "name": "Death Certificate Application Assistance",
    "category": "Certificates",
    "icon": "file-minus",
    "shortDescription": "Application assistance for official civil death certificate registration.",
    "description": "Assistance in preparing documents, submitting death registration requests on official portals, and downloading certificates.",
    "keywords": [
      "death certificate",
      "mrityu praman patra",
      "crs portal",
      "death registration"
    ],
    "documents": [
      "Hospital Death Report / Doctor Certificate",
      "Deceased Aadhaar Card",
      "Applicant Aadhaar Card"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 34
  },
  {
    "id": "electricity-bill-payment",
    "name": "Electricity Bill Payment Assistance",
    "category": "Banking & Bill Payments",
    "icon": "zap",
    "shortDescription": "Online payment and bill receipt generation for SBPDCL and NBPDCL consumers.",
    "description": "Fast bill lookup and digital payment assistance for South Bihar Power Distribution Company Limited (SBPDCL) with instant official receipts.",
    "keywords": [
      "electricity bill",
      "sbpdcl",
      "bijli bill",
      "light bill",
      "meter bill"
    ],
    "documents": [
      "Consumer Number (CA Number)",
      "Previous Bill Copy (optional)"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 35
  },
  {
    "id": "mobile-dth-recharge",
    "name": "Mobile & DTH Recharge Assistance",
    "category": "Banking & Bill Payments",
    "icon": "smartphone",
    "shortDescription": "Prepaid and postpaid mobile recharges and DTH television subscription payments.",
    "description": "Assistance with plan selection, validity packs, and DTH dish recharges across all operators (Jio, Airtel, Vi, BSNL, Tata Play, etc.).",
    "keywords": [
      "mobile recharge",
      "dth recharge",
      "jio",
      "airtel",
      "tata play"
    ],
    "documents": [
      "Mobile Number / DTH Customer ID",
      "Selected Plan Information"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 36
  },
  {
    "id": "insurance-premium-payment",
    "name": "Insurance Premium Payment Assistance",
    "category": "Banking & Bill Payments",
    "icon": "shield",
    "shortDescription": "Online premium payments and receipt downloads for LIC and general insurance.",
    "description": "Safe online premium payment assistance for Life Insurance Corporation of India (LIC) and general insurance with instant payment receipts.",
    "keywords": [
      "lic premium",
      "insurance payment",
      "life insurance",
      "health insurance"
    ],
    "documents": [
      "Policy Number",
      "Date of Birth of Policyholder",
      "Premium Amount Details"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 37
  },
  {
    "id": "bank-account-opening-form",
    "name": "Online Bank Account Opening Assistance",
    "category": "Banking & Bill Payments",
    "icon": "credit-card",
    "shortDescription": "Assistance in filling online zero-balance and savings account opening forms.",
    "description": "Guidance for filling digital savings account applications, Jan Dhan inquiries, and video-KYC pre-registration for major banks.",
    "keywords": [
      "bank account",
      "savings account",
      "zero balance",
      "sbi account"
    ],
    "documents": [
      "Aadhaar Card (linked with mobile)",
      "PAN Card",
      "Passport Photo",
      "Nominee Details"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 38
  },
  {
    "id": "pension-life-certificate",
    "name": "Digital Life Certificate Assistance (Jeevan Pramaan)",
    "category": "Banking & Bill Payments",
    "icon": "heart",
    "shortDescription": "Online Jeevan Pramaan submission and life certificate verification for pensioners.",
    "description": "Assistance for central, state, and EPFO pensioners in submitting digital life certificates online and verifying PPO numbers.",
    "keywords": [
      "jeevan pramaan",
      "life certificate",
      "pension certificate",
      "pensioner"
    ],
    "documents": [
      "PPO Number",
      "Pension Bank Passbook",
      "Aadhaar Card",
      "Mobile Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 39
  },
  {
    "id": "kyc-form-assistance",
    "name": "Online KYC Form & Update Assistance",
    "category": "Banking & Bill Payments",
    "icon": "user-check",
    "shortDescription": "Assistance with filling re-KYC and document update forms for banks and wallets.",
    "description": "Support for completing re-KYC forms, updating address and contact information with financial institutions, and document uploads.",
    "keywords": [
      "kyc update",
      "re-kyc",
      "bank kyc",
      "kyc document upload"
    ],
    "documents": [
      "Bank Account Number",
      "Aadhaar Card & PAN Card",
      "Address Proof",
      "Passport Photo"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 40
  },
  {
    "id": "fastag-recharge",
    "name": "FASTag Purchase & Recharge Assistance",
    "category": "Banking & Bill Payments",
    "icon": "navigation",
    "shortDescription": "Toll FASTag recharge and new vehicle FASTag application support.",
    "description": "Instant online balance recharge for vehicle FASTag across all issuing banks and assistance in purchasing new electronic toll tags.",
    "keywords": [
      "fastag",
      "fastag recharge",
      "toll recharge",
      "nhai fastag"
    ],
    "documents": [
      "Vehicle Registration Number (RC)",
      "FASTag Provider Details"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 41
  },
  {
    "id": "water-gas-bill-payment",
    "name": "LPG Gas Booking & Utility Payment",
    "category": "Banking & Bill Payments",
    "icon": "home",
    "shortDescription": "LPG cylinder refill booking (Indane, HP, Bharat Gas) and water bill payments.",
    "description": "Online booking of cooking gas cylinders, checking subsidy status, downloading receipts, and municipal water charge payments.",
    "keywords": [
      "gas booking",
      "lpg cylinder",
      "indane gas",
      "hp gas",
      "bharat gas"
    ],
    "documents": [
      "LPG Consumer Number / Gas Passbook",
      "Registered Mobile Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 42
  },
  {
    "id": "udyam-msme-registration",
    "name": "Udyam / MSME Registration Assistance",
    "category": "Business Services",
    "icon": "briefcase",
    "shortDescription": "Online application for Government Udyam MSME certificate for small businesses.",
    "description": "Assistance for shop owners, traders, and small business enterprises in applying for free central government Udyam MSME registration.",
    "keywords": [
      "udyam",
      "msme registration",
      "udyam certificate",
      "shop registration"
    ],
    "documents": [
      "Owner Aadhaar Card (linked with mobile)",
      "PAN Card",
      "Business Name & Address",
      "Bank Account Details"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 43
  },
  {
    "id": "gst-online-assistance",
    "name": "GST Online Portal Assistance",
    "category": "Business Services",
    "icon": "file-text",
    "shortDescription": "Assistance in navigating the GST portal, form submission, and tax challan creation.",
    "description": "Assistance in generating GST payment challans, downloading registration certificates, and checking taxpayer status on GSTN.",
    "keywords": [
      "gst",
      "gst challan",
      "gst portal",
      "gst certificate"
    ],
    "documents": [
      "GSTIN Number / Credentials",
      "Business PAN Card",
      "Challan Details"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 44
  },
  {
    "id": "trade-license-assistance",
    "name": "Municipal Trade License Assistance",
    "category": "Business Services",
    "icon": "home",
    "shortDescription": "Application assistance for municipal corporation trade license and shop establishment.",
    "description": "Guidance on compiling documents and submitting online trade license applications for retail shops and commercial establishments.",
    "keywords": [
      "trade license",
      "shop license",
      "nagar nigam",
      "municipal license"
    ],
    "documents": [
      "Shop Address Proof (Rent Agreement/Bill)",
      "Proprietor Aadhaar & PAN Card",
      "Shop Front Photo with Board"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 45
  },
  {
    "id": "business-document-typing",
    "name": "Professional Document Typing (Hindi & English)",
    "category": "Business Services",
    "icon": "edit",
    "shortDescription": "Accurate computer typing in Hindi (KrutiDev / Remington / Unicode) and English.",
    "description": "Expert word processing and typing for business proposals, formal applications, affidavits, legal notices, rent agreements, and letters.",
    "keywords": [
      "typing",
      "hindi typing",
      "english typing",
      "document typing"
    ],
    "documents": [
      "Draft / Handwritten Content or Rough Notes"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 46
  },
  {
    "id": "invoice-bill-formatting",
    "name": "Business Invoice & Quotation Formatting",
    "category": "Business Services",
    "icon": "layers",
    "shortDescription": "Custom design and formatting of professional billing estimates, invoices, and vouchers.",
    "description": "Creation and formatting of clean Excel/PDF invoices, cash memos, quotations, and payment vouchers customized with your business branding.",
    "keywords": [
      "invoice format",
      "bill formatting",
      "quotation format",
      "cash memo"
    ],
    "documents": [
      "Business Name & Contact Details",
      "Item & Pricing Breakdown"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 47
  },
  {
    "id": "food-fssai-assistance",
    "name": "FSSAI Basic Food Registration Assistance",
    "category": "Business Services",
    "icon": "shield",
    "shortDescription": "FSSAI FoSCoS portal application assistance for food stalls, canteens, and sweet shops.",
    "description": "Guidance on obtaining basic FSSAI 14-digit food safety registration for small food vendors, grocery stores, and restaurants.",
    "keywords": [
      "fssai",
      "food license",
      "foscos",
      "food registration"
    ],
    "documents": [
      "Photo of Food Operator",
      "Aadhaar Card / ID Proof",
      "Business Location Proof (Electricity Bill)",
      "List of Food Categories"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 48
  },
  {
    "id": "digital-signature-assistance",
    "name": "Digital Signature Certificate (DSC) Guidance",
    "category": "Business Services",
    "icon": "lock",
    "shortDescription": "Assistance with Class 3 Digital Signature application for e-tendering and MCA filings.",
    "description": "Guidance on identity verification, video recording requirements, and document submission for procuring Class 3 Digital Signature USB tokens.",
    "keywords": [
      "dsc",
      "digital signature",
      "class 3 dsc",
      "etender dsc"
    ],
    "documents": [
      "Applicant Aadhaar & PAN Card",
      "Passport Photo",
      "Active Mobile & Email"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 49
  },
  {
    "id": "business-project-report",
    "name": "Project Summary & Quotation Preparation",
    "category": "Business Services",
    "icon": "check-square",
    "shortDescription": "Preparation of basic project summaries, estimate sheets, and loan inquiry formats.",
    "description": "Assistance in formatting simple project profiles, loan inquiry summaries for PMEGP/Mudra loans, and formal quotation letters.",
    "keywords": [
      "project report",
      "mudra loan summary",
      "pmegp format",
      "quotation"
    ],
    "documents": [
      "Business Concept / Cost Breakdown",
      "Financial Estimates"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 50
  },
  {
    "id": "general-form-filling",
    "name": "General Online Form Filling Service",
    "category": "Other Online Services",
    "icon": "edit",
    "shortDescription": "Professional form filling assistance for any miscellaneous online portal or service.",
    "description": "Dedicated cyber cafe form-filling assistance for any public or private portal, ensuring error-free data entry and confirmation receipts.",
    "keywords": [
      "form filling",
      "cyber cafe form",
      "online application",
      "data entry"
    ],
    "documents": [
      "Personal & Academic Details",
      "Portal Specific Credentials"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 51
  },
  {
    "id": "scan-to-pdf",
    "name": "Document Scanning & Multi-Page PDF Creation",
    "category": "Other Online Services",
    "icon": "archive",
    "shortDescription": "High-resolution optical scanning of physical documents into clean, searchable PDFs.",
    "description": "High-speed document scanning up to 600 DPI. We convert physical marksheets, deeds, contracts, and IDs into multi-page PDF files.",
    "keywords": [
      "document scan",
      "pdf creator",
      "multi page pdf",
      "scanner"
    ],
    "documents": [
      "Original Physical Documents to be Scanned"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 52
  },
  {
    "id": "pdf-merge-split-compress",
    "name": "PDF Merge, Split & Size Compression",
    "category": "Other Online Services",
    "icon": "layers",
    "shortDescription": "Optimize PDF files to meet strict portal upload limits (under 100KB, 200KB, 500KB).",
    "description": "Fast processing of PDF files: combining multiple marksheets into a single file, extracting specific pages, and compressing file sizes.",
    "keywords": [
      "pdf compress",
      "pdf merge",
      "pdf split",
      "compress under 100kb"
    ],
    "documents": [
      "PDF Files Requiring Modification"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 53
  },
  {
    "id": "document-color-printing",
    "name": "Document Color & B/W Printing",
    "category": "Other Online Services",
    "icon": "download",
    "shortDescription": "High-speed laser and inkjet printing on 75 GSM to 100 GSM premium A4 sheets.",
    "description": "Sharp black-and-white and vibrant color document printing for exam admit cards, project reports, certificates, and legal drafts.",
    "keywords": [
      "printout",
      "color printing",
      "black and white print",
      "a4 print"
    ],
    "documents": [
      "Digital File (PDF, DOC, JPG) via WhatsApp or USB"
    ],
    "fee": null,
    "processingTime": null,
    "featured": true,
    "active": true,
    "order": 54
  },
  {
    "id": "lamination-service",
    "name": "Document & Identity Card Lamination",
    "category": "Other Online Services",
    "icon": "shield",
    "shortDescription": "Thermal plastic lamination for marksheets, certificates, Aadhaar, and identity cards.",
    "description": "High-grade thermal heat lamination (from ID pouch size to legal A4 size) providing waterproof and tear-resistant protection.",
    "keywords": [
      "lamination",
      "pouch lamination",
      "marksheet lamination",
      "card lamination"
    ],
    "documents": [
      "Original Paper Document to be Laminated"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 55
  },
  {
    "id": "email-creation-assistance",
    "name": "Email Account Creation & Password Recovery",
    "category": "Other Online Services",
    "icon": "user-check",
    "shortDescription": "Setting up secure professional Gmail accounts and account recovery assistance.",
    "description": "Assistance in creating clean professional email addresses, enabling two-factor mobile authentication, and resetting passwords safely.",
    "keywords": [
      "email creation",
      "gmail account",
      "email recovery",
      "password reset"
    ],
    "documents": [
      "Active Mobile Number",
      "Applicant Name & Date of Birth"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 56
  },
  {
    "id": "rail-flight-ticket-assistance",
    "name": "Travel Booking & Ticket Printout Assistance",
    "category": "Other Online Services",
    "icon": "navigation",
    "shortDescription": "Assistance with IRCTC train ticket search, flight booking portals, and travel printouts.",
    "description": "Assistance in searching train routes, checking seat availability, navigating flight booking platforms, and generating clean itinerary printouts.",
    "keywords": [
      "railway ticket",
      "irctc printout",
      "train ticket",
      "flight booking"
    ],
    "documents": [
      "Passenger Names & Ages",
      "Travel Date, Origin & Destination",
      "Photo ID Proof"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 57
  },
  {
    "id": "online-appointment-booking",
    "name": "Government & Medical Appointment Booking",
    "category": "Other Online Services",
    "icon": "calendar",
    "shortDescription": "Online slot booking for AIIMS, IGIMS, RTO driving tests, and registry appointments.",
    "description": "Assistance in scheduling online OPD registration slots for major hospitals (AIIMS, IGIMS), booking driving test slots, and registry appointments.",
    "keywords": [
      "appointment booking",
      "opd registration",
      "aiims appointment",
      "driving license slot"
    ],
    "documents": [
      "Patient / Applicant Aadhaar Card",
      "Active Mobile Number",
      "Doctor Department or RTO Application Number"
    ],
    "fee": null,
    "processingTime": null,
    "featured": false,
    "active": true,
    "order": 58
  }
]);

// In-Memory Dynamic Runtime Cache
let DYNAMIC_SERVICES_CACHE = [...SERVICES_DATA];
let isDynamicSynced = false;

// 1. Synchronous bootstrap from LocalStorage overrides
function loadLocalServices() {
  try {
    const local = localStorage.getItem('maa_dynamic_services');
    if (local) {
      const parsed = jsonParseSafe(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const map = new Map();
        SERVICES_DATA.forEach(s => map.set(s.id, { ...s }));
        parsed.forEach(s => {
          if (s && s.id) {
            map.set(s.id, { ...map.get(s.id), ...s });
          }
        });
        DYNAMIC_SERVICES_CACHE = Array.from(map.values()).sort((a, b) => (a.order || 999) - (b.order || 999));
      }
    }
  } catch (e) {
    console.warn('[Services] Local load notice:', e);
  }
}
loadLocalServices();

function jsonParseSafe(str) {
  try { return JSON.parse(str); } catch (e) { return null; }
}

/**
 * Synchronize Services with Firestore (collection 'services')
 * Updates the runtime cache with live services created/edited by Admin.
 * @returns {Promise<Array<Object>>}
 */
async function syncServicesWithFirestore() {
  try {
    if (window.FirebaseApp && window.FirebaseApp.db) {
      const { db, collection, getDocs } = window.FirebaseApp;
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        const map = new Map();
        SERVICES_DATA.forEach(s => map.set(s.id, { ...s }));
        
        snap.forEach(docSnap => {
          const data = docSnap.data();
          map.set(docSnap.id, {
            id: docSnap.id,
            ...data
          });
        });

        DYNAMIC_SERVICES_CACHE = Array.from(map.values()).sort((a, b) => (a.order || 999) - (b.order || 999));
        isDynamicSynced = true;
        
        try {
          localStorage.setItem('maa_dynamic_services', JSON.stringify(DYNAMIC_SERVICES_CACHE));
        } catch (err) {}

        // Notify active pages
        window.dispatchEvent(new CustomEvent('maa_services_updated', { detail: DYNAMIC_SERVICES_CACHE }));
        return DYNAMIC_SERVICES_CACHE;
      }
    }
  } catch (err) {
    console.warn('[Services] Firestore sync notice (Using cached catalog):', err.message);
  }
  return DYNAMIC_SERVICES_CACHE;
}

/**
 * SVG Icons Mapping
 */
function getServiceIconSvg(iconName) {
  const icons = {
    'briefcase': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    'navigation': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>',
    'dollar-sign': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
    'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    'award': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    'check-square': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
    'book-open': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    'download': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    'user-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>',
    'gift': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
    'zap': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    'edit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    'compass': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>',
    'archive': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>',
    'credit-card': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
    'refresh-cw': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>',
    'user-plus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>',
    'globe': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    'calendar': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    'lock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    'image': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    'map-pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
    'file-minus': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>',
    'smartphone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
    'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
  };
  return icons[iconName] || icons['file-text'];
}

/**
 * Service Access API
 */
function getAllServices(includeInactive = false) {
  const list = includeInactive ? DYNAMIC_SERVICES_CACHE : DYNAMIC_SERVICES_CACHE.filter(s => s.active !== false);
  return [...list].sort((a, b) => (a.order || 999) - (b.order || 999));
}

function getServiceById(serviceId) {
  if (!serviceId) return null;
  return DYNAMIC_SERVICES_CACHE.find(s => s.id === serviceId) || null;
}

function getServicesByCategory(category, includeInactive = false) {
  const list = getAllServices(includeInactive);
  if (!category || category === 'All Services') {
    return list;
  }
  return list.filter(s => s.category === category);
}

function searchServices(query, category = 'All Services', includeInactive = false) {
  let results = getServicesByCategory(category, includeInactive);
  if (!query || !query.trim()) {
    return results;
  }

  const q = query.toLowerCase().trim();
  return results.filter(service => {
    const inName = service.name && service.name.toLowerCase().includes(q);
    const inShort = service.shortDescription && service.shortDescription.toLowerCase().includes(q);
    const inDesc = service.description && service.description.toLowerCase().includes(q);
    const inCat = service.category && service.category.toLowerCase().includes(q);
    const inKeywords = Array.isArray(service.keywords) && service.keywords.some(k => k.toLowerCase().includes(q));
    const inDocs = Array.isArray(service.documents) && service.documents.some(d => d.toLowerCase().includes(q));

    return inName || inShort || inDesc || inCat || inKeywords || inDocs;
  });
}

function filterServices(category, query = '', includeInactive = false) {
  return searchServices(query, category, includeInactive);
}

function getFeaturedServices(limit = 6) {
  const allActive = getAllServices(false);
  const featured = allActive.filter(s => s.featured === true);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  // If fewer than limit are explicitly marked featured, fill with top active services
  const set = new Set(featured.map(s => s.id));
  const remaining = allActive.filter(s => !set.has(s.id));
  return [...featured, ...remaining].slice(0, limit);
}

function getCategories() {
  return SERVICE_CATEGORIES;
}

/**
 * Service Card HTML Generator for services.html Catalog
 */
function renderServiceCardMarkup(service) {
  const iconSvg = getServiceIconSvg(service.icon);
  const docsList = Array.isArray(service.documents) && service.documents.length > 0
    ? service.documents.slice(0, 3).map(d => `<li>• ${escapeHtml(d)}</li>`).join('') 
    : '<li>• Standard identity & academic documents</li>';

  return `
    <article class="service-catalog-card" data-category="${escapeHtml(service.category)}" data-id="${escapeHtml(service.id)}">
      <div class="service-card-top">
        <div class="service-icon-wrapper">
          ${iconSvg}
        </div>
        <span class="service-cat-badge">${escapeHtml(service.category)}</span>
      </div>

      <h3 class="service-card-title">
        <a href="service-details.html?id=${encodeURIComponent(service.id)}">
          ${escapeHtml(service.name)}
        </a>
      </h3>

      <p class="service-card-description">
        ${escapeHtml(service.shortDescription || service.description || '')}
      </p>

      <div class="service-card-meta">
        <span class="meta-label">Required Documents:</span>
        <ul class="meta-doc-list">
          ${docsList}
        </ul>
      </div>

      <div class="service-card-actions">
        <a href="service-details.html?id=${encodeURIComponent(service.id)}" class="btn btn-outline btn-sm">
          <span>View Details</span>
        </a>
        <a href="apply.html?service=${encodeURIComponent(service.id)}" class="btn btn-primary btn-sm">
          <span>Apply Online</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>
    </article>
  `;
}

/**
 * Render Home Page Featured Card Markup
 */
function renderHomeServiceCard(s) {
  return `
    <div class="service-card reveal" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="service-card-top">
          <div class="service-icon-box">
            ${getServiceIconSvg(s.icon)}
          </div>
          <span class="service-tag">${escapeHtml(s.category)}</span>
        </div>
        <h3 class="service-title">${escapeHtml(s.name)}</h3>
        <p class="service-description">${escapeHtml(s.shortDescription || s.description || '')}</p>
        <div style="font-size: 0.8125rem; color: var(--accent-cyan); margin-top: 0.5rem; font-weight: 500;">
          ${escapeHtml(s.fee ? s.fee : 'Official Govt Fee')} • ${escapeHtml(s.processingTime ? s.processingTime : 'Same Day')}
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; margin-top: 1.25rem;">
        <a href="service-details.html?id=${encodeURIComponent(s.id)}" class="btn btn-outline btn-xs" style="flex: 1; text-align: center;">Details</a>
        <a href="apply.html?service=${encodeURIComponent(s.id)}" class="btn btn-primary btn-xs" style="flex: 1; text-align: center;">Apply Now</a>
      </div>
    </div>
  `;
}

/**
 * Render Featured Services on Homepage (index.html)
 */
function renderHomeFeaturedServices() {
  const grid = document.getElementById('homeFeaturedServicesGrid');
  if (!grid) return;

  const services = getFeaturedServices(6);
  
  if (services.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 2rem;">No services available at the moment.</div>';
    return;
  }

  grid.innerHTML = services.map(s => renderHomeServiceCard(s)).join('');
  if (window.initScrollReveal) {
    window.initScrollReveal();
  }
}

async function initHomeFeaturedServices() {
  // 1. Render immediately from local cache / baseline (no stuck loading)
  renderHomeFeaturedServices();

  // 2. Asynchronously sync with Firestore and re-render if updated
  await syncServicesWithFirestore();
  renderHomeFeaturedServices();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Services Catalog Controller for services.html
 */
class ServicesCatalogController {
  constructor() {
    this.currentCategory = 'All Services';
    this.currentQuery = '';
    this.filteredServices = [];
    this.displayedCount = 12;
    this.pageSize = 12;

    // Elements
    this.servicesGrid = document.getElementById('servicesGrid');
    this.categoryFiltersContainer = document.getElementById('categoryFiltersContainer') || document.getElementById('categoryFilters');
    this.searchInput = document.getElementById('serviceSearchInput') || document.getElementById('serviceSearch');
    this.clearSearchBtn = document.getElementById('clearSearchBtn') || document.getElementById('clearSearch');
    this.serviceCountEl = document.getElementById('serviceCount');
    this.loadMoreContainer = document.getElementById('loadMoreContainer');
    this.loadMoreBtn = document.getElementById('loadMoreBtn');
    this.emptyState = document.getElementById('servicesEmptyState') || document.getElementById('emptyState');
    this.resetFiltersBtn = document.getElementById('resetFiltersBtn');
  }

  async init() {
    this.renderCategoryFilters();
    this.bindEvents();
    this.filterAndRender();

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    const searchParam = urlParams.get('search') || urlParams.get('q');

    if (catParam && SERVICE_CATEGORIES.includes(catParam)) {
      this.setCategory(catParam);
    }

    if (searchParam) {
      this.currentQuery = searchParam;
      if (this.searchInput) this.searchInput.value = searchParam;
      if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'flex';
      this.filterAndRender();
    }

    // Sync with Firestore asynchronously
    await syncServicesWithFirestore();
    this.filterAndRender();
  }

  renderCategoryFilters() {
    if (!this.categoryFiltersContainer) return;
    this.categoryFiltersContainer.innerHTML = SERVICE_CATEGORIES.map(cat => `
      <button type="button" class="category-pill-btn ${cat === this.currentCategory ? 'active' : ''}" data-category="${escapeHtml(cat)}">
        ${escapeHtml(cat)}
      </button>
    `).join('');

    this.categoryFiltersContainer.querySelectorAll('.category-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        this.setCategory(cat);
      });
    });
  }

  setCategory(category) {
    this.currentCategory = category;
    this.displayedCount = this.pageSize;
    this.renderCategoryFilters();
    this.filterAndRender();
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.currentQuery = e.target.value;
        if (this.clearSearchBtn) {
          this.clearSearchBtn.style.display = this.currentQuery.trim() ? 'flex' : 'none';
        }
        this.displayedCount = this.pageSize;
        this.filterAndRender();
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        this.currentQuery = '';
        if (this.searchInput) {
          this.searchInput.value = '';
          this.searchInput.focus();
        }
        this.clearSearchBtn.style.display = 'none';
        this.displayedCount = this.pageSize;
        this.filterAndRender();
      });
    }

    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener('click', () => {
        this.displayedCount += this.pageSize;
        this.renderServicesList(true);
      });
    }

    if (this.resetFiltersBtn) {
      this.resetFiltersBtn.addEventListener('click', () => {
        this.currentCategory = 'All Services';
        this.currentQuery = '';
        if (this.searchInput) this.searchInput.value = '';
        if (this.clearSearchBtn) this.clearSearchBtn.style.display = 'none';
        this.renderCategoryFilters();
        this.displayedCount = this.pageSize;
        this.filterAndRender();
      });
    }

    window.addEventListener('maa_services_updated', () => {
      this.filterAndRender();
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'maa_dynamic_services') {
        loadLocalServices();
        this.filterAndRender();
      }
    });
  }

  filterAndRender() {
    this.filteredServices = filterServices(this.currentCategory, this.currentQuery, false);
    this.updateCountDisplay();
    this.renderServicesList(false);
  }

  updateCountDisplay() {
    if (!this.serviceCountEl) return;
    const count = this.filteredServices.length;
    const total = getAllServices(false).length;

    if (this.currentCategory === 'All Services' && !this.currentQuery.trim()) {
      this.serviceCountEl.textContent = `Showing all ${count} available services`;
    } else {
      this.serviceCountEl.textContent = `Showing ${count} of ${total} services`;
    }
  }

  renderServicesList(isAppend = false) {
    if (!this.servicesGrid) return;

    if (this.filteredServices.length === 0) {
      this.servicesGrid.innerHTML = '';
      if (this.emptyState) this.emptyState.style.display = 'flex';
      if (this.loadMoreContainer) this.loadMoreContainer.style.display = 'none';
      return;
    }

    if (this.emptyState) this.emptyState.style.display = 'none';

    const visibleServices = this.filteredServices.slice(0, this.displayedCount);
    this.servicesGrid.innerHTML = visibleServices.map(service => renderServiceCardMarkup(service)).join('');

    if (this.loadMoreContainer) {
      if (visibleServices.length < this.filteredServices.length) {
        this.loadMoreContainer.style.display = 'flex';
        if (this.loadMoreBtn) {
          const remaining = this.filteredServices.length - visibleServices.length;
          const label = this.loadMoreBtn.querySelector('.load-more-text');
          if (label) label.textContent = `Load More Services (${remaining} remaining)`;
        }
      } else {
        this.loadMoreContainer.style.display = 'none';
      }
    }

    if (window.initScrollReveal) {
      window.initScrollReveal();
    } else {
      document.querySelectorAll('.service-catalog-card').forEach(card => card.classList.add('revealed'));
    }
  }
}

// Lifecycle registration
document.addEventListener('DOMContentLoaded', () => {
  // If on index.html
  if (document.getElementById('homeFeaturedServicesGrid')) {
    initHomeFeaturedServices();
  }
  
  // If on services.html
  if (document.getElementById('servicesGrid')) {
    const catalog = new ServicesCatalogController();
    catalog.init();
    window.MaaServicesCatalog = catalog;
  }
});

// Cross-tab synchronization
window.addEventListener('storage', (e) => {
  if (e.key === 'maa_dynamic_services') {
    loadLocalServices();
    renderHomeFeaturedServices();
  }
});

window.addEventListener('maa_services_updated', () => {
  renderHomeFeaturedServices();
});

// Global exports
window.SERVICE_CATEGORIES = SERVICE_CATEGORIES;
window.SERVICES_DATA = SERVICES_DATA;
window.getAllServices = getAllServices;
window.getServiceById = getServiceById;
window.getServicesByCategory = getServicesByCategory;
window.searchServices = searchServices;
window.filterServices = filterServices;
window.getFeaturedServices = getFeaturedServices;
window.getCategories = getCategories;
window.getServiceIconSvg = getServiceIconSvg;
window.renderServiceCardMarkup = renderServiceCardMarkup;
window.renderHomeFeaturedServices = renderHomeFeaturedServices;
window.syncServicesWithFirestore = syncServicesWithFirestore;
