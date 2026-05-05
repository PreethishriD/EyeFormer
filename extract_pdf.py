import fitz  # PyMuPDF
import json
import os

def extract_pdf_data(pdf_path, output_json):
    doc = fitz.open(pdf_path)
    data = {
        "title": os.path.basename(pdf_path),
        "pages": []
    }
    
    for i in range(len(doc)):
        page = doc[i]
        text = page.get_text()
        data["pages"].append({
            "page_num": i + 1,
            "text": text
        })
    
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

if __name__ == "__main__":
    extract_pdf_data(r"d:\Desktop\preethisri\A Comparative Transformer-Based Framework for Automated Classification of Pterygium and Conjunctivitis.pptx - Google Slides.pdf", "pptx_data.json")
    extract_pdf_data(r"d:\Desktop\preethisri\Final Report 24CSF05.pdf", "report_data.json")
