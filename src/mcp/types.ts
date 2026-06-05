export interface MCPTool {
  name: string;
  description: string;
  parameters: MCPParameter[];
  service: string;
}

export interface MCPParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface MCPToolCall {
  tool: string;
  arguments: Record<string, unknown>;
}

export interface MCPToolResponse<T = unknown> {
  success: boolean;
  data: T;
  error?: string;
  executionTime: number;
}
