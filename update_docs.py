import os
import re

files = [
    "README.md",
    "CONTRIBUTING.md",
    "docs/faq.md",
    "docs/features.md",
    "docs/glossary.md",
    "docs/official-links.md",
    "docs/overview.md",
    "docs/quick-start.md",
    "docs/troubleshooting.md",
    "docs/addons/index.md",
    "docs/installation/android-mobile.md",
    "docs/installation/android-tv.md",
    "docs/installation/ios.md",
    "docs/installation/index.md",
    "docs/installation/webos.md",
    "docs/integrations/debrid.md",
    "docs/settings/collections.md",
    "docs/settings/profiles.md",
    "docs/settings/index.md"
]

corrections = {
    r"\brecommened\b": "recommended",
    r"\bcontineu\b": "continue",
    r"\bseperate\b": "separate",
    r"\bintegraion\b": "integration",
    r"\bequuates\b": "equates",
    r"\brecentley\b": "recently",
    r"\bmilage\b": "mileage",
    r"\bOffical\b": "Official",
    r"\bappeear\b": "appear",
    r"\bcreateing\b": "creating",
    r"\blandsance\b": "landscape",
    r"\bportrai\b": "portrait",
    r"\bcomee\b": "come",
    r"\baccross\b": "across",
    r"\bteir\b": "tier",
    r"\beverytime\b": "every time",
    r"\bwebsit\b": "website",
    r"\byouur\b": "your"
}

def get_prefix(file_path):
    parts = file_path.split("/")
    if len(parts) == 1:
        return ""
    elif len(parts) == 2:
        return "../"
    elif len(parts) == 3:
        return "../../"
    else:
        return "../" * (len(parts) - 1)

def build_header(prefix):
    return f"""[Home]({prefix}README.md) | [Quick Start]({prefix}docs/quick-start.md) | [Overview]({prefix}docs/overview.md) | [Features]({prefix}docs/features.md) | [Installation]({prefix}docs/installation/index.md) | [Settings]({prefix}docs/settings/index.md) | [Troubleshooting]({prefix}docs/troubleshooting.md) | [FAQ]({prefix}docs/faq.md)

---
"""

for filepath in files:
    full_path = os.path.join(r"C:\Users\Nick\Documents\Nuvio", filepath.replace("/", "\\"))
    if not os.path.exists(full_path):
        print(f"Not found: {full_path}")
        continue
        
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Spelling corrections
    for pat, rep in corrections.items():
        content = re.sub(pat, rep, content, flags=re.IGNORECASE)

    # Custom lowercase nuvio replacement to Nuvio where applicable
    # We want to replace nuvio with Nuvio but ignore urls.
    def replace_nuvio(match):
        text = match.group(0)
        # Check context
        return "Nuvio" if text == "nuvio" else text

    # It's easier to replace whole word nuvio, except if it's nuvio.tv or github.com/nuvio
    content = re.sub(r"(?<![./])\bnuvio\b", "Nuvio", content)
    content = re.sub(r"(?<![./])\bnuvio's\b", "Nuvio's", content)
    
    # Capitalize Nuvio where it's at start of word
    content = content.replace("Nuvios", "Nuvio's")

    # Clean old headers:
    # Example 1: `[**Quick Start**](docs/quick-start.md) | ... ---`
    content = re.sub(r"^\[\*\*Quick Start\*\*\].*?---\s*", "", content, flags=re.DOTALL | re.MULTILINE)
    
    # Example 2: `[ðŸ  Home](../../README.md) | ... ---`
    content = re.sub(r"^\[.*?Home\].*?---\s*", "", content, flags=re.DOTALL | re.MULTILINE)

    # Example 3: Our newly generated header (to be safe if running script multiple times)
    content = re.sub(r"^\[Home\]\(.*?\).*?---\s*", "", content, flags=re.DOTALL | re.MULTILINE)

    # Now, add the new header at the very top.
    prefix = get_prefix(filepath)
    new_header = build_header(prefix)
    
    # Some files start with `# Title`, let's just prepend the header to everything, except if we want the title above.
    # The prompt says "Add a standard navigation header (or similar structure) at the top of the markdown files".
    # Putting it at the very top is standard.
    
    new_content = new_header + content

    with open(full_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_content)
        
    print(f"Processed {filepath}")

