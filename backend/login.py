from flask import Flask, request, jsonify
import PyMySQL

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

@app.route('/updateSpotStatus', methods=['POST'])
def updatespotstatus():
    data = request.json
    spotid = data['spot_id']
    status = data['status']

    query = "UPDATE parking_spots SET status = %s WHERE spot_id = %s"
    cursor.execute(query, (status, spot_id))
    db.commit()

    return jsonify({"message": "Parking spot updated successfully"})

if __name == '__main':
    app.run(debug=True)