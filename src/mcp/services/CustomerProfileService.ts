import { defaultCustomer } from '../../data/customers';
import type { CustomerProfile, StylePreferences, SizeProfile } from '../../types/customer';

export class CustomerProfileService {
  public static getCustomerProfile(args: { customerId: string }): CustomerProfile | undefined {
    if (args.customerId === defaultCustomer.profile.id) {
      return defaultCustomer.profile;
    }
    return undefined;
  }

  public static getPreferences(args: { customerId: string }): StylePreferences | undefined {
    if (args.customerId === defaultCustomer.profile.id) {
      return defaultCustomer.preferences;
    }
    return undefined;
  }

  public static getSavedSizes(args: { customerId: string }): SizeProfile | undefined {
    if (args.customerId === defaultCustomer.profile.id) {
      return defaultCustomer.sizes;
    }
    return undefined;
  }
}
