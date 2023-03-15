
from os import system
from flask import Flask, jsonify, request, json, Response
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
from json import dumps

app=Flask(__name__)
CORS(app)

app.secret_key = 'secret key'
 
#app.config['MYSQL_HOST'] = '10.0.20.195'
app.config['MYSQL_HOST'] = 'scouting.team195.com:5000'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'RapidReact2022'  # Password for AWS
#app.config['MYSQL_PASSWORD'] = 'team195'  # Password for Pi
app.config['MYSQL_DB'] = 'team195_scouting'

mysql = MySQL(app)

@app.route("/")
def hello():
    return "Hello Worlds!"

@app.route("/harish/")
def hello2():
    return "Hello Harish!!!"

# Get Analyss Data
@app.route("/analysis/", defaults={'start': None})
@app.route("/analysis/<start>")
def get_analysis(start):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if start is not None:
        cursor.execute("SELECT cea.*, at.AnalysisType "
                    "FROM CurrentEventAnalysis cea, AnalysisTypes at "
                    "WHERE cea.AnalysisTypeID = at.AnalysisTypeID order by SortOrder "
                    "LIMIT "+start+",1000;")
    else:
        #cursor.execute("SELECT cea.*, at.AnalysisType "
         #           "FROM CurrentEventAnalysis cea, AnalysisTypes at "
          #          "WHERE cea.AnalysisTypeID = at.AnalysisTypeID order by SortOrder;")
        cursor.execute("SELECT a.Team,a.AnalysisTypeID,b.AnalysisType,a.EventID,a.Match1Display,a.Match1Format,a.Match1Value, "
                    "a.Match2Display,a.Match2Format,a.Match2Value,a.Match3Display,a.Match3Format,a.Match3Value, "
                    "a.Match4Display,a.Match4Format,a.Match4Value,a.Match5Display,a.Match5Format,a.Match5Value, "
                    "a.Match6Display,a.Match6Format,a.Match6Value,a.Match7Display,a.Match7Format,a.Match7Value, "
                    "a.Match8Display,a.Match8Format,a.Match8Value,a.Match9Display,a.Match9Format,a.Match9Value, "
                    "a.Match10Display,a.Match10Format,a.Match10Value,a.Match11Display,a.Match11Format,a.Match11Value, "
                    "a.Match12Display,a.Match12Format,a.Match12Value,a.Summary1Display,a.Summary1Value, "
                    "a.Summary2Display,a.Summary2Value,a.Summary3Display,a.Summary3Format,a.Summary3Value "
                    "FROM CurrentEventAnalysis a, AnalysisTypes b "
                    "WHERE a.AnalysisTypeID = b.AnalysisTypeID "
                    "order by b.SortOrder;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Analyss Data
@app.route("/acount/", methods =['GET', 'POST'])
def get_analysis_count():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT count(*) as Count FROM CurrentEventAnalysis;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Event Team List
@app.route("/currteam/", methods =['GET', 'POST'])
def get_currteam():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT t.team "
                "FROM Teams t, CurrentEventTeams c "
                "WHERE t.team = c.team order by cast(c.Team as int);")
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Get Pit Data
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
    
# Get 195Data
@app.route("/195Data/", defaults={'team': None})
@app.route("/195Data/<team>")
def get_195Data(team):
    #args = request.args
    #team = args.get('team')
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if team is not None:
        cursor.execute("SELECT m.* "
                "FROM MatchScouting m, Events e "
                "WHERE e.EventID = m.EventID "
                "AND Team="+team+" "
                "AND e.CurrentEvent = 1;")
    else: 
        cursor.execute("SELECT m.* "
                "FROM MatchScouting m, Events e "
                "WHERE e.EventID = m.EventID "
                "AND e.CurrentEvent = 1;")    
    data = cursor.fetchall()
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Matches Info
@app.route("/matchinfo/", methods =['GET', 'POST'])
def get_matchinfo():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT m.* "
                "FROM Matches m, Events e "
                "WHERE e.EventID = m.EventID "
                "AND e.CurrentEvent = 1 ORDER BY m.MatchNo;")
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


# Get Analysis Type Data
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

# Get Analysis Type Data
@app.route("/level2", methods =['GET', 'POST'])
def get_level2():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from SheetsL2Scouting order by MatchNo")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get Final 24 Data
@app.route("/final24Old", methods =['GET'])
def get_final24Old():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from Final24;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


# Update FInal24 Data
@app.route("/final24-update", methods =['POST'])
def post_final24():
    # TODO: IMPLEMENT ME

    if not request.is_json:
        return Response('Invalid submission, please submit as JSON.', status=400)
    data = request.json

    for line in data:
        print(line)

    
    table = request.args.get('table', default = '*', type = str)

    print("Updating " + table + " table")

    

    # SortOrder is gone from the frontend code - you'll need to iterate through
    # the rows and get SortOrder from the position of the row. Something like

    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
        for pos, team_selection in enumerate(data):
            #cursor.execute('UPDATE Final24 SET Team =% s where SortOrder=%s', (team_selection['Team'],pos+1))
            #query1='INSERT INTO '+table+' VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',(pos+1, team_selection['Team'],team_selection['Team'])
            ##print(query1)
            #cursor.execute(query1)
            cursor.execute('INSERT INTO '+table+' VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',(pos+1, team_selection['Team'],team_selection['Team']))
        mysql.connection.commit()

    return '1'


# Delete Final24 Data
@app.route("/final24", methods =['DELETE'])
def delete_final24():
    # TODO: IMPLEMENT ME

    #if not request.is_json:
    #    return Response('Invalid submission, please submit as JSON.', status=400)
    #data = request.json

    # Would like to loop through JSON file and delete rows on the database.
    # Just need to figure out how to read the JSON file.
    print("*******Deleting Records*********")
    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
      
        cursor.execute('DELETE from Final24 where SortOrder > 0')
        mysql.connection.commit()

    return '1'

# Get DNP List Data
@app.route("/dnp", methods =['GET'])
def get_dnp():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from DnpList;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Update FInal24 Data
@app.route("/dnp-update", methods =['POST'])
def post_dnp():

    if not request.is_json:
        return Response('Invalid submission, please submit as JSON.', status=400)
    data = request.json

    for line in data:
        print(line)

    # SortOrder is gone from the frontend code - you'll need to iterate through
    # the rows and get SortOrder from the position of the row. Something like

    with mysql.connection.cursor(MySQLdb.cursors.DictCursor) as cursor:
        for pos, team_selection in enumerate(data):
            #cursor.execute('UPDATE Final24 SET Team =% s where SortOrder=%s', (team_selection['Team'],pos+1))
            cursor.execute('INSERT INTO DnpList VALUES (%s, %s) ON DUPLICATE KEY UPDATE Team=%s',(pos+1, team_selection['Team'],team_selection['Team']))
        mysql.connection.commit()

    return '1'

# Get DNP List Data
@app.route("/pick", methods =['GET'])
def get_pick():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from PickList1;")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

# Get List Data
@app.route("/final24", methods =['GET'])
def get_final24():

    table = request.args.get('table', default = '*', type = str)

    print("Retrieve data from " + table + " table")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * from "+table+";")
    data = cursor.fetchall()	
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response



if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True)

