from flask import Flask, request, jsonify
from flask_cors import CORS  # For handling CORS issues
from chatbot_model import IntentClassifier

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Initialize the IntentClassifier
classifier = IntentClassifier()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get the user's message from the request
        user_input = request.json.get("message", "")
        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        # Predict the response using the classifier
        response = classifier.predict_intent(user_input)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)