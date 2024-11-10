from flask import Flask, request, jsonify, g
import PyMySQL
from flask_cors import CORS
from password_check import hash_password 
from password_check import valid_email
from password_check import check_password

app = Flask(__name__)
CORS(app, origins=["http://10.84.101.26:3000"])

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


@app.route('/spots', methods=['GET'])
def get_spots():
    conn = getdbconnection()
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM parking_spots')
        spots = cursor.fetchall()
    return jsonify(spots)


@app.route('/park', methods=['POST'])
def park_car():
    spot_id = request.json['spot_id']
    user_status = request.json['user_status']

    conn = getdbconnection()
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM parking_spots WHERE spot_id = %s', (spot_id,))
        spot = cursor.fetchone()

        if not spot:
            return jsonify({'message': 'Spot not found'}), 404

        if spot['status'] == 'parked':
            return jsonify({'message': 'Spot already taken'}), 400

        if user_status == 'student' and spot['type'] in ['professor', 'paid']:
            return jsonify({'message': 'Not allowed'}), 403

        cursor.execute('UPDATE parking_spots SET status = %s WHERE spot_id = %s', ('parked', spot_id))
        conn.commit()
    return jsonify({'message': 'Car parked successfully'})


@app.route('/leave', methods=['POST'])
def leave_spot():
    spot_id = request.json['spot_id']

    conn = getdbconnection()
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM parking_spots WHERE spot_id = %s', (spot_id,))
        spot = cursor.fetchone()

        if not spot:
            return jsonify({'message': 'Spot not found'}), 404

        cursor.execute('UPDATE parking_spots SET status = %s WHERE spot_id = %s', ('available', spot_id))
        conn.commit()
    return jsonify({'message': 'Spot freed up successfully'})

@app.route('/updateSpotStatus', methods=['POST'])
def updatespotstatus():
    data = request.json
    spotid = data['spot_id']
    status = data['status']

    conn = getdbconnection()
    cursor = conn.cursor()
    cursor.execute("UPDATE parking_spots SET status = %s WHERE spot_id = %s", (status, spotid))
    conn.commit()

    return jsonify({"message": "Parking spot updated successfully"})