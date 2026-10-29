/**
 * SITE CONTENT — every fact sourced from the manuscript
 * (The_Generational_Curse_Breaker_Complete_Book.docx) or the build brief.
 * Nothing invented. Placeholders are marked [placeholder] and logged in /docs/OPEN-ITEMS.md.
 */

export const BOOK = {
  title: "The Generational Curse Breaker",
  subtitle:
    "A Family's Battle Against Undue Influence, Systemic Neglect, and the Theft of Carrie Evans's Legacy",
  author: "Victor L. Evans",
  edition: "First edition, 2025",
  language: "English",
  chapters: 12,
  parts: 4,
  // Placeholders — logged in OPEN-ITEMS:
  format: "Format to be confirmed",
  isbn: "ISBN to be confirmed",
  price: "Price to be confirmed",
  buyLink: "#get-the-book", // [placeholder] retailer link pending
};

export const HERO = {
  eyebrow: "A true account. First edition, 2025.",
  titleLines: ["The Generational", "Curse Breaker"],
  subtitle: BOOK.subtitle,
  // Verbatim, Author's Note:
  hook: "I am not asking anyone to take my word for it. I am asking people to read the record.",
  ctaPrimary: { label: "Read the Record", href: "#/record/timeline" },
  ctaSecondary: { label: "Get the Book", href: "#get-the-book" },
  ticker: [
    "Read the record.",
    "Thirty years.",
    "The walls remember.",
    "I didn't forget.",
    "This book is the audit.",
  ],
};

export const AUTHOR = {
  eyebrow: "About the Author",
  name: "Victor L. Evans",
  // Verbatim condensation, Author's Note:
  revealText:
    "I am now in my seventies. I am not a professional writer. I am a retired United States Army veteran with two Master's degrees — one in Public Administration, the other in Human Resources Management. I spent a career in institutions that value documentation, chain of custody, evidence, and accountability. What follows is written in that spirit.",
  // Verbatim, Author's Note:
  pullQuote: "I am the evidence.",
  pullQuoteContext:
    "From the Author's Note — written for families, attorneys, social workers, judges, legislators, and law enforcement.",
  facts: [
    { k: "Service", v: "Retired United States Army veteran" },
    { k: "Education", v: "Two Master's degrees — Public Administration; Human Resources Management" },
    { k: "Career", v: "A career among records, chain of custody, and accountability" },
    { k: "Why this book", v: "\u201cI chose to write this book because time is running out.\u201d" },
  ],
  numbers: [
    { value: 30, suffix: "", label: "Years of documentation" },
    { value: 7, suffix: "", label: "Children in one row house" },
    { value: 6, suffix: "", label: "Demands for justice" },
    { value: 12, suffix: "", label: "Chapters" },
  ],
  portraitCaption: "Author portrait [placeholder — to be supplied]",
};

export const BOOK_SECTION = {
  eyebrow: "About the Book",
  heading: "One house. One record. Thirty years.",
  beats: [
    {
      id: "house",
      num: "I",
      title: "The House",
      text: "2905 Mills Avenue N.E., in Washington's Langdon neighborhood. Seven children, two parents, one bathroom. A brick row house paid off by hand — payment by payment, earned at the Greyhound terminal and kept standing by a mother who, in the author's words, held the family together through poverty, through violence, through everything.",
      ref: "Prologue; Chapter 1",
    },
    {
      id: "net",
      num: "II",
      title: "The Net",
      text: "A fire displaces mother and daughter four blocks from home. The author documents a will drafted by an attorney connected to the household that sheltered them, a document he describes as signed under duress — and the decades that followed: a sister isolated, brothers lost, a family's estate transferred to people who were not family.",
      ref: "Chapters 4–7",
    },
    {
      id: "reckoning",
      num: "III",
      title: "The Reckoning",
      text: "Thirty years of letters to agencies that did not act. Complaints filed, statutes cited, copies kept. And in Chapter 12, six formal demands for justice — specific, documented, addressed to the institutions with the authority to act.",
      ref: "Chapters 10–12",
    },
  ],
  parts: [
    {
      part: "Part One",
      title: "Foundations and Fault Lines",
      chapters: [
        "Chapter 1 — The Greyhound Janitor and the Cycle of Abuse",
        "Chapter 2 — The Twins and the Burden of Hemiplegia",
        "Chapter 3 — The Stranger in Langdon Park",
      ],
    },
    {
      part: "Part Two",
      title: "The Net Tightens",
      chapters: [
        "Chapter 4 — Displacement and the Opportunists",
        "Chapter 5 — A Will Under Duress",
        "Chapter 6 — The Tragic End of Carrie Evans",
      ],
    },
    {
      part: "Part Three",
      title: "The Era of Isolation and Tragedy",
      chapters: [
        "Chapter 7 — The Puppeteers Take Control",
        "Chapter 8 — Casualties of Neglect: The Brothers' Demise",
        "Chapter 9 — The Illusion of Companionship",
      ],
    },
    {
      part: "Part Four",
      title: "The Fight for Accountability",
      chapters: [
        "Chapter 10 — Deaf Ears and Blind Eyes: The Systemic Failure",
        "Chapter 11 — The Legal Battlefield: Coercion vs. Free Will",
        "Chapter 12 — The Generational Curse Breaker",
      ],
    },
  ],
  audience: {
    title: "Who it is for",
    text: "From the Author's Note — for anyone who has a family member with a developmental disability; for anyone who has watched the system fail to protect someone who cannot fully protect themselves; for law enforcement officers, attorneys, social workers, judges, and legislators.",
  },
  details: [
    { k: "Title", v: BOOK.title },
    { k: "Subtitle", v: BOOK.subtitle },
    { k: "Author", v: "Victor L. Evans" },
    { k: "Edition", v: "First edition, 2025" },
    { k: "Format", v: "To be confirmed [placeholder]" },
    { k: "ISBN", v: "To be confirmed [placeholder]" },
    { k: "Price", v: "To be confirmed [placeholder]" },
  ],
};

export const FOOTER = {
  bigLine: "I didn't forget.",
  columns: [
    {
      title: "The Record",
      links: [
        { label: "The Timeline", href: "#/record/timeline" },
        { label: "The Family", href: "#/record/family" },
        { label: "The System", href: "#/record/system" },
        { label: "The Six Demands", href: "#/record/demands" },
        { label: "Read Inside", href: "#/record/inside" },
      ],
    },
    {
      title: "The Book",
      links: [
        { label: "About the Author", href: "#author" },
        { label: "About the Book", href: "#book" },
        { label: "Get the Book", href: "#get-the-book" },
        { label: "Request a Review Copy", href: "#review-copy" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Contact", href: "#contact" },
        { label: "Press and Media", href: "#press" },
        { label: "Privacy", href: "#privacy" },
      ],
    },
  ],
  credit: "Copyright \u00a9 2025 Victor L. Evans. All rights reserved.",
  nonfictionNote:
    "This is a work of nonfiction. The events described are true to the best of the author's knowledge and recollection, supported by legal documents, sworn affidavits, medical records, and official government correspondence referenced throughout the text.",
  resources:
    "If someone you know is being exploited: Adult Protective Services and the Eldercare Locator can help. [Contact details to be verified before launch.]",
  backToTop: "Back to the steps",
};

/* ---------------- THE RECORD : five tabs ---------------- */

export const RECORD_TABS = [
  { id: "timeline", label: "The Timeline", blurb: "The record, year by year." },
  { id: "family", label: "The Family", blurb: "The people of the record." },
  { id: "system", label: "The System", blurb: "What was sent. What came back." },
  { id: "demands", label: "The Six Demands", blurb: "Six requests from Chapter 12." },
  { id: "inside", label: "Read Inside", blurb: "The parts, the chapters, three excerpts." },
];

export const TIMELINE = [
  {
    year: "Late 1950s",
    title: "The house on Mills Avenue",
    text: "James and Carrie Evans buy 2905 Mills Avenue N.E., in the Langdon neighborhood of Washington, D.C. — \u201cduring that narrow window when a Black family with a steady income could purchase property in Northeast Washington without being redlined into oblivion.\u201d",
    ref: "Prologue; Chapter 1",
  },
  {
    year: "May 15, 1960",
    title: "The twins",
    text: "Phillip Leer Evans and Phyllis Lorraine Evans are born at Freedman's Hospital in Washington, D.C. Phyllis does not walk until she is three. The household adapts, and the adaptation becomes the family's quiet constant.",
    ref: "Chapters 1–2",
  },
  {
    year: "1969",
    title: "The enlistment",
    text: "Victor Evans enlists in the United States Army at nineteen. The Army gives him structure, purpose, education, and a career — and the \u201carmor of competence\u201d: two Master's degrees, military service, a record of achievement.",
    ref: "Chapter 1",
  },
  {
    year: "1980",
    title: "The father's death",
    text: "James William Evans Sr., Navy veteran and Greyhound terminal mechanic, dies. The house at 2905 Mills Avenue transfers to Carrie Viola Evans — owned free and clear. \u201cNo mortgage. No landlord.\u201d",
    ref: "Chapter 1",
  },
  {
    year: "Dec 21, 1992",
    title: "The Army's determination",
    text: "The Secretary of the Army, by order dated December 21, 1992, determines the author is totally and permanently disabled, effective December 22, 1987. The author documents the VA's 60 percent rating standing against the Army's 100 percent for twenty-three years.",
    ref: "Chapter 12",
  },
  {
    year: "Undated",
    title: "The fire",
    text: "A fire at 2905 Mills Avenue dissolves the routine of the house. Carrie and Phyllis are offered shelter four blocks away, on Hamlin Street N.E. — \u201cclose enough to watch the house. Close enough to control the narrative.\u201d The manuscript does not state a date for the fire.",
    ref: "Prologue; Chapter 4",
  },
  {
    year: "1995 \u2013 1996",
    title: "The will",
    text: "While Carrie Evans lives under another's roof, a will is drafted by an attorney the author identifies as connected to that household. The Foreword places the drafting in 1995; Chapter 7 places it late 1995 or 1996. The date is flagged for the author's confirmation.",
    ref: "Foreword; Chapters 5, 7",
    flagged: true,
  },
  {
    year: "Fall 1996",
    title: "Dwight",
    text: "Dwight Landers Evans dies — \u201cthe first of us to go.\u201d He is buried without a headstone. The author's fourth demand asks for a marker: \u201cA man who served his country\u2026 deserves more than an unmarked grave.\u201d",
    ref: "Chapter 8; Chapter 12",
  },
  {
    year: "Dec 1996",
    title: "The mother's death",
    text: "Carrie Viola Evans dies after a Sunday-evening medical emergency; she is taken to Providence Hospital, with Phyllis the only family member present. Note: the manuscript's dates for her death differ — Chapter 6 states December 1996; the Prologue references 2004. The date is flagged for the author's confirmation.",
    ref: "Chapter 6; Prologue",
    flagged: true,
  },
  {
    year: "2017",
    title: "The FBI complaint",
    text: "On September 5, 2017, the author files a formal criminal complaint with the Federal Bureau of Investigation. Writing that year, he described himself as \u201ccompletely aware of the problem\u201d but \u201calmost feel[ing] powerless.\u201d",
    ref: "Chapter 10; Foreword",
  },
  {
    year: "Mar 29, 2024",
    title: "Monk v. United States",
    text: "A class action is filed alleging systemic racial discrimination against Black veterans in the administration of VA benefits since 1945. The author is a member of the class.",
    ref: "Chapter 12",
  },
  {
    year: "May 2025",
    title: "The petition to Congress",
    text: "The author petitions the United States Congress for an investigation into \u201cthe systemic failure of federal and District of Columbia agencies to protect a developmentally disabled adult from decades of financial exploitation, undue influence, and isolation from her family.\u201d",
    ref: "Epigraph",
  },
  {
    year: "2025",
    title: "The book",
    text: "The Generational Curse Breaker is published — first edition. \u201cThirty years. Thousands of pages of documentation. Hundreds of letters. Dozens of agencies contacted. Zero meaningful interventions. That is the balance sheet. This book is the audit.\u201d",
    ref: "Foreword; copyright page",
  },
];

export const FAMILY = {
  intro:
    "The people of the record, as the book names them — in full, as an act of dignity. No photographs appear on this page; the book's own words stand in their place.",
  members: [
    {
      name: "Carrie Viola Evans",
      years: "n\u00e9e Sumner \u00b7 mother",
      epitaph:
        "She raised seven children in a house with one bathroom and \u201cprayed the way other people breathed.\u201d Her spoken estate plan — protection for Phyllis, the house preserved, the family land shared — is the book's founding document.",
      note: "Died December 1996 (per Chapter 6; the Prologue cites 2004 — date flagged). Buried at Fort Lincoln Cemetery.",
      living: false,
    },
    {
      name: "James William Evans Sr.",
      years: "father",
      epitaph:
        "Navy veteran. Cook, then mechanic, at the Greyhound terminal on New York Avenue. He paid the mortgage on 2905 Mills Avenue until it was paid in full — \u201can act of defiance\u201d against every expectation placed on a Black man of his generation.",
      note: "Died 1980. With his death, the house passed to Carrie Evans, free and clear.",
      living: false,
    },
    {
      name: "Phyllis Lorraine Evans",
      years: "sister \u00b7 born May 15, 1960",
      epitaph:
        "Born at Freedman's Hospital, the younger twin. \u201cPhyllis is not stupid\u2026 She is specifically, predictably, and permanently unable to perform certain cognitive functions.\u201d A sister, and a person — the one this book is, above all, for.",
      note: "The author's first demand is an independent, court-selected guardian to protect her.",
      living: true,
    },
    {
      name: "James Evans Jr.",
      years: "brother",
      epitaph:
        "The oldest brother, a veteran. \u201cThe brother whose advice kept me from trying when the streets were offering\u201d — his clear-eyed warning was his gift. He died in the family home on Mills Avenue.",
      note: "The author documents a failure to notify him in time, and asks that his remains be properly interred.",
      living: false,
    },
    {
      name: "Phillip Leer Evans",
      years: "brother \u00b7 twin, born May 15, 1960",
      epitaph:
        "The physically dominant twin — stronger grip, better cry, first to everything. The author writes of his death in the house alongside James Jr., and of remains never properly interred.",
      note: "\u201cMy brother Phillip is dead.\u201d — Author's Note",
      living: false,
    },
    {
      name: "Tyrone Eric Evans",
      years: "brother",
      epitaph:
        "Father of Simone. He watched what was being done to the family, understood the pattern, \u201cand he carried that knowledge to his grave.\u201d His own daughter's wedding excluded him.",
      note: "Named in Chapter 8 among the brothers the book mourns.",
      living: false,
    },
    {
      name: "Dwight Landers Evans",
      years: "brother",
      epitaph:
        "\u201cThe first of us to go.\u201d Quiet, the way middle children in large families learn to be quiet. He managed his illness, went to his appointments, \u201cand he died anyway.\u201d",
      note: "Died fall 1996. Lies without a headstone. The author's fourth demand is to put one there: \u201cI will put a stone on my brother's grave.\u201d",
      living: false,
    },
  ],
};

export const SYSTEM = {
  intro:
    "What the author says he sent, and what he says came back — in his framing, a record rather than a list of grievances. Each entry cites the chapter where the account appears.",
  balanceSheet: [
    { value: 30, label: "Years", suffix: "" },
    { value: 0, label: "Meaningful interventions", suffix: "" },
  ],
  ledger: [
    { value: "Thousands", label: "of pages of documentation" },
    { value: "Hundreds", label: "of letters" },
    { value: "Dozens", label: "of agencies contacted" },
  ],
  institutions: [
    {
      name: "Metropolitan Police Department",
      sub: "5th District \u00b7 Washington, D.C.",
      sent: "Requests for welfare checks at 2905 Mills Avenue N.E., when the author could not verify his sister's safety or care.",
      received:
        "Responses defaulting the matter to \u201ccivil,\u201d the author documents — a closed door he describes in Chapter 10.",
      ref: "Chapter 10",
    },
    {
      name: "Adult Protective Services",
      sub: "Department of Health and Human Services",
      sent: "Complaints, over years, documenting the exploitation of a disabled adult — with evidence, in writing.",
      received:
        "Closures and dismissals. The author's account: the agency \u201cundertook to protect\u201d his sister and, he documents, failed through negligence.",
      ref: "Chapters 10–12",
    },
    {
      name: "Federal Bureau of Investigation",
      sub: "Department of Justice",
      sent: "A formal criminal complaint filed September 5, 2017 — fraud, exploitation of a vulnerable adult, property transfer.",
      received:
        "Silence, in the author's account. In 2017 he wrote that he was \u201ccompletely aware of the problem\u201d but \u201calmost feel powerless.\u201d",
      ref: "Chapter 10; Foreword",
    },
    {
      name: "Department of Veterans Affairs",
      sub: "VA Case 30-262-166",
      sent: "Requests to correct a 60 percent disability rating the Army itself had overridden with 100 percent, effective December 22, 1987.",
      received:
        "Twenty-three years of the lower rating, the author documents — a denial he links directly to his inability to sustain the legal fight for his sister.",
      ref: "Chapter 12",
    },
    {
      name: "Providence Hospital",
      sub: "Northeast Washington",
      sent: "Nothing — the author was never called.",
      received:
        "In the author's account of December 1996: his mother's emergency was handled with only Phyllis present, and no one asked whether there were other children.",
      ref: "Chapter 6",
    },
    {
      name: "The United States Congress",
      sub: "and the Attorney General of the District of Columbia",
      sent: "Thirty years of letters — and, in May 2025, a petition for a congressional investigation into the systemic failure to protect his sister.",
      received:
        "\u201cThe responses range from silence to form letters to active dismissal.\u201d — Author's Note",
      ref: "Epigraph; Author's Note",
    },
  ],
};

export const DEMANDS = {
  intro:
    "Six requests, printed in Chapter 12 in the author's own words. Framed by the book as \u201cdocumented, legally grounded, factually supported requests for specific actions by specific authorities.\u201d Open each card to read what is asked.",
  items: [
    {
      num: "01",
      title: "Independent Forensic Medical & Psychological Evaluation",
      body: "The appointment of an independent guardian for Phyllis Lorraine Evans — selected by the court, not by the people who currently control her life, with expertise in developmental disability. Quarterly assessments of her health, living conditions, and finances, and the authority to remove her from any environment determined to be harmful.",
      ref: "Chapter 12 \u00b7 Demand 1",
    },
    {
      num: "02",
      title: "Emergency Protective Order & Neutral Guardianship",
      body: "A permanent protection order prohibiting all contact — in person, by telephone, by mail, by electronic communication, through third parties — between the individuals named in the book and Phyllis Lorraine Evans, in every legal, financial, and medical matter.",
      ref: "Chapter 12 \u00b7 Demand 2",
    },
    {
      num: "03",
      title: "Complete Financial Audit of 2905 Mills Ave & NC Land",
      body: "A comprehensive legal investigation into the management of the row house and the forty acres of North Carolina land since 1996 — every transaction, filing, tax bill, and insurance claim. The author asks that the transfer he documents as fraudulent be voided, and the remaining equity distributed to all of Carrie Evans's heirs.",
      ref: "Chapter 12 \u00b7 Demand 3",
    },
    {
      num: "04",
      title: "Dignified Burials & Headstone Restoration for Brothers",
      body: "A headstone for Dwight Landers Evans, who lies in an unmarked grave. The location and proper interment of the remains of James Jr. and Phillip. And a properly marked grave for Carrie Viola Evans at Fort Lincoln Cemetery. \u201cI am not asking for monuments. I am asking for headstones.\u201d",
      ref: "Chapter 12 \u00b7 Demand 4",
    },
    {
      num: "05",
      title: "Criminal Investigation of Named Perpetrators",
      body: "Printed as Demand 5 in Chapter 12, this request centers on the Department of Veterans Affairs: correction of the twenty-three-year rating error in VA Case 30-262-166, compensation for the economic damage it imposed, and restoration of the author's Schedule A veteran status.",
      ref: "Chapter 12 \u00b7 Demand 5",
    },
    {
      num: "06",
      title: "Restitution & Corrective Action by VA / Federal Entities",
      body: "Printed as Demand 6, this request addresses congressional oversight — through the House, and through the Departments of Justice and Health and Human Services, the FBI, and the Council of the Inspectors General — of the agencies the author documents as failing his family.",
      ref: "Chapter 12 \u00b7 Demand 6",
    },
  ],
  whatYouCanDo: {
    title: "What you can do",
    text: "From the final pages of Chapter 12: \u201cIf you are reading this and you have the authority to address even one of the six requests in this chapter, then this book has served its purpose. If you are reading this and you know someone who has that authority, then pass it along.\u201d",
  },
};

export const INSIDE = {
  intro:
    "The shape of the book — a foreword, a prologue, four parts in twelve chapters, and an epilogue. Three short excerpts follow, each with its place in the record.",
  excerpts: [
    {
      label: "From the Author's Note",
      text: "I am now in my seventies. I am not a professional writer. I am a retired United States Army veteran with two Master's degrees\u2026 I spent a career in institutions that value documentation, chain of custody, evidence, and accountability. What follows is written in that spirit. Every legal document I reference exists. Every letter I describe was sent, and I kept copies.",
      ref: "Author's Note",
    },
    {
      label: "From the Foreword",
      text: "Thirty years. Thousands of pages of documentation. Hundreds of letters. Dozens of agencies contacted. Zero meaningful interventions. That is the balance sheet. This book is the audit.",
      ref: "Foreword \u00b7 \u201cA Letter That Should Never Have Been Written\u201d",
    },
    {
      label: "From Chapter 12",
      text: "A generational curse is not supernatural. It is structural\u2026 The curse breaker breaks the curse by documenting it, by naming it, by refusing to let it operate in silence. Give us back what was taken. Do what the law requires. Protect my sister. Honor my brothers. Break the curse.",
      ref: "Chapter 12 \u00b7 The Generational Curse Breaker",
    },
  ],
  faq: [
    {
      q: "Is this a true story?",
      a: "Yes. From the copyright page: \u201cThis is a work of nonfiction. The events described herein are true to the best of the author's knowledge and recollection, supported by legal documents, sworn affidavits, medical records, and official government correspondence referenced throughout the text.\u201d",
    },
    {
      q: "Who is the book for?",
      a: "From the Author's Note: families of people with developmental disabilities; anyone who has watched the system fail someone who cannot fully protect themselves; law enforcement officers, attorneys, social workers, judges, and legislators.",
    },
    {
      q: "What are the six demands?",
      a: "Six specific requests printed in Chapter 12: an independent guardianship evaluation, a protective order, a full financial audit of the family's properties, dignified burials for the brothers, VA accountability, and congressional oversight. See The Six Demands tab.",
    },
    {
      q: "What does \u201cthe generational curse\u201d mean?",
      a: "From Chapter 12: \u201cA generational curse is a pattern of harm that repeats across generations because the conditions that produce it are never addressed\u2026 not supernatural. It is structural.\u201d",
    },
    {
      q: "Who is Phyllis?",
      a: "Phyllis Lorraine Evans, the author's sister, born May 15, 1960 — a sister and a person, always. The book is written, above all, for her protection.",
    },
    {
      q: "Where can I get the book?",
      a: "Publication details — format, ISBN, price, and retailer links — will be posted here when confirmed. [placeholder]",
    },
  ],
  cta: {
    text: "Continue reading in the book.",
    primary: { label: "Get the Book", href: "#get-the-book" },
    secondary: { label: "Request a Review Copy", href: "#review-copy" },
  },
};

export const CTA_NOTE =
  "Get the Book and Request a Review Copy are placeholders — retailer links and a review-copy contact are pending the author's publisher details.";
