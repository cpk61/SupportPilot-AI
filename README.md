# SupportPilot-AI

AI-style support operations copilot for ticket classification, priority, SLA risk, routing and safe response drafting.

## Features
- FastAPI triage API
- Rule-based explainable category routing
- P1/P2/P3 priority assignment
- SLA risk estimation
- Safe draft reply generation
- Unit tests for urgency and aged-ticket risk

## Run
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## Test
```bash
pytest -q
```

## Architecture
`Ticket -> Intent Signals -> Priority/SLA Engine -> Route -> Safe Draft Reply -> JSON`

## Portfolio note
The core demo is deterministic and requires no paid AI API. A production version can replace the text classifier/drafter with an authorized model while keeping the priority and escalation rules bounded.
