export interface AIMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  followUps?: string[];
  timestamp: string;
}

export const AI_RESPONSES = [
  {
    content: `Based on your MDCAT Biology sessions this week, here's what you need to know about mitosis:\n\nMitosis produces two genetically identical daughter cells. The key phases are Prophase → Metaphase → Anaphase → Telophase (remember: PMAT). In Metaphase, chromosomes align at the metaphase plate — this is what questions usually target.\n\nA common MDCAT trap: they ask about the "shortest phase" — that's Anaphase. Another trap is confusing Mitosis (somatic cells, 2n→2n) with Meiosis (germ cells, 2n→n). Make sure you can draw the chromosome count at each stage.`,
    followUps: [
      'What is the difference between mitosis and meiosis?',
      'Which phase of mitosis takes the longest?',
      'How are chromosomes arranged in metaphase?',
    ],
  },
  {
    content: `Great question — organic chemistry is one of the highest-yield MDCAT Chemistry topics. Based on your recent session on hydrocarbons:\n\nAlkanes follow CₙH₂ₙ₊₂ (think "plus 2 because alkanes are boring and full"). Alkenes are CₙH₂ₙ (one double bond removes 2 H's). Alkynes are CₙH₂ₙ₋₂.\n\nFor MDCAT, the most tested reactions are:\n1. Addition reactions (alkenes + HBr follows Markovnikov's rule)\n2. Combustion reactions (always produces CO₂ + H₂O)\n3. Substitution in alkanes (free radical, UV light required)\n\nOne thing students consistently miss: ethylene (CH₂=CH₂) is the simplest alkene, not alkyne.`,
    followUps: [
      'Explain Markovnikov\'s rule with an example',
      'What are the products of complete combustion of propane?',
      'How do I identify functional groups quickly?',
    ],
  },
  {
    content: `Your Physics sessions show Newton's Laws are solid, but let me reinforce projectile motion since it appeared in your last mock test:\n\nKey insight: horizontal and vertical motions are completely independent. Horizontal velocity (vₓ) never changes (no air resistance in MDCAT). Vertical velocity changes at 9.8 m/s² downward.\n\nAt maximum height: vertical velocity = 0, but horizontal velocity is unchanged.\nTime to reach max height: t = v₀sinθ / g\nRange: R = v₀² sin(2θ) / g\n\nMDCAT often gives you angle = 45° — that's where range is maximum. If angle = 30°, range equals range at 60°. This symmetry trick saves time in MCQs.`,
    followUps: [
      'What angle gives maximum range in projectile motion?',
      'How does initial velocity affect time of flight?',
      'Explain the difference between speed and velocity',
    ],
  },
  {
    content: `Enzyme kinetics is a high-frequency MDCAT topic. Based on your Biology weak areas report:\n\nEnzymes lower activation energy — they don't change ΔG (the overall energy difference between reactants and products). This is a classic MCQ trap.\n\nThe lock-and-key model: substrate fits perfectly into the active site. Induced-fit model (more accurate): enzyme shape changes slightly when substrate binds.\n\nInhibition types for MDCAT:\n• Competitive inhibition: inhibitor competes for active site → increases Km, Vmax unchanged\n• Non-competitive inhibition: inhibitor binds elsewhere → Km unchanged, Vmax decreases\n\nRemember: competitive inhibition can be overcome by adding more substrate. Non-competitive cannot.`,
    followUps: [
      'What is the difference between Km and Vmax?',
      'How do temperature and pH affect enzyme activity?',
      'Give an example of a competitive inhibitor in the body',
    ],
  },
  {
    content: `The periodic table trends are consistently tested in MDCAT Chemistry. Here is a clear breakdown based on your Chemistry progress:\n\n**Across a period (left → right):**\n• Atomic radius decreases (more protons pull electrons closer)\n• Ionization energy increases (harder to remove electron)\n• Electronegativity increases (Fluorine is highest at 4.0)\n• Electron affinity generally increases\n\n**Down a group (top → bottom):**\n• Atomic radius increases (more shells)\n• Ionization energy decreases\n• Metallic character increases\n\nMDCAT favourite: "Which element has the highest electronegativity?" → Fluorine. "Highest ionization energy in period 2?" → Neon (noble gas, full shell).`,
    followUps: [
      'Why does ionization energy decrease down a group?',
      'Which element has the smallest atomic radius?',
      'Compare the reactivity of alkali metals down Group 1',
    ],
  },
];

export const INITIAL_MESSAGES: AIMessage[] = [
  {
    id: 'msg-0',
    role: 'ai',
    content: 'Hi Hamza! I\'m your AI study assistant. I can help you with MDCAT Biology, Chemistry, and Physics. What topic would you like to explore today?',
    followUps: [
      'Explain cell division for MDCAT',
      'Help me with organic chemistry reactions',
      'Clarify Newton\'s laws and projectile motion',
      'Explain enzyme inhibition',
    ],
    timestamp: '10:30 AM',
  },
];

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: 'Biology' | 'Chemistry' | 'Physics';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const FLASHCARD_DECKS: Record<string, { name: string; cards: Flashcard[] }> = {
  biology: {
    name: 'MDCAT Biology',
    cards: [
      { id: 'fc-1', subject: 'Biology', difficulty: 'medium', front: 'What is the function of the mitochondria?', back: 'The mitochondria is the powerhouse of the cell — it produces ATP via cellular respiration (oxidative phosphorylation). It has a double membrane; the inner membrane is folded into cristae to maximise surface area.' },
      { id: 'fc-2', subject: 'Biology', difficulty: 'easy', front: 'What is the difference between DNA and RNA?', back: 'DNA: double-stranded, deoxyribose sugar, thymine base, found in nucleus. RNA: single-stranded, ribose sugar, uracil base, found in nucleus and cytoplasm. DNA stores genetic info; RNA carries it for protein synthesis.' },
      { id: 'fc-3', subject: 'Biology', difficulty: 'hard', front: 'What is the role of the smooth endoplasmic reticulum (SER)?', back: 'SER synthesises lipids and steroids, detoxifies drugs and toxins (especially in liver cells), and stores calcium ions (important in muscle contraction). Unlike RER, it has no ribosomes.' },
      { id: 'fc-4', subject: 'Biology', difficulty: 'medium', front: 'Define homeostasis and give one example.', back: 'Homeostasis is the maintenance of a stable internal environment. Example: Blood glucose regulation — when glucose rises, pancreas secretes insulin → cells take up glucose → levels fall back to normal. This is a negative feedback loop.' },
      { id: 'fc-5', subject: 'Biology', difficulty: 'medium', front: 'What is the difference between active and passive transport?', back: 'Passive transport: no ATP required, moves down concentration gradient (diffusion, osmosis, facilitated diffusion). Active transport: requires ATP, moves against concentration gradient (e.g. sodium-potassium pump).' },
      { id: 'fc-6', subject: 'Biology', difficulty: 'easy', front: 'Name the four bases in DNA.', back: 'Adenine (A), Thymine (T), Guanine (G), Cytosine (C). Pairing rule: A-T (2 hydrogen bonds) and G-C (3 hydrogen bonds). Remember: "Apple Trees and Great Canoes".' },
      { id: 'fc-7', subject: 'Biology', difficulty: 'hard', front: 'What happens during the light-dependent reactions of photosynthesis?', back: 'Occur in thylakoid membranes. Water is split (photolysis) → releases O₂, H⁺, and electrons. Light energy excites electrons → electron transport chain → ATP and NADPH produced. These power the Calvin cycle.' },
      { id: 'fc-8', subject: 'Biology', difficulty: 'medium', front: 'What is the role of mRNA in protein synthesis?', back: 'mRNA carries the genetic code from DNA in the nucleus to ribosomes in the cytoplasm. Each codon (3 bases) on mRNA codes for one amino acid. Ribosomes read mRNA 5\'→3\' to assemble polypeptides.' },
    ],
  },
  chemistry: {
    name: 'MDCAT Chemistry',
    cards: [
      { id: 'fc-c1', subject: 'Chemistry', difficulty: 'medium', front: 'State Hess\'s Law.', back: 'The total enthalpy change for a reaction is the same regardless of the route taken, as long as the initial and final conditions are identical. This allows calculation of ΔH for reactions that cannot be measured directly.' },
      { id: 'fc-c2', subject: 'Chemistry', difficulty: 'easy', front: 'What is Avogadro\'s number?', back: '6.022 × 10²³ — the number of particles (atoms, molecules, ions) in one mole of a substance. Named after Amedeo Avogadro. Used to convert between moles and number of particles.' },
      { id: 'fc-c3', subject: 'Chemistry', difficulty: 'hard', front: 'Explain Le Chatelier\'s Principle.', back: 'When a system in equilibrium is disturbed (change in concentration, temperature, or pressure), the system shifts to counteract the disturbance. E.g., increasing temperature in an exothermic reaction shifts equilibrium left (reduces heat).' },
      { id: 'fc-c4', subject: 'Chemistry', difficulty: 'medium', front: 'What is the difference between an acid and a base (Brønsted-Lowry)?', back: 'Brønsted-Lowry acid: proton (H⁺) donor. Brønsted-Lowry base: proton acceptor. Water is amphoteric — it can act as both acid and base. Strong acids fully dissociate; weak acids partially dissociate.' },
      { id: 'fc-c5', subject: 'Chemistry', difficulty: 'medium', front: 'What is electronegativity and which element has the highest?', back: 'Electronegativity is the ability of an atom to attract bonding electrons. Fluorine has the highest electronegativity (4.0 on Pauling scale). It increases across a period and decreases down a group.' },
      { id: 'fc-c6', subject: 'Chemistry', difficulty: 'easy', front: 'What are the products of the complete combustion of hydrocarbons?', back: 'Complete combustion: CO₂ + H₂O. Incomplete combustion (insufficient O₂): CO + H₂O, and sometimes carbon (soot). Complete combustion releases more energy and is preferred in engines.' },
    ],
  },
};

export interface TestQuestion {
  id: string;
  subject: 'Biology' | 'Chemistry' | 'Physics';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const MOCK_TEST_QUESTIONS: TestQuestion[] = [
  { id: 'q1', subject: 'Biology', question: 'Which organelle is responsible for producing ATP through oxidative phosphorylation?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], correctIndex: 1, explanation: 'The mitochondria carries out oxidative phosphorylation on its inner membrane to produce ATP.' },
  { id: 'q2', subject: 'Biology', question: 'During which phase of mitosis do chromosomes align at the metaphase plate?', options: ['Prophase', 'Anaphase', 'Metaphase', 'Telophase'], correctIndex: 2, explanation: 'In Metaphase, chromosomes are fully condensed and align along the cell equator (metaphase plate).' },
  { id: 'q3', subject: 'Chemistry', question: 'Which of the following has the highest electronegativity?', options: ['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'], correctIndex: 2, explanation: 'Fluorine has the highest electronegativity (4.0) of all elements on the Pauling scale.' },
  { id: 'q4', subject: 'Physics', question: 'A ball is thrown horizontally from a cliff. Which statement about its horizontal velocity is correct?', options: ['It increases as the ball falls', 'It decreases as the ball falls', 'It remains constant throughout', 'It becomes zero at maximum height'], correctIndex: 2, explanation: 'In projectile motion with no air resistance, horizontal velocity remains constant as there is no horizontal acceleration.' },
  { id: 'q5', subject: 'Biology', question: 'Which type of inhibition can be overcome by adding more substrate?', options: ['Non-competitive inhibition', 'Allosteric inhibition', 'Competitive inhibition', 'Irreversible inhibition'], correctIndex: 2, explanation: 'In competitive inhibition, the inhibitor competes for the active site. Adding more substrate increases the chance of substrate binding, overcoming inhibition.' },
  { id: 'q6', subject: 'Chemistry', question: 'What is the molecular formula for propane?', options: ['C₂H₆', 'C₃H₈', 'C₄H₁₀', 'C₃H₆'], correctIndex: 1, explanation: 'Propane is an alkane with 3 carbon atoms: C₃H₈ (using CₙH₂ₙ₊₂: 3×2+2=8).' },
  { id: 'q7', subject: 'Physics', question: 'At what launch angle is the horizontal range of a projectile maximum?', options: ['30°', '60°', '45°', '90°'], correctIndex: 2, explanation: 'Range = v₀² sin(2θ)/g. This is maximum when sin(2θ)=1, so 2θ=90°, giving θ=45°.' },
  { id: 'q8', subject: 'Biology', question: 'Which base pairs with Adenine in DNA?', options: ['Guanine', 'Cytosine', 'Uracil', 'Thymine'], correctIndex: 3, explanation: 'In DNA, Adenine pairs with Thymine (2 hydrogen bonds). In RNA, Adenine pairs with Uracil.' },
  { id: 'q9', subject: 'Chemistry', question: 'According to Le Chatelier\'s Principle, increasing pressure on an equilibrium system will:', options: ['Always shift equilibrium right', 'Shift equilibrium toward the side with fewer moles of gas', 'Shift equilibrium toward the side with more moles of gas', 'Have no effect'], correctIndex: 1, explanation: 'Increasing pressure shifts equilibrium to the side with fewer moles of gas, reducing pressure.' },
  { id: 'q10', subject: 'Physics', question: 'Which of Newton\'s Laws states that every action has an equal and opposite reaction?', options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'], correctIndex: 2, explanation: 'Newton\'s Third Law: For every action force, there is an equal and opposite reaction force.' },
  { id: 'q11', subject: 'Biology', question: 'What is the primary function of the smooth endoplasmic reticulum?', options: ['Protein synthesis', 'Lipid synthesis and detoxification', 'DNA replication', 'ATP production'], correctIndex: 1, explanation: 'SER synthesises lipids and steroids and detoxifies harmful substances, especially in liver cells.' },
  { id: 'q12', subject: 'Chemistry', question: 'What is Avogadro\'s number?', options: ['6.022 × 10²¹', '6.022 × 10²³', '6.022 × 10²⁵', '6.022 × 10²²'], correctIndex: 1, explanation: 'Avogadro\'s number is 6.022 × 10²³ — the number of particles in one mole of a substance.' },
  { id: 'q13', subject: 'Physics', question: 'A force of 10 N acts on a 2 kg object. What is its acceleration?', options: ['5 m/s²', '20 m/s²', '0.2 m/s²', '12 m/s²'], correctIndex: 0, explanation: 'F = ma → a = F/m = 10/2 = 5 m/s² (Newton\'s Second Law).' },
  { id: 'q14', subject: 'Biology', question: 'Which process splits water molecules during photosynthesis?', options: ['Calvin cycle', 'Chemiosmosis', 'Photolysis', 'Glycolysis'], correctIndex: 2, explanation: 'Photolysis occurs during light-dependent reactions: water is split using light energy, releasing O₂, H⁺, and electrons.' },
  { id: 'q15', subject: 'Chemistry', question: 'A Brønsted-Lowry acid is defined as:', options: ['A proton acceptor', 'An electron donor', 'A proton donor', 'An electron acceptor'], correctIndex: 2, explanation: 'Brønsted-Lowry definition: an acid donates a proton (H⁺), a base accepts a proton.' },
  { id: 'q16', subject: 'Physics', question: 'What is the unit of electric potential difference?', options: ['Ampere', 'Watt', 'Volt', 'Ohm'], correctIndex: 2, explanation: 'Electric potential difference is measured in Volts (V). 1 Volt = 1 Joule per Coulomb.' },
  { id: 'q17', subject: 'Biology', question: 'Which type of RNA carries amino acids to the ribosome?', options: ['mRNA', 'rRNA', 'tRNA', 'snRNA'], correctIndex: 2, explanation: 'Transfer RNA (tRNA) has an anticodon that matches mRNA codons, and carries the corresponding amino acid to the ribosome.' },
  { id: 'q18', subject: 'Chemistry', question: 'What type of bond is formed between two non-metal atoms?', options: ['Ionic bond', 'Metallic bond', 'Covalent bond', 'Coordinate bond'], correctIndex: 2, explanation: 'Covalent bonds form when two non-metals share electron pairs. Ionic bonds form between metals and non-metals.' },
  { id: 'q19', subject: 'Physics', question: 'The speed of light in vacuum is approximately:', options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'], correctIndex: 1, explanation: 'The speed of light in vacuum (c) ≈ 3 × 10⁸ m/s. This is a fundamental constant in physics.' },
  { id: 'q20', subject: 'Biology', question: 'Which organelle is responsible for protein synthesis?', options: ['Nucleus', 'Ribosome', 'Lysosome', 'Centrosome'], correctIndex: 1, explanation: 'Ribosomes are the site of protein synthesis (translation). They can be free in cytoplasm or attached to rough ER.' },
];

export const READINESS_HISTORY = [
  { week: 'Feb W1', score: 42 },
  { week: 'Feb W2', score: 47 },
  { week: 'Feb W3', score: 51 },
  { week: 'Feb W4', score: 49 },
  { week: 'Mar W1', score: 55 },
  { week: 'Mar W2', score: 60 },
  { week: 'Mar W3', score: 58 },
  { week: 'Mar W4', score: 63 },
  { week: 'Apr W1', score: 68 },
];

export const SUBJECT_READINESS = [
  { subject: 'Biology', score: 72, target: 85 },
  { subject: 'Chemistry', score: 61, target: 85 },
  { subject: 'Physics', score: 68, target: 85 },
  { subject: 'English', score: 78, target: 80 },
  { subject: 'Logical Reasoning', score: 55, target: 80 },
];

export const TOPIC_SCORES = [
  { topic: 'Biology', score: 75, questions: 8 },
  { topic: 'Chemistry', score: 60, questions: 7 },
  { topic: 'Physics', score: 65, questions: 5 },
];

export const STUDY_PLAN_WEEKS = [
  { week: 1, dateRange: 'Jul 7 – 13', focus: ['Cell Biology', 'Organic Chemistry Basics'], sessions: 4, target: 'Complete 2 mock tests, score ≥ 60%' },
  { week: 2, dateRange: 'Jul 14 – 20', focus: ['Human Physiology', 'Thermodynamics'], sessions: 5, target: 'Finish weak-area flashcard deck on enzymes' },
  { week: 3, dateRange: 'Jul 21 – 27', focus: ['Genetics', 'Electrochemistry'], sessions: 4, target: 'Mock test: target ≥ 65% overall' },
  { week: 4, dateRange: 'Jul 28 – Aug 3', focus: ['Plant Biology', 'Mechanics Revision'], sessions: 5, target: 'Resolve all pending doubt-bot questions' },
  { week: 5, dateRange: 'Aug 4 – 10', focus: ['Evolution', 'Atomic Structure'], sessions: 4, target: 'Mock test: target ≥ 70%' },
  { week: 6, dateRange: 'Aug 11 – 17', focus: ['Ecology', 'Chemical Equilibrium'], sessions: 5, target: 'Complete 3 full-length mock tests' },
  { week: 7, dateRange: 'Aug 18 – 24', focus: ['Nervous System', 'Optics & Waves'], sessions: 4, target: 'Readiness score target: 75%' },
  { week: 8, dateRange: 'Aug 25 – 31', focus: ['Full Syllabus Revision', 'Mock Exams'], sessions: 6, target: 'Score ≥ 80% on practice MDCAT paper' },
];
