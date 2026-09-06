# SupportPilot-AI — Pyrock AI Agent Intern Portfolio

**Production-minded support/operations copilot plus a TypeScript construction-ops tool-loop demo.**

This repository is tailored to the Pyrock AI Agent Intern role: agent workflows, TypeScript/JavaScript, APIs/webhooks, state, retries/idempotency thinking, evaluation and safe automation.

## What is implemented
- FastAPI triage API for support/operations tickets
- Explainable category routing and P1/P2/P3 priority
- SLA-risk estimation and bounded reply drafting
- Unit tests for urgency and aged-ticket risk
- `agent_loop.ts`: a typed construction-operations tool loop with allowlisted tools and idempotency keys
- Duplicate-message protection so repeated WhatsApp/webhook events do not create duplicate actions

## Pyrock-specific proof
The TypeScript demo models a WhatsApp construction workflow with three bounded tools:
1. `record_material` — capture a site material event
2. `create_followup` — create an owned action
3. `daily_report` — summarize site events

It deliberately does **not** claim a live WhatsApp Business API integration. The point is to show the agent/tool boundary, state handling and failure-safe design that can sit behind a messaging bridge.

## How I would evaluate an LLM agent
- fixed test cases for expected tool choice and required fields
- invalid/low-confidence cases that must escalate instead of act
- duplicate-event/idempotency tests
- bounded step budget to stop loops
- action audit log so failures can be reproduced

## Construction automation idea
A WhatsApp site assistant that converts delivery messages/photos/voice-note transcripts into structured material receipts, flags quantity mismatches, assigns follow-ups and generates a daily exception report. Human review remains mandatory for ambiguous or high-impact actions.

## Run Python API
```bash
pip install -r requirements.txt
uvicorn main:app --reload
pytest -q
```

## Run TypeScript proof
```bash
tsc agent_loop.ts --target ES2020 --module commonjs --outDir build
node build/agent_loop.js
```

## Architecture
`Message/Event -> Intent/Policy -> Bounded Tool Call -> Idempotency Check -> Action/Audit -> Response`

## Integrity note
This is a portfolio project using synthetic demo data. No live Pyrock/customer data, WhatsApp credentials or production claims are included.