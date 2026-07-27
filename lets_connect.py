from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

# Route to handle the contact form
@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    try:
        # Get form data
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Send email (optional)
        send_email(name, email, message)

        return jsonify({"success": True, "message": "Message sent successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def send_email(name, email, message):
    sender_email = ""  # Replace with your email
    sender_password = ""  # Replace with your email password
    receiver_email = ""  # Replace with the destination email

    subject = f"New Contact Message from {name}"
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    # Create email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email  # The recipient email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Send email via SMTP
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
