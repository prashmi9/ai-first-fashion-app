export interface IntentResult {
  intent: string;
  category?: string;
  season?: string;
  budget?: number;
  location?: string;
  occasion?: string;
  brand?: string;
  size?: string;
  keywords: string[];
  confidence: number;
}

export class IntentParser {
  public static parse(input: string): IntentResult {
    const text = input.toLowerCase();
    const keywords: string[] = [];
    let intent = 'search'; // Default intent
    let confidence = 0.5;

    // Detect high level intents
    if ( text.includes('hello') || text.includes('hey')) {
      intent = 'greet';
      confidence = 0.8;
    } else if (text.includes('cart') || text.includes('basket') || text.includes('shopping bag')) {
      intent = 'cart';
      confidence = 0.9;
    } else if (text.includes('wishlist') || text.includes('favorites') || text.includes('liked')) {
      intent = 'wishlist';
      confidence = 0.9;
    } else if (text.includes('checkout') || text.includes('buy') || text.includes('purchase')) {
      intent = 'checkout';
      confidence = 0.85;
    } else if (text.includes('outfit') || text.includes('build an outfit') || text.includes('look') || text.includes('style a look') || text.includes('wardrobe')) {
      intent = 'outfit';
      confidence = 0.9;
    } else if (text.includes('quiz') || text.includes('style profile') || text.includes('questions')) {
      intent = 'quiz';
      confidence = 0.95;
    } else if (text.includes('history') || text.includes('order history') || text.includes('last orders') || text.includes('delivered')) {
      intent = 'history';
      confidence = 0.9;
    } else if (text.includes('order') || text.includes('purchased') || text.includes('tracking') || text.includes('package') || text.includes('track')) {
      intent = 'orders';
      confidence = 0.9;
    } else if (text.includes('sale') || text.includes('promo') || text.includes('discount') || text.includes('coupon') || text.includes('campaign')) {
      intent = 'sale';
      confidence = 0.9;
    }

    // Category extraction
    let category: string | undefined;
    if (text.includes('coat') || text.includes('parka') || text.includes('puffer') || text.includes('jacket') || text.includes('outerwear')) {
      category = 'Outerwear';
    } else if (text.includes('sweater') || text.includes('knitwear') || text.includes('turtleneck') || text.includes('crewneck') || text.includes('cardigan')) {
      category = 'Knitwear';
    } else if (text.includes('dress') || text.includes('gown') || text.includes('frock')) {
      category = 'Dresses';
    } else if (text.includes('shirt') || text.includes('blouse') || text.includes('tee') || text.includes('top')) {
      category = 'Tops';
    } else if (text.includes('pants') || text.includes('trouser') || text.includes('jeans') || text.includes('bottoms')) {
      category = 'Bottoms';
    } else if (text.includes('boots') || text.includes('shoes') || text.includes('sneakers') || text.includes('footwear')) {
      category = 'Footwear';
    } else if (text.includes('scarf') || text.includes('bag') || text.includes('duffle') || text.includes('gloves') || text.includes('accessories')) {
      category = 'Accessories';
    }

    // Season extraction
    let season: string | undefined;
    if (text.includes('winter') || text.includes('snow') || text.includes('cold') || text.includes('ice') || text.includes('freezing')) {
      season = 'winter';
    } else if (text.includes('summer') || text.includes('beach') || text.includes('hot') || text.includes('warm') || text.includes('sun')) {
      season = 'summer';
    } else if (text.includes('autumn') || text.includes('fall') || text.includes('cool')) {
      season = 'autumn';
    } else if (text.includes('spring') || text.includes('bloom')) {
      season = 'spring';
    }

    // Budget extraction (e.g. €500, under 100, budget is 250)
    let budget: number | undefined;
    const priceRegexes = [
      /[€$]?\b(\d+)\b\s*(euro|budget)?/i,
      /under\s*[€$]?\b(\d+)\b/i,
      /budget\s*(?:is|of)?\s*[€$]?\b(\d+)\b/i
    ];

    for (const regex of priceRegexes) {
      const match = text.match(regex);
      if (match && match[1]) {
        const val = parseInt(match[1], 10);
        if (val > 0 && val < 5000) {
          budget = val;
          break;
        }
      }
    }

    // Location extraction
    let location: string | undefined;
    const locations = ['finland', 'iceland', 'norway', 'spain', 'paris', 'london', 'oslo', 'reykjavik'];
    for (const loc of locations) {
      if (text.includes(loc)) {
        location = loc;
        break;
      }
    }

    // Occasion extraction
    let occasion: string | undefined;
    if (text.includes('wedding') || text.includes('marriage')) {
      occasion = 'wedding';
    } else if (text.includes('formal') || text.includes('black tie') || text.includes('gala')) {
      occasion = 'formal';
    } else if (text.includes('work') || text.includes('office') || text.includes('interview') || text.includes('business')) {
      occasion = 'business';
    } else if (text.includes('holiday') || text.includes('trip') || text.includes('vacation') || text.includes('travel')) {
      occasion = 'holiday';
    } else if (text.includes('outdoor') || text.includes('hike') || text.includes('hiking')) {
      occasion = 'outdoor';
    } else if (text.includes('evening') || text.includes('party') || text.includes('night out') || text.includes('dinner')) {
      occasion = 'evening';
    } else if (text.includes('casual') || text.includes('everyday') || text.includes('daily')) {
      occasion = 'casual';
    }

    // Brand extraction
    let brand: string | undefined;
    if (text.includes('laurent') || text.includes('maison')) {
      brand = 'Maison Laurent';
    } else if (text.includes('nordic') || text.includes('trail')) {
      brand = 'Nordic Trail';
    } else if (text.includes('velvet') || text.includes('stone')) {
      brand = 'Velvet & Stone';
    }

    // Collect keywords
    text.split(/\s+/).forEach(word => {
      const clean = word.replace(/[^a-z0-9]/g, '');
      if (clean.length > 3 && !['need', 'want', 'show', 'find', 'some', 'look', 'what', 'wear'].includes(clean)) {
        keywords.push(clean);
      }
    });

    return {
      intent,
      category,
      season,
      budget,
      location,
      occasion,
      brand,
      keywords,
      confidence
    };
  }
}
