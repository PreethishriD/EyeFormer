from transformers import SegformerForImageClassification, SegformerImageProcessor

print("Pre-downloading nvidia/mit-b0 model config and processor...")
SegformerImageProcessor.from_pretrained("nvidia/mit-b0")
SegformerForImageClassification.from_pretrained(
    "nvidia/mit-b0",
    num_labels=2,
    ignore_mismatched_sizes=True
)
print("Download complete.")
