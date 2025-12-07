from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import auth, telemetry, vehicles, insights
from database import engine

app = FastAPI(title="Autonoma Backend", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: Restrict for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(vehicles.router, prefix="/api/vehicles", tags=["vehicles"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.on_event("startup")
async def startup():
    # Verify DB connection
    async with engine.begin() as conn:
        print("Database connection established.")

@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
