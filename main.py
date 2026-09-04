from fastapi import FastAPI
from pydantic import BaseModel
from core import triage

app = FastAPI(title='SupportPilot AI')

class Ticket(BaseModel):
    text: str
    age_hours: float = 0
    vip: bool = False

@app.post('/triage')
def run(t: Ticket):
    return triage(t.text, t.age_hours, t.vip)
