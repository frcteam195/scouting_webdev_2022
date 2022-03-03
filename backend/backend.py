
from flask import Flask, request, json
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
import re

app=Flask(__name__)
CORS(app)

app.secret_key = 'secret key'
 
app.config['MYSQL_HOST'] = 'frcteam195testinstance.cmdlvflptajw.us-east-1.rds.amazonaws.com'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'Einstein195'
app.config['MYSQL_DB'] = 'team195_scouting'

mysql = MySQL(app)

@app.route("/")
def hello():
    return "Hello Worlds!"

@app.route("/harish/")
def hello2():
    return "Hello Harish!!!"

# Get Analyss Data
@app.route("/analysis/", methods =['GET', 'POST'])
def get_analysis():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT cea.*, at.AnalysisType "
                "FROM CurrentEventAnalysis cea, AnalysisTypes at "
                "WHERE cea.AnalysisTypeID = at.AnalysisTypeID;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Team Data
@app.route("/teams/", methods =['GET', 'POST'])
def get_teams():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT t.* "
                "FROM Teams t, CurrentEventTeams c "
                "WHERE t.team = c.team;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Matches Data
@app.route("/matches/", methods =['GET', 'POST'])
def get_matches():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT m.MatchNo, m.RedTeam1, m.RedTeam2, m.RedTeam3, m.BlueTeam1, m.BlueTeam2, m.BlueTeam3 "
                "FROM Matches m, Events e "
                "WHERE e.EventID = m.EventID "
                "AND e.CurrentEvent = 1;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Matches Data
@app.get("/final24/")
def get_final24():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from Final24;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Matches Data
@app.post("/final24")
def post_final24():
    # TODO: IMPLEMENT ME
    return '1'

if __name__=="__main__":
    app.run()

