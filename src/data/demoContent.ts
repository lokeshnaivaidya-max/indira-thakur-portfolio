export interface DemoGalleryItem {
  id: string;
  src: string;
  alt: string;
  category: 'newborn' | 'maternity' | 'family' | 'baby' | 'couple' | 'portrait' | 'events';
  title: string;
  caption: string;
  featured?: boolean;
}

export const DEMO_HERO_SLIDES = [];

export const DEMO_GALLERY: DemoGalleryItem[] = [
  // NEWBORN (8)
  {
    id: 'nb-1',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    alt: 'Fine Art Newborn Storytelling',
    category: 'newborn',
    title: 'Peaceful Womb Pose',
    caption: 'Soft, organic newborn portraiture in natural studio light with silk wrap.',
    featured: true
  },
  {
    id: 'nb-2',
    src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1200',
    alt: 'Newborn Sleeping Lightly',
    category: 'newborn',
    title: 'Innocence Preserved',
    caption: 'Delicate fingers and peaceful slumber captured in warmth.',
    featured: true
  },
  {
    id: 'nb-3',
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Swaddled Newborn Miracle',
    category: 'newborn',
    title: 'The First Dawn',
    caption: 'Hand-knit organic blanket texture celebrating new life.'
  },
  {
    id: 'nb-4',
    src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200',
    alt: 'Peaceful Newborn Nest',
    category: 'newborn',
    title: 'Warmth of Sanctuary',
    caption: 'Minimalist studio setup highlighting tender newborn expressions.'
  },
  {
    id: 'nb-5',
    src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gentle Hands with Newborn',
    category: 'newborn',
    title: 'An Eternal Bond',
    caption: 'Father’s gentle hands cradling a newborn in serene light.'
  },
  {
    id: 'nb-6',
    src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    alt: 'Golden Hour Newborn Details',
    category: 'newborn',
    title: 'Quiet Whispers',
    caption: 'Macro portraiture focusing on tiny lashes and peaceful breath.'
  },
  {
    id: 'nb-7',
    src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200',
    alt: 'Cozy Organic Newborn Nest',
    category: 'newborn',
    title: 'Lullaby in Linen',
    caption: 'Natural tones and organic wool textures in quiet harmony.'
  },
  {
    id: 'nb-8',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Parent Cradling Newborn',
    category: 'newborn',
    title: 'First Heartbeats',
    caption: 'Raw emotional intimacy between mother and newborn.'
  },

  // MATERNITY (8)
  {
    id: 'mat-1',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luxury Maternity Photography',
    category: 'maternity',
    title: 'Silk & Solitude',
    caption: 'Couture silk drape maternity storytelling celebrating mothers in Bangalore.',
    featured: true
  },
  {
    id: 'mat-2',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    alt: 'Motherhood Serenity',
    category: 'maternity',
    title: 'Motherhood Divine',
    caption: 'Radiant motherhood portrait surrounded by natural warm light.',
    featured: true
  },
  {
    id: 'mat-3',
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200',
    alt: 'Sunset Maternity Glow',
    category: 'maternity',
    title: 'Golden Sanctuary',
    caption: 'Outdoor golden hour maternity commission at a scenic landscape.'
  },
  {
    id: 'mat-4',
    src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1200',
    alt: 'Minimalist Studio Maternity',
    category: 'maternity',
    title: 'Form & Feeling',
    caption: 'Editorial monochrome studio portraiture focusing on silhouette.'
  },
  {
    id: 'mat-5',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    alt: 'Ethereal Maternity Portrait',
    category: 'maternity',
    title: 'Ethereal Light',
    caption: 'Soft linen studio drapes enhancing natural maternal elegance.'
  },
  {
    id: 'mat-6',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Intimate Couple Maternity',
    category: 'maternity',
    title: 'Shared Anticipation',
    caption: 'Emotive couple portrait embracing the arrival of new life.'
  },
  {
    id: 'mat-7',
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Garden Maternity Dream',
    category: 'maternity',
    title: 'Floral Grace',
    caption: 'Sculptural gown surrounded by natural botanical elements.'
  },
  {
    id: 'mat-8',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    alt: 'Graceful Maternity Profile',
    category: 'maternity',
    title: 'Whispers of Grace',
    caption: 'Soft studio shadows accentuating the maternal form.'
  },

  // FAMILY (8)
  {
    id: 'fam-1',
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200',
    alt: 'Warm Outdoor Family Storytelling',
    category: 'family',
    title: 'Generations of Joy',
    caption: 'Unscripted, organic family connection under canopy of light.',
    featured: true
  },
  {
    id: 'fam-2',
    src: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Sunset Beach Family Memory',
    category: 'family',
    title: 'Coastal Embrace',
    caption: 'Candid laughter and warmth captured in golden sunset tide.'
  },
  {
    id: 'fam-3',
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1200',
    alt: 'Intergenerational Legacy',
    category: 'family',
    title: 'Roots & Heritage',
    caption: 'Timeless multi-generational portrait for family archives.'
  },
  {
    id: 'fam-4',
    src: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1200',
    alt: 'Laughter in the Meadows',
    category: 'family',
    title: 'Meadow Reverie',
    caption: 'Relaxed outdoor lifestyle session in Bangalore estate grounds.'
  },
  {
    id: 'fam-5',
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Home Studio Connection',
    category: 'family',
    title: 'Quiet Domesticity',
    caption: 'Natural, documentary family moments captured at home.'
  },
  {
    id: 'fam-6',
    src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
    alt: 'Parents holding children high',
    category: 'family',
    title: 'Unbound Happiness',
    caption: 'Joyful expressions captured during golden hour play.'
  },
  {
    id: 'fam-7',
    src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1200',
    alt: 'Brother & Sister Connection',
    category: 'family',
    title: 'Sibling Bonds',
    caption: 'Spontaneous affection and playful bond between children.'
  },
  {
    id: 'fam-8',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Legacy Family Group Portrait',
    category: 'family',
    title: 'The Legacy Collection',
    caption: 'Formal yet intimate family gathering in bespoke studio layout.'
  },

  // BABY (7)
  {
    id: 'bb-1',
    src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200',
    alt: 'Milestone Baby Portrait',
    category: 'baby',
    title: 'The First Year Milestone',
    caption: 'Expressive 6-month sitting session with natural wooden props.',
    featured: true
  },
  {
    id: 'bb-2',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Curious Toddler Gaze',
    category: 'baby',
    title: 'Wonder in Eyes',
    caption: 'Capturing innocent curiosity and pure soulfulness.'
  },
  {
    id: 'bb-3',
    src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1200',
    alt: 'Playful Baby Smile',
    category: 'baby',
    title: 'Giggles & Light',
    caption: 'Soft studio lighting bringing out joyful dimples and laughter.'
  },
  {
    id: 'bb-4',
    src: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=1200',
    alt: 'First Steps & Exploration',
    category: 'baby',
    title: 'First Discoveries',
    caption: 'Unscripted toddler milestone captures in natural surroundings.'
  },
  {
    id: 'bb-5',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Sleepy Baby Moment',
    category: 'baby',
    title: 'Soft Reverie',
    caption: 'Quiet afternoon studio session with organic textures.'
  },
  {
    id: 'bb-6',
    src: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&q=80&w=1200',
    alt: 'Interactive Baby Play',
    category: 'baby',
    title: 'Pure Delight',
    caption: 'Authentic emotion captured without artificial posing.'
  },
  {
    id: 'bb-7',
    src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1200',
    alt: 'One Year Cake Smash Elegance',
    category: 'baby',
    title: 'Year One Elegance',
    caption: 'Refined 1st birthday milestone portraiture.'
  },

  // COUPLE (7)
  {
    id: 'cpl-1',
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200',
    alt: 'Golden Hour Couple Embrace',
    category: 'couple',
    title: 'Sunset Harmony',
    caption: 'Quiet sunset walk in open fields showcasing tender companionship.',
    featured: true
  },
  {
    id: 'cpl-2',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Intimate Indoor Couple Portrait',
    category: 'couple',
    title: 'Whispered Promises',
    caption: 'Soft indoor studio light framing an intimate bond.'
  },
  {
    id: 'cpl-3',
    src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1200',
    alt: 'Editorial Engagement Story',
    category: 'couple',
    title: 'Two Hearts Intertwined',
    caption: 'Fine art engagement shoot at historic architecture.'
  },
  {
    id: 'cpl-4',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    alt: 'Romantic Evening Stroll',
    category: 'couple',
    title: 'Dusk Elegance',
    caption: 'Cinematic dusk lighting creating romantic silhouette.'
  },
  {
    id: 'cpl-5',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Classic Anniversary Portrait',
    category: 'couple',
    title: 'Decades of Love',
    caption: 'Celebrating decades of shared joy with fine art portraits.'
  },
  {
    id: 'cpl-6',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    alt: 'Laughter Under Trees',
    category: 'couple',
    title: 'Serenade in Green',
    caption: 'Unscripted laughter among lush Bangalore botanical gardens.'
  },
  {
    id: 'cpl-7',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    alt: 'Soft Light Couple Romance',
    category: 'couple',
    title: 'Tender Reflections',
    caption: 'Timeless portraiture capturing romance without noise.'
  },

  // PORTRAIT (7)
  {
    id: 'prt-1',
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200',
    alt: 'Editorial Fine Art Portrait',
    category: 'portrait',
    title: 'Painterly Reverie',
    caption: 'Soulful fine art portraiture with painterly light and shadow.',
    featured: true
  },
  {
    id: 'prt-2',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    alt: 'High Fashion Fine Art',
    category: 'portrait',
    title: 'Solitude & Serenity',
    caption: 'Editorial studio composition with rich tonality.'
  },
  {
    id: 'prt-3',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    alt: 'Classic Character Portrait',
    category: 'portrait',
    title: 'Depth of Soul',
    caption: 'Intimate monochrome portrait highlighting human depth.'
  },
  {
    id: 'prt-4',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Natural Window Light Portrait',
    category: 'portrait',
    title: 'Morning Solace',
    caption: 'Natural window light streaming onto warm linen.'
  },
  {
    id: 'prt-5',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luminous Personal Portrait',
    category: 'portrait',
    title: 'Quiet Confidence',
    caption: 'Fine art personal branding and legacy portraiture.'
  },
  {
    id: 'prt-6',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Moody Fine Art Portrait',
    category: 'portrait',
    title: 'Chiaroscuro Reflection',
    caption: 'Classic Rembrandt lighting setup in studio environment.'
  },
  {
    id: 'prt-7',
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Artist Self Reflection',
    category: 'portrait',
    title: 'The Musings',
    caption: 'Contemplative creative portrait session.'
  },

  // EVENTS (6)
  {
    id: 'evt-1',
    src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1200',
    alt: 'Celebration Event',
    category: 'events',
    title: 'Milestone Soiree',
    caption: 'Cinematic documentary coverage of bespoke family celebrations.',
    featured: true
  },
  {
    id: 'evt-2',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luxury Celebration Table',
    category: 'events',
    title: 'Grand Occasion',
    caption: 'Atmospheric detail captures at luxury milestone events.'
  },
  {
    id: 'evt-3',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200',
    alt: 'First Birthday Soiree',
    category: 'events',
    title: 'Year One Soiree',
    caption: 'Curated editorial coverage for intimate milestone birthdays.'
  },
  {
    id: 'evt-4',
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1200',
    alt: 'Candid Joyful Toast',
    category: 'events',
    title: 'Toasts & Memories',
    caption: 'Authentic emotional reactions during family speeches.'
  },
  {
    id: 'evt-5',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
    alt: 'Floral Aesthetics & Decor',
    category: 'events',
    title: 'Editorial Details',
    caption: 'Fine art event styling and architectural ambient light.'
  },
  {
    id: 'evt-6',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    alt: 'Twilight Celebration',
    category: 'events',
    title: 'Under Starlight',
    caption: 'Ambient outdoor celebration lighting captured with cinematic flair.'
  }
];

export const DEMO_ABOUT_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    alt: 'Indira Thakur Studio Portrait'
  },
  {
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Artist Behind the Lens'
  },
  {
    url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Studio Space in Bangalore'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'Indira has an extraordinary gift. She handled our 7-day-old baby girl with such tenderness and reverence. The photographs hanging in our living room look like museum masterpieces.',
    author: 'Aanya & Vikram Sharma',
    role: 'Newborn Session · Bangalore',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 't-2',
    quote: 'My maternity session was one of the most empowering days of my life. Indira created a tranquil sanctuary where I felt like a goddess. The silk drape portraits are breathtaking.',
    author: 'Priya Mukherjee',
    role: 'Maternity Commission · Indiranagar',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 't-3',
    quote: 'Our family session with Indira was completely unhurried and relaxed. She captured our kids’ genuine giggles and quiet moments without any rigid posing. A true heirloom.',
    author: 'Rohan & Sunita Reddy',
    role: 'Family Legacy Session · Sadashivanagar',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  }
];

export const DEMO_SERVICES = [
  {
    id: 'newborn',
    slug: 'newborn',
    title: 'Newborn Fine Art',
    subtitle: 'The Sacred First Days',
    description: 'Conducted within 5–14 days in our serene climate-controlled Bangalore studio. Includes hand-knit organic wraps, silk swaddles, and guided direction.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Preserving the quiet innocence of new beginnings.',
    features: [
      '3-4 hours of unhurried, baby-led studio time',
      'Curated organic props, wraps & hand-knit blankets',
      'Private proofing gallery + 25 master retouched files',
      'Handcrafted linen box keepsake'
    ]
  },
  {
    id: 'maternity',
    slug: 'maternity',
    title: 'Couture Maternity',
    subtitle: 'Goddess & Grace',
    description: 'Celebrating the divine form of motherhood. Access our studio wardrobe of couture gowns, silk drapes, and ethereal lighting setups.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Embracing the sacred journey into motherhood.',
    features: [
      'Access to exclusive studio wardrobe & couture drapes',
      'Partner & sibling inclusions welcomed',
      'Studio or golden hour outdoor scenic location',
      '20 fine art retouched high-res portraits'
    ]
  },
  {
    id: 'family',
    slug: 'family',
    title: 'Family & Legacy',
    subtitle: 'Unscripted Connection',
    description: 'Capturing generational warmth, authentic laughter, and quiet affection without rigid artificial poses.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200',
    tagline: 'A living archive of your family’s love story.',
    features: [
      '90 minutes of organic storytelling',
      'Choice of home sanctuary or scenic outdoors',
      'Styling consultation & color palette guide',
      '30 retouched high-resolution digital heirlooms'
    ]
  },
  {
    id: 'portrait',
    slug: 'portrait',
    title: 'Fine Art Portraiture',
    subtitle: 'Soul & Depth',
    description: 'Classic painterly portraiture for personal branding, creative reflections, or celebrating milestone anniversaries.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Chiaroscuro lighting for timeless human emotion.',
    features: [
      'Professional wardrobe & makeup styling direction',
      'Chiaroscuro lighting & bespoke backdrop design',
      '15 museum-grade retouched portraits',
      'Museum archival print credit included'
    ]
  },
  {
    id: 'events',
    slug: 'events',
    title: 'Editorial Celebrations',
    subtitle: 'Cinematic Milestones',
    description: 'Discreet, high-end documentary coverage for milestone birthdays, intimate baby showers, and family anniversaries.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Preserving the soul of your most grand gatherings.',
    features: [
      'Full documentary coverage by Indira Thakur',
      'Architectural & detail vignette portraiture',
      'Online password-protected guest gallery',
      'Curated leather-bound coffee table album'
    ]
  }
];
