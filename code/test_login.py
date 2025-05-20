import requests

# Test login
print("Testing login...")
login_url = 'http://localhost:8000/api/auth/login/'
login_data = {
    'username': 'admin',
    'password': 'admin123'
}

# Use a session to maintain cookies
session = requests.Session()

try:
    login_response = session.post(login_url, json=login_data)
    print(f"Login status code: {login_response.status_code}")
    print(f"Login response: {login_response.text}")
    print(f"Cookies: {dict(session.cookies)}")

    if login_response.status_code == 200:
        # Test protected endpoint
        print("\nTesting protected endpoint...")
        user_url = 'http://localhost:8000/api/auth/user/'
        user_response = session.get(user_url)
        print(f"User profile status code: {user_response.status_code}")
        print(f"User profile response: {user_response.text}")
except Exception as e:
    print(f"Error: {str(e)}")
