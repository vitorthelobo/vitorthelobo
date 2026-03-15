#!/usr/bin/env python3
"""
The Lobo Design — Leonardo AI Mockup Generator
Gera os 25 prompts de mockup via Leonardo AI API e salva as imagens localmente.

Uso:
    python3 generate-mockups.py

Requisitos:
    pip install requests
"""

import requests
import json
import time
import re
import os
from pathlib import Path

# ─── CONFIG ──────────────────────────────────────────────────────────────────

API_KEY = "5e6b37a8-3a95-4d5d-a553-ee8609da665f"
BASE_URL = "https://cloud.leonardo.ai/api/rest/v1"
OUTPUT_DIR = "generated-mockups"
PROMPTS_FILE = "brand-mockup-prompts.md"

HEADERS = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": f"Bearer {API_KEY}",
}

# Aspect ratio → (width, height) compatível com Leonardo AI
AR_DIMENSIONS = {
    "16:9": (1344, 768),
    "4:3":  (1024, 768),
    "3:2":  (1024, 680),
    "2:3":  (680, 1024),
    "3:4":  (768, 1024),
    "9:16": (768, 1344),
}

# ─── PARSE PROMPTS ───────────────────────────────────────────────────────────

def parse_prompts(filepath: str) -> list[dict]:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = (
        r"## Mockup (\d+) — ([^\n]+)\n\n"
        r"\*\*Prompt:\*\*\n`([^`]+)`\n\n"
        r"\*\*Ferramenta recomendada:\*\* [^\n]+\n"
        r"\*\*Parâmetros sugeridos:\*\* `([^`]+)`"
    )
    matches = re.findall(pattern, content)

    prompts = []
    for num, title, prompt, params in matches:
        ar_match = re.search(r"--ar (\d+:\d+)", params)
        ar = ar_match.group(1) if ar_match else "4:3"
        prompts.append({
            "number": int(num),
            "title": title.strip(),
            "prompt": prompt.strip(),
            "ar": ar,
        })

    return prompts

# ─── LEONARDO API ─────────────────────────────────────────────────────────────

def submit_generation(prompt_data: dict) -> str | None:
    width, height = AR_DIMENSIONS.get(prompt_data["ar"], (1024, 768))

    payload = {
        "prompt": prompt_data["prompt"],
        "width": width,
        "height": height,
        "num_images": 1,
        "photoReal": True,
        "photoRealVersion": "v2",
        "presetStyle": "CINEMATIC",
        "guidance_scale": 7,
        "highResolution": False,
    }

    try:
        resp = requests.post(f"{BASE_URL}/generations", headers=HEADERS, json=payload, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        return data.get("sdGenerationJob", {}).get("generationId")
    except requests.HTTPError as e:
        print(f"         ✗ HTTP {e.response.status_code}: {e.response.text[:200]}")
        return None
    except Exception as e:
        print(f"         ✗ Erro ao submeter: {e}")
        return None


def poll_generation(generation_id: str, max_wait: int = 180) -> list | None:
    deadline = time.time() + max_wait
    while time.time() < deadline:
        try:
            resp = requests.get(
                f"{BASE_URL}/generations/{generation_id}",
                headers=HEADERS,
                timeout=15,
            )
            resp.raise_for_status()
            data = resp.json()
            gen = data.get("generations_by_pk", {})
            status = gen.get("status")

            if status == "COMPLETE":
                return gen.get("generated_images", [])
            elif status == "FAILED":
                print(f"         ✗ Geração falhou (servidor reportou FAILED)")
                return None

        except Exception as e:
            print(f"         ⚠ Erro ao verificar status: {e}")

        time.sleep(6)

    print(f"         ✗ Timeout após {max_wait}s")
    return None


def download_image(url: str, filepath: str) -> bool:
    try:
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        with open(filepath, "wb") as f:
            f.write(resp.content)
        return True
    except Exception as e:
        print(f"         ✗ Erro ao baixar imagem: {e}")
        return False

# ─── MAIN ────────────────────────────────────────────────────────────────────

def safe_filename(title: str) -> str:
    return re.sub(r"[^\w\-]", "_", title)[:50]


def main():
    Path(OUTPUT_DIR).mkdir(exist_ok=True)

    prompts = parse_prompts(PROMPTS_FILE)
    print(f"\n🐺 The Lobo Design — Leonardo AI Generator")
    print(f"{'─'*50}")
    print(f"   Prompts encontrados : {len(prompts)}")
    print(f"   Pasta de saída      : ./{OUTPUT_DIR}/")
    print(f"{'─'*50}\n")

    results = []

    for prompt_data in prompts:
        n = prompt_data["number"]
        title = prompt_data["title"]
        ar = prompt_data["ar"]

        print(f"[{n:02d}/25] {title}")
        print(f"         AR: {ar}  →  {AR_DIMENSIONS.get(ar, (1024, 768))}")

        gen_id = submit_generation(prompt_data)
        if not gen_id:
            results.append({"number": n, "title": title, "status": "failed_submit"})
            print()
            continue

        print(f"         ⏳ ID: {gen_id} — aguardando...")

        images = poll_generation(gen_id)
        if not images:
            results.append({"number": n, "title": title, "status": "failed_generation"})
            print()
            continue

        image_url = images[0]["url"]
        filename = f"mockup_{n:02d}_{safe_filename(title)}.jpg"
        filepath = os.path.join(OUTPUT_DIR, filename)

        if download_image(image_url, filepath):
            size_kb = os.path.getsize(filepath) // 1024
            print(f"         ✅ {filename} ({size_kb} KB)")
            results.append({
                "number": n,
                "title": title,
                "status": "success",
                "file": filename,
                "url": image_url,
            })
        else:
            results.append({"number": n, "title": title, "status": "failed_download", "url": image_url})

        print()
        time.sleep(2)  # respeita rate limit

    # ─── RELATÓRIO FINAL ─────────────────────────────────────────────────────
    ok = [r for r in results if r["status"] == "success"]
    fail = [r for r in results if r["status"] != "success"]

    print(f"{'═'*50}")
    print(f"  GERAÇÃO CONCLUÍDA")
    print(f"  ✅ Sucesso : {len(ok)}/25")
    if fail:
        print(f"  ❌ Falhas  : {len(fail)}/25")
        for r in fail:
            print(f"     • [{r['number']:02d}] {r['title']} — {r['status']}")
    print(f"  📁 Imagens em: ./{OUTPUT_DIR}/")
    print(f"{'═'*50}\n")

    log_path = os.path.join(OUTPUT_DIR, "generation-log.json")
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"  Log salvo em: {log_path}")


if __name__ == "__main__":
    main()
