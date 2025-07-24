// services/supabase/databaseAutomationService.js
// Database automation service for resetting and populating quiz data

import { supabase } from './config';

// Quiz data structured from contextBuffer.txt
const QUIZ_DATA = {
  categories: [
    {
      slug: 'tiger',
      name: { en: 'Malayan Tiger', ms: 'Harimau Malaya' },
      description: { 
        en: 'Learn about the critically endangered Malayan Tiger', 
        ms: 'Pelajari tentang Harimau Malaya yang sangat terancam' 
      },
      emoji: '🐅',
      display_order: 1
    },
    {
      slug: 'tapir',
      name: { en: 'Malayan Tapir', ms: 'Tapir Malaya' },
      description: { 
        en: 'Discover the unique Malayan Tapir and its forest role', 
        ms: 'Temui Tapir Malaya yang unik dan peranannya dalam hutan' 
      },
      emoji: '🌴',
      display_order: 2
    },
    {
      slug: 'turtle',
      name: { en: 'Green Sea Turtle', ms: 'Penyu Agar' },
      description: { 
        en: 'Explore the marine world of Green Sea Turtles', 
        ms: 'Jelajahi dunia marin Penyu Agar' 
      },
      emoji: '🐢',
      display_order: 3
    }
  ],
  
  questions: {
    tiger: [
      // Easy questions (5)
      {
        question_text: {
          en: "What is the scientific name of the Malayan Tiger?",
          ms: "Apakah nama saintifik bagi Harimau Malaya?"
        },
        options: {
          en: ["Panthera leo", "Panthera pardus", "Panthera tigris jacksoni", "Panthera uncia"],
          ms: ["Panthera leo", "Panthera pardus", "Panthera tigris jacksoni", "Panthera uncia"]
        },
        correct_answer: "C",
        difficulty: "Easy",
        order: 1
      },
      {
        question_text: {
          en: "Where can Malayan Tigers be found in the wild?",
          ms: "Di manakah Harimau Malaya boleh ditemui secara liar?"
        },
        options: {
          en: ["Borneo Rainforest", "Peninsular Malaysia", "Sabah Highlands", "Kalimantan"],
          ms: ["Hutan Hujan Borneo", "Semenanjung Malaysia", "Tanah Tinggi Sabah", "Kalimantan"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 2
      },
      {
        question_text: {
          en: "What is the Malayan Tiger's conservation status?",
          ms: "Apakah status pemuliharaan Harimau Malaya?"
        },
        options: {
          en: ["Near Threatened", "Endangered", "Vulnerable", "Critically Endangered"],
          ms: ["Hampir Terancam", "Terancam", "Rentan", "Sangat Terancam"]
        },
        correct_answer: "D",
        difficulty: "Easy",
        order: 3
      },
      {
        question_text: {
          en: "Which organization in Malaysia helps protect the Malayan Tiger?",
          ms: "Organisasi manakah di Malaysia yang membantu melindungi Harimau Malaya?"
        },
        options: {
          en: ["NASA", "WWF-Malaysia", "FIFA", "ASEAN"],
          ms: ["NASA", "WWF-Malaysia", "FIFA", "ASEAN"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 4
      },
      {
        question_text: {
          en: "Which of the following is a threat to Malayan Tigers?",
          ms: "Yang manakah antara berikut merupakan ancaman kepada Harimau Malaya?"
        },
        options: {
          en: ["Monsoon season", "Urban gardening", "Poaching", "Road construction projects"],
          ms: ["Musim Tengkujuh", "Berkebun bandar", "Pemburuan haram", "Projek pembinaan jalan raya"]
        },
        correct_answer: "C",
        difficulty: "Easy",
        order: 5
      },
      // Medium questions (3)
      {
        question_text: {
          en: "Why is the Malayan Tiger important for forest ecosystems?",
          ms: "Mengapa Harimau Malaya penting untuk ekosistem hutan?"
        },
        options: {
          en: ["It plants trees", "It helps pollinate flowers", "It controls prey populations and prevents overgrazing", "It recycles nutrients"],
          ms: ["Ia menanam pokok", "Ia membantu pendebungaan bunga", "Ia mengawal populasi mangsa dan mengelakkan ragutan berlebihan", "Ia mengitar semula nutrien"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 6
      },
      {
        question_text: {
          en: "Which of these is a key coexistence strategy mentioned in Malaysia to prevent tiger attacks on livestock?",
          ms: "Apakah strategi utama untuk hidup bersama harimau yang disebut di Malaysia bagi mencegah serangan terhadap ternakan?"
        },
        options: {
          en: ["Trapping tigers", "Poisoning prey animals", "Using livestock guardian dogs", "Feeding tigers in villages"],
          ms: ["Menjebak harimau", "Meracun haiwan mangsa", "Menggunakan anjing penjaga ternakan", "Memberi makan harimau di kampung"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 7
      },
      {
        question_text: {
          en: "What is the primary reason Malayan Tiger numbers have dropped in Malaysia since 2010?",
          ms: "Apakah sebab utama penurunan bilangan Harimau Malaya di Malaysia sejak 2010?"
        },
        options: {
          en: ["Earthquakes", "Volcanic eruptions", "Habitat fragmentation from palm oil expansion", "Competition with lions"],
          ms: ["Gempa bumi", "Letusan gunung berapi", "Pemecahan habitat akibat peluasan sawit", "Persaingan dengan singa"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 8
      },
      // Advanced questions (2)
      {
        question_text: {
          en: "How does the Malayan Tiger indirectly support climate change mitigation?",
          ms: "Bagaimana Harimau Malaya menyokong mitigasi perubahan iklim secara tidak langsung?"
        },
        options: {
          en: ["By hunting climate-threatening species", "Through body heat", "By preserving carbon-storing forests through habitat protection", "By eating livestock that produce methane"],
          ms: ["Dengan memburu spesies yang mengancam iklim", "Melalui haba tubuh", "Dengan memelihara hutan penyimpan karbon melalui perlindungan habitat", "Dengan memakan ternakan yang menghasilkan metana"]
        },
        correct_answer: "C",
        difficulty: "Hard",
        order: 9
      },
      {
        question_text: {
          en: "What does a decline in Malayan Tiger numbers signify about the forest ecosystem?",
          ms: "Apakah yang ditunjukkan oleh penurunan bilangan Harimau Malaya terhadap ekosistem hutan?"
        },
        options: {
          en: ["It's becoming richer in nutrients", "The ecosystem is under stress and losing biodiversity", "More room for agriculture", "It's safer for humans"],
          ms: ["Ia semakin kaya dengan nutrien", "Ekosistem berada dalam tekanan dan kehilangan biodiversiti", "Lebih banyak ruang untuk pertanian", "Ia lebih selamat untuk manusia"]
        },
        correct_answer: "B",
        difficulty: "Hard",
        order: 10
      }
    ],
    
    tapir: [
      // Easy questions (5)
      {
        question_text: {
          en: "What is the scientific name of the Malayan Tapir?",
          ms: "Apakah nama saintifik bagi Tapir Malaya?"
        },
        options: {
          en: ["Tapirus malayanus", "Tapirus indicus", "Tapirus sumatranus", "Tapirus tapirus"],
          ms: ["Tapirus malayanus", "Tapirus indicus", "Tapirus sumatranus", "Tapirus tapirus"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 1
      },
      {
        question_text: {
          en: "Where is the Malayan Tapir most commonly found?",
          ms: "Di manakah Tapir Malaya paling biasa ditemui?"
        },
        options: {
          en: ["Sarawak", "Peninsular Malaysia", "Sabah", "Borneo"],
          ms: ["Sarawak", "Semenanjung Malaysia", "Sabah", "Borneo"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 2
      },
      {
        question_text: {
          en: "What is the Malayan Tapir's diet?",
          ms: "Apakah diet Tapir Malaya?"
        },
        options: {
          en: ["Carnivorous", "Omnivorous", "Herbivorous", "Insectivorous"],
          ms: ["Karnivor", "Omnivor", "Herbivor", "Insektivor"]
        },
        correct_answer: "C",
        difficulty: "Easy",
        order: 3
      },
      {
        question_text: {
          en: "What is one nickname for the Malayan Tapir due to its role in the forest?",
          ms: "Apakah gelaran yang diberikan kepada Tapir Malaya kerana peranannya dalam hutan?"
        },
        options: {
          en: ["Jungle Tiger", "Forest Gardener", "Bush Cow", "Rainforest Cleaner"],
          ms: ["Harimau Hutan", "Tukang Kebun Hutan", "Lembu Belukar", "Pembersih Hutan Hujan"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 4
      },
      {
        question_text: {
          en: "What helps the Malayan Tapir avoid predators in the moonlight?",
          ms: "Apa yang membantu Tapir Malaya mengelak pemangsa di bawah cahaya bulan?"
        },
        options: {
          en: ["Loud roar", "Speed", "Black-and-white coloration", "Burrowing skills"],
          ms: ["Ngauman kuat", "Kelajuan", "Warna hitam-putih", "Kebolehan menggali"]
        },
        correct_answer: "C",
        difficulty: "Easy",
        order: 5
      },
      // Medium questions (3)
      {
        question_text: {
          en: "Which of the following is a major threat to Malayan Tapirs in Malaysia?",
          ms: "Yang manakah antara berikut merupakan ancaman utama kepada Tapir Malaya di Malaysia?"
        },
        options: {
          en: ["Snowstorms", "Habitat loss and roadkill", "Lack of food in zoos", "Predation by lions"],
          ms: ["Ribut salji", "Kehilangan habitat dan kemalangan jalan raya", "Kekurangan makanan di zoo", "Diburu oleh singa"]
        },
        correct_answer: "B",
        difficulty: "Medium",
        order: 6
      },
      {
        question_text: {
          en: "What does the Malayan Tapir use its long snout for?",
          ms: "Untuk apa Tapir Malaya menggunakan belalai panjangnya?"
        },
        options: {
          en: ["Fighting predators", "Spraying water", "Snorkeling and grabbing food", "Making loud noises"],
          ms: ["Melawan pemangsa", "Menyembur air", "Menyelam dan mengambil makanan", "Mengeluarkan bunyi kuat"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 7
      },
      {
        question_text: {
          en: "How does the Malayan Tapir help in forest regeneration?",
          ms: "Bagaimana Tapir Malaya membantu dalam penjanaan semula hutan?"
        },
        options: {
          en: ["Building nests for birds", "Eating predators", "Dispersing seeds through droppings", "Pruning trees with teeth"],
          ms: ["Membina sarang burung", "Memakan pemangsa", "Menyebarkan benih melalui najis", "Memangkas pokok dengan gigi"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 8
      },
      // Advanced questions (2)
      {
        question_text: {
          en: "Why is the Malayan Tapir considered a keystone herbivore in its ecosystem?",
          ms: "Mengapa Tapir Malaya dianggap sebagai herbivor utama dalam ekosistemnya?"
        },
        options: {
          en: ["It controls insect populations", "It helps plants reproduce by cross-pollination", "Its feeding behavior affects plant diversity and forest balance", "It provides food for large carnivores"],
          ms: ["Ia mengawal populasi serangga", "Ia membantu pembiakan tumbuhan melalui pendebungaan silang", "Tingkah laku makannya mempengaruhi kepelbagaian tumbuhan dan keseimbangan hutan", "Ia menjadi makanan kepada karnivor besar"]
        },
        correct_answer: "C",
        difficulty: "Hard",
        order: 9
      },
      {
        question_text: {
          en: "What strategy has Malaysia implemented to reduce roadkill of Malayan Tapirs?",
          ms: "Apakah strategi yang telah dilaksanakan oleh Malaysia untuk mengurangkan kemalangan jalan raya melibatkan Tapir Malaya?"
        },
        options: {
          en: ["Nighttime driving bans", "Wildlife overpasses and underpasses", "Tapir guard dogs", "Fence electrification in city centers"],
          ms: ["Larangan memandu pada waktu malam", "Jambatan dan terowong hidupan liar", "Anjing penjaga Tapir", "Pagar elektrik di pusat bandar"]
        },
        correct_answer: "B",
        difficulty: "Hard",
        order: 10
      }
    ],
    
    turtle: [
      // Easy questions (5)
      {
        question_text: {
          en: "What is the common name of Chelonia mydas?",
          ms: "Apakah nama biasa bagi Chelonia mydas?"
        },
        options: {
          en: ["Hawksbill Turtle", "Green Sea Turtle", "Leatherback Turtle", "Loggerhead Turtle"],
          ms: ["Penyu Sisik", "Penyu Agar", "Penyu Belimbing", "Penyu Kepala Besar"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 1
      },
      {
        question_text: {
          en: "Where can Green Sea Turtles commonly be found in Malaysia?",
          ms: "Di manakah Penyu Agar biasa ditemui di Malaysia?"
        },
        options: {
          en: ["Highland forests", "Deserts", "Coastal waters and coral reefs", "Rivers and lakes"],
          ms: ["Hutan tanah tinggi", "Padang pasir", "Perairan pantai dan terumbu karang", "Sungai dan tasik"]
        },
        correct_answer: "C",
        difficulty: "Easy",
        order: 2
      },
      {
        question_text: {
          en: "What do Green Sea Turtles mainly eat?",
          ms: "Apakah makanan utama Penyu Agar?"
        },
        options: {
          en: ["Small fish and crabs", "Seagrasses and algae", "Insects and plants", "Plankton and jellyfish"],
          ms: ["Ikan kecil dan ketam", "Rumpai laut dan alga", "Serangga dan tumbuhan", "Plankton dan obor-obor"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 3
      },
      {
        question_text: {
          en: "Why is the Green Sea Turtle endangered?",
          ms: "Mengapa Penyu Agar diancam kepupusan?"
        },
        options: {
          en: ["It has no predators", "It reproduces too fast", "Due to pollution, habitat loss, and fishing", "Because it eats plastic by choice"],
          ms: ["Ia tiada pemangsa", "Ia membiak terlalu cepat", "Disebabkan pencemaran, kehilangan habitat, dan perikanan", "Kerana ia sengaja makan plastik"]
        },
        correct_answer: "C",
        difficulty: "Easy",
        order: 4
      },
      {
        question_text: {
          en: "Which Malaysian island is known for turtle conservation efforts?",
          ms: "Pulau manakah di Malaysia terkenal dengan usaha pemuliharaan penyu?"
        },
        options: {
          en: ["Langkawi", "Redang Island", "Tioman", "Penang"],
          ms: ["Langkawi", "Pulau Redang", "Tioman", "Pulau Pinang"]
        },
        correct_answer: "B",
        difficulty: "Easy",
        order: 5
      },
      // Medium questions (3)
      {
        question_text: {
          en: "How does the Green Sea Turtle contribute to coral reef health?",
          ms: "Bagaimanakah Penyu Agar membantu kesihatan terumbu karang?"
        },
        options: {
          en: ["By building reefs", "By scaring away predators", "By controlling algae growth", "By laying eggs in coral"],
          ms: ["Dengan membina terumbu", "Dengan menakutkan pemangsa", "Dengan mengawal pertumbuhan alga", "Dengan bertelur di dalam karang"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 6
      },
      {
        question_text: {
          en: "What adaptation helps the Green Sea Turtle navigate long distances?",
          ms: "Adaptasi apa yang membantu Penyu Agar mengemudi jarak jauh?"
        },
        options: {
          en: ["Sharp eyesight", "Strong fins", "Magnetic field detection", "Loud vocalizations"],
          ms: ["Penglihatan tajam", "Sirip yang kuat", "Pengesanan medan magnet", "Suara yang kuat"]
        },
        correct_answer: "C",
        difficulty: "Medium",
        order: 7
      },
      {
        question_text: {
          en: "How long can a Green Sea Turtle typically live?",
          ms: "Berapa lama jangka hayat biasa bagi Penyu Agar?"
        },
        options: {
          en: ["10–20 years", "25–35 years", "40–50 years", "60–70 years"],
          ms: ["10–20 tahun", "25–35 tahun", "40–50 tahun", "60–70 tahun"]
        },
        correct_answer: "D",
        difficulty: "Medium",
        order: 8
      },
      // Advanced questions (2)
      {
        question_text: {
          en: "How does climate change affect the sex ratio of Green Sea Turtle hatchlings?",
          ms: "Bagaimana perubahan iklim mempengaruhi nisbah jantina anak Penyu Agar?"
        },
        options: {
          en: ["It produces more males in warmer sand", "It produces more females in cooler sand", "Warmer sand leads to more females", "Sex is unaffected by temperature"],
          ms: ["Pasir panas menghasilkan lebih banyak jantan", "Pasir sejuk menghasilkan lebih banyak betina", "Pasir panas menghasilkan lebih banyak betina", "Suhu tidak menjejaskan jantina"]
        },
        correct_answer: "C",
        difficulty: "Hard",
        order: 9
      },
      {
        question_text: {
          en: "Why is Chelonia mydas considered an indicator species in marine ecosystems?",
          ms: "Mengapa Chelonia mydas dianggap sebagai spesies penunjuk dalam ekosistem marin?"
        },
        options: {
          en: ["It changes color with water quality", "Its presence reflects ocean health and environmental stability", "It eats toxic algae", "It always lives in the cleanest water"],
          ms: ["Ia berubah warna mengikut kualiti air", "Kehadirannya mencerminkan kesihatan laut dan kestabilan alam sekitar", "Ia memakan alga beracun", "Ia hanya hidup di air paling bersih"]
        },
        correct_answer: "B",
        difficulty: "Hard",
        order: 10
      }
    ]
  }
};

/**
 * Reset and repopulate the entire database with quiz data
 * This function will:
 * 1. Drop and recreate all tables using the SQL schema
 * 2. Create quiz categories
 * 3. Create quizzes for each category (pre-assessment and post-assessment)
 * 4. Insert all quiz questions
 */
export async function resetAndPopulateDatabase(adminUserId) {
  try {
    console.log('🚀 Starting database reset and population...');

    // Step 1: Clear existing data (safer approach without dropping tables)
    console.log('📋 Clearing existing data...');
    
    try {
      // Delete data in dependency order (children first, then parents)
      await supabase.from('quiz_questions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('quiz_results').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('quizzes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('quiz_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('✅ Existing data cleared successfully');
    } catch (clearError) {
      console.warn('⚠️ Error clearing existing data (this is OK if tables are empty):', clearError);
    }

    // Step 2: Create the admin user if it doesn't exist
    console.log('👤 Creating admin user...');
    const { error: userError } = await supabase
      .from('users')
      .upsert({
        auth0_user_id: adminUserId,
        email: 'admin@zoologiq.app',
        name: 'System Admin',
        role: 'admin',
        onboarding_completed: true,
        preferred_language: 'en'
      });

    if (userError && !userError.message.includes('already exists')) {
      console.error('❌ Error creating admin user:', userError);
    }

    // Step 3: Create categories
    console.log('📚 Creating quiz categories...');
    const categoryIds = {};
    
    for (const categoryData of QUIZ_DATA.categories) {
      const { data: category, error: categoryError } = await supabase
        .from('quiz_categories')
        .insert({
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          is_active: true,
          display_order: categoryData.display_order,
          created_by: adminUserId
        })
        .select()
        .single();

      if (categoryError) {
        console.error(`❌ Error creating category ${categoryData.slug}:`, categoryError);
        throw categoryError;
      }

      categoryIds[categoryData.slug] = category.id;
      console.log(`✅ Created category: ${categoryData.name.en} (${category.id})`);
    }

    // Step 4: Create one standalone quiz per category (used for both pre and post assessments)
    console.log('📝 Creating quizzes...');
    const quizIds = {};

    for (const [topicSlug, questions] of Object.entries(QUIZ_DATA.questions)) {
      const categoryId = categoryIds[topicSlug];
      const categoryName = QUIZ_DATA.categories.find(c => c.slug === topicSlug).name;

      // Create one standalone quiz (used for both pre and post assessments)
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          category_id: categoryId,
          title: {
            en: `${categoryName.en} Quiz`,
            ms: `Kuiz ${categoryName.ms}`
          },
          quiz_type: 'standalone',
          created_by: adminUserId
        })
        .select()
        .single();

      if (quizError) {
        console.error(`❌ Error creating quiz for ${topicSlug}:`, quizError);
        throw quizError;
      }

      quizIds[topicSlug] = quiz.id;

      console.log(`✅ Created quiz for ${topicSlug}: ${quiz.id}`);
    }

    // Step 5: Insert questions for each quiz
    console.log('❓ Inserting quiz questions...');
    
    for (const [topicSlug, questions] of Object.entries(QUIZ_DATA.questions)) {
      const quizId = quizIds[topicSlug];

      // Insert questions for the standalone quiz
      for (const questionData of questions) {
        // Convert letter-based answer (A, B, C, D) to index-based (0, 1, 2, 3)
        const letterToIndex = { 'A': '0', 'B': '1', 'C': '2', 'D': '3' };
        const correctAnswerIndex = letterToIndex[questionData.correct_answer] || '0';
        
        console.log(`🔄 Converting answer for Q${questionData.order} (${topicSlug}): ${questionData.correct_answer} → ${correctAnswerIndex}`);

        const { error: questionError } = await supabase
          .from('quiz_questions')
          .insert({
            quiz_id: quizId,
            question_text: questionData.question_text,
            options: questionData.options,
            correct_answer: correctAnswerIndex, // Now using index-based answer (0, 1, 2, 3)
            points: questionData.difficulty === 'Easy' ? 10 : questionData.difficulty === 'Medium' ? 15 : 20,
            penalty: 0,
            question_order: questionData.order
          });

        if (questionError) {
          console.error(`❌ Error inserting question ${questionData.order} for ${topicSlug}:`, questionError);
          throw questionError;
        }
      }

      console.log(`✅ Inserted ${questions.length} questions for ${topicSlug}`);
    }

    console.log('🎉 Database reset and population completed successfully!');
    
    return {
      success: true,
      message: 'Database has been reset and populated with quiz data',
      data: {
        categoriesCreated: Object.keys(categoryIds).length,
        quizzesCreated: Object.keys(quizIds).length, // one standalone quiz per topic
        questionsCreated: Object.values(QUIZ_DATA.questions).reduce((total, questions) => total + questions.length, 0) // 30 total questions
      }
    };

  } catch (error) {
    console.error('💥 Error in resetAndPopulateDatabase:', error);
    return {
      success: false,
      message: 'Failed to reset and populate database',
      error: error.message
    };
  }
}

/**
 * Get database automation status and statistics
 */
export async function getDatabaseStatus() {
  try {
    // Check if tables exist and get counts
    const { data: categories, error: categoriesError } = await supabase
      .from('quiz_categories')
      .select('*');

    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('*');

    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*');

    const { data: results, error: resultsError } = await supabase
      .from('quiz_results')
      .select('*');

    return {
      success: true,
      data: {
        categoriesCount: categories?.length || 0,
        quizzesCount: quizzes?.length || 0,
        questionsCount: questions?.length || 0,
        resultsCount: results?.length || 0,
        hasData: (categories?.length || 0) > 0,
        lastCheck: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('Error getting database status:', error);
    return {
      success: false,
      error: error.message
    };
  }
}