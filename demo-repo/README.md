# Demo Agentic Repo

This is a safe synthetic repository for Hermes Guard demos.

It intentionally contains risky-looking AI-agent automation patterns so the scanner can produce evidence-backed findings. The fake keys are clearly fake and must never be used as credentials.

Example risky policy:

```yaml
approval_mode: none
allow: "*"
```

The scanner only reads these files. It does not run scripts inside this repository.
