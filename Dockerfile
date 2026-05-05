FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download HuggingFace model during build (so no internet needed at runtime)
COPY preload_model.py .
RUN python preload_model.py

# Copy model weights and server
COPY segformer.pth .
COPY server.py .

ENV PORT=10000
EXPOSE 10000

CMD ["python", "server.py"]
