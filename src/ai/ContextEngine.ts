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

    // Update context properties, clearing them if not present in the new intent
    this.context.activeLocation = intentResult.location || undefined;
    this.context.activeSeason = intentResult.season || undefined;
    this.context.activeOccasion = intentResult.occasion || undefined;
    this.context.activeBudget = intentResult.budget || undefined;

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
