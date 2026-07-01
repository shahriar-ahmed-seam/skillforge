# Ollama setup

SkillForge uses [Ollama](https://ollama.com) to run a language model locally — private, offline and free.

## 1. Install Ollama

- **macOS / Windows / Linux**: download from <https://ollama.com/download> and run the installer.
- Ollama starts a local server at `http://localhost:11434` automatically.

Verify it's running:

```bash
ollama --version
curl http://localhost:11434/api/version
```

## 2. Pull a model

SkillForge defaults to **`gemma3:4b`** — a strong, compact model that runs comfortably on most machines:

```bash
ollama pull gemma3:4b
```

Other good options (set `OLLAMA_MODEL` to switch):

| Model | Pull command | Notes |
| --- | --- | --- |
| `gemma3:4b` | `ollama pull gemma3:4b` | Default. Great balance of quality/speed. |
| `llama3.2` | `ollama pull llama3.2` | Fast, lightweight. |
| `mistral` | `ollama pull mistral` | Solid all-rounder. |
| `phi3` | `ollama pull phi3` | Very small, fastest. |

Confirm the model is available:

```bash
ollama list
```

## 3. Configure SkillForge (optional)

Copy `.env.example` to `.env.local` and adjust if needed:

```bash
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=gemma3:4b
AI_MODE=auto
```

## Troubleshooting

**“Falls back to demo content”**
- Make sure Ollama is running (`ollama list`) and the model is pulled.
- Check the endpoint: `curl http://localhost:11434/api/version`.
- Set `AI_MODE=ollama` to see the underlying error instead of the silent fallback.

**Slow generation**
- Use a smaller model (`phi3`, `llama3.2`).
- Close memory-heavy apps; a 4B model wants ~4–6 GB free RAM.

**Structured output errors**
- Some very small models struggle with strict JSON. `gemma3:4b` and larger handle it well; on failure SkillForge falls back to demo content automatically.
