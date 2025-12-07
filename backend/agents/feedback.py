import google.generativeai as genai
import os

# Configure Gemini (ensures it's configured if this module is imported independently)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class FeedbackAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-pro')

    async def collect_feedback(self, service_record: dict) -> str:
        """
        Generates a follow-up message to the customer after service completion.
        """
        prompt = f"""
        You are a customer satisfaction agent for Autonoma.
        A vehicle has just completed service.
        
        Service Details:
        - Vehicle: {service_record.get('vehicle_id')}
        - Issue: {service_record.get('issue')}
        - Status: Completed
        
        Write a short, polite text message asking for feedback. 
        Ask 1 specific question about the service quality.
        Tone: Professional, warm, brief.
        """
        
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            return "We hope your service went well. Please rate us 1-5."

    async def update_records(self, feedback: str, vehicle_id: str):
        # Mock database update
        print(f"[FeedbackAgent] Updating records for {vehicle_id}: {feedback}")
        return True
