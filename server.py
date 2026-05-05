from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn.functional as F
from transformers import SegformerForImageClassification, SegformerImageProcessor
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

LABELS = ["Conjunctivitis", "Pterygium"]

print("Loading SegFormer model...")
processor = SegformerImageProcessor.from_pretrained("nvidia/mit-b0")

model = SegformerForImageClassification.from_pretrained(
    "nvidia/mit-b0",
    num_labels=2,
    ignore_mismatched_sizes=True
)

# Load weights — works both locally and on HuggingFace Spaces
MODEL_PATH = os.path.join(os.path.dirname(__file__), "segformer.pth")
state_dict = torch.load(MODEL_PATH, map_location=torch.device("cpu"))
model.load_state_dict(state_dict, strict=True)
model.eval()
print("Model loaded OK. Labels:", LABELS)


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    img_bytes = file.read()

    try:
        image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Invalid image: {str(e)}"}), 400

    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = F.softmax(logits, dim=1)[0]

    predicted_idx = torch.argmax(probs).item()
    confidence = round(probs[predicted_idx].item() * 100, 2)
    label = LABELS[predicted_idx]
    all_probs = {LABELS[i]: round(probs[i].item() * 100, 2) for i in range(len(LABELS))}

    return jsonify({
        "prediction": label,
        "confidence": confidence,
        "probabilities": all_probs
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": "SegFormer", "labels": LABELS})


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "EyeFormer Model API", "endpoints": ["/predict", "/health"]})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
