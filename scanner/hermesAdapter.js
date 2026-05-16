export async function getHermesRuntimeStatus() {
  return {
    available: false,
    mode: "stub",
    message:
      "Hermes Agent runtime is not connected. Hermes Guard is running deterministic local rules only.",
  };
}

export async function enrichFindingsWithHermes(findings) {
  const status = await getHermesRuntimeStatus();

  return {
    status,
    findings,
    notes: [
      "Adapter boundary is ready for a future Hermes Agent integration.",
      "No Hermes runtime claims are made while the adapter is in stub mode.",
    ],
  };
}
