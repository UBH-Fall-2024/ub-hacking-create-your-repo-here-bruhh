from flask import Flask, request, jsonify
import PyMySQL
from flask_cors import CORS
from password_check import hash_password 
from password_check import valid_email

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

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