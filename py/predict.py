import requests, os, sys, json

from flask import Flask, render_template
app = Flask(__name__)

### Nanonets Model and API key
model_id = "7b0eebc0-daab-4f3c-8ead-cb134207eee2"
api_key = "5dWT54BEjpK7TU7mOh_kl8GMejZYw6HJ"

### path to the image ###
image_base_path = os.environ.get('ENVIROHELP_IMAGE_PATH')

### URL to use
url = 'https://app.nanonets.com/api/v2/ObjectDetection/Model/' + model_id + '/LabelFile/'

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/getMaterialType/')
def getMaterialType(filename):
    label = "Unknown";

    image_path = image_base_path + '/' + filename
    data = {'file': open(image_path, 'rb'),    'modelId': ('', model_id)}
    response = requests.post(url, auth=requests.auth.HTTPBasicAuth(api_key, ''), files=data)
    print(response.text)
    json_response = json.loads(response.text)
 
    for type in json_response["result"]:
        for prediction in type["prediction"]:
            label = prediction["label"]
            break

    return label


app.run(debug=True)
