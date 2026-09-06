type ToolName = 'record_material' | 'create_followup' | 'daily_report';

type AgentAction = {
  tool: ToolName;
  input: Record<string, unknown>;
  idempotencyKey: string;
};

type ToolResult = { ok: boolean; message: string };

class ConstructionOpsAgent {
  private seen = new Set<string>();
  private materialLog: Array<Record<string, unknown>> = [];
  private followups: Array<Record<string, unknown>> = [];

  async execute(action: AgentAction): Promise<ToolResult> {
    if (this.seen.has(action.idempotencyKey)) {
      return { ok: true, message: 'duplicate ignored safely' };
    }
    this.seen.add(action.idempotencyKey);

    switch (action.tool) {
      case 'record_material':
        this.materialLog.push(action.input);
        return { ok: true, message: `material event recorded (${this.materialLog.length})` };
      case 'create_followup':
        this.followups.push(action.input);
        return { ok: true, message: `follow-up queued (${this.followups.length})` };
      case 'daily_report':
        return {
          ok: true,
          message: `daily report: ${this.materialLog.length} material events, ${this.followups.length} follow-ups`,
        };
      default:
        return { ok: false, message: 'tool not allowed' };
    }
  }
}

async function demo() {
  const agent = new ConstructionOpsAgent();
  const actions: AgentAction[] = [
    {
      tool: 'record_material',
      input: { site: 'A', item: 'cement', quantity: 50, unit: 'bags' },
      idempotencyKey: 'msg-1001',
    },
    {
      tool: 'create_followup',
      input: { site: 'A', task: 'verify cement receipt', owner: 'site-engineer' },
      idempotencyKey: 'msg-1002',
    },
    {
      tool: 'record_material',
      input: { site: 'A', item: 'cement', quantity: 50, unit: 'bags' },
      idempotencyKey: 'msg-1001',
    },
    { tool: 'daily_report', input: { site: 'A' }, idempotencyKey: 'report-A-2026-09-06' },
  ];

  for (const action of actions) console.log(await agent.execute(action));
}

demo().catch((error) => console.error(error));
