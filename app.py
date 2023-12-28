from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_name = db.Column(db.String(255), nullable=False)
    income_amount = db.Column(db.Float, nullable=False)

@app.route('/')
def index():
    incomes = Income.query.all()
    return render_template('index.html', incomes=incomes)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
