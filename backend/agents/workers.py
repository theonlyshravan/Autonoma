import os
import random
import google.generativeai as genai
from typing import List, Dict, Optional
from datetime import datetime, timedelta

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class DiagnosisAgent:
    def diagnose(self, anomaly_reason: str, current_data: dict) -> dict:
        """
        Map anomaly to root cause diagnosis using rule-based expert system.
        """
        diagnosis = "Unknown issue. Manual inspection required."
        confidence = 0.5
        severity = "Low"
        
        reason_lower = (anomaly_reason or "").lower()
        
        if "battery temperature" in reason_lower:
            temp = current_data.get("battery_temperature", 0)
            if temp > 60:
                diagnosis = "CRITICAL: Thermal Runaway Risk. Coolant pump failure inferred."
                confidence = 0.98
                severity = "Critical"
            else:
                diagnosis = "Thermal Management System Warning. Possible radiator accumulation."
                confidence = 0.85
                severity = "High"
        
        elif "vibration" in reason_lower:
            vib = current_data.get("vibration_level", 0)
            if vib > 8:
                diagnosis = "DANGER: Structural Integrity Compromise. Motor mount failure."
                confidence = 0.95
                severity = "Critical"
            else:
                diagnosis = "Drivetrain Misalignment or uneven tire wear detected."
                confidence = 0.78
                severity = "Medium"
        
        elif "motor" in reason_lower:
            diagnosis = "Motor Controller Logic Fault."
            confidence = 0.80
            severity = "Medium"
            
        return {
            "diagnosis": diagnosis,
            "severity": severity,
            "diagnosis_confidence": confidence
        }

class CustomerEngagementAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')

    async def generate_message(self, diagnosis: str, severity: str, conversation_history: List[dict] = []) -> str:
        """
        Generate context-aware user alert/response using Gemini.
        """
        # Simplify history for the model
        history_text = "\n".join([f"{msg['sender']}: {msg['content']}" for msg in conversation_history[-5:]])
        
        prompt = f"""
        You are an intelligent, polite, and professional autonomous vehicle assistant.
        Your goal is to inform the owner about a vehicle issue and help them book a service.
        TONE: Nice, decent, no AI fluff. Be direct but empathetic.
        
        CURRENT STATUS:
        Diagnosis: {diagnosis}
        Severity: {severity}
        
        CONVERSATION HISTORY:
        {history_text}
        
        INSRUCTIONS:
        - If this is the first message (history is empty), inform the user about the issue neatly. Ask if they want to book.
        - If the user agrees, ask for a time.
        - If the user provides a time, pretend to check availability.
        - Keep responses short (under 2 sentences).
        
        Your response:
        """
        
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            return f"⚠️ Alert: {diagnosis}. Please schedule service. (AI Offline)"

class SchedulingAgent:
    def get_available_slots(self, date_str: str) -> List[str]:
        # Mock logic: Returns 3 slots for the given date
        # Randomly decide if a slot is 'booked' to force negotiation
        return ["10:00 AM", "02:00 PM", "04:30 PM"]

    def check_slot_availability(self, date_str: str, time_str: str) -> bool:
        # 50% chance of being booked
        return random.choice([True, False])

    def book_appointment(self, slot: str, vehicle_id: str) -> str:
        # Generate mock Booking ID
        return f"BK-{random.randint(10000, 99999)}"

class RCAAgent:
    def analyze_failure(self, history: List[dict]) -> dict:
        # Dynamic insight based on recent failure
        return {
            "component": "HV Battery System",
            "pattern": "Thermal spike correlation with fast charging sessions",
            "recommendation": "Update BMS firmware to v2.4.1 to optimize cooling curve.",
            "confidence_score": 0.89
        }
