import pytest
from app import app, users

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_register_success(client):
    # Clear users dictionary before test
    users.clear()
    
    response = client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    json_data = response.get_json()

    assert response.status_code == 201
    assert json_data['message'] == 'User registered successfully'
    assert 'testuser' in users

def test_register_missing_username(client):
    response = client.post('/register', json={
        'password': 'testpassword'
    })
    json_data = response.get_json()

    assert response.status_code == 400
    assert json_data['message'] == 'Username and password are required'

def test_register_missing_password(client):
    response = client.post('/register', json={
        'username': 'testuser'
    })
    json_data = response.get_json()

    assert response.status_code == 400
    assert json_data['message'] == 'Username and password are required'

def test_register_user_already_exists(client):
    # Clear users dictionary and register a user first
    users.clear()
    users['testuser'] = 'testpassword'
    
    response = client.post('/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    json_data = response.get_json()

    assert response.status_code == 409
    assert json_data['message'] == 'User already exists'
