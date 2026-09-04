from core import triage

def test_urgent_vip():
    out = triage('URGENT: API is down and login error', .5, True)
    assert out['priority'] == 'P1'
    assert out['category'] == 'technical'

def test_old_ticket_risk():
    assert triage('invoice question', 20, False)['sla_risk'] > 0.9
