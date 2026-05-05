import fitz  # PyMuPDF
import os

def extract_images(pdf_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    doc = fitz.open(pdf_path)
    for i in range(len(doc)):
        for img_index, img in enumerate(doc.get_page_images(i)):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            filename = f"{os.path.basename(pdf_path).split('.')[0]}_p{i}_img{img_index}.{image_ext}"
            with open(os.path.join(output_dir, filename), "wb") as f:
                f.write(image_bytes)

if __name__ == "__main__":
    ppt_path = r"d:\Desktop\preethisri\A Comparative Transformer-Based Framework for Automated Classification of Pterygium and Conjunctivitis.pptx - Google Slides.pdf"
    report_path = r"d:\Desktop\preethisri\Final Report 24CSF05.pdf"
    output = r"d:\Desktop\preethisri\dashboard\public\assets"
    
    extract_images(ppt_path, output)
    extract_images(report_path, output)
    print("Images extracted successfully.")
