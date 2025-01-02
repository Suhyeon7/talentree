from flask import Flask, request, jsonify
import os
from monsterapi import client
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set the Monster API key
os.environ['MONSTER_API_KEY'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjMyYzQ4YzIwZmFhZTNmZTU1YTQ5YjIwZjAwZjFlNDhlIiwiY3JlYXRlZF9hdCI6IjIwMjQtMTAtMTRUMDc6NDQ6NTYuODExMzg0In0.igNVDTBO1RJvRTUaS_BN9nj0SXGmK037eb7bseGjS6k'
monster_client = client()

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json  # React에서 전달된 프롬프트 데이터
    prompt = data.get('prompt', '')

    try:
        # Monster API 호출
        response = monster_client.generate(model='txt2img', data={"prompt": prompt})
        image_url = response['output'][0]
        print(image_url)
        return jsonify({"image_url": image_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
