from flask import Flask, jsonify
import os

app = Flask(__name__)

# Change this path to the path where your files are stored
DIRECTORY_PATH = '/Users/anthonykeyes/Desktop/princeton/hatpi-test/images'

@app.route('/files')
def list_files():
    files = [f for f in os.listdir(DIRECTORY_PATH) if os.path.isfile(os.path.join(DIRECTORY_PATH, f))]
    return jsonify(files)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
