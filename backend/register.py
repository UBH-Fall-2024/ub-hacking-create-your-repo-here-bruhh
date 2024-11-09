from flask import Flask, request, jsonify
import PyMySQL
import re

app = Flask(name)

dbconfig = {
    "host" : "localhost",
    "user" : "username",
    "password" : "password",
    "database" : "parkingdb"
}

def getdbconnection():
    connection = PyMySQL.connect(
        host=dbconfig["host"],
        user=dbconfig["user"],
        password=dbconfig["password"],
        database=dbconfig["database"],
    )
    return connection

def hash_password(password):
    salted_pass = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(password.encode('utf-8'), salted_pass)
    return hash_password

def valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@buffalo\.edu$'
    return re.match(regex, email) is not None

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    password = hash_password(password)

    if not username or not email or not password:
        return jsonify({'message': 'All fields are required'}), 400

    if (not valid_email(email)):
        return jsonify({'message': 'Invalid Email'}), 400

    connection = getdbconnection()
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM users WHERE email = %s', (email))

    email = cursor.fetchone()

    if (not email):
        cursor.execute('INSERT INTO users(username, email, password_hash, username) where VALUES = (%s, %s, %s)'), (username, email, password, username)
        cursor.commit()

    cursor.close()
        connection.close()
        
    return jsonify({'message': 'Registeration Successful'}), 201