# Goal Calculator Update

## Scope
Update only the existing Goal Calculator. Leave every other calculator and page unchanged.

## Changes
- Replace the requested introduction, annual-return label, growth label, and disclaimer text.
- Add the subtle assumptions note below the main monthly SIP result.
- Display the target-amount input with Indian grouping and a rupee prefix while preserving comfortable typing and editing.
- Add an “Adjust target for inflation?” switch, off by default.
- When enabled, relabel the target as “Current Cost of Goal (₹)” and reveal an inflation input set to 6%, with a 0%–15% range.
- Calculate the estimated future goal cost from current cost, inflation, and years, then feed that amount into the existing monthly SIP formula.
- In inflation mode, show current cost, estimated future cost, time, monthly SIP, contributions, and estimated growth; clearly state that future cost is an inflation-based estimate.
- Keep the existing contributions-versus-growth chart design and the starting-earlier note.

## Technical Details
- Preserve the existing beginning-of-month SIP formula and its no-inflation behavior exactly.
- Maintain unrounded internal calculations and round only displayed rupee values.
- Keep the current sliders, two-column structure, and responsive styling.
- Verify the no-inflation default remains ₹21,520 monthly SIP, ₹25,82,433 contributions, and ₹24,17,567 growth.
- Verify inflation mode updates all dependent values immediately and handles 0% inflation correctly.
