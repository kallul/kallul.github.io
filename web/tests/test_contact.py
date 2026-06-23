import pytest


@pytest.mark.asyncio
async def test_submit_contact(client):
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Hello",
        "message": "This is a test message.",
    }
    response = await client.post("/api/v1/contact/", json=payload)
    assert response.status_code == 201
