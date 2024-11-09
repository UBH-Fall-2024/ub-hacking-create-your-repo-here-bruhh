import bcrypt
import re

def check_password(plain_password, stored_hashed_password):
    # Compare the entered password with the stored hashed password
    if bcrypt.checkpw(plain_password.encode('utf-8'), stored_hashed_password):
        print("Login successful")
        return True
    else:
        print("Invalid credentials")
        return False
    
def hash_password(password):
    salted_pass = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(password.encode('utf-8'), salted_pass)
    return hash_password

def valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@buffalo\.edu$'
    return re.match(regex, email) is not None