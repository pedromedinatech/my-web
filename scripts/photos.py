"""Photos for /photos: import, placeholder data and an EXIF check.

Run from web/:

    python scripts/photos.py import <folder>   # add photos from a folder
    python scripts/photos.py placeholder       # demo data from the blog covers
    python scripts/photos.py check             # no published photo keeps EXIF/GPS

import: every JPG/PNG/WEBP/HEIC in <folder> is resized (max 2000 px on the long
side), re-encoded to webp WITHOUT metadata (no EXIF, no GPS) and saved to
public/images/photos/. Date, camera and exposure are read from the EXIF first
and kept only in content/photos.json. Location is never stored (Pedro's
decision). Re-running skips photos already imported (same content hash).
HEIC needs `pip install pillow-heif`.
"""
import hashlib
import json
import sys
from datetime import datetime
from pathlib import Path

from PIL import ExifTags, Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images" / "photos"
DATA = ROOT / "content" / "photos.json"
MAX_SIDE = 2000
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"}

TAGS = {v: k for k, v in ExifTags.TAGS.items()}


def load(path: Path) -> Image.Image:
    if path.suffix.lower() in {".heic", ".heif"}:
        try:
            import pillow_heif  # type: ignore
        except ImportError:
            sys.exit(f"{path.name}: HEIC needs `pip install pillow-heif` (or export the photos as JPEG).")
        pillow_heif.register_heif_opener()
    return Image.open(path)


def exif_fields(img: Image.Image) -> dict:
    exif = img.getexif()
    sub = exif.get_ifd(ExifTags.IFD.Exif) if exif else {}
    def g(name):
        tag = TAGS.get(name)
        return sub.get(tag) if tag in sub else exif.get(tag) if exif else None

    out = {}
    raw_date = g("DateTimeOriginal") or g("DateTime")
    if raw_date:
        try:
            out["date"] = datetime.strptime(str(raw_date), "%Y:%m:%d %H:%M:%S").strftime("%Y-%m-%d")
        except ValueError:
            pass
    make, model = g("Make"), g("Model")
    if model:
        model = str(model).strip()
        out["camera"] = model if make and str(make).strip() in model else f"{str(make or '').strip()} {model}".strip()
    if g("LensModel"):
        out["lens"] = str(g("LensModel")).strip()
    f = g("FNumber")
    if f:
        out["aperture"] = f"f/{float(f):.1f}".replace(".0", "")
    t = g("ExposureTime")
    if t:
        t = float(t)
        out["shutter"] = f"1/{round(1 / t)}s" if t < 1 else f"{t:g}s"
    iso = g("ISOSpeedRatings") or g("PhotographicSensitivity")
    if iso:
        out["iso"] = int(iso if not isinstance(iso, tuple) else iso[0])
    return out


def read_data() -> list:
    return json.loads(DATA.read_text(encoding="utf-8")) if DATA.exists() else []


def write_data(items: list) -> None:
    items.sort(key=lambda p: p.get("date") or "", reverse=True)
    DATA.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def cmd_import(folder: str) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    items = [p for p in read_data() if not p.get("placeholder")]
    known = {p["hash"] for p in items if "hash" in p}
    added = 0
    for path in sorted(Path(folder).iterdir()):
        if path.suffix.lower() not in EXTS:
            continue
        digest = hashlib.sha1(path.read_bytes()).hexdigest()[:12]
        if digest in known:
            continue
        img = load(path)
        meta = exif_fields(img)
        img = ImageOps.exif_transpose(img).convert("RGB")
        img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        name = f"{meta.get('date', 'undated')}-{digest}.webp"
        # A fresh image object carries no EXIF; save() without exif= writes none.
        clean = Image.new("RGB", img.size)
        clean.paste(img)
        clean.save(OUT_DIR / name, "WEBP", quality=84, method=6)
        items.append({"src": f"/images/photos/{name}", "width": clean.width, "height": clean.height,
                      "hash": digest, "alt": "", "title": "", **meta})
        known.add(digest)
        added += 1
    write_data(items)
    print(f"imported {added} photo(s); {len(items)} in total. Write an alt text for each in {DATA.relative_to(ROOT)}.")


def cmd_placeholder() -> None:
    """Demo data until Pedro's photos arrive: the blog covers, at their real size."""
    items = []
    for mdx in sorted((ROOT / "content" / "posts").glob("*.mdx")):
        for line in mdx.read_text(encoding="utf-8").splitlines():
            if line.startswith("coverImage:"):
                src = line.split(":", 1)[1].strip().strip('"')
                file = ROOT / "public" / src.lstrip("/")
                if not file.exists():
                    continue
                with Image.open(file) as im:
                    w, h = ImageOps.exif_transpose(im).size
                items.append({"src": src, "width": w, "height": h, "alt": "Placeholder: blog cover",
                              "title": "", "date": mdx.name[:10], "placeholder": True})
    # A few of Pedro's own photos already in the repo (no faces in the foreground),
    # so the demo mixes portrait and landscape like the real section will.
    for src in ["/images/sports.JPG", "/images/read.webp", "/images/hero.JPG", "/images/technology.webp"]:
        file = ROOT / "public" / src.lstrip("/")
        if file.exists():
            with Image.open(file) as im:
                w, h = ImageOps.exif_transpose(im).size
            items.append({"src": src, "width": w, "height": h, "alt": "Placeholder: one of Pedro's photos",
                          "title": "", "date": "", "placeholder": True})
    # Interleave so portraits are spread through the grid.
    portraits = [i for i in items if i["height"] > i["width"]]
    others = [i for i in items if i["height"] <= i["width"]]
    mixed = []
    while portraits or others:
        if others: mixed.append(others.pop(0))
        if others: mixed.append(others.pop(0))
        if portraits: mixed.append(portraits.pop(0))
    DATA.write_text(json.dumps(mixed, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"placeholder: {len(mixed)} images in {DATA.relative_to(ROOT)}")


def cmd_check() -> None:
    bad = []
    for p in OUT_DIR.glob("*") if OUT_DIR.exists() else []:
        with Image.open(p) as im:
            if im.getexif() or im.info.get("exif") or im.info.get("xmp"):
                bad.append(p.name)
    if bad:
        sys.exit("metadata found in: " + ", ".join(bad))
    print("ok: no EXIF/XMP in public/images/photos")


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] not in {"import", "placeholder", "check"}:
        sys.exit(__doc__)
    {"import": lambda: cmd_import(sys.argv[2]), "placeholder": cmd_placeholder, "check": cmd_check}[sys.argv[1]]()
