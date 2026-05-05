FROM python:3.10-slim

WORKDIR /app

# Install dependencies first (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model and server
COPY segformer.pth .
COPY server.py .

EXPOSE 10000

CMD ["python", "server.py"]
