You are working on the `redesign-v2` branch of the VitalEdge Lab website.

Before making any changes, read and inspect:

1. The complete existing website code.
2. `BRIEFING.md`.
3. `docs/redesign-v2-brief.md`.
4. All reference images inside `docs/references/stitch/`.

CRITICAL SOURCE-OF-TRUTH RULE

The reference images are the source of truth ONLY for the new visual design.

The current website and `BRIEFING.md` are the source of truth for:

- all Spanish copy
- section order
- section content
- navigation labels
- buttons and links
- service categories
- differentiators
- methodology
- projects structure
- contact form fields
- footer information
- responsive behavior
- accessibility
- existing functionality

Do not treat the reference images as content references.

MAIN OBJECTIVE

Redesign the existing VitalEdge Lab website using the visual language of the
reference images, while preserving and adapting every section and every relevant
piece of content currently implemented.

This is not a new landing page.

This is a visual redesign of the existing website.

The final result must contain the same sections and communicate the same
information as the current website, but presented using the new visual system
inspired by the Stitch references.

PRESERVE THE EXISTING WEBSITE

Preserve:

- all existing Spanish texts
- all existing sections
- the current section order
- the navigation structure
- all four service blocks
- all differentiators
- all thesis statements
- the projects section
- the methodology section
- the contact section
- the contact form fields and functionality
- the footer
- all anchor links
- the About page
- accessibility features
- responsive behavior
- SEO metadata unless an improvement is clearly justified

Do not remove a section because it does not appear in the reference images.

Do not replace existing sections with generic new sections.

Do not shorten, rewrite, translate or summarize the existing copy unless a very
small adjustment is required for responsive layout. In that case, preserve the
meaning and report the change.

Do not translate Spanish content into English.

Do not invent:

- statistics
- addresses
- telephone numbers
- clients
- testimonials
- services
- awards
- projects
- team members
- medical claims

VISUAL REFERENCE USAGE

Use the images inside `docs/references/stitch/` as strong visual inspiration for:

- overall art direction
- layout composition
- card proportions
- layered panels
- overlapping elements
- image placement
- modular grids
- large typography
- asymmetrical compositions
- section rhythm
- scientific visual atmosphere
- generous negative space
- subtle translucent surfaces
- image and text integration
- visual hierarchy
- rounded containers
- large editorial content blocks

The new website should clearly feel inspired by these references.

However, do not copy:

- their English content
- their purple palette
- their invented data
- their contact details
- their logos
- their exact section names
- their exact layouts pixel by pixel

Adapt the design language to VitalEdge Lab.

BRAND IDENTITY TO PRESERVE

Keep the existing VitalEdge Lab accent color and brand palette:

--bone: #F4F0E8
--ivory: #FBF8F2
--linen: #E7E3D8
--clay: #BBAE9C
--sage: #7C8A78
--sage-deep: #5C6A58
--espresso: #2B2722

The final redesign must use sage green as the main accent instead of the purple
used in the Stitch reference images.

Typography:

- Fraunces for display headings
- Hanken Grotesk for body text
- Jost for labels, eyebrows and utility text

The result should feel:

- editorial
- scientific
- contemporary
- premium
- calm
- precise
- human
- trustworthy
- visually distinctive

SECTION-BY-SECTION ADAPTATION

Every existing section must be redesigned using the reference visual language.

Navigation:
Keep the existing logo, navigation labels, links and CTA.
Adapt the visual treatment to the new design.

Hero:
Keep the exact existing Spanish headline, eyebrow, supporting copy and CTAs.
Use the layered, asymmetrical and scientific composition of the references.

Introduction:
Keep the existing introduction copy.
Adapt it into a more editorial composition with layered content and imagery.

Differentiators:
Keep all existing differentiators and descriptions.
Do not reduce their number.
Present them using a modular visual system inspired by the references.

Services:
Keep all four existing service categories, descriptions, deliverables and thesis
statements.
Do not replace them with the three generic service cards shown in the references.
Use the reference composition style to redesign the existing service content.

Projects:
Keep the existing projects structure and categories.
Use the varied card sizes, image hierarchy and modular layout from the references.

Methodology:
Keep all six existing stages in the correct order.
Adapt them to a clear visual timeline or connected modular process.

Contact:
Keep the exact existing Spanish contact copy, contact details, form fields and
form functionality.
Use the reference contact layout only as inspiration for composition.

Footer:
Keep all existing footer content and links.
Adapt only its visual presentation.

IMPLEMENTATION RULES

- Work only on the `redesign-v2` branch.
- Do not modify `main`.
- Do not overwrite the current production version.
- Reuse the current semantic HTML and components where practical.
- Preserve existing functionality.
- Prefer adapting the current structure rather than rebuilding everything from
  scratch.
- Do not introduce a new framework without explicit approval.
- Do not add unnecessary dependencies.
- Keep the code clean, maintainable and responsive.
- Respect `prefers-reduced-motion`.
- Maintain visible keyboard focus.
- Maintain accessible contrast.
- Ensure no horizontal overflow on mobile.

WORKFLOW

Do not implement the entire redesign in one operation.

First:

1. Inspect the project structure.
2. Identify all currently implemented sections.
3. List the exact texts and functionality that must be preserved.
4. Compare each existing section with the visual references.
5. Propose how each section will be visually adapted.
6. List the files that need to be modified.
7. Present a phased implementation plan.

Do not modify files until the plan is complete.

The implementation phases should be:

Phase 1:
- design tokens
- global layout system
- navigation
- hero

Phase 2:
- introduction
- differentiators

Phase 3:
- services

Phase 4:
- projects
- trust elements, only if real data already exists

Phase 5:
- methodology

Phase 6:
- contact
- footer
- About page

Phase 7:
- responsive adjustments
- animations
- accessibility
- performance
- final visual polish

After every phase:

- run the available checks
- verify responsive behavior
- summarize modified files
- explain any content changes
- stop before continuing to the next phase
