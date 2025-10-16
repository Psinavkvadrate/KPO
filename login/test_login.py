from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch, MagicMock

client = TestClient(app)

FAKE_USER = {
    "email": "test@test.com",
    "password": "123456789"
}

@patch("main.psycopg2.connect")
def test_login_success(mock_connect):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_connect.return_value.__enter__.return_value = mock_conn
    mock_conn.cursor.return_value.__enter__.return_value = mock_cursor

    mock_cursor.fetchone.return_value = FAKE_USER

    response = client.post("/api/v1/login", json={
        "email": FAKE_USER["email"],
        "password": FAKE_USER["password"]
    })
    assert response.status_code == 200
    assert response.json()["error"] is None
    assert response.json()["data"]["login"] == "success"
    assert response.json()["messages"] is None


@patch("main.psycopg2.connect")
def test_login_invalid_email(mock_connect):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_connect.return_value.__enter__.return_value = mock_conn
    mock_conn.cursor.return_value.__enter__.return_value = mock_cursor

    mock_cursor.fetchone.return_value = None

    response = client.post("/api/v1/login", json={
        "email": "wrong@test.com",
        "password": "123456789"
    })
    assert response.status_code == 200
    assert response.json()["error"]["message"] == "Invalid email or password"
    assert response.json()["data"] is None
    assert response.json()["messages"] is None


def test_login_short_password():
    response = client.post("/api/v1/login", json={
        "email": "test@test.com",
        "password": "123"
    })
    assert response.status_code == 400
    assert "Password must be at least 6 characters" in response.json()["detail"]
