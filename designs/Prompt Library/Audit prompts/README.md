# Audit Prompts — How to Use

## Why this folder exists
This folder contains the component-specific visual audit prompt and the shared visual component rules used to judge SaaS interface components. Use them together when you need an evidence-led review of visible component presentation.

## Files in this folder
- **`Component_Specific_Visual_Audit_Prompt_Updated_v3.1.txt`** — defines the audit boundary, evidence rules, inspection method, and reporting process for a manual component-by-component visual audit.
- **`Skills_File_Visual_Component_Rules_Updated.txt`** — provides reusable component evaluation principles and rule IDs/categories that can be referenced when judging visible presentation.

## When to use these prompts
Use this set when reviewing a SaaS web application, dashboard, admin panel, management system, or prototype and you need to assess visible component quality and consistency. It is not a substitute for a general UX review, code review, backend test, or functional test.

## Recommended process
1. **Prepare the evidence.** Provide the current rendered prototype, accessible screens, screenshots or recordings, and the relevant viewport sizes/states.
2. **Provide the rules.** Attach both files in this folder. If the prompt references a component audit specification or another audit prompt, supply it if available.
3. **State the scope.** Ask for a component-level visual audit. Keep general UX, source-code inspection, backend correctness, and interaction testing out of a visual-only audit.
4. **Inspect all available components.** Follow the audit prompt's inventory, component-by-component inspection, consistency review, and historical-finding verification steps where applicable.
5. **Require evidence.** Findings should describe visible symptoms and cite the supplied screen/state or location. Do not infer missing components, hidden states, or technical root causes without evidence.
6. **Request the specified report.** Follow the output structure required by the prompt. If the required HTML report template is not available, state that limitation and ask for an accessible copy rather than pretending to have used it.
7. **Review findings.** Separate confirmed visual defects from optional improvements and evidence limitations. Recheck prior findings against the current prototype.

## Inputs to provide
- The rendered website/prototype or screenshots/recordings
- Screens and viewport sizes to inspect
- The two files in this folder
- Any referenced component specification, shared report template, or prior audit, if available

## Expected output
An evidence-led component visual audit covering only applicable, observable component properties and consistency. The exact report format should follow the selected audit prompt.

## Important boundaries
- The main component audit prompt explicitly excludes source-code/DOM/CSS inspection, backend/API/data correctness, functional testing, broad UX review, and unsupported accessibility claims.
- The shared rules are evaluation criteria, not proof that a defect exists. Apply rules only where relevant to the supplied prototype.
- If a referenced document is missing, the audit must disclose that limitation.
