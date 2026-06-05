import { products } from '../../data/products';
import type { Product } from '../../types/product';
import type { Season, Occasion, Gender } from '../../types/product';

export class ProductCatalogService {
  public static searchProducts(args: {
    query?: string;
    category?: string;
    maxPrice?: number;
    season?: string;
    occasion?: string;
    gender?: string;
  }): Product[] {
    let results = [...products];

    if (args.query) {
      const q = args.query.toLowerCase();
      results = results.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (args.category) {
      results = results.filter(p => p.category.toLowerCase() === args.category!.toLowerCase());
    }

    if (args.maxPrice) {
      results = results.filter(p => p.price <= args.maxPrice!);
    }

    if (args.season) {
      results = results.filter(p => p.seasons.includes(args.season!.toLowerCase() as Season));
    }

    if (args.occasion) {
      results = results.filter(p => p.occasions.includes(args.occasion!.toLowerCase() as Occasion));
    }

    if (args.gender) {
      results = results.filter(
        p => p.gender === 'unisex' || p.gender === args.gender!.toLowerCase() as Gender
      );
    }

    return results;
  }

  public static getProductDetails(args: { productId: string }): Product | undefined {
    return products.find(p => p.id === args.productId);
  }

  public static checkInventory(args: { productId: string; size: string }): boolean {
    const product = this.getProductDetails(args);
    if (!product) return false;
    const sizeObj = product.sizes.find(s => s.value.toLowerCase() === args.size.toLowerCase());
    return sizeObj ? sizeObj.inStock : false;
  }
}
