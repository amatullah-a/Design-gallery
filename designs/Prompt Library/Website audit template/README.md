# Website Template — How to Use

## Why this folder exists
This folder contains the prompt workflow for reviewing websites using distinct evaluation categories, such as design-system consistency, UI quality, components, layout, and UX.

## File in this folder
- **`design-evaluation-prompt.txt`** — explains how to select and run evaluation prompts and includes individual audit prompts and strict output requirements.

## Recommended process
1. **Set the evaluation objective.** Decide which aspect you need to review: design-system consistency, overall UI, components, layout, UX, or another category provided in the prompt file.
2. **Choose one audit scope.** Use the relevant prompt section rather than treating all evaluation categories as interchangeable.
3. **Provide the source.** Supply the wireframe/design, website URL, screenshots, or prototype and any context required by that prompt.
4. **Attach the output template.** Attach `Audit_Report_Output_Template.html` from this folder together with the selected audit prompt and the source design/site. In the AI tool, explicitly ask it to use the attached HTML file as the report structure. If the selected prompt specifies a stricter or different format, follow that prompt and update the template accordingly. The prompt also references a shared Drive folder; use its original template instead if you have access to it and it is the required source.
5. **Keep the prompt intact.** Follow the selected section's scope, exclusions, table fields, and strict output format.
6. **Run additional audits sequentially if needed.** Keep their findings within separate scopes, then synthesize the results after each individual audit is complete.
7. **Check the output.** Confirm that it follows the required HTML/report structure and that findings are specific to the supplied evidence.

## Inputs to provide
- The design/wireframe/prototype or accessible website URL
- The evaluation category and audit scope
- Relevant screenshots or viewport evidence
- `Audit_Report_Output_Template.html` (attach this with the audit prompt; use the original shared-Drive template instead if available and required)

## Expected output
The output format specified by the chosen audit section. The file includes strict requirements for downloadable HTML-only output in several audit sections; follow the exact section used.

## Important notes
- The included HTML file is a practical starter template based on the field structure described in the prompt; it has not been verified as the original file stored in the shared Drive folder. If the original template is available, prefer that original.
- Do not mix scopes or invent findings. Respect the exclusions listed in the selected audit prompt.
