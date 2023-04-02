import os
import pytesseract
from pdf2image import convert_from_path
from PyPDF2 import PdfReader
from PIL import Image

# Set the path for the input and output folders
input_folder = "pdfs/"
output_folder = "texts/"

# Define a function to convert PDF to text using OCR
def pdf_to_text(file_path):
    with open(file_path, 'rb') as f:
        pdf_reader = PdfReader(f)
        # Extract text from each page of the PDF file
        text = ""
        for i in range(len(pdf_reader.pages)):
            # Convert each page of the PDF to an image and apply OCR to extract text
            pil_image = convert_from_path(file_path, first_page=i+1, last_page=i+1)[0]
            text += pytesseract.image_to_string(pil_image)
        return text

# Loop through all PDF files in the input folder and convert them to text
for filename in os.listdir(input_folder):
    if filename.endswith(".pdf"):
        file_path = os.path.join(input_folder, filename)
        text = pdf_to_text(file_path)
        # Save the text to a text file in the output folder with the same name as the PDF file
        output_file_path = os.path.join(output_folder, os.path.splitext(filename)[0] + ".txt")
        with open(output_file_path, 'w') as f:
            f.write(text)


