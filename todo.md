# Kickvora Page Redesign TODO

- [ ] About Us page — real content, brand story, mission, team info
- [ ] How It Works page — clear 4-step process with icons
- [ ] Contact page — real email, address, contact form
- [ ] Terms of Use page — proper legal content
- [ ] Privacy Policy page — proper privacy content
- [ ] Login page — clean UI, no mock data
- [ ] Register page — clean UI, no mock data
- [ ] Dashboard page — empty state design (no mock data)
- [ ] Matches page — empty state design (no mock data)
- [ ] Leaderboard page — empty state design (no mock data)
- [ ] Profile page — clean UI with real fields

## reCAPTCHA + Age Gate
- [ ] Add RECAPTCHA_SECRET_KEY and NEXT_PUBLIC_RECAPTCHA_SITE_KEY env vars
- [ ] Build /api/verify-gate backend route (reCAPTCHA v3 token check + issue signed cookie)
- [ ] Build VerificationGate client component (blur overlay, Step 1 reCAPTCHA, Step 2 age)
- [ ] Wire VerificationGate into root layout.tsx
- [ ] Handle session cookie to skip gate for already-verified users
