
from flask import Flask, request, json
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

app=Flask(__name__)

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



# Get Matches Data


if __name__=="__main__":
    app.run()

