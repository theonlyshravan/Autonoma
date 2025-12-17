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

# FIX: Force IPv4 resolution to avoid "Network is unreachable" on Render (IPv6 issues)
try:
    parsed = urlparse(DATABASE_URL)
    hostname = parsed.hostname
    if hostname:
        ipv4 = socket.gethostbyname(hostname)
        print(f"Resolved {hostname} to IPv4: {ipv4}")
        # Reconstruct URL with IPv4 address
        # We must keep the original hostname for SSL verification if possible, but asyncpg
        # makes that hard with a replaced host.
        # Strategy: Replace host with IP, and rely on default SSL context which might warn but proceed,
        # or it might fail SSL.
        # Better Strategy: If we change host to IP, we risk SSL errors.
        # But "Network Unreachable" is a blocker.
        # Let's simple try to use the resolved IP.
        
        # Note: If the password contains special chars, simple string replace is dangerous.
        # But urlparse/unparse handles components safely? No, urlparse.netloc includes user:pass.
        
        # Safest way: replace the hostname in the netloc
        new_netloc = parsed.netloc.replace(hostname, ipv4)
        parsed = parsed._replace(netloc=new_netloc)
        DATABASE_URL = urlunparse(parsed)
        print(f"Updated DATABASE_URL to use IPv4: {DATABASE_URL.split('@')[-1]}")
except Exception as e:
    print(f"Failed to force IPv4 resolution: {e}")

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
