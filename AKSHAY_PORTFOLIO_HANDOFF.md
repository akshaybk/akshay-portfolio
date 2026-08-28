# Akshay Portfolio — Development Handoff

## Purpose

This file is the persistent handoff/context document for continuing development of the portfolio website.

When resuming work, the user should be able to say:

> **"Continue where we left off"**

Use this document as the primary project context. Do not restart the project or redesign completed work unless the user explicitly asks.

---

# 1. Repository

**GitHub repository:** `https://github.com/akshaybk/akshay-portfolio`

**Active development branch:** `feature/admin-dashboard`

## Critical branch rule

**Work ONLY on `feature/admin-dashboard` unless the user explicitly says otherwise.**

Do not make changes directly to `main` or another branch.

---

# 2. Project

This is Akshay B K's dynamic personal portfolio website.

The portfolio is intended to be:

- modern
- minimal
- dark
- professional
- developer-focused
- purple-accented
- responsive
- dynamically driven by Supabase data

The public portfolio and admin dashboard are part of the same project.

---

# 3. Current Architecture / State

The backend/data layer was completed before the current UI work.

Supabase is used for:

- profile
- projects
- skills
- experience
- education
- social links
- site settings

Authentication:

- Supabase Auth is working.
- Admin login is working.
- Authentication middleware protects POST/PUT/DELETE operations.
- GET endpoints remain public.

The Admin Dashboard is functional enough to manage the portfolio data.

---

# 4. Admin Dashboard Status

The admin dashboard was the main earlier development phase.

Completed:

- Admin login/authentication
- Dashboard navigation
- Profile editor
- Projects editor
- Skills editor
- Experience editor
- Education editor
- Social Links editor
- Site Settings editor
- Saving/updating data
- Authentication/permissions debugging

There was an important Supabase update problem where profile saving produced:

`Cannot coerce the result to a single JSON object`

and later:

`Profile was not updated. Verify the profile ID and database permissions.`

This was debugged and the save functionality was ultimately reported as **working fine**.

## Admin-dashboard conclusion

The admin dashboard is considered sufficiently complete for now.

Do not keep adding admin features unless a real issue is found or the user explicitly requests one.

The project should now focus primarily on the public portfolio.

---

# 5. Public Portfolio Sections

Current section order:

1. Hero
2. About
3. Skills
4. Experience
5. Education
6. Projects
7. Contact
8. Footer

The visual system has already been established across these sections.

---

# 6. Visual Design System

The portfolio uses a dark minimalist aesthetic.

Important visual characteristics:

- Background around `#08070b`
- Slightly lighter card backgrounds
- White/off-white primary text
- Muted gray secondary text
- Purple primary accent
- Thin subtle borders
- Restrained glow effects
- Rounded corners
- Minimal shadows
- Generous spacing
- Strong typography hierarchy

Existing CSS variables include concepts such as:

- `--accent-color`
- `--accent-soft`
- `--accent-border`
- `--bg`
- `--bg-soft`
- `--card`
- `--card-hover`
- `--text`
- `--text-soft`
- `--text-muted`
- `--text-faint`
- `--border`
- `--border-strong`

Do not introduce a completely different visual language.

---

# 7. About Section

About was visually polished.

Current direction:

- Strong section heading
- Readable biography
- Compact personal-information/details area
- Email/location/availability style information
- Responsive layout
- Same dark/purple visual language as the rest of the site

Consider this section visually complete unless QA reveals a problem.

---

# 8. Skills Section

Skills was heavily refined.

Current behavior:

- Skills grouped by category
- Consistent skill cards
- Proficiency percentage
- Proficiency bar
- Responsive two-column desktop layout
- One-column mobile layout

## Important icon decision

The original technology icons were visually inconsistent.

Problems included:

- some icons displaying
- some icons missing
- colored logos clashing with the website
- inconsistent icon appearance between technologies

The icon system was changed to:

- consistent monochrome icons
- muted appearance
- consistent icon containers
- purple accent on hover
- reliable fallback handling
- same dimensions and spacing for every icon
- category/icon styling matching the portfolio aesthetic

Do NOT revert to random colored technology logos.

---

# 9. Experience Section

Experience was redesigned into a vertical timeline.

Current direction:

- Vertical timeline
- Purple timeline markers
- Subtle timeline line
- Clean experience cards
- Role/company hierarchy
- Date range
- Current position highlighting
- Technology tags
- Responsive mobile behavior
- Subtle hover effects

Consider visually complete unless QA reveals a problem.

---

# 10. Education Section

Education was redesigned into clean academic cards.

Current direction:

- Degree
- Field
- Institution
- Dates
- Location
- Description
- Desktop date/layout separation
- Responsive stacking

Consider visually complete unless QA reveals a problem.

---

# 11. Projects Section — MOST RECENT WORK

Projects have been the most recently adjusted section.

The goal is to make the section visually close to the previously generated reference design.

Current heading:

**Selected Projects**

Supporting text:

**A selection of things I've built and worked on.**

The section includes:

- project slug/category
- title
- description
- technology pills
- GitHub button
- Live Demo button where available
- project preview area
- fallback preview when no image exists
- purple ambient background/glow
- subtle image/preview hover treatment

## Important project-card requirement

The user explicitly wants:

> **All project cards must always be the same size.**

This is a hard requirement.

Different:

- description lengths
- technology counts
- button counts
- image availability

must NOT cause project cards to have different outer dimensions.

---

# 12. Current Projects CSS

A dedicated file was created:

`frontend/src/projects-uniform.css`

It contains the uniform sizing rules.

The latest change introduced fixed desktop sizing rather than relying only on grid stretching.

Latest intended behavior:

- Desktop project cards: fixed uniform height around **380px**
- Tablet: fixed uniform height around **400px**
- Mobile: natural/stacked height to avoid cramped cards

The card uses a two-part layout on desktop:

- project information/content
- project preview/media

The project preview itself should also remain consistent.

Technology tags and buttons should not push the card beyond the fixed dimensions.

---

# 13. Latest Projects Commit

Latest known project-card sizing commit:

`90bc15b` — Fix project cards to fixed uniform height

Earlier related project commits:

`32e3b1d` — uniform project card dimensions

`2c631e2` — load uniform project styles

`b38df41` — uniform project showcase component

`44f94b0` — new project showcase styling

`6d3cd23` — load showcase styles

The exact current repository state should always be checked before making further changes.

---

# 14. Contact + Footer

Contact and Footer were also polished.

Contact direction:

- Strong "Let's Connect" heading
- Subtle purple ambient background
- Social links as clean cards
- Consistent monochrome icons
- Hover states
- External-link indicators
- Responsive layout

Footer direction:

- Minimal
- Copyright
- "Built with React"
- Responsive layout
- Same subdued aesthetic

These sections are considered visually complete for now.

---

# 15. Public Portfolio Current Completion

At this point the main public visual system is considered substantially complete:

**Hero → About → Skills → Experience → Education → Projects → Contact → Footer**

The next logical task is NOT automatically another redesign.

The next phase should be:

## Full visual + responsive QA

Check the entire website for:

- inconsistent spacing
- inconsistent card sizes
- horizontal overflow
- mobile navigation
- mobile typography
- mobile card layout
- section spacing
- project-card sizing
- broken/missing images
- broken icons
- button alignment
- long text overflow
- viewport-height issues
- sticky navbar behavior
- anchor scrolling
- hover states
- loading states
- empty database states
- accessibility basics

Test both desktop and mobile widths.

---

# 16. Project Data Philosophy

Keep the portfolio dynamic.

Do NOT hardcode project/skill/experience/education data into the UI when the data already comes from Supabase.

The Admin Dashboard should remain the source of truth for portfolio content.

For projects in particular:

- use existing database records
- use `image_url` when present
- use a graceful fallback when no image is present
- do not invent fake project screenshots or fake project data

---

# 17. User Preferences / Working Style

The user prefers to work iteratively.

Typical instructions are:

- "continue"
- "continue where we left off"
- "do it"
- "update the code"
- "fix this"

When the user says **continue**, infer the next sensible development step from this document and the actual current repository state.

Do not repeatedly ask what to work on if the next task is clear.

When making code changes:

1. Inspect the current branch.
2. Inspect the relevant existing files.
3. Make the smallest clean change needed.
4. Keep the existing architecture.
5. Verify the change if possible.
6. Commit the change.
7. Tell the user what changed and give the commit hash.
8. Keep work on `feature/admin-dashboard`.

---

# 18. Important Recent User Feedback

The user specifically noticed:

### Skills

"The skill icons don't match the aesthetics of the website."

Then:

"some icons are visible some are not, the icons are not consistent"

This led to the monochrome/reliable icon system.

### Projects

The user noticed:

"currently the projects card differ in sizes, i want it to be of same size"

Then explicitly:

"the cards must always be of same size"

This is a strong ongoing requirement.

The latest implementation uses fixed card heights.

---

# 19. Reference Design

The user previously supplied/reference-generated a project-section design and asked the website to look as close as possible to it.

The desired visual direction is:

- dark black background
- large white heading
- small uppercase purple section label
- subtle purple ambient glow
- evenly sized project cards
- restrained borders
- large clean typography
- project information on one side
- preview/media area on the other
- subtle purple accents
- minimal professional appearance

Do not overdecorate it.

---

# 20. Development Rules

## Branch

Always use:

`feature/admin-dashboard`

## Avoid

- unrelated dependency changes
- unnecessary rewrites
- hardcoded portfolio content
- fake screenshots
- inconsistent icon libraries/styles
- random colors
- oversized cards
- different card dimensions for equivalent project cards
- breaking existing admin functionality

## Prefer

- existing components
- existing data APIs
- existing CSS variables
- reusable components
- responsive CSS
- semantic HTML
- graceful fallbacks
- small focused commits

---

# 21. Suggested Next Steps

When resuming, use this priority order:

### Step 1 — Verify current Projects section

Open:

`http://localhost:5173/#projects`

Confirm:

- all cards are equal size
- no overflow
- preview areas are equal
- buttons align
- mobile layout works

### Step 2 — Full responsive QA

Test:

- desktop ~1440px
- laptop ~1024px
- tablet ~768px
- mobile ~390px

### Step 3 — Fix any visual inconsistencies

Prioritize actual problems visible during QA.

### Step 4 — Improve project imagery

Only if needed:

- add real project screenshots through Admin Dashboard
- make sure image cropping is consistent
- avoid fake images

### Step 5 — Accessibility / polish

Check:

- semantic headings
- link labels
- keyboard focus
- contrast
- alt text
- reduced motion where appropriate

### Step 6 — Final production pass

Check:

- build
- routes
- Supabase data loading
- auth
- mobile layout
- empty states
- errors
- deployment readiness

---

# 22. Resume Instruction

When the user starts a future conversation and says:

> **"Continue where we left off"**

Do the following:

1. Read this handoff document if it is available.
2. Check the current GitHub state of `feature/admin-dashboard`.
3. Identify the latest commit and actual current files.
4. Do not assume the repository is identical to this document if newer commits exist.
5. Continue from the actual latest state.
6. Start with the highest-priority unfinished task.
7. Work directly on the code rather than only explaining what could be done.

The user does not want to repeatedly explain the project history.

---

# 23. Current Snapshot

**Project:** Akshay B K Portfolio

**Repository:** `akshaybk/akshay-portfolio`

**Branch:** `feature/admin-dashboard`

**Admin Dashboard:** Functionally complete / stable

**Public Portfolio:** Main sections implemented and visually polished

**Latest focus:** Projects card sizing

**Latest commit:** `90bc15b`

**Current priority:** Full responsive + visual QA

**Hard requirement:** Project cards must always be equal-sized on desktop/tablet.

**Design:** Minimal dark portfolio with restrained purple accents.

---

# 24. Change Log

## Admin Dashboard phase
- Built admin dashboard
- Added authentication
- Connected portfolio data to Supabase
- Added editors for major portfolio entities
- Fixed profile update/auth/database permission issues

## Public portfolio phase
- Polished About
- Polished Skills
- Normalized Skills icons
- Polished Experience
- Polished Education
- Polished Projects
- Polished Contact
- Polished Footer

## Projects phase
- Reworked project showcase
- Made project cards uniform
- Added dedicated uniform-project CSS
- Added fixed card dimensions
- Added responsive behavior
- Added media placeholders/fallbacks

---

# 25. Golden Rule

**Do not lose the existing work.**

When continuing:

> inspect → understand → modify → verify → commit

The goal is to progressively finish the existing portfolio, not repeatedly rebuild it from scratch.
