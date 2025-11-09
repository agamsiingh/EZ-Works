Here’s a   complete and polished `README.md`   for your project EZ Works Global — carefully structured to showcase all your work, technologies used, deployment info, features, and the QA & API testing you completed. You can copy and paste it into your GitHub repo (e.g., `README.md`) and update any links (live site, LinkedIn, etc.) as needed.

   

````markdown
# 🖥️ EZ Works Global – Frontend Developer Intern Assignment  
  Project Author:   Agam Singh  
  Email:   agamcoder@gmail.com  
  GitHub Repo:   [github.com/agamsiingh/EZ-Works](https://github.com/agamsiingh/EZ-Works)  
  Live Demo:   [https://ez-works-psi.vercel.app/](https://ez-works-psi.vercel.app/)

   

   🔍 Project Overview  
This project replicates the home-page UI design for EZ Works Global in a fully responsive single-page React application. The goal is to recreate the design reference, build smooth animations, integrate a contact form, and deploy a production-ready frontend.

   

   ✅ Work Completed  
- Pixel-accurate recreation of the UI design (desktop & mobile views)  
- Mobile-first responsive layout (mobile, tablet, mini-desktop, desktop)  
- Smooth animations using Framer Motion (hero parallax, staggered reveals, hover interactions)  
- Contact form built with React Hook Form + Zod for validation  
- Live API integration: POST to `https://vernanbackend.ezlab.in/api/contact-us/`  
- Validations implemented: required fields, valid email format, UI feedback on success  
- Clean component architecture: `Header`, `HeroSection`, `ContactSection`, `Footer`  
- Styling using Tailwind CSS: consistent color palette (#EB5A2D primary, textured background), typography (Playfair Display for headings, Inter for body)  
- Deployed via Vercel with SSL enabled and assets optimized for production  
- QA & API testing completed: Postman collection & audit reports included

   

   🧰 Tech Stack  
-   Frontend:   React 18 (Vite)  
-   Styling:   Tailwind CSS  
-   Animations:   Framer Motion  
-   Form Handling:   React Hook Form + Zod  
-   API Calls:   Axios / Fetch  
-   Testing:   Postman collection for API tests  
-   Deployment:   Vercel (HTTPS, fast load time)  

   

   🚀 How to Run Locally  
1. Clone the repo:  
   ```bash
   git clone https://github.com/agamsiingh/EZ-Works.git
   cd EZ-Works
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Run dev server:

   ```bash
   npm run dev
   ```
4. Build for production:

   ```bash
   npm run build
   ```
5. Deploy output folder (`dist`) to a static host (e.g., Vercel, Netlify)

   

   🌐 Deployment & Live Demo

* Live site: [https://ez-works-psi.vercel.app/](https://ez-works-psi.vercel.app/)
* Deployed via Vercel using default build command (`npm run build`)
* Assets load correctly, SSL enabled (HTTPS), no broken links or missing images

   

   📩 Contact Form & API Integration

* API endpoint: `https://vernanbackend.ezlab.in/api/contact-us/`
* Request example:

  ```json
  {
    "name": "Test user",
    "email": "testuser@gmail.com",
    "phone": "908765498",
    "message": "This is a message"
  }
  ```
* On success, UI shows message:   “Form Submitted”   and fields reset
* Front-end validations: required fields, email format, no empty submissions

  # 🧪 API Testing Deliverables

* `POSTMAN_TEST_REPORT.md` — detailed Markdown report of the API test
* `ezworks_contact_api_collection.json` — exported Postman collection (v2.1)
  These files are included in the project root for review & verification.

   

   🎯 QA & Responsiveness

A full QA audit was conducted covering:

* Mobile (375px), Tablet (768px), Mini-Desktop (1024px), Desktop (1440px) responsiveness
* Form functionality, API integration, UI animations
* Deployment health (SSL, performance, asset loading)

Report: [QA_AUDIT_REPORT.md](./QA_AUDIT_REPORT.md)
Summary: Contact form integration ✅, design & responsiveness verified ✅, production-ready deployment ✅.

   

   📄 File Structure

```
/public  
  └─ assets/           # Images & textures  
/src  
  ├─ components/       # Header, HeroSection, ContactSection, Footer  
  ├─ App.jsx  
  ├─ main.jsx  
/postman_collection.json
/POSTMAN_TEST_REPORT.md
/QA_AUDIT_REPORT.md
/README.md
```

   

   📌 Submission Notes

* This project is ready for immediate review and deployment.
* All key functionalities (UI, form, animations, API) are implemented and tested.
* Feel free to explore the design and submit for feedback, or deploy further enhancements.

   

   🤝 About the Author

  Agam Singh  
B.Tech – Computer Science & Engineering (2026 batch)
📍 Agra / Meerut, Uttar Pradesh, India
✉️ [agamcoder@gmail.com](mailto:agamcoder@gmail.com) | 📞 63988 33969
🔗 LinkedIn: [linkedin.com/in/agamsingh](https://www.linkedin.com/in/agamsingh)

   

Thank you for reviewing my submission. I look forward to the opportunity to contribute to EZ Works’ frontend team! 🚀

```

   

If you like, I can also generate a   badge pack   (shields.io badges) and a small section for “Live Demo” and “Project Preview” with animated GIFs/screenshots to make your `README.md` more engaging. Would you like that?
::contentReference[oaicite:1]{index=1}
```
