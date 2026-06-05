import { IntentParser } from './IntentParser';
import { ContextEngine } from './ContextEngine';
import { ComponentSelector } from './ComponentSelector';
import { PromptManager } from './PromptManager';
import { MCPClient } from '../mcp/MCPClient';
import type { ComponentInstance, SuggestedAction } from '../types/conversation';
import { delay } from '../types/common';
import { OrderHistoryService } from '../mcp/services/OrderHistoryService';

export interface LLMResponse {
  message: string;
  components: ComponentInstance[];
  suggestedActions: SuggestedAction[];
}

export class LLMOrchestrator {
  public static async processInput(input: string, orderConfirmed: boolean = false): Promise<LLMResponse> {
    // 1. Simulate cognitive processing latency (500ms - 1000ms)
    await delay(600 + Math.random() * 400);

    // 2. Parse text to extract intent, categories, budget, etc.
    const intentResult = IntentParser.parse(input);

    // 3. Update dynamic context engine
    const context = ContextEngine.updateFromIntent(intentResult);

    // 4. Determine and call required MCP tools
    const toolResults: Record<string, any> = {};

    try {
      // Weather query
      if (context.activeLocation) {
        const weatherResp = await MCPClient.invokeTool('getCurrentWeather', { city: context.activeLocation });
        if (weatherResp.success) {
          toolResults.weather = weatherResp.data;
        }
      }

      // Promotions query
      if (intentResult.intent === 'sale') {
        const promoResp = await MCPClient.invokeTool('getActiveCampaigns', {});
        if (promoResp.success) {
          toolResults.promotions = promoResp.data;
        }
      }

      // Order history query (User's specific request)
      if (intentResult.intent === 'orders' || intentResult.intent === 'history') {
        const orderResp = await MCPClient.invokeTool('getRecentOrders', { customerId: context.customerId });
        toolResults.orders = orderResp.success && Array.isArray(orderResp.data)
          ? orderResp.data
          : OrderHistoryService.getRecentOrders({ customerId: context.customerId });
      }

      // Catalog search based on extracted parameters
      const searchParams: Record<string, any> = {};
      if (intentResult.category) searchParams.category = intentResult.category;
      if (context.activeSeason) searchParams.season = context.activeSeason;
      if (context.activeOccasion) searchParams.occasion = context.activeOccasion;
      if (context.activeBudget) searchParams.maxPrice = context.activeBudget;

      const catalogResp = await MCPClient.invokeTool('searchProducts', searchParams);
      if (catalogResp.success) {
        toolResults.products = catalogResp.data;
      }

      // If we're looking to build an outfit, load fallbacks if category results are limited
      if (intentResult.intent === 'outfit') {
        const topsResp = await MCPClient.invokeTool('searchProducts', { category: 'Tops' });
        const bottomResp = await MCPClient.invokeTool('searchProducts', { category: 'Bottoms' });
        const footResp = await MCPClient.invokeTool('searchProducts', { category: 'Footwear' });
        const accResp = await MCPClient.invokeTool('searchProducts', { category: 'Accessories' });

        if (topsResp.success) toolResults.fallbackTops = topsResp.data;
        if (bottomResp.success) toolResults.fallbackBottoms = bottomResp.data;
        if (footResp.success) toolResults.fallbackFootwear = footResp.data;
        if (accResp.success) toolResults.fallbackAccessories = accResp.data;
      }

    } catch (err) {
      console.error('MCP Tool integration error in LLM orchestrator:', err);
    }

    // 5. Select whitelisted components
    const components = ComponentSelector.selectComponents(intentResult.intent, context, toolResults, orderConfirmed);

    // 6. Generate prompt explanation
    const message = PromptManager.generateResponse(intentResult, context, toolResults);

    // 7. Establish dynamic suggestions context
    const suggestedActions = this.getSuggestedActions(intentResult.intent, context);

    return {
      message,
      components,
      suggestedActions
    };
  }

  private static getSuggestedActions(intent: string, context: any): SuggestedAction[] {
    const actions: SuggestedAction[] = [];

    if (intent === 'greet') {
      actions.push(
        { id: 'sa-1', label: '✈️ Summer trip to Finland', prompt: 'I need clothes for a business trip to Finland.' },
        { id: 'sa-2', label: '✈️ Winter trip to Norway', prompt: 'I need clothes for a winter trip to Norway.' },
        { id: 'sa-3', label: '☀️ Holiday in Spain', prompt: 'Show me beach wear for a Spain holiday.' },
        { id: 'sa-4', label: '🛍️ Current Promotions', prompt: 'What promotional discount campaigns are active today?' },
        
      );
    } else if (context.activeLocation) {
      actions.push(
        { id: 'sa-outfit', label: '✨ Design styled outfit capsule', prompt: `Build a complete travel outfit for ${context.activeLocation}` },
        { id: 'sa-filter', label: '🏷️ Show items under €150', prompt: `Show me items under €150 for this trip` },
        { id: 'sa-orders', label: '📦 Track recent orders', prompt: 'Show my orders' }
      );
    } else {
      actions.push(
        { id: 'sa-outfit', label: '👔 Match modular outfit look', prompt: 'Let me build a modular outfit' },
        { id: 'sa-sale', label: '💎 Loyalty member discounts', prompt: 'What member offers are available?' },
        { id: 'sa-orders', label: '📦 Track recent orders', prompt: 'Show my orders' },
      );
    }

    // const quizAction = { id: 'sa-quiz', label: '📝 Style preferences quiz', prompt: 'I want to take the style quiz' };
    // if (!actions.some(action => action.id === quizAction.id)) {
    //   actions.push(quizAction);
    // }

    return actions;
  }
}
