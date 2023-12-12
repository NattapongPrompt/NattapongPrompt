# app.py
from flask import Flask, render_template, request, jsonify
import cx_Oracle

app = Flask(__name__)

# Database connection information
app.config['DATABASE_USERNAME'] = 'your_username'
app.config['DATABASE_PASSWORD'] = 'your_password'
app.config['DATABASE_HOSTNAME'] = 'your_hostname'
app.config['DATABASE_PORT'] = 'your_port'
app.config['DATABASE_SERVICE_NAME'] = 'your_service_name'

def fetch_data(query, params=None, fetch_all=True):
    try:
        dsn = cx_Oracle.makedsn(
            app.config['DATABASE_HOSTNAME'],
            app.config['DATABASE_PORT'],
            app.config['DATABASE_SERVICE_NAME']
        )

        with cx_Oracle.connect(
            app.config['DATABASE_USERNAME'],
            app.config['DATABASE_PASSWORD'],
            dsn
        ) as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, params)
                if fetch_all:
                    results = cursor.fetchall()
                else:
                    results = cursor.fetchone()
        return results
    except cx_Oracle.Error as e:
        error, = e.args
        print("Oracle Error:", error)
        return None

@app.route('/')
def index():
    try:
        # Execute SQL query to fetch data for the "AMR_REGION" table
        results = fetch_data("SELECT * FROM AMR_REGION")

        # Execute SQL query to fetch data for the "AMR_FIELD_ID" table
        site_results = fetch_data("SELECT * FROM AMR_FIELD_ID")

    except cx_Oracle.Error as e:
        error, = e.args
        print("Oracle Error:", error)
        results = []
        site_results = []

    # Render the HTML template with the retrieved data
    return render_template('index.html', results=results, site_results=site_results)

@app.route('/fetch_data', methods=['POST'])
def fetch_data_route():
    try:
        region = request.form.get('region')
        site = request.form.get('site')
        date = request.form.get('date')

        # Modify the query based on the selected values
        query = "SELECT * FROM AMR_BILLING_DATA WHERE REGION = :region AND SITE = :site AND DATE = :date"
        params = {'region': region, 'site': site, 'date': date}

        data = fetch_data(query, params=params)

        if data is not None:
            # Prepare data for rendering
            column_names = [desc[0] for desc in data.description]
            data_rows = [list(row) for row in data]

            # Render the data in HTML format
            result_html = render_template('search_result.html', region=region, site=site, date=date, column_names=column_names, data_rows=data_rows)

            return jsonify({'html': result_html})  # Send HTML content as JSON
        else:
            return jsonify({"error": "No data found"})

    except cx_Oracle.Error as e:
        error, = e.args
        print("Oracle Error:", error)
        return jsonify({"error": "An error occurred while fetching data"})

if __name__ == '__main__':
    app.run(debug=True)
