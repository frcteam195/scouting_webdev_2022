
from os import system
from flask import Flask, jsonify, request, json, Response
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
import re
from json import dumps

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


# Get Current Teams
@app.route("/currteam/", methods =['GET', 'POST'])
def get_currteam():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT t.team "
                "FROM Teams t, CurrentEventTeams c "
                "WHERE t.team = c.team;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Team Data
@app.route("/pitdata/", methods =['GET', 'POST'])
def get_teams():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT t.*, w.WheelType, d.DriveType, m.MotorType, l.LanguageType "
                "FROM Teams t "
                "INNER JOIN CurrentEventTeams c on t.Team = c.Team "
                "LEFT JOIN WheelTypes w on t.WheelTypeID=w.WheelTypeID "
                "LEFT JOIN DriveTypes d on t.DriveTypeID=d.DriveTypeID "
                "LEFT JOIN MotorTypes m on t.MotorTypeID=m.MotorTypeID "
                "LEFT JOIN LanguageTypes l on t.LanguageID=l.LanguageTypeID")
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


# Get Summary Data
@app.route("/summary/", methods =['GET', 'POST'])
def get_summary():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("select a.* from CurrentEventAnalysisGraphs a, Events b "
                    "where a.EventID=b.EventID "
                    "and b.CurrentEvent = 1;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Word Descriptions
@app.route("/words/", methods =['GET', 'POST'])
def get_words():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM WordID ORDER BY DisplayWordOrder;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Word Cloud Data
@app.route("/word-cloud/", methods =['GET', 'POST'])
def get_wordcloud():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT b.* FROM Events a, WordCloud b "
                   "WHERE a.CurrentEvent = 1 AND a.EventID = b.EventID ORDER BY b.MatchID, b.WordID;")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Matches Data
@app.route("/types/", methods =['GET', 'POST'])
def get_types():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from AnalysisTypes")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Final 24 Data
@app.get("/final24")
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


# Class for Final 24
""" class FinalOut(mysql.Model):
    SortOrder = mysql.Column(mysql.Integer, primary_key=True)
    Team = mysql.Column(mysql.String(10))
 """

# Get Matches Data
@app.post("/final24")
def post_final24():
    # TODO: IMPLEMENT ME
    #my_data = FinalOut.query.get(request.form.get(10))
    #my_data.Team = request.form['123']
    #mysql.session.commit()

    if not request.is_json:
        return Response('Invalid submission, please submit as JSON.', status=400)
    data = request.json

    print("Data: ", data)

    for line in data:
        print(line)

    # Would like to loop through JSON file and update rows on the database.
    # Just need to figure out how to read the JSON file.

    # SortOrder is gone from the frontend code - you'll need to iterate through
    # the rows and get SortOrder from the position of the row. Something like

    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
        cursor.execute('DELETE from Final24 where SortOrder > 0')
        mysql.connection.commit()
        for pos, team_selection in enumerate(data):
            #cursor.execute('UPDATE Final24 SET Team =% s where SortOrder=%s', (team_selection['Team'],pos+1))
            cursor.execute('INSERT INTO Final24 VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',
                         (pos+1), team_selection['Team'],team_selection['Team'])
        mysql.connection.commit()

    return '1'



if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True)

