import math

ROUTES = {
    'billing': ['refund', 'payment', 'invoice', 'charged'],
    'technical': ['error', 'bug', 'crash', 'login', 'api'],
    'account': ['password', 'profile', 'account'],
}

def triage(text, age_hours=0, vip=False):
    t = text.lower()
    scores = {k: sum(w in t for w in ws) for k, ws in ROUTES.items()}
    category = max(scores, key=scores.get) if max(scores.values()) else 'general'
    urgent = any(w in t for w in ['urgent', 'down', 'blocked', 'cannot access', 'charged twice'])
    priority = 'P1' if urgent and (vip or category == 'technical') else 'P2' if urgent or age_hours > 12 else 'P3'
    sla_hours = {'P1': 1, 'P2': 4, 'P3': 24}[priority]
    remaining = max(0, sla_hours - age_hours)
    risk = round(1 - math.exp(-max(age_hours, 0) / sla_hours), 3)
    draft = f"Thanks for reporting this. I classified it as {category}. Our team will review the details and avoid making irreversible changes without confirmation."
    return {
        'category': category,
        'priority': priority,
        'route': category,
        'sla_hours': sla_hours,
        'remaining_hours': remaining,
        'sla_risk': risk,
        'draft_reply': draft,
    }
