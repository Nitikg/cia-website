# NGO Platform — User Flows
### For Non-Technical Team
> This document explains what every person who visits our website will see and experience, page by page.

---

## Who Uses This Website?

There are 3 types of people:

| Person | Who They Are |
|---|---|
| **Visitor / Donor** | Anyone who lands on our site — wants to donate or learn about us |
| **Volunteer** | Someone who has joined us as a fundraising intern — shares their personal link |
| **Admin** | Our internal team — manages everything behind the scenes |

---

## 🌐 THE PUBLIC WEBSITE
*Anyone can visit these pages without logging in*

---

### Page 1 — Home (`/`)

This is the first page anyone sees when they visit our website.

**What they see, top to bottom:**

1. **Navigation bar** — Logo on the left. Links to: Home, About Us, Our Work, Get Involved. A bright "Donate Now" button always visible on the right.

2. **Hero Section** — A full-screen banner with a powerful headline about our mission. Two buttons: "Donate Now" and "Become a Volunteer."

3. **Story Cards** — 2 rotating cards, each showing a real child or community member's story. Each card shows: their photo, their situation, and what happens without support. This helps visitors emotionally connect before donating.

4. **Founder's Note** — A photo of the founder with a personal message about why the NGO exists. Builds trust and human connection.

5. **How We Help** — 3 simple blocks explaining what we do. Each block has an icon and 1–2 sentences.

6. **Who Makes It Happen** — Cards for: Facilitators/Teachers, Fundraising Volunteers, Corporate Partners.

7. **Impact Numbers** — Animated counters showing: Children Impacted, Drives Conducted, Volunteers Mobilised, Cities Covered. Numbers count up as you scroll to them.

8. **Awards & Media** — Any press coverage, awards, or recognition received.

9. **Footer** — NGO registration details, quick links, social media icons, contact email.

---

### Page 2 — About Us (`/about`)

Tells our full story. Builds trust with first-time visitors.

**What they see:**

1. **Vision Statement** — One powerful line that defines what we're working toward.

2. **Mission** — Two short statements: what we do with the community, and what we advocate for.

3. **Our Journey** — The story of how the NGO started and how it has grown. Can be a timeline or a short narrative.

4. **Team & Leadership** — Photo cards for each core team member: name, role, and a short 3-line bio.

5. **Awards & Media** — Press articles with clickable links, award photos.

---

### Page 3 — Our Work (`/work`)

Explains our programs in detail. For donors who want to understand exactly where their money goes.

**What they see:**

1. **The Problem** — 3 facts about the gap we're addressing in education or community welfare.

2. **Our Programs** — Each program gets its own section with: program name, who it helps, what we do, how many people reached so far.

3. **Program Timeline** — How our work started and evolved over the years.

4. **Three Pillars** — The core areas our work covers.

5. **Live Stats** — Current numbers: drives running, people reached, volunteers active.

---

### Page 4 — Get Involved (`/get-involved`)

For anyone who wants to do more than donate.

**What they see:**

1. **Headline** — "It takes a village to raise a child."

2. **Three Paths:**
   - **Donate** → takes them to the donation page
   - **Volunteer / Fundraising Intern** → takes them to the application form
   - **Corporate / Institution Partner** → contact us

3. **Partnership Details** — What different partners can do: NGOs, corporate CSR, schools and colleges.

4. **Contact** — Email address and WhatsApp link.

---

### Page 5 — Donate Page (`/donate`)

The most important page. Where funds are raised.

> If a visitor comes through a volunteer's personal link (e.g. `/donate?r=arya`), they see a banner at the top: *"You're supporting Arya's fundraiser 🙌"*

**What they see:**

1. **Amount Selector** — Preset donation buttons, each mapped to a real impact:
   - ₹500 — Stationery kit for one child
   - ₹1,000 — One month of learning materials
   - ₹2,000 — One month of teaching support
   - ₹4,000 — Two months
   - ₹6,000 — Three months
   - ₹12,000 — Six months
   - Custom amount option

2. **Donor Form** — Name, Email, Phone, PAN (for 80G tax receipt).

3. **Pay Button** — Opens Razorpay. Accepts UPI, cards, net banking.

4. **After Payment** — Thank you screen: *"Your donation has been received. Your 80G receipt will be emailed within 24 hours."*

5. **Trust Signals** below the form:
   - "Registered NGO — [Reg. No.]"
   - "80G Tax Benefit Applicable"
   - "Secured by Razorpay"

---

### Page 6 — Volunteer Application (`/apply`)

For anyone who wants to join as a fundraising volunteer or intern.

**What they see:**

1. **What the Role Is** — 3–4 lines about what a fundraising intern does and what they gain from it.

2. **Application Form** — Name, Email, Phone, City, College / Occupation, Why do you want to join (text box), Availability (Weekends / Weekdays / Both), LinkedIn (optional), How did you hear about us (dropdown).

3. **After Submitting** — *"Thank you! Our team will reach out within 3 working days."*

> If someone reached this page through a volunteer's link, their referral is automatically captured — no extra step needed.

---

## 🙋 VOLUNTEER EXPERIENCE
*No login needed at launch*

1. Volunteer applies via `/apply` and gets accepted by admin.
2. Admin creates their profile and generates a personal fundraising link.
   - Example: `ourngo.org/donate?r=arya2511`
3. Admin sends them the link via WhatsApp.
4. Volunteer shares it on WhatsApp, Instagram, LinkedIn — wherever.
5. Every donation through that link is counted under the volunteer.
6. Admin shares the volunteer's stats with them periodically via WhatsApp.

The volunteer does not need to log in or do anything technical. Just share the link.

---

## 🔐 ADMIN EXPERIENCE
*Login required — internal team only*

Admin logs in at `/admin` using their Google account.

**What they can do:**

**Dashboard Overview**
- Total funds raised (all time and this month)
- Total donors and active volunteers
- Count of pending volunteer applications

**Donations**
- Full table of every donation: date, donor name, amount, which volunteer referred them, payment ID
- Filter by volunteer or date range

**Volunteers**
- See all volunteers, their referral links, how much each has raised, how many donors they brought
- Add a new volunteer — system generates their personal link instantly
- Deactivate a volunteer if needed

**Applications**
- See all volunteer/internship applications
- Change status: Pending → Reviewed → Accepted → Rejected

---

## 🔁 The Full Journey — In One Flow

```
Volunteer shares their link on WhatsApp / Instagram
              ↓
Friend clicks the link
              ↓
Sees "Supporting [Volunteer Name]'s fundraiser"
              ↓
Picks donation amount → fills name, email, phone, PAN
              ↓
Pays via Razorpay (UPI / card / net banking)
              ↓
Sees Thank You screen
              ↓
Donation saved under volunteer's name
              ↓
Admin sees it on dashboard instantly
              ↓
Volunteer's total goes up
```

---

## Pages at a Glance

| Page | Who It's For | What It Does |
|---|---|---|
| `/` | Everyone | First impression, mission, impact, donate CTA |
| `/about` | Curious visitors | Our story, team, credibility |
| `/work` | Donors wanting detail | Programs, impact, how money is used |
| `/get-involved` | People wanting to help | Donate, volunteer, partner |
| `/donate?r=code` | Donors | Accept payment, attribute to volunteer |
| `/apply` | Prospective volunteers | Collect applications |
| `/admin` | Internal team only | Manage everything |
