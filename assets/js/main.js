
// Mobile nav toggle
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
if(navToggle && navMenu){
  navToggle.addEventListener('click', ()=>{
    navMenu.classList.toggle('open');
    navMenu.style.display = navMenu.classList.contains('open') ? 'flex' : '';
  })
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  })
})

// Fake form submit
const form = document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`Thanks ${data.name || 'there'}! We'll reach out to ${data.email || 'your inbox'} soon.`);
    form.reset();
  });
}

// Policy Notice Modal: show ONLY on home/lander pages and once per session.
(function(){
  const path = window.location.pathname;
  // Show on index.html, lander.html, or root path
  const isTargetPage = /(^\/$|index\.html$|lander\.html$)/.test(path);
  if(!isTargetPage) return;
  if(sessionStorage.getItem('ageGateShown') === '1') return;
  sessionStorage.setItem('ageGateShown', '1');

  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
    <div class="modal">
      <h3>Policy Notice</h3>
      <p>By continuing to use this site, you agree to our terms and privacy policy. This notice is for informational purposes.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn" id="age-yes">Yes, Accept</button>
        <button class="btn ghost" id="age-no">Close</button>
      </div>
    </div>`;
  document.body.appendChild(bd);
  bd.style.display='flex';
  function closeGate(){ bd.style.display='none'; bd.remove(); }
  bd.querySelector('#age-yes').addEventListener('click', closeGate);
  bd.querySelector('#age-no').addEventListener('click', closeGate);
})();
(function(){
  const path = window.location.pathname;
  const isHome = /(^\/$|lander\.html$)/.test(path);
  if(!isHome) return;
 
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.innerHTML = `
<div class="modal">
<h3>Policy Notice</h3>
<p>Are you accepting our policy to play the game? This notice is informational and does not block access.</p>
<div style="display:flex;gap:10px;flex-wrap:wrap">
<button class="btn" id="age-yes">Yes, Accept</button>
<button class="btn ghost" id="age-no">Close</button>
</div>
</div>`;
  document.body.appendChild(bd);
  bd.style.display='flex';
 
  function closeGate(){ bd.style.display='none'; bd.remove(); }  
  // ✅ Redirect when "Yes" is clicked
  bd.querySelector('#age-yes').addEventListener('click', closegate);
  //                                               function(){
  //   window.location.href = "https://w23hub.com/?utm_campaign=D65m7f7e4i&v1=[v1]&v2=[v2]&v3=[v3]"; // change to your target page
  // });
 
  // ✅ Just close modal when "No" is clicked
  bd.querySelector('#age-no').addEventListener('click', closeGate);
})();
