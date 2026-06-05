import type { EnrichedContext } from './ContextEngine';
import type { IntentResult } from './IntentParser';

export class PromptManager {
  public static generateResponse(
    intent: IntentResult,
    context: EnrichedContext,
    toolResults: Record<string, any>
  ): string {
    const name = context.customerName.split(' ')[0];

    switch (intent.intent) {
      case 'greet':
        return `Hello ${name}! Welcome back to LUXE. I've retrieved your luxury styling profile and sizes. Are we looking to update your everyday wardrobe, or are you packing for an upcoming trip or formal occasion?`;

      case 'cart':
        return `I've opened up your Shopping Bag. You have some stunning selections from Maison Laurent inside. Let me know if you would like to proceed with checkout or seek styling advice to complete the look.`;

      case 'wishlist':
        return `I've displayed your curated wishlist. These items match your style profile beautifully. Let me know if you would like to add any to your cart or check size availability.`;

      case 'checkout':
        return `Ready to secure your selections? I've assembled your checkout breakdown and validated your Gold tier loyalty discount. Let me know when you're ready to place the order.`;

      case 'quiz':
        return `Let's refine your style preferences! I've loaded our interactive Style Quiz. Tell me about your fits, color likes, and budget, and I'll tailor our recommendations perfectly to you.`;

      case 'outfit':
        return `I've created an exclusive capsule outfit combination for you. It mixes minimalist basics with statement outerwear from our boutique catalog, all matching your budget of £${context.activeBudget || 500}. How does this look?`;

      case 'orders':
        if (toolResults.orders && toolResults.orders.length > 0) {
          const recent = toolResults.orders[0];
          return `Hi ${name}, I've retrieved your order history. Your most recent order was **${recent.id}** placed on **${recent.date}** containing the **${recent.items[0].productName}**. It is currently marked as **${recent.status}**.`;
        }
        return `Hi ${name}, I've opened your order tracking details. I don't see any open order records. Can you confirm the order number you'd like me to track?`;

      case 'history':
        return `Here's a summary of your last 10 orders, ${name}. I've pulled details on the items, brands, and order statuses. Let me know if you'd like to repeat any past purchases or need assistance with returns or exchanges.`;

      case 'sale':
        return `Welcome to our Gold loyalty exclusive campaigns. I've fetched active promotions including code **GOLD15** (15% off) and **WARMTH50** for outerwear. Here are matching catalog items eligible for discounts!`;

      case 'search':
      default:
        if (context.activeLocation && toolResults.weather) {
          const w = toolResults.weather;
          const clothingRec = w.temperature < 5 ? 'heavy down parkas, cozy knitwear, and insulated snow boots' : 'breezy linens, sun hats, and lightweight slip dresses';
          return `I see you're preparing for a trip to **${w.location}**. The current temperature there is **${w.temperature}°C** with **${w.condition}** conditions. Based on this, I've curated a high-end capsule selection containing **${clothingRec}** matching your Gold loyalty size profile.`;
        }

        if (intent.category) {
          return `I've searched our premium catalog for the latest **${intent.category.toLowerCase()}**. I've prioritized items from Maison Laurent and Velvet & Stone within your size parameters. Let me know if you'd like to refine this by color, price, or material.`;
        }

        return `I've refreshed your personalized LUXE catalog with selections matching your preference profile. Browse through these or describe a specific outfit, vacation, or budget you have in mind!`;
    }
  }
}
