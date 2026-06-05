import { defaultCustomer } from '../data/customers';
import type { StylePreferences, SizeProfile } from '../types/customer';
import type { IntentResult } from './IntentParser';

export interface EnrichedContext {
  customerId: string;
  customerName: string;
  intent: string;
  preferences: StylePreferences;
  sizes: SizeProfile;
  activeLocation?: string;
  activeSeason?: string;
  activeOccasion?: string;
  activeBudget?: number;
}

export class ContextEngine {
  private static context: EnrichedContext = {
    customerId: defaultCustomer.profile.id,
    customerName: defaultCustomer.profile.name,
    intent: 'greet',
    preferences: { ...defaultCustomer.preferences },
    sizes: { ...defaultCustomer.sizes }
  };

  public static updateFromIntent(intentResult: IntentResult): EnrichedContext {
    this.context.intent = intentResult.intent;

    if (intentResult.location) {
      this.context.activeLocation = intentResult.location;
    }
    if (intentResult.season) {
      this.context.activeSeason = intentResult.season;
    }
    if (intentResult.occasion) {
      this.context.activeOccasion = intentResult.occasion;
    }
    if (intentResult.budget) {
      this.context.activeBudget = intentResult.budget;
    }

    // Proactively align preferences if brand or keywords represent favorites
    if (intentResult.brand && !this.context.preferences.favoriteBrands.includes(intentResult.brand)) {
      this.context.preferences.favoriteBrands.push(intentResult.brand);
    }

    return this.context;
  }

  public static getEnrichedContext(): EnrichedContext {
    return this.context;
  }

  public static resetContext(): void {
    this.context = {
      customerId: defaultCustomer.profile.id,
      customerName: defaultCustomer.profile.name,
      intent: 'greet',
      preferences: { ...defaultCustomer.preferences },
      sizes: { ...defaultCustomer.sizes }
    };
  }
}
