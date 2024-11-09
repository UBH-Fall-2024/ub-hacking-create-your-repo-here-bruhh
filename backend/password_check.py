import bcrypt

def check_password(plain_password, stored_hashed_password):
    # Compare the entered password with the stored hashed password
    if bcrypt.checkpw(plain_password.encode('utf-8'), stored_hashed_password):
        print("Login successful")
        return True
    else:
        print("Invalid credentials")
        return False