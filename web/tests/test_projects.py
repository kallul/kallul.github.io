import pytest


@pytest.mark.asyncio
async def test_list_projects(client):
    response = await client.get("/api/v1/projects/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_get_nonexistent_project(client):
    response = await client.get("/api/v1/projects/000000000000000000000000")
    assert response.status_code == 404
