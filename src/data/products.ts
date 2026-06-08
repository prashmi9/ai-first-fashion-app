import type { Product } from '../types/product';

export const products: Product[] = [
  // OUTERWEAR (1-8)
  {
    id: 'out-1',
    name: 'Nordic Expedition Parka',
    brand: 'Nordic Trail',
    category: 'Outerwear',
    subcategory: 'Coats',
    price: 245.00,
    originalPrice: 295.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true },
      { label: 'XL', value: 'xl', inStock: false }
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0f172a' },
      { name: 'Forest Green', hex: '#14532d' }
    ],
    images: ['/src/assets/products-img/Nordic-Parka.jpg'],
    description: 'Heavyweight down parka designed to withstand temperatures down to -25°C. Features a water-resistant shell and deep utility pockets.',
    material: '85% Polyester, 15% Down Fill',
    seasons: ['winter',],
    occasions: ['outdoor', 'casual',],
    gender: 'unisex',
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    tags: ['heavyweight', 'down', 'waterproof'],
    isBestseller: true
  },
  {
    id: 'out-2',
    name: 'Stowe Puffer Jacket',
    brand: 'Nordic Trail',
    category: 'Outerwear',
    subcategory: 'Coats',
    price: 180.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#e8c99b' },
      { name: 'Silver Slate', hex: '#64748b' }
    ],
    images: ['/src/assets/products-img/stowe-puffer-jacket.jpeg'],
    description: 'Ultra-lightweight yet incredibly warm packable puffer jacket. Made from recycled nylon with synthetic thermal filling.',
    material: '100% Recycled Nylon',
    seasons: ['winter', ],
    occasions: ['casual', 'outdoor',],
    gender: 'women',
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    tags: ['lightweight', 'packable', 'eco-friendly'],
    isNew: true
  },
  {
    id: 'out-3',
    name: 'Classic Double-Breasted Trench',
    brand: 'Maison Laurent',
    category: 'Outerwear',
    subcategory: 'Coats',
    price: 320.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Traditional Camel', hex: '#c5a880' },
      { name: 'Obsidian Black', hex: '#000000' }
    ],
    images: ['/src/assets/products-img/Classic-trench.jpg'],
    description: 'A timeless silhouette made with rain-repellent gabardine. Features horn buttons, a buckled belt, and heritage storm flaps.',
    material: '100% Cotton Gabardine',
    seasons: ['autumn', ],
    occasions: ['formal', 'business'],
    gender: 'women',
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    tags: ['timeless', 'water-resistant', 'tailored']
  },
  {
    id: 'out-4',
    name: 'Suede Biker Jacket',
    brand: 'Velvet & Stone',
    category: 'Outerwear',
    subcategory: 'Coats',
    price: 275.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#8b7a6b' },
      { name: 'Rusty Amber', hex: '#b45309' }
    ],
    images: ['/src/assets/products-img/suede-jacket.jpg'],
    description: 'Supple goat suede jacket with silver-tone asymmetrical zip hardware and adjustable belt. Soft satin inner lining.',
    material: '100% Goat Suede',
    seasons: ['autumn',],
    occasions: ['casual', 'evening'],
    gender: 'men',
    rating: 4.7,
    reviewCount: 34,
    inStock: true,
    tags: ['leather', 'premium', 'streetwear']
  },
  {
    id: 'out-5',
    name: 'Alpine Shearling Aviator',
    brand: 'Velvet & Stone',
    category: 'Outerwear',
    subcategory: 'Coats',
    price: 450.00,
    originalPrice: 495.00,
    currency: '€',
    sizes: [
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true },
      { label: 'XL', value: 'xl', inStock: true }
    ],
    colors: [
      { name: 'Dark Espresso', hex: '#2d1a10' }
    ],
    images: ['/src/assets/products-img/Alpine-Shearling-Aviator.jpeg'],
    description: 'An outstanding luxury coat featuring genuine sheep shearling lining. Extremely insulated and structured for cold winter months.',
    material: '100% Sheepskin Leather & Shearling',
    seasons: ['winter'],
    occasions: ['casual', 'evening', 'outdoor'],
    gender: 'unisex',
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    tags: ['luxury', 'warmest', 'shearling'],
    isBestseller: true
  },

  // KNITWEAR (9-16)
  {
    id: 'knit-1',
    name: 'Merino Wool Turtleneck',
    brand: 'Maison Laurent',
    category: 'Knitwear',
    subcategory: 'Sweaters',
    price: 85.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true },
      { label: 'XL', value: 'xl', inStock: true }
    ],
    colors: [
      { name: 'Off-White', hex: '#f8fafc' },
      { name: 'Slate Gray', hex: '#475569' },
      { name: 'Burgundy', hex: '#7f1d1d' }
    ],
    images: ['/src/assets/products-img/wool-turtle-neck.jpeg'],
    description: 'Finely spun extra-fine Merino wool sweater. Exceptionally soft and temperature-regulating, perfect for layering.',
    material: '100% Merino Wool',
    seasons: ['winter',],
    occasions: ['business', 'casual', 'formal'],
    gender: 'men',
    rating: 4.5,
    reviewCount: 110,
    inStock: true,
    tags: ['merino', 'soft', 'layering']
  },
  {
    id: 'knit-2',
    name: 'Oversized Cashmere Crewneck',
    brand: 'Velvet & Stone',
    category: 'Knitwear',
    subcategory: 'Sweaters',
    price: 185.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: false }
    ],
    colors: [
      { name: 'Oatmeal', hex: '#e2d6c5' },
      { name: 'Soft Sage', hex: '#94a3b8' }
    ],
    images: ['/src/assets/products-img/cashmere-crew-neck.webp'],
    description: 'Luxurious grade-A cashmere knit with a relaxed oversized fit, dropped shoulders, and chunky ribbed trims.',
    material: '100% Cashmere',
    seasons: ['winter',],
    occasions: ['casual', 'holiday'],
    gender: 'women',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    tags: ['cashmere', 'luxury', 'oversized'],
    isBestseller: true
  },
  {
    id: 'knit-3',
    name: 'Cable-Knit Mock Neck',
    brand: 'Nordic Trail',
    category: 'Knitwear',
    subcategory: 'Sweaters',
    price: 95.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Forest Moss', hex: '#22402b' },
      { name: 'Earthy Clay', hex: '#995a3a' }
    ],
    images: ['/src/assets/products-img/cable-knit-mock-neck.jpeg'],
    description: 'Chunky traditional fisherman-style cable knit sweater with an elegant mock collar for extra wind protection.',
    material: '80% Wool, 20% Alpaca',
    seasons: ['winter', ],
    occasions: ['outdoor', 'casual'],
    gender: 'unisex',
    rating: 4.7,
    reviewCount: 47,
    inStock: true,
    tags: ['chunky', 'wool', 'outdoor']
  },

  // DRESSES (17-24)
  {
    id: 'dress-1',
    name: 'Velvet Slip Midi Dress',
    brand: 'Velvet & Stone',
    category: 'Dresses',
    subcategory: 'Evening',
    price: 110.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Deep Emerald', hex: '#064e3b' },
      { name: 'Ruby Wine', hex: '#4c0519' }
    ],
    images: ['/src/assets/products-img/velvet-midi-dress.jpeg'],
    description: 'An elegant cowl neck slip dress made of rich velvet with a subtle side slit. Fully adjustable cross-back spaghetti straps.',
    material: '92% Polyester, 8% Elastane',
    seasons: ['winter', 'autumn'],
    occasions: ['evening', 'wedding', 'formal'],
    gender: 'women',
    rating: 4.6,
    reviewCount: 71,
    inStock: true,
    tags: ['velvet', 'glamour', 'cowl-neck']
  },
  {
    id: 'dress-2',
    name: 'Linen Belted Shirt Dress',
    brand: 'Maison Laurent',
    category: 'Dresses',
    subcategory: 'Casual',
    price: 125.00,
    originalPrice: 150.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Sand Dune', hex: '#d7c7b7' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    images: ['/src/assets/products-img/linen-shirt-dress.webp'],
    description: 'Breathable lightweight linen shirt dress. Features chest utility pockets, a self-tie belt, and roll-up sleeves.',
    material: '100% Pure Organic Linen',
    seasons: ['summer', 'spring'],
    occasions: ['casual', 'holiday'],
    gender: 'women',
    rating: 4.4,
    reviewCount: 39,
    inStock: true,
    tags: ['linen', 'breathable', 'casual', 'belted'],
    isNew: true
  },
  {
    id: 'dress-3',
    name: 'Silk Evening Gown',
    brand: 'Maison Laurent',
    category: 'Dresses',
    subcategory: 'Evening',
    price: 395.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true }
    ],
    colors: [
      { name: 'Royal Gold', hex: '#d4a574' },
      { name: 'Champagne Pearl', hex: '#f5efe6' }
    ],
    images: ['/src/assets/products-img/silk-evening-gown.jpg'],
    description: 'Exquisite heavy-weight mulberry silk evening dress with a draped cowl neckline and a sweep train.',
    material: '100% Mulberry Silk',
    seasons: ['summer', 'spring', 'autumn'],
    occasions: ['formal', 'wedding', 'evening'],
    gender: 'women',
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    tags: ['silk', 'luxurious', 'gown', 'draped'],
    isNew: true
  },
  {
    id: 'dress-4',
    name: 'Summer Blue Geometric Dress',
    brand: 'Maison Laurent',
    category: 'Dresses',
    subcategory: 'Day',
    price: 195.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true }
    ],
    colors: [
      { name: 'White Cotton', hex: '#fcfcfc' },
      { name: 'Blue', hex: '#7e7ebe' }
    ],
    images: ['/src/assets/products-img/summer-dress.webp'],
    description: 'Exquisite cotton dress with a relaxed fit and a flattering silhouette.',
    material: '100% Cotton',
    seasons: ['summer', 'spring', 'autumn'],
    occasions: ['holiday', 'casual', 'business'],
    gender: 'women',
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    tags: ['cotton', 'relaxed', 'flattering'],
    isNew: true
  },
  {
    id: 'dress-5',
    name: 'Summer Vertical Line Dress',
    brand: 'Maison Laurent',
    category: 'Dresses',
    subcategory: 'Day',
    price: 105.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true }
    ],
    colors: [
      { name: 'White Cotton', hex: '#fcfcfc' },
      { name: 'Blue', hex: '#7e7ebe' }
    ],
    images: ['/src/assets/products-img/summer-dress2.webp'],
    description: 'Exquisite cotton dress with a relaxed fit and a flattering silhouette.',
    material: '100% Cotton',
    seasons: ['summer', 'spring', 'autumn'],
    occasions: ['formal', 'holiday', 'business'],
    gender: 'women',
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    tags: ['cotton', 'relaxed', 'flattering'],
    isNew: true
  },

  // TOPS & SHIRTS (25-32)
  {
    id: 'top-1',
    name: 'Structured Cotton Oxford',
    brand: 'Maison Laurent',
    category: 'Tops',
    subcategory: 'Shirts',
    price: 65.00,
    currency: '€',
    sizes: [
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true },
      { label: 'XL', value: 'xl', inStock: true }
    ],
    colors: [
      { name: 'Classic Light Blue', hex: '#bfdbfe' },
      { name: 'Bright White', hex: '#ffffff' }
    ],
    images: ['/src/assets/products-img/cotton-oxford-shirt.jpeg'],
    description: 'Crisp oxford cotton shirt with button-down collar and tailored chest pocket. Pre-shrunk and easy to iron.',
    material: '100% Egyptian Cotton',
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    occasions: [ 'casual'],
    gender: 'men',
    rating: 4.6,
    reviewCount: 130,
    inStock: true,
    tags: ['essential', 'oxford', 'business']
  },
  {
    id: 'top-2',
    name: 'Silk Utility Blouse',
    brand: 'Maison Laurent',
    category: 'Tops',
    subcategory: 'Shirts',
    price: 135.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#fefefe' },
      { name: 'Blush Pink', hex: '#fbcfe8' }
    ],
    images: ['/src/assets/products-img/silky-utility-blouse.jpeg'],
    description: 'A luxurious crepe de chine silk blouse featuring front button closures, two flap pockets, and button-cuff long sleeves.',
    material: '100% Silk Crepe',
    seasons: ['spring', 'autumn', 'summer'],
    occasions: ['business', 'formal', 'evening'],
    gender: 'women',
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    tags: ['silk', 'elegant', 'professional']
  },

  // BOTTOMS (33-40)
  {
    id: 'bottom-1',
    name: 'Tailored Wool Trousers',
    brand: 'Maison Laurent',
    category: 'Bottoms',
    subcategory: 'Trousers',
    price: 120.00,
    currency: '€',
    sizes: [
      { label: '30W', value: '30', inStock: true },
      { label: '32W', value: '32', inStock: true },
      { label: '34W', value: '34', inStock: true },
      { label: '36W', value: '36', inStock: true }
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#334155' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    images: ['/src/assets/products-img/wool-pants.jpeg'],
    description: 'Expertly tailored flat-front trousers with crease detailing down the legs. Hook-and-bar zip fastening, and belt loops.',
    material: '90% Wool, 10% Cashmere Blend',
    seasons: ['winter', 'autumn', 'spring'],
    occasions: ['business', 'formal'],
    gender: 'men',
    rating: 4.7,
    reviewCount: 68,
    inStock: true,
    tags: ['wool', 'tailored', 'creased']
  },
  {
    id: 'bottom-2',
    name: 'Wide-Leg Pleated Pants',
    brand: 'Velvet & Stone',
    category: 'Bottoms',
    subcategory: 'Trousers',
    price: 90.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Earthy Sand', hex: '#dcd0c0' },
      { name: 'Deep Sage', hex: '#526e5b' }
    ],
    images: ['/src/assets/products-img/wide-leg-pleated-pants.jpeg'],
    description: 'High-waisted wide-leg trousers featuring dramatic front pleats, slant side pockets, and an elasticated back waist for comfort.',
    material: '70% Tencel, 30% Linen',
    seasons: ['spring', 'summer'],
    occasions: ['casual', 'business'],
    gender: 'women',
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    tags: ['pleated', 'high-waisted', 'tencel'],
    isBestseller: true
  },
  {
    id: 'bottom-3',
    name: 'Wide-Leg Linen trouser',
    brand: 'Velvet & Stone',
    category: 'Bottoms',
    subcategory: 'Trousers',
    price: 90.00,
    currency: '€',
    sizes: [
      { label: 'XS', value: 'xs', inStock: true },
      { label: 'S', value: 's', inStock: true },
      { label: 'M', value: 'm', inStock: true },
      { label: 'L', value: 'l', inStock: true }
    ],
    colors: [
      { name: 'Earthy Sand', hex: '#dcd0c0' },
      { name: 'Deep Sage', hex: '#526e5b' }
    ],
    images: ['/src/assets/products-img/wide-leg-linen-trousers.webp'],
    description: 'High-waisted wide-leg trousers featuring dramatic front pleats, slant side pockets, and an elasticated back waist for comfort.',
    material: '70% Tencel, 30% Linen',
    seasons: [ 'summer'],
    occasions: [ 'business', 'casual',],
    gender: 'women',
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    tags: ['pleated', 'high-waisted', 'tencel'],
    isBestseller: true
  },

  // FOOTWEAR (41-48)
  {
    id: 'foot-1',
    name: 'Chelsea Leather Boots',
    brand: 'Velvet & Stone',
    category: 'Footwear',
    subcategory: 'Boots',
    price: 160.00,
    originalPrice: 195.00,
    currency: '€',
    sizes: [
      { label: 'EU 40', value: '40', inStock: true },
      { label: 'EU 41', value: '41', inStock: true },
      { label: 'EU 42', value: '42', inStock: true },
      { label: 'EU 43', value: '43', inStock: true },
      { label: 'EU 44', value: '44', inStock: false }
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#7c2d12' },
      { name: 'Jet Black', hex: '#0a0a0c' }
    ],
    images: ['/src/assets/products-img/leather-boots.jpeg'],
    description: 'Handcrafted premium full-grain Italian leather Chelsea boots. Dynamic elasticated side panels and pull-tabs.',
    material: '100% Italian Calf Leather',
    seasons: ['winter', 'autumn', 'spring'],
    occasions: ['casual', 'evening', 'business'],
    gender: 'men',
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    tags: ['italian-leather', 'chelsea', 'handmade'],
    isBestseller: true
  },
  {
    id: 'foot-2',
    name: 'Sherpa-Lined Snow Boots',
    brand: 'Nordic Trail',
    category: 'Footwear',
    subcategory: 'Boots',
    price: 130.00,
    currency: '€',
    sizes: [
      { label: 'EU 37', value: '37', inStock: true },
      { label: 'EU 38', value: '38', inStock: true },
      { label: 'EU 39', value: '39', inStock: true },
      { label: 'EU 40', value: '40', inStock: true },
      { label: 'EU 41', value: '41', inStock: true }
    ],
    colors: [
      { name: 'Snow Cream / White', hex: '#f1f5f9' },
      { name: 'Tundra Grey', hex: '#4b5563' }
    ],
    images: ['/src/assets/products-img/snow-boots.jpeg'],
    description: 'Fully waterproof snow boots featuring thick insulation, soft faux-sherpa lining, and a rugged rubber grip outsole.',
    material: 'Waterproof Nylon, Faux Shearling lining, Rubber sole',
    seasons: ['winter'],
    occasions: ['outdoor', 'holiday'],
    gender: 'unisex',
    rating: 4.9,
    reviewCount: 76,
    inStock: true,
    tags: ['waterproof', 'sherpa', 'winter-trip', 'insulated'],
    isBestseller: true
  },

  // ACCESSORIES (49-56)
  {
    id: 'acc-1',
    name: 'Ribbed Cashmere Scarf',
    brand: 'Velvet & Stone',
    category: 'Accessories',
    subcategory: 'Scarves',
    price: 75.00,
    currency: '€',
    sizes: [
      { label: 'One Size', value: 'os', inStock: true }
    ],
    colors: [
      { name: 'Oatmeal', hex: '#e2d6c5' },
      { name: 'Burgundy', hex: '#7f1d1d' },
      { name: 'Charcoal', hex: '#334155' }
    ],
    images: ['/src/assets/products-img/cashmere-scarf.jpeg'],
    description: 'Generously sized, ribbed scarf knit from ultra-soft Mongolian cashmere. Adds perfect texture and cozy comfort.',
    material: '100% Cashmere',
    seasons: ['winter', 'autumn'],
    occasions: ['casual', 'outdoor', 'holiday'],
    gender: 'unisex',
    rating: 4.7,
    reviewCount: 83,
    inStock: true,
    tags: ['cashmere', 'soft', 'cozy', 'winter-essential']
  },
  {
    id: 'acc-3',
    name: 'Sun Hat with Wide Brim',
    brand: 'Maison Laurent',
    category: 'Accessories',
    subcategory: 'hats',
    price: 160.00,
    currency: '€',
    sizes: [
      { label: 'One Size', value: 'os', inStock: true }
    ],
    colors: [
      { name: 'Vintage Mahogany', hex: '#451a03' }
    ],
    images: ['/src/assets/products-img/sun-hat.webp'],
    description: 'Sun hat with a wide brim for maximum sun protection.',
    material: '100% Straw',
    seasons: [ 'summer',],
    occasions: ['holiday', 'casual'],
    gender: 'unisex',
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    tags: ['travel', 'hats', 'straw'],
    isNew: true
  },
  {
    id: 'acc-1',
    name: 'Ribbed Cashmere Scarf',
    brand: 'Velvet & Stone',
    category: 'Accessories',
    subcategory: 'Scarves',
    price: 75.00,
    currency: '€',
    sizes: [
      { label: 'One Size', value: 'os', inStock: true }
    ],
    colors: [
      { name: 'Oatmeal', hex: '#e2d6c5' },
      { name: 'Burgundy', hex: '#7f1d1d' },
      { name: 'Charcoal', hex: '#334155' }
    ],
    images: ['/src/assets/products-img/cashmere-scarf.jpeg'],
    description: 'Generously sized, ribbed scarf knit from ultra-soft Mongolian cashmere. Adds perfect texture and cozy comfort.',
    material: '100% Cashmere',
    seasons: ['winter', 'autumn'],
    occasions: ['casual', 'outdoor', 'holiday'],
    gender: 'unisex',
    rating: 4.7,
    reviewCount: 83,
    inStock: true,
    tags: ['cashmere', 'soft', 'cozy', 'winter-essential']
  },
];
