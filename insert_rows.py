import mysql.connector
import time
from datetime import datetime

# Replace these values with your MySQL server details
MYSQL_HOST = 'mysql_server'
MYSQL_PORT = 3306  # default MySQL port
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'password'
MYSQL_DATABASE = 'test'

# Connect to the MySQL database
conn = mysql.connector.connect(
    host=MYSQL_HOST,
    port=MYSQL_PORT,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    database=MYSQL_DATABASE
)

cursor = conn.cursor()

# Create a table if it doesn't exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS sample_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data VARCHAR(255) NOT NULL
    )
""")
conn.commit()

# Insert rows continuously
try:
    while True:
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute("INSERT INTO sample_data (data) VALUES (%s)", (f"Data at {current_time}",))
        conn.commit()
        print(f"Inserted row with data: 'Data at {current_time}'")
        time.sleep(5)  # wait 5 seconds before inserting the next row
except KeyboardInterrupt:
    print("Stopping the script.")
finally:
    cursor.close()
    conn.close()
