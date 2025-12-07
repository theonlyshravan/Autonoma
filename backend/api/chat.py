from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..agents.workers import CustomerEngagementAgent, SchedulingAgent

router = APIRouter()
customer_agent = CustomerEngagementAgent()
scheduling_agent = SchedulingAgent()

class ChatMessage(BaseModel):
    items: List[dict] # {sender: str, content: str}

class ChatRequest(BaseModel):
    message: str
    history: List[dict]

@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        # Mock Context (In real app, fetch from DB/State)
        diagnosis = "Battery Cell #4 Overheating (Risk of Thermal Runaway)"
        severity = "Critical"
        
        # Inject scheduling context if user asks about time
        # This is a basic simulation of "tool use" via prompt context
        available_slots = scheduling_agent.get_available_slots("tomorrow")
        
        # We append the current message to history effectively
        full_history = req.history + [{"sender": "user", "content": req.message}]
        
        # If user accepts a slot, we simulate booking
        if "book" in req.message.lower() and any(char.isdigit() for char in req.message):
             response_text = f"Confirmed. I have booked a slot for you. You will receive a confirmation email shortly. Reference: {scheduling_agent.book_appointment('Mock', 'EV-1')}"
        else:
             response_text = await customer_agent.generate_message(
                diagnosis, severity, full_history
            )
        
        return {"response": response_text}
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
