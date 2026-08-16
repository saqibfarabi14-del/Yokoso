'use strict';

// ---- MENU DATA ----
'use strict';

// ---- MENU DATA ----
const MENU = {
    dimSum: [
        { id:'dim-1', name:'Prawn Hargao', desc:'Steamed prawn dumplings with a touch of tapioca starch, topped with black sesame seeds.', price:485, spice:0, signature:false },
        { id:'dim-2', name:'Hainanese Chicken Dumpling', desc:'Delicious and tender Hainanese style chicken dumplings, topped with a sprinkle of spring onion for added freshness.', price:395, spice:0, signature:false },
        { id:'dim-3', name:'Sichuan Wanton In Red Oil', desc:'Exquisite chicken wontons elevated with a luscious prawn-infused red oil, intensifying the dish with rich flavors.', price:440, spice:2, signature:true },
        { id:'dim-4', name:'Cheesy Chicken Dumpling', desc:'Indulge in the delightful combination of cheesy chicken dumplings, offering a savory and creamy delight.', price:415, spice:0, signature:false },
        { id:'dim-5', name:'Soy-Sesame Beef Dumpling', desc:'Taste perfection with our beef dumplings, featuring a house special mixture that brings a savory and umami flavor.', price:480, spice:0, signature:false },
        { id:'dim-6', name:'Naga Siu Mai', desc:'Chicken sia mai infused with a chef\'s special hago sauce, spicy and flavorful culinary experience, our special tribute to the North East.', price:430, spice:2, signature:true },
        { id:'dim-7', name:'Chicken Prawn Siumai', desc:'Enjoy the delightful combination of chicken and prawn filling, perfectly complemented by a topping of vibrant red capsicum.', price:475, spice:0, signature:false },
        { id:'dim-8', name:'Lemongrass Chicken Siumai', desc:'Chicken siumai with lemongrass leaves, a delightful combination of flavors.', price:395, spice:0, signature:false },
        { id:'dim-9', name:'Chicken Basil Potsticker', desc:'Chicken and basil leaf, steamed and pan-fried to perfection for a delightful treat.', price:385, spice:2, signature:true },
        { id:'dim-10', name:'Spicy Chicken Potsticker', desc:'Spicy chicken potsticker steamed and pan-fried to perfection.', price:395, spice:1, signature:false },
        { id:'dim-11', name:'Beef Potsticker', desc:'Beef potstickers, steamed and pan-fried to perfection, beef potstickers are adorned with fresh spring onion.', price:475, spice:0, signature:false },
        { id:'dim-12', name:'Vegetable Dumpling', desc:'Steamed mushroom, cabbage, cauliflower & tofu mix and minced carrot for vegetables.', price:350, spice:0, signature:false },
        { id:'dim-13', name:'Assorted Dim Sum 3', desc:'(Prawn Hargao, Naga Siu Mai, Cheesy Chicken Dumpling, Spicy Chicken Potsticker, Hainanese Chicken Dumpling, Chicken Basil Potsticker)', price:510, spice:0, signature:false },
        { id:'dim-14', name:'Assorted Dim Sum 2', desc:'(Dongbei Siu Mai, Hainanese Chicken Dumpling, Chicken Basil Potsticker - 2pcs each)', price:490, spice:0, signature:false },
        { id:'dim-15', name:'Chicken XO Dumpling', desc:'Steamed chicken dumplings with XO sauce.', price:485, spice:0, signature:false },
        { id:'dim-16', name:'Spicy Chicken & Prawn Siumai', desc:'Delightful combination of chicken and prawn filling.', price:485, spice:3, signature:false },
        { id:'dim-17', name:'Assorted Dim Sum 1', desc:'(Prawn Hargao, Lemongrass Siu Mai, Spicy Chicken Potsticker - 2pcs each)', price:510, spice:0, signature:false }
    ],
    appetizers: [
        { id:'app-1', name:'Crispy Nori Chicken Tacos', desc:'Crispy nori wrapped chicken taco, topped with savory chicken, capsicum, onion, and a creamy mild spicy mayo.', price:520, spice:2, signature:true },
        { id:'app-2', name:'Crab & Cream Cheese Rangoons', desc:'Crispy, golden-fried wonton shells filled with a silky blend of cream cheese, crab meat, a crowd favorite!', price:890, spice:0, signature:true },
        { id:'app-3', name:'Salt & Pepper Calamari', desc:'Deep-fried calamari topped with fried garlic and capsicums, a delicious treat.', price:560, spice:0, signature:true },
        { id:'app-4', name:'Korean Chicken', desc:'Enjoy the crispy goodness of Korean fried wings, accompanied by a delightful dipping sauce, a perfect combination.', price:495, spice:0, signature:false },
        { id:'app-5', name:'Chicken Cheese Wonton', desc:'Crispy deep-fried pockets enveloping a delightful combination of crab and cream cheese, flavorful delight to relish.', price:395, spice:0, signature:false },
        { id:'app-6', name:'Prawn Tempura', desc:'Prawn tempura served on a bed of spinach leaves, a delightful combination.', price:795, spice:0, signature:false },
        { id:'app-7', name:'Chicken Nanban', desc:'Boneless fried chicken, served with a special Nanban sauce, creating a harmonious blend of flavors.', price:495, spice:2, signature:true },
        { id:'app-8', name:'Volcano Mussels', desc:'Mussels with torched house special sauce, tobiko.', price:795, spice:0, signature:false },
        { id:'app-9', name:'Beef Cheung Fun', desc:'Steamed beef roll, topped with chili oil.', price:785, spice:0, signature:false },
        { id:'app-10', name:'Dynamite Shrimp', desc:'Crispy prawn with chef\'s special spicy mayo sauce.', price:680, spice:0, signature:false },
        { id:'app-11', name:'Salmon Avocado Cups', desc:'Crispy rice paper topped with avocado, salmon and mayo.', price:660, spice:0, signature:false }
    ],
    salads: [
        { id:'sal-1', name:'Shanghai Chicken Salad', desc:'Chicken salad inspired by the vibrant flavors of Shanghai cuisine.', price:540, spice:0, signature:true },
        { id:'sal-2', name:'Chicken Cashewnut Salad', desc:'Tangy dressing, cashew nuts, peanut powder, all tossed in a savory dressing.', price:560, spice:0, signature:false },
        { id:'sal-3', name:'Crab Prawn Salad', desc:'Crab stick, crispy prawn, tempura flakes, capsicum, mayo.', price:695, spice:2, signature:false }
    ],
    noodles: [
        { id:'nood-1', name:'Khao Soi Gai', desc:'This curry noodle soup featuring chicken egg, noodles, mushroom and a rich coconut-based broth served with crispy noodles on top.', price:680, spice:1, signature:true },
        { id:'nood-2', name:'Spicy Sichuan Noodles', desc:'The fiery goodness of chicken, stir-fried noodles with chili sauce and other spicy ingredients, crowned with white sesame seeds.', price:495, spice:2, signature:true },
        { id:'nood-3a', name:'Yokoso Noodles (Chicken)', desc:'Stir-fried rice noodles with chicken, prawn and octopus.', price:440, spice:0, signature:false },
        { id:'nood-3b', name:'Yokoso Noodles (Beef)', desc:'Stir-fried rice noodles with beef, prawn and octopus.', price:525, spice:0, signature:false },
        { id:'nood-4', name:'Pad Thai', desc:'Rice Noodles, Prawn, Octopus.', price:550, spice:0, signature:false }
    ],
    ramen: [
        { id:'ram-1', name:'Fiery Chicken Ramen', desc:'Ramen with roasted chicken, shitake mushrooms, and boiled egg, featuring a truly spicy broth for a bold experience.', price:595, spice:2, signature:false },
        { id:'ram-2', name:'Creamy Chicken Ramen', desc:'Enjoy the creamy and delicious ramen topped with shitake mushroom, tofu and boiled egg, a satisfying and delicious choice.', price:650, spice:0, signature:true },
        { id:'ram-3', name:'Seafood Ramen', desc:'Ramen with prawn, squid, shitake mushroom, and boiled egg, featuring a truly spicy broth for a bold experience.', price:850, spice:2, signature:false }
    ],
    rice: [
        { id:'rice-1', name:'Yokoso Special Fried Rice', desc:'Yokoso\'s special stir-fried rice with chicken, prawn, egg, vegetables, and green onions.', price:580, spice:0, signature:true },
        { id:'rice-2', name:'Yokoso Special Naga Rice', desc:'The diverse flavors of fried rice with beef, chicken, prawn, squid and the fiery essence of naga chili topped with a poached egg.', price:510, spice:2, signature:true },
        { id:'rice-3', name:'Fried Rice (Egg)', desc:'Classic fried rice with egg.', price:295, spice:0, signature:false },
        { id:'rice-3b', name:'Fried Rice (Chicken)', desc:'Classic fried rice with chicken.', price:340, spice:0, signature:false },
        { id:'rice-4', name:'Fried Rice (Beef)', desc:'Classic fried rice with beef.', price:460, spice:0, signature:false },
        { id:'rice-5', name:'Fried Rice (Seafood)', desc:'Classic fried rice with seafood.', price:450, spice:0, signature:false },
        { id:'rice-6', name:'Tom Yum Fried Rice', desc:'Zesty and aromatic tom yum rice, a delightful Thai-inspired delight.', price:450, spice:2, signature:false },
        { id:'rice-7', name:'Hong Kong Chicken Rice Bowl', desc:'Egg fried rice, Hong Kong Chicken, Bangkok Style Vegetable.', price:595, spice:0, signature:false },
        { id:'rice-8', name:'Seafood Rice Bowl', desc:'Tom Yum Fried Rice, Yokoso Special Chili Fish, Prawn Tempura.', price:550, spice:0, signature:false },
        { id:'rice-9', name:'Teriyaki Chicken Rice Bowl', desc:'Egg fried rice, Teriyaki Chicken, Spicy Tofu Curry.', price:635, spice:0, signature:false },
        { id:'rice-10', name:'Steamed Rice', desc:'Simple steamed rice.', price:150, spice:0, signature:false }
    ],
    chicken: [
        { id:'chic-1', name:'Hong Kong Chicken', desc:'Deep-fried chicken legs coated with a special sweet chili sauce, offering a flavorful and satisfying dish.', price:675, spice:0, signature:false },
        { id:'chic-2', name:'Chicken Black Pepper', desc:'Tender sliced chicken with vibrant capsicum, drizzled in rich dark soy sauce, and seasoned with black pepper for a delightful taste.', price:465, spice:0, signature:false },
        { id:'chic-3', name:'Yokoso Crispy Chicken', desc:'Satisfying crispness of sauteed chicken, coated in a special sweet and sour sauce, offering a balance of flavors.', price:450, spice:0, signature:true },
        { id:'chic-4', name:'Chicken Hot Sauce', desc:'Delight in the fiery heat of chicken drenched in a homemade hot sauce, infused with flavorful spices.', price:525, spice:2, signature:false },
        { id:'chic-5', name:'Chicken Cashew Nut with XO Sauce', desc:'Tender chicken pieces, nuts, and aromatic garlic stir-fried in a special XO sauce, a delicious dish.', price:560, spice:0, signature:true },
        { id:'chic-6', name:'Thai Basil Chicken', desc:'Chicken basil leaf curry with ginger, chili, garlic, and a special soy sauce blend, a delicious and aromatic dish.', price:495, spice:1, signature:false },
        { id:'chic-7', name:'Chicken Red Curry', desc:'Red curry chicken with coconut milk, lime, and basil leaves, a delicate taste.', price:585, spice:2, signature:true },
        { id:'chic-8', name:'Kung Pao Chicken', desc:'Delicious pan-fried chicken with cashew nuts and a touch of Sichuan pepper and many secret delicious, a flavorful delight.', price:495, spice:0, signature:true },
        { id:'chic-9', name:'Yokoso Firecracker Chicken', desc:'Crispy deep-fried chicken, mushroom, pan-fried with a spicy sauce for a mouthwatering experience.', price:520, spice:1, signature:false },
        { id:'chic-10', name:'Chicken Mapo Tofu', desc:'Sichuan dish made with soft tofu in a spicy, savory gravy mixed with minced meat, garlic, ginger, mushroom, green, and Sichuan peppercorns.', price:475, spice:2, signature:true },
        { id:'chic-11', name:'Chongqing Chicken', desc:'Delicious dip-fried chicken mixed with sichuan pepper, dry chili.', price:480, spice:3, signature:false }
    ],
    beef: [
        { id:'beef-1', name:'Yokoso Crispy Beef', desc:'Crispy sauteed beef, coated in a special sweet and sour sauce, offering a delightful balance of flavors.', price:750, spice:0, signature:true },
        { id:'beef-2', name:'Sliced Beef With XO Sauce', desc:'Indulge in the combination of sliced beef and bathed in a special XO sauce, a Cantonese classic dish.', price:775, spice:0, signature:false },
        { id:'beef-3', name:'Beef Bulgogi', desc:'Spicy gochujang-infused dry cured beef, pan-fried to perfection to give a delectable fusion of flavors.', price:750, spice:0, signature:false }
    ],
    seafood: [
        { id:'seaf-1', name:'Singaporean Chili Crab', desc:'Crispy deep-fried crab served with a tangy red chili sauce, a deliciously spicy treat.', price:750, spice:0, signature:false },
        { id:'seaf-2', name:'Naga Prawn', desc:'Mouthwatering delight of deep-fried prawns infused with special naga sauce, pan-fried for a mouthful numbing experience.', price:495, spice:3, signature:true },
        { id:'seaf-3', name:'Yokoso Special Chili Fish', desc:'Delicious fusion of chili, basa fish, deep-fried for a delightful and flavorful combination.', price:475, spice:0, signature:true },
        { id:'seaf-4', name:'Asian Chili Prawn', desc:'Prawn sauteed with garlic, onion, capsicum, and chili sauce creating a flavorful and aromatic dish.', price:595, spice:1, signature:false },
        { id:'seaf-5', name:'Seafood Basket', desc:'Prawn, basa fish, and squid, deep-fried and pan-fried with basil leaves.', price:535, spice:0, signature:false },
        { id:'seaf-6', name:'Thai Red Curry with Seafood', desc:'Indulge in the flavors of our Seafood Red Curry - a fragrant medley of prawn, squid and basa fish seasoned by a rich aromatic red curry paste.', price:565, spice:2, signature:true },
        { id:'seaf-7', name:'Stir-fried Seafood', desc:'Assorted deep-fried basa fish, squid, and pan-fried with octopus for a delicious mix of flavors.', price:480, spice:2, signature:false },
        { id:'seaf-8', name:'Korean Seafood Bounty', desc:'A hearty mixture of deep-fried crab, squid and basa fish infused with Korean style spicy sauce made with gochujang, gochugaru and garlic paste.', price:560, spice:1, signature:true }
    ],
    wholeFish: [
        { id:'fish-1', name:'Steamed Sea Bass with Lemon Sauce', desc:'Tender and flavorful whole steamed sea bass, served with the house special lemon sauce, creating a refreshing and delightful dish.', price:1950, spice:0, signature:true },
        { id:'fish-2', name:'Fried Sea Bass with Chili Sauce', desc:'Crispy whole sea bass, served with the house special sauce, offering a delectable blend of textures and flavors.', price:1950, spice:2, signature:true }
    ],
    vegetable: [
        { id:'veg-1', name:'Crispy Tofu', desc:'Crispy deep-fried tofu sauteed in a house special sweet and spicy sauce, topped with sesame seeds.', price:375, spice:0, signature:true },
        { id:'veg-2', name:'Tofu Nanban', desc:'Crispy deep-fried tofu topped with Nanban sauce, a delicious combination of textures and flavors.', price:385, spice:0, signature:false },
        { id:'veg-3', name:'Bangkok Style Vegetable', desc:'Delight in the buttery goodness of tofu, sauteed with vegetables, oyster sauce, and fried garlic, creating a savory and satisfying dish.', price:395, spice:0, signature:false },
        { id:'veg-4', name:'Stir-fried Morning Glory', desc:'Delightful medley of sauteed mushrooms, kangkong, cooked with various sauces and enhanced with a selection of flavorful seasonings.', price:295, spice:0, signature:true }
    ],
    desserts: [
        { id:'dess-1', name:'Crispy Chips with Ice Cream', desc:'A delightful treat combining crispy chips and ice cream.', price:375, spice:0, signature:false },
        { id:'dess-2', name:'Fried Ice Cream', desc:'A classic and satisfying fried ice cream.', price:295, spice:0, signature:false },
        { id:'dess-3', name:'Mango Sticky Rice with Coconut Ice Cream', desc:'The perfect combination of mango sticky rice and coconut ice cream.', price:650, spice:0, signature:true }
    ],
    beverages: [
        { id:'bev-1', name:'Pineapple Passion Martini', desc:'A refreshing blend of pineapple and passion fruit.', price:315, spice:0, signature:false },
        { id:'bev-2', name:'Viva Magenta', desc:'A vibrant and zesty drink with mixed berry flavors.', price:320, spice:0, signature:false },
        { id:'bev-3', name:'Strawberry Lime Smoothie', desc:'A sweet and tangy smoothie with strawberry and lime.', price:280, spice:0, signature:false },
        { id:'bev-4', name:'Peach Iced Tea', desc:'Classic iced tea with a touch of peach sweetness.', price:245, spice:0, signature:false },
        { id:'bev-5', name:'Orange Lime Relaxer', desc:'A relaxing citrus blend of orange and lime.', price:310, spice:0, signature:false },
        { id:'bev-6', name:'Coconut Mojito', desc:'A refreshing twist on mojito with coconut.', price:290, spice:0, signature:false },
        { id:'bev-7', name:'Kiwi Margarita', desc:'A tangy margarita with the unique flavor of kiwi.', price:290, spice:0, signature:false },
        { id:'bev-8', name:'Lemon Mint Smoothie', desc:'A refreshing smoothie with lemon and mint.', price:255, spice:0, signature:false },
        { id:'bev-9', name:'Virgin Mojito', desc:'A classic virgin mojito with lime and mint.', price:255, spice:0, signature:false }
    ]
,
    sushi: [
        { id:'sushiH-1', name:'Golden Sakura', desc:'Rolled up prawn tempura, roasted nori topped with torched salmon, spicy mayo and garnished with golden tempura flakes.', hasHalfFull:true, priceHalf:650, priceFull:1280, spice:0, signature:false },
        { id:'sushiH-2', name:'The Forbidden Crab', desc:'Sushi roll with crab meat, cheese, roasted seaweed, topped with cheese, kani & generous amount of wasabi mayo.', hasHalfFull:true, priceHalf:595, priceFull:1170, spice:0, signature:false },
        { id:'sushiH-3', name:'Volcano Roll', desc:'Nori wrapped prawn tempura, topped with mixed cheese, salmon and crab stick sauce, garnished with sriracha hot sauce.', hasHalfFull:true, priceHalf:550, priceFull:1080, spice:0, signature:false },
        { id:'sushiH-4', name:'Yokoso Spider Roll', desc:'Rolled up with prawn, roasted seaweed, topped with salmon, cheese, spicy mayo, garnished with tobiko.', hasHalfFull:true, priceHalf:695, priceFull:1370, spice:0, signature:false },
        { id:'sushiH-5', name:'Smoked Salmon Roll', desc:'Torched Salmon paired with prawn tempura, rice and topped with tobiko and mayo.', hasHalfFull:true, priceHalf:685, priceFull:1350, spice:0, signature:false },
        { id:'sushiH-6', name:'Spicy Lava Roll', desc:'Sushi roll with chicken, rice, roasted seaweed, topped with chicken, mayo and sichuan sauce, crowned with nori crisps.', hasHalfFull:true, priceHalf:520, priceFull:1020, spice:0, signature:false },
        { id:'sushiH-7', name:'Vegetable Egg Maki', desc:'Nori-wrapped vegetable and egg roll, a delicious and healthy option for sushi lovers.', hasHalfFull:true, priceHalf:330, priceFull:595, spice:0, signature:false },
        { id:'sushiH-8', name:'Alaska Roll', desc:'Deep-fried roll topped with sriracha sauce, crispy chips, and a torch-seared finish, creating a flavorful and crispy delight.', hasHalfFull:true, priceHalf:470, priceFull:920, spice:0, signature:false },
        { id:'sushiH-9', name:'Crispy Prawn Roll', desc:'Rolled-up with cream cheese and deeply fried prawn, topped with mayo for a creamy and satisfying treat.', hasHalfFull:true, priceHalf:495, priceFull:970, spice:0, signature:false },
        { id:'sushiH-10', name:'Creamy Chicken Roll', desc:'Indulge in the delectable combination of sticky rice rolled with creamy chicken, creating a flavorful treat.', hasHalfFull:true, priceHalf:450, priceFull:880, spice:0, signature:false },
        { id:'sushiH-11', name:'Hot Night Roll', desc:'Sushi roll with prawn, rice and roasted seaweed, topped with crispy chips, and elegantly torched.', hasHalfFull:true, priceHalf:440, priceFull:860, spice:0, signature:false },
        { id:'sushiH-12', name:'Ebi Tempura Roll', desc:'Delight in the rolled-up tempura shrimp, coated with tempura powder, creating a crispy and irresistible treat.', hasHalfFull:true, priceHalf:440, priceFull:860, spice:0, signature:false },
        { id:'sushiH-13', name:'Crab Ebi Uramaki', desc:'Torched crab meat and prawn roll, a delightful fusion of flavors.', hasHalfFull:true, priceHalf:445, priceFull:870, spice:0, signature:false },
        { id:'sushiH-14', name:'Tamago Nigiri', desc:'Savor the simplicity of nigiri, topped with a delicate slice of egg for a classic and flavorful experience.', hasHalfFull:true, priceHalf:280, priceFull:530, spice:0, signature:false },
        { id:'sushi-1', name:'Sushi Moriawase', desc:'Golden Sakura, Spicy Lava Roll, The Forbidden Crab, Yokoso Spider Roll, Volcano Roll, California Cheese Roll.', hasHalfFull:false, price:1350, spice:0, signature:false },
        { id:'sushi-2', name:'Salmon Avocado Taco', desc:'Crispy nori wrapped around a bed of rice, topped with salmon, avocado, capsicum, onion, and a creamy white mayo.', hasHalfFull:false, price:850, spice:0, signature:false },
        { id:'sushi-3', name:'Crab Fusion Roll', desc:'Rolled up with tamago, crab stick, cream cheese, avocado topped with crab stick, white mayo and garnished with homemade caviar.', hasHalfFull:false, price:590, spice:0, signature:false },
        { id:'sushi-4', name:'Spicy Salmon Roll', desc:'Sushi roll with crab stick, crunchy mixed with spicy sauce, topped with salmon, mayo and teriyaki sauce.', hasHalfFull:false, price:695, spice:0, signature:false },
        { id:'sushi-5', name:'Kazari Maki Roll', desc:'Rolled up with salmon, avocado, cream cheese, tamago, crab stick, rice and roasted nori, topped with white mayo, homemade caviar.', hasHalfFull:false, price:765, spice:0, signature:false },
        { id:'sushi-6', name:'Gunkan-Maki Roll', desc:'Nori wrapped with rice, salmon, avocado, mixed with creamy sauce topped with homemade caviar and tobiko.', hasHalfFull:false, price:1450, spice:0, signature:false },
        { id:'sushi-7', name:'Avocado Roll', desc:'Shushi roll with avocado, prawn tempura, cream cheese, rice topped with avocado, mayo and tobiko.', hasHalfFull:false, price:745, spice:0, signature:false },
        { id:'sushi-8', name:'Salmon Tataki', desc:'Pan grilled salmon with teriyaki sauce and sesame seeds.', hasHalfFull:false, price:1190, spice:0, signature:false },
        { id:'sushi-9', name:'Salmon Sashimi', desc:'Fresh raw salmon, cucumber, ginger pickle, letus.', hasHalfFull:false, price:895, spice:0, signature:false },
        { id:'sushi-10', name:'Nigiri Assortment', desc:'Prawn nigiri, salmon nigiri, crab stick nigiri – 2 pcs each.', hasHalfFull:false, price:590, spice:0, signature:false }
    ],
    sushiCombos: [
        { id:'combo-1', name:'Fusion Sushi Voyage', desc:'Golden Sakura, Alaska Roll, Yokoso Spider Roll, The Forbidden Crab, Spicy Lava Roll, Crispy Prawn Roll.', price:3425, spice:0, signature:false },
        { id:'combo-2', name:'Assorted Sushi Boat', desc:'Red Dragon Roll, Crab Ebi Uramaki, Hot Night Roll, Spicy Lava Roll, Alaska Roll, Ebi Tempura Roll.', price:2345, spice:0, signature:false }
    ],
    bento: [
        { id:'bento-1', name:'Kaiseki Bento', desc:'Fried Rice, Firecracker Chicken, Vegetable Spicy Tofu Curry, Cheesy Chicken Dumpling, Tamago Nigiri.', price:925, spice:0, signature:false },
        { id:'bento-2', name:"Shogun's Secret Bento", desc:'Fried Rice, Chicken Cashew Nut with XO Sauce, Chicken Nanban, Seafood Basket.', price:990, spice:0, signature:false }
    ],
    soup: [
        { id:'soup-1', name:'Chicken Wonton Soup', desc:'Satisfy your cravings with a comforting bowl of chicken wonton soup, a harmony of flavors in a warm and soothing broth.', price:360, spice:0, signature:false },
        { id:'soup-2', name:'Beef Noodle Soup', desc:'A hearty beef noodle soup with tender beef, thai noodles, sweet red chili and kang kong for a satisfying and flavorful meal.', price:410, spice:0, signature:false },
        { id:'soup-3', name:'Tom Yum Soup', desc:'Spicy and sour Thai soup with aromatic herbs and prawn and squid seasonings, a flavorful delight.', price:470, spice:0, signature:true }
    ]

};

// ---- COMPASS DATA (computed from MENU) ----
const COMPASS_CHAPTERS = [
    {
        seal: '点', native: '点心', name: 'Dim Sum & Small Plates',
        desc: 'Steamed, folded, and fried — the first bites of the table.',
        anchorId: 'dim-sum',
        count: MENU.dimSum.length + MENU.appetizers.length + MENU.soup.length + MENU.salads.length
    },
    {
        seal: '麺', native: '麺飯', name: 'Noodles, Rice & Ramen',
        desc: 'Bowls built for comfort, from Sichuan fire to Thai curry broth.',
        anchorId: 'noodles',
        count: MENU.noodles.length + MENU.ramen.length + MENU.rice.length
    },
    {
        seal: '炎', native: '炒め', name: 'Wok & Grill',
        desc: 'Chicken, beef, seafood and whole fish, seared over open flame.',
        anchorId: 'chicken',
        count: MENU.chicken.length + MENU.beef.length + MENU.seafood.length + MENU.wholeFish.length + MENU.vegetable.length
    },
    {
        seal: '鮨', native: '鮨', name: 'Sushi Bar',
        desc: 'Rolled, pressed, and torched — our sushi counter in full.',
        anchorId: 'sushi-half',
        count: MENU.sushi.length + MENU.sushiCombos.length + MENU.bento.length
    },
    {
        seal: '涼', native: '涼菓', name: 'Sweet & Cool',
        desc: 'Desserts and drinks to close the meal, or simply cool down.',
        anchorId: 'desserts',
        count: MENU.desserts.length + MENU.beverages.length
    }
];
