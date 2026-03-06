<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Paper;
use App\Models\Chapter;
use App\Models\Module;
use Illuminate\Support\Facades\DB;

class AcademicStructureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data to prevent duplicates if run multiple times
        // Disable foreign key checks to allow truncation
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }
        
        Module::truncate();
        Chapter::truncate();
        Paper::truncate();
        Subject::truncate();

        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        $data = [
            'Physics' => [
                'code' => 'PHY',
                'papers' => [
                    'Physics 1st Paper' => [
                        'code' => '174',
                        'chapters' => [
                            [
                                'number' => 1,
                                'name' => 'Physical World and Measurement',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Scope of Physics'],
                                    ['number' => 2, 'name' => 'Units & Dimensions'],
                                    ['number' => 3, 'name' => 'Measurement Techniques & Errors'],
                                ]
                            ],
                            [
                                'number' => 2,
                                'name' => 'Vector',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Scalar and Vector Quantities'],
                                    ['number' => 2, 'name' => 'Vector Addition & Resolution'],
                                    ['number' => 3, 'name' => 'Dot and Cross Product'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Dynamics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Newton’s Laws of Motion'],
                                    ['number' => 2, 'name' => 'Momentum & Impulse'],
                                    ['number' => 3, 'name' => 'Friction and Applications'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Newtonian Mechanics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Newton’s Laws of Motion'],
                                    ['number' => 2, 'name' => 'Conservation of Momentum'],
                                    ['number' => 3, 'name' => 'Friction'],
                                    ['number' => 4, 'name' => 'Circular Motion'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Work, Energy and Power',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Work-Energy Theorem'],
                                    ['number' => 2, 'name' => 'Kinetic & Potential Energy'],
                                    ['number' => 3, 'name' => 'Power and Conservation Laws'],
                                ]
                            ],
                            [
                                'number' => 6, 'name' => 'Gravitation and Gravity',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Newton’s Law of Gravitation'],
                                    ['number' => 2, 'name' => 'Kepler\'s Laws'],
                                    ['number' => 3, 'name' => 'Escape Velocity'],
                                ]
                            ],
                            [
                                'number' => 7, 'name' => 'Structural Properties of Matter',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Elasticity'],
                                    ['number' => 2, 'name' => 'Surface Tension'],
                                    ['number' => 3, 'name' => 'Viscosity'],
                                ]
                            ],
                            [
                                'number' => 8, 'name' => 'Periodic Motion',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Simple Harmonic Motion'],
                                    ['number' => 2, 'name' => 'Energy in SHM'],
                                    ['number' => 3, 'name' => 'Pendulums'],
                                ]
                            ],
                            [
                                'number' => 9, 'name' => 'Waves',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Types of Waves'],
                                    ['number' => 2, 'name' => 'Sound Waves'],
                                    ['number' => 3, 'name' => 'Doppler Effect'],
                                ]
                            ],
                            [
                                'number' => 10, 'name' => 'Ideal Gas and Kinetics of Gas',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Ideal Gas Laws'],
                                    ['number' => 2, 'name' => 'Kinetic Theory of Gases'],
                                    ['number' => 3, 'name' => 'Degrees of Freedom'],
                                ]
                            ],
                        ]
                    ],
                    'Physics 2nd Paper' => [
                        'code' => '175',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Thermodynamics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'First Law of Thermodynamics'],
                                    ['number' => 2, 'name' => 'Second Law of Thermodynamics'],
                                    ['number' => 3, 'name' => 'Entropy'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Static Electricity',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Coulomb\'s Law'],
                                    ['number' => 2, 'name' => 'Electric Field & Potential'],
                                    ['number' => 3, 'name' => 'Capacitance'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Current Electricity',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Ohm\'s Law & Kirchhoff\'s Laws'],
                                    ['number' => 2, 'name' => 'Resistance & Combination'],
                                    ['number' => 3, 'name' => 'Potentiometer'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Magnetic Effects of Current and Magnetism',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Biot-Savart Law'],
                                    ['number' => 2, 'name' => 'Ampere\'s Law'],
                                    ['number' => 3, 'name' => 'Earth\'s Magnetism'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Electromagnetic Induction and Alternating Current',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Faraday\'s Laws'],
                                    ['number' => 2, 'name' => 'Lenz\'s Law'],
                                    ['number' => 3, 'name' => 'AC Circuits'],
                                ]
                            ],
                            [
                                'number' => 6, 'name' => 'Geometrical Optics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Reflection at Curved Surfaces'],
                                    ['number' => 2, 'name' => 'Refraction at Plane Surfaces'],
                                    ['number' => 3, 'name' => 'Lenses & Prisms'],
                                ]
                            ],
                            [
                                'number' => 7, 'name' => 'Physical Optics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Wave Theory of Light'],
                                    ['number' => 2, 'name' => 'Interference'],
                                    ['number' => 3, 'name' => 'Diffraction & Polarization'],
                                ]
                            ],
                            [
                                'number' => 8, 'name' => 'Introduction to Modern Physics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Photoelectric Effect'],
                                    ['number' => 2, 'name' => 'Compton Effect'],
                                    ['number' => 3, 'name' => 'De Broglie Hypothesis'],
                                ]
                            ],
                            [
                                'number' => 9, 'name' => 'Atomic Model and Nuclear Physics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Bohr\'s Model'],
                                    ['number' => 2, 'name' => 'Radioactivity'],
                                    ['number' => 3, 'name' => 'Nuclear Reactions'],
                                ]
                            ],
                            [
                                'number' => 10, 'name' => 'Semiconductor and Electronics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'PN Junction Diode'],
                                    ['number' => 2, 'name' => 'Transistors'],
                                    ['number' => 3, 'name' => 'Logic Gates'],
                                ]
                            ],
                            [
                                'number' => 11, 'name' => 'Astronomy',
                                'modules' => [
                                    ['number' => 1, 'name' => 'The Solar System'],
                                    ['number' => 2, 'name' => 'Stars and Galaxies'],
                                    ['number' => 3, 'name' => 'The Universe'],
                                ]
                            ],
                        ]
                    ]
                ]
            ],
            'Chemistry' => [
                'code' => 'CHEM',
                'papers' => [
                    'Chemistry 1st Paper' => [
                        'code' => '176',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Safe Use of Laboratory',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Laboratory Safety Rules'],
                                    ['number' => 2, 'name' => 'First Aid in Laboratory'],
                                    ['number' => 3, 'name' => 'Apparatus Handling'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Qualitative Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Atomic Structure'],
                                    ['number' => 2, 'name' => 'Quantum Numbers'],
                                    ['number' => 3, 'name' => 'Solubility Product'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Periodic Properties and Chemical Bonding',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Periodic Trends'],
                                    ['number' => 2, 'name' => 'Hybridization'],
                                    ['number' => 3, 'name' => 'Chemical Bonds'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Chemical Changes',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Chemical Equilibrium'],
                                    ['number' => 2, 'name' => 'pH and Buffer Solutions'],
                                    ['number' => 3, 'name' => 'Energetics of Reactions'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Work Oriented Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Food Preservation'],
                                    ['number' => 2, 'name' => 'Toiletries and Cosmetics'],
                                    ['number' => 3, 'name' => 'Suspension and Coagulation'],
                                ]
                            ],
                        ]
                    ],
                    'Chemistry 2nd Paper' => [
                        'code' => '177',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Environmental Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Gas Laws'],
                                    ['number' => 2, 'name' => 'Pollution (Air & Water)'],
                                    ['number' => 3, 'name' => 'Green Chemistry'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Organic Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Classification & Nomenclature'],
                                    ['number' => 2, 'name' => 'Aliphatic Hydrocarbons'],
                                    ['number' => 3, 'name' => 'Aromatic Hydrocarbons'],
                                    ['number' => 4, 'name' => 'Functional Groups'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Quantitative Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Molarity and Concentration'],
                                    ['number' => 2, 'name' => 'Acid-Base Titration'],
                                    ['number' => 3, 'name' => 'Redox Reactions'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Electrochemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Electrolytic Conduction'],
                                    ['number' => 2, 'name' => 'Electrochemical Cells'],
                                    ['number' => 3, 'name' => 'Batteries and Fuel Cells'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Economic Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Natural Gas and Coal'],
                                    ['number' => 2, 'name' => 'Industrial Production (Urea, Glass, etc.)'],
                                    ['number' => 3, 'name' => 'Paper and Leather Industry'],
                                ]
                            ],
                        ]
                    ]
                ]
            ],
            'Higher Mathematics' => [
                'code' => 'HM',
                'papers' => [
                    'Higher Math 1st Paper' => [
                        'code' => '265',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Matrices and Determinants',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Types of Matrices'],
                                    ['number' => 2, 'name' => 'Matrix Operations'],
                                    ['number' => 3, 'name' => 'Determinants and Cramer\'s Rule'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Vectors',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Scalar and Vector Products'],
                                    ['number' => 2, 'name' => 'Vector Calculus'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Straight Lines',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Coordinates and Locus'],
                                    ['number' => 2, 'name' => 'Equation of Straight Lines'],
                                    ['number' => 3, 'name' => 'Pair of Straight Lines'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Circle',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Equation of Circle'],
                                    ['number' => 2, 'name' => 'Tangents and Normals'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Permutation and Combination',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Fundamental Principles'],
                                    ['number' => 2, 'name' => 'Permutations'],
                                    ['number' => 3, 'name' => 'Combinations'],
                                ]
                            ],
                            [
                                'number' => 6, 'name' => 'Trigonometric Ratios',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Associated Angles'],
                                    ['number' => 2, 'name' => 'Compound Angles'],
                                    ['number' => 3, 'name' => 'Multiple and Sub-multiple Angles'],
                                ]
                            ],
                            [
                                'number' => 7, 'name' => 'Properties of Triangle',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Sine and Cosine Rules'],
                                    ['number' => 2, 'name' => 'Solution of Triangles'],
                                ]
                            ],
                            [
                                'number' => 8, 'name' => 'Function and Function\'s Graph',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Domain and Range'],
                                    ['number' => 2, 'name' => 'Inverse Functions'],
                                    ['number' => 3, 'name' => 'Graphs of Functions'],
                                ]
                            ],
                            [
                                'number' => 9, 'name' => 'Differentiation',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Limits'],
                                    ['number' => 2, 'name' => 'Differentiation from First Principles'],
                                    ['number' => 3, 'name' => 'Applications of Derivatives'],
                                ]
                            ],
                            [
                                'number' => 10, 'name' => 'Integration',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Indefinite Integrals'],
                                    ['number' => 2, 'name' => 'Definite Integrals'],
                                    ['number' => 3, 'name' => 'Area under Curves'],
                                ]
                            ],
                        ]
                    ],
                    'Higher Math 2nd Paper' => [
                        'code' => '266',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Real Numbers and Inequalities',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Properties of Real Numbers'],
                                    ['number' => 2, 'name' => 'Solving Inequalities'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Linear Programming',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Formulation of Problems'],
                                    ['number' => 2, 'name' => 'Graphical Solution'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Complex Numbers',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Modulus and Argument'],
                                    ['number' => 2, 'name' => 'Square Roots and Cube Roots'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Polynomials and Polynomial Equations',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Quadratic Equations'],
                                    ['number' => 2, 'name' => 'Roots and Coefficients'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Binomial Expansion',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Pascal\'s Triangle'],
                                    ['number' => 2, 'name' => 'General Term'],
                                ]
                            ],
                            [
                                'number' => 6, 'name' => 'Conics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Parabola'],
                                    ['number' => 2, 'name' => 'Ellipse'],
                                    ['number' => 3, 'name' => 'Hyperbola'],
                                ]
                            ],
                            [
                                'number' => 7, 'name' => 'Inverse Trigonometric Functions',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Principal Values'],
                                    ['number' => 2, 'name' => 'Trigonometric Equations'],
                                ]
                            ],
                            [
                                'number' => 8, 'name' => 'Statics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Resultant of Forces'],
                                    ['number' => 2, 'name' => 'Equilibrium of Forces'],
                                ]
                            ],
                            [
                                'number' => 9, 'name' => 'Dynamics',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Motion in a Straight Line'],
                                    ['number' => 2, 'name' => 'Projectiles'],
                                ]
                            ],
                            [
                                'number' => 10, 'name' => 'Probability',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Conditional Probability'],
                                    ['number' => 2, 'name' => 'Bayes\' Theorem'],
                                ]
                            ],
                        ]
                    ]
                ]
            ],
            'Biology' => [
                'code' => 'BIO',
                'papers' => [
                    'Biology 1st Paper (Botany)' => [
                        'code' => '178',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Cell and its Structure',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Cell Wall & Membrane'],
                                    ['number' => 2, 'name' => 'Organelles'],
                                    ['number' => 3, 'name' => 'Nucleus & Chromosomes'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Cell Division',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Mitosis'],
                                    ['number' => 2, 'name' => 'Meiosis'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Cell Chemistry',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Carbohydrates'],
                                    ['number' => 2, 'name' => 'Proteins & Lipids'],
                                    ['number' => 3, 'name' => 'Enzymes'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Microorganism',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Virus'],
                                    ['number' => 2, 'name' => 'Bacteria'],
                                    ['number' => 3, 'name' => 'Malaria Parasite'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Algae and Fungi',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Characteristics of Algae'],
                                    ['number' => 2, 'name' => 'Characteristics of Fungi'],
                                ]
                            ],
                            [
                                'number' => 6, 'name' => 'Bryophyta and Pteridophyta',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Riccia'],
                                    ['number' => 2, 'name' => 'Pteris'],
                                ]
                            ],
                            [
                                'number' => 7, 'name' => 'Gymnosperms and Angiosperms',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Cycas'],
                                    ['number' => 2, 'name' => 'Poaceae & Malvaceae'],
                                ]
                            ],
                            [
                                'number' => 8, 'name' => 'Tissue and Tissue System',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Meristematic Tissue'],
                                    ['number' => 2, 'name' => 'Permanent Tissue'],
                                    ['number' => 3, 'name' => 'Vascular Bundles'],
                                ]
                            ],
                            [
                                'number' => 9, 'name' => 'Plant Physiology',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Water Absorption'],
                                    ['number' => 2, 'name' => 'Photosynthesis'],
                                    ['number' => 3, 'name' => 'Respiration'],
                                ]
                            ],
                            [
                                'number' => 10, 'name' => 'Plant Reproduction',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Pollination'],
                                    ['number' => 2, 'name' => 'Fertilization'],
                                    ['number' => 3, 'name' => 'Embryo Development'],
                                ]
                            ],
                            [
                                'number' => 11, 'name' => 'Biotechnology',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Tissue Culture'],
                                    ['number' => 2, 'name' => 'Genetic Engineering'],
                                ]
                            ],
                            [
                                'number' => 12, 'name' => 'Environment and Conservation',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Ecosystems of Bangladesh'],
                                    ['number' => 2, 'name' => 'Biodiversity Conservation'],
                                ]
                            ],
                        ]
                    ],
                    'Biology 2nd Paper (Zoology)' => [
                        'code' => '179',
                        'chapters' => [
                            [
                                'number' => 1, 'name' => 'Animal Diversity and Classification',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Basis of Classification'],
                                    ['number' => 2, 'name' => 'Major Phyla'],
                                ]
                            ],
                            [
                                'number' => 2, 'name' => 'Introduction to Animal (Hydra, Grasshopper, Rui Fish)',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Hydra'],
                                    ['number' => 2, 'name' => 'Grasshopper'],
                                    ['number' => 3, 'name' => 'Rui Fish'],
                                ]
                            ],
                            [
                                'number' => 3, 'name' => 'Human Physiology: Digestion and Absorption',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Digestive System'],
                                    ['number' => 2, 'name' => 'Digestion Process'],
                                ]
                            ],
                            [
                                'number' => 4, 'name' => 'Human Physiology: Blood and Circulation',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Blood Components'],
                                    ['number' => 2, 'name' => 'Heart Structure & Function'],
                                ]
                            ],
                            [
                                'number' => 5, 'name' => 'Human Physiology: Breathing and Respiration',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Respiratory System'],
                                    ['number' => 2, 'name' => 'Gas Exchange'],
                                ]
                            ],
                            [
                                'number' => 6, 'name' => 'Human Physiology: Excretion and Osmoregulation',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Kidney Structure'],
                                    ['number' => 2, 'name' => 'Urine Formation'],
                                ]
                            ],
                            [
                                'number' => 7, 'name' => 'Human Physiology: Locomotion and Movement',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Skeletal System'],
                                    ['number' => 2, 'name' => 'Muscles'],
                                ]
                            ],
                            [
                                'number' => 8, 'name' => 'Human Physiology: Coordination and Control',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Nervous System'],
                                    ['number' => 2, 'name' => 'Endocrine System'],
                                    ['number' => 3, 'name' => 'Sense Organs'],
                                ]
                            ],
                            [
                                'number' => 9, 'name' => 'Human Physiology: Life Continuity',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Reproductive System'],
                                    ['number' => 2, 'name' => 'Embryonic Development'],
                                ]
                            ],
                            [
                                'number' => 10, 'name' => 'Human Physiology: Immunity',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Lines of Defense'],
                                    ['number' => 2, 'name' => 'Antibodies & Vaccines'],
                                ]
                            ],
                            [
                                'number' => 11, 'name' => 'Genetics and Evolution',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Mendel\'s Laws'],
                                    ['number' => 2, 'name' => 'Sex Determination'],
                                    ['number' => 3, 'name' => 'Evolution Theories'],
                                ]
                            ],
                            [
                                'number' => 12, 'name' => 'Animal Behavior',
                                'modules' => [
                                    ['number' => 1, 'name' => 'Innate Behavior'],
                                    ['number' => 2, 'name' => 'Learned Behavior'],
                                ]
                            ],
                        ]
                    ]
                ]
            ]
        ];

        foreach ($data as $subjectName => $subjectData) {
            $subject = Subject::create([
                'name' => $subjectName,
                'code' => $subjectData['code'],
            ]);

            foreach ($subjectData['papers'] as $paperName => $paperData) {
                $paper = Paper::create([
                    'subject_id' => $subject->id,
                    'name' => $paperName,
                    'code' => $paperData['code'],
                ]);

                foreach ($paperData['chapters'] as $chapterData) {
                    $chapter = Chapter::create([
                        'paper_id' => $paper->id,
                        'name' => $chapterData['name'],
                        'number' => $chapterData['number'],
                    ]);

                    foreach ($chapterData['modules'] as $moduleData) {
                        Module::create([
                            'chapter_id' => $chapter->id,
                            'name' => $moduleData['name'],
                            'number' => $moduleData['number'],
                        ]);
                    }
                }
            }
        }
    }
}
