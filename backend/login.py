from flask import Flask, request, jsonify
import PyMySQL
from password_check import check_password

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

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    connection = getdbconnection()
    cursor = connection.cursor()

    query = cursor.execute('SELECT * FROM users WHERE email = %s', (email))
    if check_password(query['password'], password):
        user = cursor.fetchone()
    
    cursor.close()
    connection.close()

    if user:
        return jsonify({'message': 'Login successful', 'user_id': user[0]}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401