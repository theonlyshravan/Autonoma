import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("WARNING: DATABASE_URL not found in environment variables. Defaulting to localhost.")
    DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost/autonoma"
else:
    # Mask password for logs
    safe_url = DATABASE_URL.split("@")[-1] if "@" in DATABASE_URL else "UNKNOWN"
    print(f"Attempting to connect to database at: {safe_url}")

import socket
from urllib.parse import urlparse, urlunparse

# Ensure we are using asyncpg
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

# Handle Render's IPv6 routing limitations by enforcing IPv4 resolution
try:
    parsed = urlparse(DATABASE_URL)
    hostname = parsed.hostname
    if hostname:
        ipv4 = socket.gethostbyname(hostname)
        print(f"Resolved database host {hostname} to IPv4: {ipv4}")
        
        # safely replace hostname with IP in connection string
        new_netloc = parsed.netloc.replace(hostname, ipv4)
        parsed = parsed._replace(netloc=new_netloc)
        DATABASE_URL = urlunparse(parsed)
except Exception as e:
    print(f"IPv4 resolution failed, proceeding with original URL: {e}")

engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
