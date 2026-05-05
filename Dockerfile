FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model and server
COPY segformer.pth .
COPY server.py .

# Render uses dynamic PORT env var
ENV PORT=10000
EXPOSE 10000

CMD ["python", "server.py"]
