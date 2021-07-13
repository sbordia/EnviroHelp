from flask import Flask, render_template, request, redirect, url_for, make_response, jsonify
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
import requests, os, sys, json, time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
	
@app.route('/getPrediction', methods = ['GET'])
def return_prediction():
   res = make_response(jsonify({"result": predictedMaterial}), 200)
   return res

@app.route('/determine', methods = ['GET', 'POST'])
def upload_file():
   print("HERE")
   
   # print(request.files)
   data = dict(request.files)
   path = data["attachment"]
   path.save(secure_filename(path.filename))
   global predictedMaterial
   predictedMaterial = predictMaterial(path.filename);
   print("Completed: " + predictedMaterial)
   return redirect("https://ganning127.github.io/citro-final/index.html")
      # return 'file uploaded successfully'

def predictMaterial(filename):
   model_id = "7b0eebc0-daab-4f3c-8ead-cb134207eee2"
   api_key = "5dWT54BEjpK7TU7mOh_kl8GMejZYw6HJ"
   url = 'https://app.nanonets.com/api/v2/ObjectDetection/Model/' + model_id + '/LabelFile/'
   label = "Unknown";

   image_path = filename
   data = {'file': open(image_path, 'rb'),    'modelId': ('', model_id)}
   response = requests.post(url, auth=requests.auth.HTTPBasicAuth(api_key, ''), files=data)

   json_response = json.loads(response.text)
   print(json_response)
   for type in json_response["result"]:
      for prediction in type["prediction"]:
         label = prediction["label"]
         break

   return label


if __name__ == '__main__':
   app.run(debug = True)