/**
 * Authentic High-Protein, Low-Calorie Recipes for Mom's Cookbook
 * 15 Step-by-Step Recipes across Breakfast, Lunch, Dinner, and Soya Specials
 * All single-serve portion-controlled with accurate macros and batch meal-prep tips.
 */
const DEFAULT_RECIPES = [
  // ==========================================
  // BREAKFAST OPTIONS (Under 180 kcal)
  // ==========================================
  {
    id: "sprouted-moong-chaat",
    title: "Sprouted Moong Chaat",
    subtitle: "Zesty, crunchy sprouted green moong tossed with lemon, roasted cumin, and fresh salad veggies",
    category: "Breakfast",
    tags: ["Breakfast", "Under 180 kcal", "High Protein", "Quick & Easy", "No Cook"],
    prepTime: "5 mins",
    cookTime: "3 mins",
    totalTime: "8 mins",
    servings: 1,
    calories: "140 kcal",
    macros: { protein: "9.0g", fiber: "5.5g", netCarbs: "18g", fat: "0.8g" },
    difficulty: "Super Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tip: "Sprout a large batch of moong on the weekend and store in an airtight container in the fridge for up to 4–5 days. Pre-chop cucumber and tomato into a separate container—do not mix or season until right before eating to keep it super crisp!",
    ingredients: [
      { amount: 100, unit: "g", name: "sprouted green moong" },
      { amount: 30, unit: "g", name: "cucumber (finely chopped)" },
      { amount: 20, unit: "g", name: "tomato (finely chopped)" },
      { amount: 1, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 0.25, unit: "tsp", name: "chaat masala" },
      { amount: 0.25, unit: "tsp", name: "roasted cumin powder" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Light Steam (Optional): Steam the sprouted moong in a steamer or microwave with a splash of water for 2–3 minutes. (Steaming makes it easier to digest while maintaining crunch, but you can also use raw sprouts).",
      "Mix Veggies: Transfer the warm sprouts to a bowl and fold in the finely chopped cucumber and tomato.",
      "Season & Serve: Drizzle with fresh lemon juice, add chaat masala, roasted cumin powder, and a pinch of salt. Toss thoroughly and enjoy fresh!"
    ]
  },
  {
    id: "scrambled-tofu-spinach",
    title: "Scrambled Tofu & Spinach",
    subtitle: "Golden spiced turmeric tofu scramble with wilted baby spinach and sweet bell peppers",
    category: "Breakfast",
    tags: ["Breakfast", "Under 180 kcal", "High Protein", "Vegan", "Quick & Easy"],
    prepTime: "3 mins",
    cookTime: "5 mins",
    totalTime: "8 mins",
    servings: 1,
    calories: "150 kcal",
    macros: { protein: "14.5g", fiber: "3.0g", netCarbs: "4g", fat: "6.5g" },
    difficulty: "Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tip: "Press and crumble the whole block of tofu on prep day and store it in paper-towel-lined glass containers. Chopped spinach can also be pre-washed and dried in advance.",
    ingredients: [
      { amount: 120, unit: "g", name: "firm tofu (drained and pressed dry)" },
      { amount: 50, unit: "g", name: "fresh spinach (chopped)" },
      { amount: 20, unit: "g", name: "red or yellow bell pepper (thinly sliced)" },
      { amount: 0.25, unit: "tsp", name: "turmeric powder" },
      { amount: 0.25, unit: "tsp", name: "black pepper powder" },
      { amount: 1, unit: "pinch", name: "salt or black salt (kala namak) to taste" },
      { amount: 2, unit: "tbsp", name: "water (or 1 spray cooking oil mist)" }
    ],
    instructions: [
      "Crumble Tofu: Use a fork or hands to coarsely crumble the firm tofu.",
      "Sauté Spices & Tofu: Heat a non-stick skillet over medium heat with a spray of oil mist or a splash of water. Add crumbled tofu, turmeric, black pepper, and salt. Stir-fry for 2 minutes until yellow and heated through.",
      "Wilt Greens: Toss in the sliced bell peppers and chopped spinach. Cook for another 1–2 minutes until the spinach wilts slightly. Serve hot and steaming."
    ]
  },
  {
    id: "low-fat-paneer-veggie-stir-fry",
    title: "Low-Fat Paneer & Veggie Stir-Fry",
    subtitle: "Lightly charred capsicum and onions tossed with tender skimmed-milk paneer and warm spices",
    category: "Breakfast",
    tags: ["Breakfast", "Under 180 kcal", "High Protein", "Paneer & Tofu"],
    prepTime: "5 mins",
    cookTime: "4 mins",
    totalTime: "9 mins",
    servings: 1,
    calories: "135 kcal",
    macros: { protein: "14.0g", fiber: "2.5g", netCarbs: "5g", fat: "2.5g" },
    difficulty: "Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    tip: "Portion out paneer into 75g daily blocks and store submerged in clean water in the fridge (change water every 2 days to keep soft). Avoid overcooking low-fat paneer, as skimmed-milk paneer hardens if cooked too long!",
    ingredients: [
      { amount: 75, unit: "g", name: "low-fat paneer (skimmed milk), cut into small ½-inch cubes" },
      { amount: 50, unit: "g", name: "mixed capsicum and onions (diced)" },
      { amount: 0.25, unit: "tsp", name: "chili flakes or finely chopped green chili" },
      { amount: 0.25, unit: "tsp", name: "chaat masala or garam masala" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Dry Sauté Veggies: Heat a non-stick skillet over medium-high heat. Add the diced capsicum and onion. Stir-fry for 2 minutes until slightly tender with a light smoky char.",
      "Add Paneer: Add the low-fat paneer cubes and chili flakes. Stir continuously on high heat for 1–2 minutes until the paneer edges turn lightly golden.",
      "Season: Turn off the heat immediately, sprinkle chaat masala and salt, toss well, and serve hot."
    ]
  },
  {
    id: "greek-yogurt-chia-bowl",
    title: "High-Protein Greek Yogurt & Chia Bowl",
    subtitle: "Thick, creamy probiotic Greek yogurt bloomed with chia seeds and aromatic cinnamon",
    category: "Breakfast",
    tags: ["Breakfast", "Under 180 kcal", "High Protein", "No Cook", "Grab & Go"],
    prepTime: "2 mins",
    cookTime: "0 mins",
    totalTime: "12 mins",
    servings: 1,
    calories: "135 kcal",
    macros: { protein: "15.0g", fiber: "3.5g", netCarbs: "6g", fat: "2.5g" },
    difficulty: "Super Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    tip: "Prepare individual 'Overnight Yogurt Jars' on Sunday night. Mix yogurt, chia, and cinnamon into small mason jars and store in the fridge for up to 3 days for an instant grab-and-go morning meal.",
    ingredients: [
      { amount: 150, unit: "g", name: "plain non-fat Greek yogurt" },
      { amount: 5, unit: "g", name: "chia seeds (approx. 1 tsp)" },
      { amount: 0.25, unit: "tsp", name: "cinnamon powder" },
      { amount: 1, unit: "dash", name: "zero-calorie sweetener like stevia (optional)" }
    ],
    instructions: [
      "Combine: Scoop non-fat Greek yogurt into a small jar or cereal bowl.",
      "Mix: Stir in chia seeds, cinnamon powder, and stevia sweetener if using.",
      "Bloom: Let it rest in the fridge for 10 minutes (or overnight) to allow the chia seeds to swell and thicken the yogurt into a decadent pudding before serving."
    ]
  },

  // ==========================================
  // SOYA SPECIALS (Under 180 kcal)
  // ==========================================
  {
    id: "soya-chunks-masala-bhurji",
    title: "Soya Chunks Masala Bhurji",
    subtitle: "Minced savory soya chunks sautéed with onions, capsicum, cumin, and warming Indian spices",
    category: "Soya Specials",
    tags: ["Soya Specials", "Breakfast", "Under 180 kcal", "High Protein", "High Fiber"],
    prepTime: "5 mins",
    cookTime: "6 mins",
    totalTime: "11 mins",
    servings: 1,
    calories: "145 kcal",
    macros: { protein: "18.5g", fiber: "5.0g", netCarbs: "8g", fat: "<0.5g" },
    difficulty: "Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    tip: "Boil and squeeze large batches of soya chunks. Pulse them into minced bhurji texture and store in an airtight container in the freezer for up to 2 weeks (or fridge for 3 days). Toss directly into your morning skillet!",
    ingredients: [
      { amount: 35, unit: "g", name: "dry soya chunks (weighed dry)" },
      { amount: 30, unit: "g", name: "onion (finely diced)" },
      { amount: 20, unit: "g", name: "green capsicum (finely diced)" },
      { amount: 1, unit: "small", name: "green chili (optional, finely chopped)" },
      { amount: 0.25, unit: "tsp", name: "turmeric powder" },
      { amount: 0.25, unit: "tsp", name: "cumin seeds or cumin powder" },
      { amount: 0.25, unit: "tsp", name: "black pepper or garam masala" },
      { amount: 1, unit: "pinch", name: "salt to taste" },
      { amount: 3, unit: "tbsp", name: "water (for dry-sautéing)" }
    ],
    instructions: [
      "Boil & De-foam: Boil 35g dry soya chunks in 2 cups of water with a pinch of salt for 5 minutes until fully expanded and soft.",
      "Squeeze Dry (Crucial Step): Drain through a colander and rinse under cold water. Firmly press and squeeze out all excess water with your hands. (Removing all water eliminates any bitter taste and allows the soya to soak up spices like a sponge!).",
      "Mince: Pulse the squeezed soya chunks in a blender for 3 seconds or finely chop into a coarse 'bhurji' scrambled texture.",
      "Dry Cook Veggies: Heat a non-stick skillet over medium heat. Add cumin seeds, diced onions, capsicum, and green chili. Sauté for 2 minutes using a splash of water to prevent sticking.",
      "Combine & Season: Stir in the minced soya, turmeric, black pepper, and salt. Cook for 3 minutes until steam rises and spices coat the soya evenly."
    ]
  },
  {
    id: "lemon-herb-soya-chaat",
    title: "Lemon-Herb Soya Chaat",
    subtitle: "Chilled halved soya chunks marinated with tangy lemon juice, crunchy cucumbers, and chaat spices",
    category: "Soya Specials",
    tags: ["Soya Specials", "Chaat & Snacks", "Under 180 kcal", "High Protein", "No Oil"],
    prepTime: "5 mins",
    cookTime: "5 mins",
    totalTime: "10 mins",
    servings: 1,
    calories: "130 kcal",
    macros: { protein: "16.0g", fiber: "5.5g", netCarbs: "7g", fat: "<0.5g" },
    difficulty: "Super Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    tip: "You can store boiled, squeezed soya chunks in the fridge for up to 3 days. Chop your vegetables separately. Combine and season only when ready to eat so the cucumbers stay delightfully crunchy.",
    ingredients: [
      { amount: 30, unit: "g", name: "dry soya chunks" },
      { amount: 30, unit: "g", name: "cucumber (finely chopped)" },
      { amount: 20, unit: "g", name: "tomato (finely chopped)" },
      { amount: 1, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 0.25, unit: "tsp", name: "chaat masala" },
      { amount: 0.25, unit: "tsp", name: "roasted cumin powder" },
      { amount: 1, unit: "tbsp", name: "fresh coriander leaves (chopped)" },
      { amount: 1, unit: "pinch", name: "salt or black salt (kala namak) to taste" }
    ],
    instructions: [
      "Boil & Prepare: Boil 30g dry soya chunks for 5 minutes. Drain, rinse under cold water, and thoroughly squeeze out all liquid.",
      "Halve: Cut each boiled soya chunk in half so they absorb the lemon juice better.",
      "Assemble: Add the prepared soya chunks to a mixing bowl along with chopped cucumber, tomato, and fresh cilantro.",
      "Toss: Drizzle fresh lemon juice over the top, add chaat masala, roasted cumin powder, and black salt. Toss well and serve cool or at room temperature."
    ]
  },
  {
    id: "soya-granules-spinach-skillet",
    title: "Soya Granules & Spinach Skillet",
    subtitle: "Quick-hydrated protein soya granules dry-sautéed with fragrant garlic and wilted farm spinach",
    category: "Soya Specials",
    tags: ["Soya Specials", "Breakfast", "Under 180 kcal", "High Protein", "High Iron"],
    prepTime: "5 mins",
    cookTime: "5 mins",
    totalTime: "10 mins",
    servings: 1,
    calories: "125 kcal",
    macros: { protein: "16.5g", fiber: "5.2g", netCarbs: "6g", fat: "<0.5g" },
    difficulty: "Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    tip: "Soya granules hydrate very rapidly! Keep dry granules pre-measured in 30g zip pouches or small containers so you can simply soak them in hot water while preparing for your day.",
    ingredients: [
      { amount: 30, unit: "g", name: "dry soya granules" },
      { amount: 60, unit: "g", name: "fresh spinach (washed & chopped)" },
      { amount: 1, unit: "clove", name: "garlic (minced)" },
      { amount: 0.25, unit: "tsp", name: "red chili flakes" },
      { amount: 0.25, unit: "tsp", name: "black pepper powder" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Hydrate Granules: Place 30g dry soya granules in a bowl, pour boiling water over them, and let soak for 8–10 minutes.",
      "Drain: Pour granules into a fine-mesh strainer and press firmly with the back of a spoon to remove all excess liquid.",
      "Sauté Garlic & Greens: Heat a dry non-stick pan over medium heat. Add minced garlic and chopped spinach. Stir for 1–2 minutes until spinach is just wilted.",
      "Mix & Heat: Add the hydrated soya granules, chili flakes, black pepper, and salt. Stir-fry together for 2–3 minutes until piping hot."
    ]
  },

  // ==========================================
  // LUNCH OPTIONS (~235 - 265 kcal)
  // ==========================================
  {
    id: "soya-cauliflower-rice",
    title: "Soya Chunks & Cauliflower Rice",
    subtitle: "Low-carb spiced minced soya stir-fried with riced cauliflower, green beans, and ginger-garlic",
    category: "Lunch",
    tags: ["Lunch", "High Protein", "Keto / Low Carb", "Soya Specials"],
    prepTime: "5 mins",
    cookTime: "7 mins",
    totalTime: "12 mins",
    servings: 1,
    calories: "235 kcal",
    macros: { protein: "24.5g", fiber: "8.0g", netCarbs: "12g", fat: "1.5g" },
    difficulty: "Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=800&q=80",
    tip: "Pulse raw cauliflower florets into rice in advance and keep raw in a paper-towel-lined container for up to 4 days. Boil and mince soya chunks in batch quantities; store frozen for up to 2 weeks.",
    ingredients: [
      { amount: 45, unit: "g", name: "dry soya chunks" },
      { amount: 150, unit: "g", name: "raw cauliflower florets (grated or pulsed into rice)" },
      { amount: 50, unit: "g", name: "mixed veggies (finely diced green beans & capsicum)" },
      { amount: 1, unit: "tsp", name: "light soy sauce" },
      { amount: 0.5, unit: "tsp", name: "ginger-garlic paste" },
      { amount: 0.25, unit: "tsp", name: "red chili flakes & black pepper" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Boil & Mince Soya: Boil soya chunks in salted water for 5 minutes. Drain, rinse under cold water, and squeeze out all water thoroughly. Coarsely pulse in a food processor to form minced soya.",
      "Make Cauliflower Rice: Pulse raw cauliflower florets in a food processor until they reach rice-sized grains.",
      "Sauté Veggies: Heat a non-stick pan over medium heat with a splash of water or 1 spray oil mist. Add ginger-garlic paste, green beans, and capsicum. Sauté for 2 minutes.",
      "Combine & Season: Add the cauliflower rice and minced soya. Pour in soy sauce, chili flakes, and black pepper. Stir-fry on high heat for 3–4 minutes until cauliflower rice is tender yet crisp."
    ]
  },
  {
    id: "paneer-kala-chana-bowl",
    title: "Low-Fat Paneer & Kala Chana Bowl",
    subtitle: "Pan-seared golden paneer cubes paired with tender black chickpeas, fresh tomatoes, and cumin",
    category: "Lunch",
    tags: ["Lunch", "High Protein", "High Fiber", "Paneer & Tofu"],
    prepTime: "5 mins",
    cookTime: "3 mins",
    totalTime: "8 mins",
    servings: 1,
    calories: "265 kcal",
    macros: { protein: "22.0g", fiber: "8.0g", netCarbs: "18g", fat: "5.0g" },
    difficulty: "Super Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tip: "Pre-boil black chickpeas (kala chana) in batches and freeze portioned 60g servings in zip bags. Thaw overnight in the fridge. Combine with raw veggies and paneer on the day of eating to prevent sogginess.",
    ingredients: [
      { amount: 80, unit: "g", name: "low-fat paneer (skimmed milk), cut into small cubes" },
      { amount: 60, unit: "g", name: "cooked / boiled black chickpeas (kala chana)" },
      { amount: 100, unit: "g", name: "salad base (diced cucumber, tomato, and red onion)" },
      { amount: 1, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 0.25, unit: "tsp", name: "chaat masala" },
      { amount: 0.25, unit: "tsp", name: "roasted cumin powder" },
      { amount: 1, unit: "pinch", name: "salt or black salt to taste" }
    ],
    instructions: [
      "Sear Paneer: Place low-fat paneer cubes in a dry non-stick skillet over medium-high heat for 1–2 minutes until lightly browned and fragrant on the edges.",
      "Combine: In a mixing bowl, combine boiled black chickpeas, seared paneer, and freshly chopped salad vegetables.",
      "Season: Add fresh lemon juice, chaat masala, cumin powder, and black salt. Toss well to coat evenly and serve immediately."
    ]
  },
  {
    id: "garlic-tofu-broccoli-mushroom",
    title: "Garlic Tofu, Broccoli & Mushroom Stir-Fry",
    subtitle: "Seared golden tofu cubes stir-fried with crisp tender broccoli, savory mushrooms, and garlic soy sauce",
    category: "Lunch",
    tags: ["Lunch", "High Protein", "Vegan", "Dinner", "Quick & Easy"],
    prepTime: "5 mins",
    cookTime: "6 mins",
    totalTime: "11 mins",
    servings: 1,
    calories: "240 kcal",
    macros: { protein: "23.0g", fiber: "6.5g", netCarbs: "8g", fat: "8.5g" },
    difficulty: "Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    tip: "Wash and chop broccoli florets and button mushrooms up to 3 days in advance (store completely dry in paper-towel-lined boxes). The cooked stir-fry keeps wonderfully in an airtight glass container for 3 days.",
    ingredients: [
      { amount: 150, unit: "g", name: "firm tofu (drained, pressed, and cubed)" },
      { amount: 120, unit: "g", name: "broccoli florets (cut into small bite-sized pieces)" },
      { amount: 80, unit: "g", name: "button mushrooms (sliced)" },
      { amount: 2, unit: "cloves", name: "garlic (finely minced)" },
      { amount: 1, unit: "tsp", name: "light soy sauce" },
      { amount: 0.5, unit: "tsp", name: "rice vinegar or fresh lemon juice" },
      { amount: 0.25, unit: "tsp", name: "black pepper powder" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Prep Tofu: Press firm tofu between paper towels to remove moisture, then cut into neat bite-sized cubes.",
      "Sear Veggies: Heat a non-stick skillet over high heat with 2 tbsp water or cooking oil spray. Add minced garlic, sliced mushrooms, and broccoli florets. Stir-fry for 3 minutes until mushrooms release juices and broccoli turns vibrant emerald green.",
      "Add Tofu & Season: Toss in tofu cubes, soy sauce, black pepper, and salt. Cook on high heat for another 2–3 minutes, stirring constantly until tofu is hot. Splash with vinegar right before turning off the heat."
    ]
  },
  {
    id: "sprouted-moong-edamame-bowl",
    title: "Sprouted Moong & Edamame Power Bowl",
    subtitle: "Steamed sweet edamame and protein-packed sprouted moong tossed over crisp cabbage with tangy mustard dressing",
    category: "Lunch",
    tags: ["Lunch", "High Protein", "High Fiber", "Vegan", "Salad"],
    prepTime: "5 mins",
    cookTime: "4 mins",
    totalTime: "9 mins",
    servings: 1,
    calories: "250 kcal",
    macros: { protein: "19.5g", fiber: "9.0g", netCarbs: "17g", fat: "4.5g" },
    difficulty: "Super Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tip: "Shredded cabbage stays fresh and crunchy in the fridge for up to 5 days. Keep frozen shelled edamame in your freezer—it thaws and steams in boiling water in under 3 minutes!",
    ingredients: [
      { amount: 80, unit: "g", name: "sprouted green moong" },
      { amount: 60, unit: "g", name: "shelled edamame (frozen or fresh)" },
      { amount: 100, unit: "g", name: "shredded purple or green cabbage & diced cucumber" },
      { amount: 1, unit: "tbsp", name: "fresh lemon juice" },
      { amount: 0.25, unit: "tsp", name: "yellow mustard paste or powder" },
      { amount: 1, unit: "pinch", name: "salt and black pepper to taste" }
    ],
    instructions: [
      "Steam: Steam edamame and sprouted green moong together in a steamer basket or microwave with 2 tbsp water for 3–4 minutes until tender yet crunchy.",
      "Build Base: In a large serving bowl, arrange the shredded crisp cabbage and diced cucumber.",
      "Assemble: Top with the warm steamed moong and sweet edamame.",
      "Dress: Whisk lemon juice, mustard paste, salt, and pepper in a small cup. Drizzle generously over the bowl and toss thoroughly."
    ]
  },

  // ==========================================
  // DINNER OPTIONS (~220 - 255 kcal, High Protein)
  // ==========================================
  {
    id: "soya-paneer-kadai-cauli-rice",
    title: "Soya & Paneer Kadai with Cauliflower Rice",
    subtitle: "30g protein feast: tender soya chunks and low-fat paneer simmered in a spiced tomato-capsicum kadai gravy",
    category: "Dinner",
    tags: ["Dinner", "High Protein", "30g Protein", "Paneer & Tofu", "Soya Specials"],
    prepTime: "8 mins",
    cookTime: "8 mins",
    totalTime: "16 mins",
    servings: 1,
    calories: "250 kcal",
    macros: { protein: "30.0g", fiber: "8.5g", netCarbs: "14g", fat: "3.2g" },
    difficulty: "Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    tip: "Cook the tomato-capsicum gravy base in large batches and freeze in single-serve containers. Reheat on the stove and toss in fresh paneer and boiled soya chunks right before eating.",
    ingredients: [
      { amount: 35, unit: "g", name: "dry soya chunks (boiled, squeezed dry, and halved)" },
      { amount: 50, unit: "g", name: "low-fat paneer (skimmed milk, cubed)" },
      { amount: 150, unit: "g", name: "raw cauliflower florets (grated into rice)" },
      { amount: 50, unit: "g", name: "diced bell peppers & onions" },
      { amount: 50, unit: "g", name: "pureed fresh tomato" },
      { amount: 0.5, unit: "tsp", name: "ginger-garlic paste" },
      { amount: 0.25, unit: "tsp", name: "kadai masala or garam masala" },
      { amount: 0.25, unit: "tsp", name: "turmeric & red chili powder" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Prep Base: Pulse cauliflower florets in a food processor until rice-sized. Dry-sauté in a non-stick pan with a pinch of salt for 3 minutes until tender. Transfer to a plate.",
      "Make Tomato Gravy: In the same skillet, add ginger-garlic paste, diced onions, capsicum, and tomato puree with 3 tbsp water. Simmer for 2 minutes.",
      "Combine Proteins: Add boiled and squeezed soya chunks, cubed low-fat paneer, kadai masala, turmeric, chili powder, and salt. Cook on medium heat for 3–4 minutes until the gravy thickens and coats the proteins evenly.",
      "Serve: Spoon the savory spiced gravy generously over the warm cauliflower rice."
    ]
  },
  {
    id: "tofu-mushroom-tikka-skillet",
    title: "Tofu & Mushroom Tikka Skillet",
    subtitle: "Charred, smoky grilled tofu and button mushrooms marinated in yogurt, Kashmiri chili, and tikka spices",
    category: "Dinner",
    tags: ["Dinner", "High Protein", "Low Calorie", "Paneer & Tofu"],
    prepTime: "10 mins",
    cookTime: "8 mins",
    totalTime: "18 mins",
    servings: 1,
    calories: "220 kcal",
    macros: { protein: "24.0g", fiber: "5.0g", netCarbs: "9g", fat: "8.5g" },
    difficulty: "Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    tip: "Marinate tofu and mushrooms up to 48 hours in advance in airtight glass containers. Tofu absorbs spices deeper and develops richer flavor the longer it rests in the marinade!",
    ingredients: [
      { amount: 180, unit: "g", name: "firm tofu (pressed and cut into 1-inch cubes)" },
      { amount: 100, unit: "g", name: "button mushrooms (halved)" },
      { amount: 100, unit: "g", name: "mixed bell peppers & onions (cut into large squares)" },
      { amount: 30, unit: "g", name: "non-fat plain Greek yogurt (for marinade)" },
      { amount: 0.25, unit: "tsp", name: "chaat masala & roasted cumin powder" },
      { amount: 0.5, unit: "tsp", name: "Kashmiri red chili powder" },
      { amount: 0.5, unit: "tsp", name: "ginger-garlic paste" },
      { amount: 1, unit: "tbsp", name: "salt & fresh lemon juice to taste" }
    ],
    instructions: [
      "Prepare Marinade: In a mixing bowl, whisk non-fat Greek yogurt, ginger-garlic paste, red chili powder, cumin powder, chaat masala, salt, and lemon juice.",
      "Coat: Fold in the pressed tofu cubes, halved mushrooms, and bell pepper squares until thoroughly coated. Let sit for 10 minutes (or marinate overnight).",
      "Grill: Heat a non-stick grill pan or skillet over high heat. Place marinaded tofu, mushrooms, and veggies in a single layer. Grill for 3–4 minutes per side until charred edges appear. Serve piping hot with lemon wedges."
    ]
  },
  {
    id: "soya-palak-protein-shorba",
    title: "Soya & Palak (Spinach) Protein Shorba",
    subtitle: "A velvety, comforting green spinach and yellow moong dal soup packed with high-protein soya granules and garlic",
    category: "Dinner",
    tags: ["Dinner", "Soups & Stews", "High Protein", "Soya Specials", "Comfort Food"],
    prepTime: "5 mins",
    cookTime: "10 mins",
    totalTime: "15 mins",
    servings: 1,
    calories: "240 kcal",
    macros: { protein: "26.5g", fiber: "10.5g", netCarbs: "19g", fat: "1.2g" },
    difficulty: "Easy",
    isFavorite: false,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    tip: "This soup freezes exceptionally well for up to 1 week! Store in heat-safe soup containers and simply reheat on the stovetop with a splash of hot water.",
    ingredients: [
      { amount: 30, unit: "g", name: "dry soya granules (soaked in hot water & squeezed dry)" },
      { amount: 30, unit: "g", name: "split yellow moong dal (washed)" },
      { amount: 150, unit: "g", name: "fresh spinach (washed & chopped)" },
      { amount: 2, unit: "cloves", name: "garlic (minced)" },
      { amount: 0.5, unit: "tsp", name: "cumin seeds" },
      { amount: 0.25, unit: "tsp", name: "black pepper powder" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Pressure Cook / Boil: Combine 30g moong dal, 150g chopped spinach, minced garlic, and 2 cups of water in a pot or pressure cooker. Cook until dal is tender (approx. 2 pressure cooker whistles or 10 minutes boiling).",
      "Blend: Blend the cooked dal and spinach mixture with an immersion blender into a smooth, vibrant emerald-green soup.",
      "Add Protein: Return the soup to low heat. Add the soaked and thoroughly squeezed soya granules, black pepper, cumin powder, and salt. Simmer gently for 3 minutes so the granules soak up the rich garlic soup flavors."
    ]
  },
  {
    id: "edamame-paneer-bhurji",
    title: "Edamame & Low-Fat Paneer Bhurji",
    subtitle: "Crushed sweet edamame and soft crumbled paneer scrambled with capsicum, spinach, and pav bhaji masala",
    category: "Dinner",
    tags: ["Dinner", "High Protein", "28g Protein", "Paneer & Tofu"],
    prepTime: "5 mins",
    cookTime: "5 mins",
    totalTime: "10 mins",
    servings: 1,
    calories: "255 kcal",
    macros: { protein: "28.0g", fiber: "8.0g", netCarbs: "11g", fat: "9.0g" },
    difficulty: "Easy",
    isFavorite: true,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    tip: "Edamame and paneer can be pre-crumbled and mixed together dry in Tupperware for up to 3 days. Cook with greens fresh in under 5 minutes for dinner!",
    ingredients: [
      { amount: 100, unit: "g", name: "shelled edamame (steamed)" },
      { amount: 75, unit: "g", name: "low-fat paneer (crumbled)" },
      { amount: 50, unit: "g", name: "finely chopped green capsicum" },
      { amount: 50, unit: "g", name: "fresh spinach (chopped)" },
      { amount: 0.25, unit: "tsp", name: "turmeric & cumin powder" },
      { amount: 0.25, unit: "tsp", name: "pav bhaji masala or chaat masala" },
      { amount: 1, unit: "pinch", name: "salt to taste" }
    ],
    instructions: [
      "Coarse Pulse: Briefly pulse the steamed edamame in a blender for 2 seconds to crack them into coarse pieces (do not puree).",
      "Sauté Veggies: In a dry non-stick skillet, sauté capsicum and spinach with a splash of water for 2 minutes until wilted.",
      "Scramble & Season: Add crumbled low-fat paneer, crushed edamame, turmeric, cumin, pav bhaji masala, and salt. Stir-fry on medium-high heat for 3 minutes until steam rises and spices are fragrant."
    ]
  }
];
