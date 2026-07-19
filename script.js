

    /* =========================================
       1. Mobile Menu / Sidebar Functionality
       ========================================= */
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    function toggleMenu() {
      sidebar.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
    }

    function closeMenu() {
      sidebar.classList.remove('active');
      hamburgerBtn.classList.remove('active');
    }





    /* =========================================
       2. Intersection Observer & Dynamic Animation
       ========================================= */
    const sections = document.querySelectorAll('.scroll-section');
    const navItems = document.querySelectorAll('.nav-links a');
    const scrollContainer = document.getElementById('scrollContainer');

    let targetGravityPoint = null;

    const observerOptions = {
      root: scrollContainer,
      threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sections.forEach(s => s.classList.remove('section-active'));
          entry.target.classList.add('section-active');

          const activeId = entry.target.getAttribute('id');

          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === activeId) {
              item.classList.add('active');
            }
          });

          const rect = entry.target.querySelector('.glass-content').getBoundingClientRect();
          targetGravityPoint = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };

          bubblesArray.forEach(b => {
            b.speedY *= 1.6;
            b.speedX *= 1.6;
          });
          
          setTimeout(() => {
            bubblesArray.forEach(b => {
              b.speedY = Math.random() * 0.5 + 0.3;
              b.speedX = (Math.random() * 0.4) - 0.2;
            });
          }, 1200);
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));






    /* =========================================
       3. Theme Toggle
       ========================================= */
    const themeBtn = document.getElementById('themeBtn');
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.textContent = '☀️';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '🌙';
      }
    }





    /* =========================================
       4. Bubble Animation Canvas
       ========================================= */
    const canvas = document.getElementById('bubble-canvas');
    const ctx = canvas.getContext('2d');

    let bubblesArray = [];
    let mouse = { x: null, y: null, radius: 100 };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    }
    window.addEventListener('resize', resizeCanvas);

    class Bubble {
      constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
        ctx.fillStyle = isLightTheme ? 'rgba(2, 132, 199, 0.04)' : 'rgba(56, 189, 248, 0.08)';
        ctx.strokeStyle = isLightTheme ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.15)';
        
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < -this.radius) {
          this.y = canvas.height + this.radius;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -this.radius || this.x > canvas.width + this.radius) {
          this.x = Math.random() * canvas.width;
        }

        if (mouse.x && mouse.y) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 4;
            this.y += (dy / distance) * force * 4;
          }
        }

        if (targetGravityPoint) {
          let dx = targetGravityPoint.x - this.x;
          let dy = targetGravityPoint.y - this.y;
          let dist = Math.hypot(dx, dy);
          if (dist > 150) {
            this.x += (dx / dist) * 0.12;
            this.y += (dy / dist) * 0.12;
          }
        }

        this.draw();
      }
    }

    function initBubbles() {
      bubblesArray = [];
      const numberOfBubbles = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < numberOfBubbles; i++) {
        let radius = Math.random() * 25 + 10;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedY = Math.random() * 0.5 + 0.3;
        let speedX = (Math.random() * 0.4) - 0.2;
        bubblesArray.push(new Bubble(x, y, radius, speedX, speedY));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubblesArray.forEach(b => b.update());
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);





const originalTexts = {};

function cacheOriginalTexts() {
  const translatableElements = document.querySelectorAll('.translatable');

  translatableElements.forEach(elem => {
    const id = elem.getAttribute('id');

    if (id && !originalTexts[id]) {
      originalTexts[id] = elem.textContent.trim();
    }
  });
}

// Decode HTML entities
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


async function changeLanguage(lang) {

  const selectElement = document.getElementById('langSelect');
  selectElement.disabled = true;

  document.documentElement.setAttribute('lang', lang);

  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }


  const translatableElements = document.querySelectorAll('.translatable');


  // Return to English
  if (lang === 'en') {

    translatableElements.forEach(elem => {

      const id = elem.id;

      if (originalTexts[id]) {
        elem.textContent = originalTexts[id];
      }

    });

    await initTypewriter(lang);
    selectElement.disabled = false;
    return;
  }



  for (const elem of translatableElements) {

    const id = elem.id;

    if (!id || !originalTexts[id]) {
      continue;
    }


    try {

      const text = originalTexts[id];

      const url =
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;


      const response = await fetch(url);

      const data = await response.json();


      let translated = "";

      if (Array.isArray(data[0])) {

        data[0].forEach(item => {

          if (item[0]) {
            translated += item[0];
          }

        });

      }


      if (translated.trim()) {
        elem.textContent = decodeHTMLEntities(translated);
      }


    } catch(error) {

      console.error(
        "Translation error:",
        id,
        error
      );

    }


    // Prevent Google API blocking
    await delay(150);

  }


  await initTypewriter(lang);

  selectElement.disabled = false;

}



/* =========================================
    6. Dynamic Typewriter Translation
    ========================================= */
 const typewriterBase = ["Asst: Facility Manager", "Facilities Supervisor", "Accommodation Supervisor", "Customer Handler"];
 let typewriterTimeout = null;
 
 // TODO: Replace with your actual Google Cloud Translation API key
 const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; 

 async function initTypewriter(lang) {
   const target = document.getElementById('typewriter');
   if (!target) return;
   
   if (typewriterTimeout) {
     clearTimeout(typewriterTimeout);
   }

   let roles = [...typewriterBase];

   if (lang !== 'en') {
     try {
       // Set up query parameters for Google Translate API v2
       const params = new URLSearchParams({
         key: GOOGLE_API_KEY,
         source: 'en',
         target: lang
       });
       
       // Google allows batching by appending multiple 'q' parameters
       typewriterBase.forEach(role => params.append('q', role));

       const response = await fetch(`https://translation.googleapis.com/language/translate/v2?${params}`);
       const data = await response.json();

       // Parse Google's response structure
       if (data?.data?.translations) {
         roles = data.data.translations.map(t => decodeHTMLEntities(t.translatedText));
       }
     } catch (err) {
       console.error("Typewriter translation error: ", err);
     }
   }

   let roleIndex = 0;
   let charIndex = 0;
   let isDeleting = false;

   function type() {
     const currentRole = roles[roleIndex] || typewriterBase[roleIndex];
     const charArray = Array.from(currentRole); // Handles composite characters safely
     
     if (isDeleting) {
       target.textContent = charArray.slice(0, charIndex - 1).join('');
       charIndex--;
     } else {
       target.textContent = charArray.slice(0, charIndex + 1).join('');
       charIndex++;
     }

     let delayTime = isDeleting ? 40 : 100;

     if (!isDeleting && charIndex === charArray.length) {
       delayTime = 2000;
       isDeleting = true;
     } else if (isDeleting && charIndex === 0) {
       isDeleting = false;
       roleIndex = (roleIndex + 1) % roles.length;
       delayTime = 400;
     }

     typewriterTimeout = setTimeout(type, delayTime);
   }

   type();
 }




    /* =========================================
       7. PDF & Print Sync Compilation Engine
       ========================================= */
    function syncPdfElements() {


      document.getElementById('pdf-role').textContent = document.getElementById('typewriter').textContent || "Asst: Facility Manager", "Facilities Supervisor", "Accommodation Supervisor", "Customer Handler";

    
      document.getElementById('pdf-h-about').textContent = document.getElementById('navAbout').textContent;
      document.getElementById('pdf-about').textContent = document.getElementById('profileBio').textContent;


      document.getElementById('pdf-h-education').textContent = document.getElementById('navEducation').textContent;
      document.getElementById('pdf-edu-degree1').textContent = document.getElementById('eduDegree1').textContent;
      document.getElementById('pdf-edu-grad1').textContent = document.getElementById('eduGrad1').textContent;
      document.getElementById('pdf-edu-desc1').textContent = document.getElementById('eduDesc1').textContent;
      document.getElementById('pdf-edu-desc11').textContent = document.getElementById('eduDesc11').textContent;
      document.getElementById('pdf-edu-desc111').textContent = document.getElementById('eduDesc111').textContent;
      document.getElementById('pdf-edu-desc1111').textContent = document.getElementById('eduDesc1111').textContent;
      document.getElementById('pdf-edu-desc11111').textContent = document.getElementById('eduDesc11111').textContent;


      document.getElementById('pdf-h-education').textContent = document.getElementById('navEducation').textContent;
      document.getElementById('pdf-edu-degree2').textContent = document.getElementById('eduDegree2').textContent;
      document.getElementById('pdf-edu-grad2').textContent = document.getElementById('eduGrad2').textContent;
      document.getElementById('pdf-edu-desc2').textContent = document.getElementById('eduDesc2').textContent;
      document.getElementById('pdf-edu-desc22').textContent = document.getElementById('eduDesc22').textContent;
      document.getElementById('pdf-edu-desc222').textContent = document.getElementById('eduDesc222').textContent;
      document.getElementById('pdf-edu-desc2222').textContent = document.getElementById('eduDesc2222').textContent;
      document.getElementById('pdf-edu-desc22222').textContent = document.getElementById('eduDesc22222').textContent;



      document.getElementById('pdf-h-skills').textContent = document.getElementById('navSkills').textContent;
      document.getElementById('pdf-skill1').textContent = document.getElementById('skill1').textContent;
      document.getElementById('pdf-skilldesc1').textContent = document.getElementById('skillDesc1').textContent;
      document.getElementById('pdf-skilldesc11').textContent = document.getElementById('skillDesc11').textContent;
      document.getElementById('pdf-skilldesc111').textContent = document.getElementById('skillDesc111').textContent;
      document.getElementById('pdf-skilldesc1111').textContent = document.getElementById('skillDesc1111').textContent;
      document.getElementById('pdf-skilldesc11111').textContent = document.getElementById('skillDesc11111').textContent;

      document.getElementById('pdf-skill2').textContent = document.getElementById('skill2').textContent;
      document.getElementById('pdf-skilldesc2').textContent = document.getElementById('skillDesc2').textContent;
      document.getElementById('pdf-skilldesc22').textContent = document.getElementById('skillDesc22').textContent;
      document.getElementById('pdf-skilldesc222').textContent = document.getElementById('skillDesc222').textContent;
      document.getElementById('pdf-skilldesc2222').textContent = document.getElementById('skillDesc2222').textContent;
      document.getElementById('pdf-skilldesc22222').textContent = document.getElementById('skillDesc22222').textContent;

      document.getElementById('pdf-skill3').textContent = document.getElementById('skill3').textContent;
      document.getElementById('pdf-skilldesc3').textContent = document.getElementById('skillDesc3').textContent;
      document.getElementById('pdf-skilldesc33').textContent = document.getElementById('skillDesc33').textContent;
      document.getElementById('pdf-skilldesc333').textContent = document.getElementById('skillDesc333').textContent;
      document.getElementById('pdf-skilldesc3333').textContent = document.getElementById('skillDesc3333').textContent;
      document.getElementById('pdf-skilldesc33333').textContent = document.getElementById('skillDesc33333').textContent;

      document.getElementById('pdf-skill4').textContent = document.getElementById('skill4').textContent;
      document.getElementById('pdf-skilldesc4').textContent = document.getElementById('skillDesc4').textContent;
      document.getElementById('pdf-skilldesc44').textContent = document.getElementById('skillDesc44').textContent;
      document.getElementById('pdf-skilldesc444').textContent = document.getElementById('skillDesc444').textContent;
      document.getElementById('pdf-skilldesc4444').textContent = document.getElementById('skillDesc4444').textContent;
      document.getElementById('pdf-skilldesc44444').textContent = document.getElementById('skillDesc44444').textContent;


      document.getElementById('pdf-hobbiesDesc').textContent = document.getElementById('hobbiesDesc').textContent;
      document.getElementById('pdf-hobDec1').textContent = document.getElementById('hobDec1').textContent;
      document.getElementById('pdf-hobDec11').textContent = document.getElementById('hobDec11').textContent;
      document.getElementById('pdf-hobDec111').textContent = document.getElementById('hobDec111').textContent;
      document.getElementById('pdf-hobDec1111').textContent = document.getElementById('hobDec1111').textContent;
      document.getElementById('pdf-hobDec11111').textContent = document.getElementById('hobDec11111').textContent;


      document.getElementById('pdf-interesthead').textContent = document.getElementById('interesthead').textContent;
      document.getElementById('pdf-interestDesc1').textContent = document.getElementById('interestDesc1').textContent;
      document.getElementById('pdf-interestDesc11').textContent = document.getElementById('interestDesc11').textContent;
      document.getElementById('pdf-interestDesc111').textContent = document.getElementById('interestDesc111').textContent;
      document.getElementById('pdf-interestDesc1111').textContent = document.getElementById('interestDesc1111').textContent;
      document.getElementById('pdf-interestDesc11111').textContent = document.getElementById('interestDesc11111').textContent;




      document.getElementById('pdf-h-exp').textContent = document.getElementById('navExperience').textContent;
      document.getElementById('pdf-exp-role1').textContent = document.getElementById('expRole1').textContent;
      document.getElementById('pdf-exp-duration1').textContent = document.getElementById('expDuration1').textContent;
      document.getElementById('pdf-exp-desc1').textContent = document.getElementById('expDesc11').textContent;
      document.getElementById('pdf-exp-desc11').textContent = document.getElementById('expDesc11').textContent;
      document.getElementById('pdf-exp-desc111').textContent = document.getElementById('expDesc111').textContent;
      document.getElementById('pdf-exp-desc1111').textContent = document.getElementById('expDesc1111').textContent;
      document.getElementById('pdf-exp-desc11111').textContent = document.getElementById('expDesc11111').textContent;

      document.getElementById('pdf-h-exp').textContent = document.getElementById('navExperience').textContent;
      document.getElementById('pdf-exp-role2').textContent = document.getElementById('expRole2').textContent;
      document.getElementById('pdf-exp-duration2').textContent = document.getElementById('expDuration2').textContent;
      document.getElementById('pdf-exp-desc2').textContent = document.getElementById('expDesc2').textContent;
      document.getElementById('pdf-exp-desc22').textContent = document.getElementById('expDesc22').textContent;
      document.getElementById('pdf-exp-desc222').textContent = document.getElementById('expDesc222').textContent;
      document.getElementById('pdf-exp-desc2222').textContent = document.getElementById('expDesc2222').textContent;
      document.getElementById('pdf-exp-desc22222').textContent = document.getElementById('expDesc22222').textContent;

      document.getElementById('pdf-h-exp').textContent = document.getElementById('navExperience').textContent;
      document.getElementById('pdf-exp-role3').textContent = document.getElementById('expRole3').textContent;
      document.getElementById('pdf-exp-duration3').textContent = document.getElementById('expDuration3').textContent;
      document.getElementById('pdf-exp-desc3').textContent = document.getElementById('expDesc3').textContent;
      document.getElementById('pdf-exp-desc33').textContent = document.getElementById('expDesc33').textContent;
      document.getElementById('pdf-exp-desc333').textContent = document.getElementById('expDesc333').textContent;
      document.getElementById('pdf-exp-desc3333').textContent = document.getElementById('expDesc3333').textContent;
      document.getElementById('pdf-exp-desc33333').textContent = document.getElementById('expDesc33333').textContent;





      document.getElementById('pdf-h-proj').textContent = document.getElementById('navProjects').textContent;
      document.getElementById('pdf-proj-title1').textContent = document.getElementById('projTitle1').textContent;
      document.getElementById('pdf-proj-desc1').textContent = document.getElementById('projDesc1').textContent;
      document.getElementById('pdf-proj-desc11').textContent = document.getElementById('projDesc11').textContent;
      document.getElementById('pdf-proj-desc111').textContent = document.getElementById('projDesc111').textContent;
      document.getElementById('pdf-proj-desc1111').textContent = document.getElementById('projDesc1111').textContent;
      document.getElementById('pdf-proj-desc11111').textContent = document.getElementById('projDesc11111').textContent;

      document.getElementById('pdf-h-proj').textContent = document.getElementById('navProjects').textContent;
      document.getElementById('pdf-proj-title2').textContent = document.getElementById('projTitle2').textContent;
      document.getElementById('pdf-proj-desc2').textContent = document.getElementById('projDesc2').textContent;
      document.getElementById('pdf-proj-desc22').textContent = document.getElementById('projDesc22').textContent;
      document.getElementById('pdf-proj-desc222').textContent = document.getElementById('projDesc222').textContent;
      document.getElementById('pdf-proj-desc2222').textContent = document.getElementById('projDesc2222').textContent;
      document.getElementById('pdf-proj-desc22222').textContent = document.getElementById('projDesc22222').textContent;





      document.getElementById('pdf-h-resp').textContent = document.getElementById('navResponsibilities').textContent;
      document.getElementById('pdf-resp-role1').textContent = document.getElementById('respRole1').textContent;
      document.getElementById('pdf-resp-desc1').textContent = document.getElementById('respDesc1').textContent;
      document.getElementById('pdf-resp-desc11').textContent = document.getElementById('respDesc11').textContent;
      document.getElementById('pdf-resp-desc111').textContent = document.getElementById('respDesc111').textContent;
      document.getElementById('pdf-resp-desc1111').textContent = document.getElementById('respDesc1111').textContent;
      document.getElementById('pdf-resp-desc11111').textContent = document.getElementById('respDesc11111').textContent;

      document.getElementById('pdf-resp-role2').textContent = document.getElementById('respRole2').textContent;
      document.getElementById('pdf-resp-desc2').textContent = document.getElementById('respDesc2').textContent;
      document.getElementById('pdf-resp-desc22').textContent = document.getElementById('respDesc22').textContent;
      document.getElementById('pdf-resp-desc222').textContent = document.getElementById('respDesc222').textContent;
      document.getElementById('pdf-resp-desc2222').textContent = document.getElementById('respDesc2222').textContent;
      document.getElementById('pdf-resp-desc22222').textContent = document.getElementById('respDesc22222').textContent;





      document.getElementById('pdf-h-hobbies').textContent = document.getElementById('navHobbies').textContent;
      document.getElementById('pdf-hobDec1').textContent = document.getElementById('hobDec1').textContent;
      document.getElementById('pdf-hobDec11').textContent = document.getElementById('hobDec11').textContent;
      document.getElementById('pdf-hobDec111').textContent = document.getElementById('hobDec111').textContent;
      document.getElementById('pdf-hobDec1111').textContent = document.getElementById('hobDec1111').textContent;
      document.getElementById('pdf-hobDec11111').textContent = document.getElementById('hobDec11111').textContent;


      document.getElementById('pdf-interestDesc1').textContent = document.getElementById('interestDesc1').textContent;
      document.getElementById('pdf-interestDesc11').textContent = document.getElementById('interestDesc11').textContent;
      document.getElementById('pdf-interestDesc111').textContent = document.getElementById('interestDesc111').textContent;
      document.getElementById('pdf-interestDesc1111').textContent = document.getElementById('interestDesc1111').textContent;
      document.getElementById('pdf-interestDesc11111').textContent = document.getElementById('interestDesc11111').textContent;



      document.getElementById('pdf-h-dec').textContent = document.getElementById('navDeclaration').textContent;
      document.getElementById('pdf-dec-desc').textContent = document.getElementById('declarationDesc').textContent;
    }




    function downloadPDF() {
      const activeLang = document.getElementById('langSelect').value;
      syncPdfElements();

      const element = document.getElementById('pdf-content');
      const opt = {
        margin:       0.4,
        filename:     `Gurinder_Singh_Resume_${activeLang.toUpperCase()}.pdf`,
        image:        { type: 'jpeg', quality: 0.50 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      const parentHiddenNode = document.getElementById('pdf-template-hidden');
      parentHiddenNode.style.display = 'block';

      html2pdf().set(opt).from(element).save().then(() => {
        parentHiddenNode.style.display = 'none';
      });
    }

    function printProfile() {
      syncPdfElements();
      window.print();
    }







    /* =========================================
       8. Lifecycle Initialization
       ========================================= */
    window.onload = () => {
      resizeCanvas();
      cacheOriginalTexts();
      changeLanguage('en');
    };


