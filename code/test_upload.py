import requests

# First, log in to get the authentication cookie
login_url = 'http://localhost:8000/api/auth/login/'
login_data = {
    'username': 'admin',
    'password': 'admin123'
}

# Start a session to maintain cookies
session = requests.Session()
login_response = session.post(login_url, json=login_data)

if login_response.status_code == 200:
    print("Successfully logged in")
    print("Cookies:", dict(session.cookies))
    
    # Now upload the image using the same session
    upload_url = 'http://localhost:8000/api/auth/user/'
    files = {'profile_image': open('test_profile.png', 'rb')}
    
    response = session.patch(upload_url, files=files)
    print(f"Upload Status Code: {response.status_code}")
    print(f"Response: {response.text}")
else:
    print(f"Login failed with status code: {login_response.status_code}")
    print(f"Response: {login_response.text}")
