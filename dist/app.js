(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = $('#mobile-menu'), menuToggle = $('.menu-toggle');
  function closeMenu() { menu.hidden = true; menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open menu'); document.body.classList.remove('menu-open'); }
  menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; menuToggle.setAttribute('aria-expanded',String(open)); menuToggle.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); document.body.classList.toggle('menu-open',open); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e => { if(e.key === 'Escape') closeMenu(); if(e.key === 'Tab' && !menu.hidden){const items=[menuToggle,...menu.querySelectorAll('a')];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus();}} });
  window.matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  if ('IntersectionObserver' in window) {
    document.body.classList.add('js-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
    const dockObserver = new IntersectionObserver(([e])=>$('.mobile-dock').classList.toggle('shown',!e.isIntersecting),{threshold:.12}); dockObserver.observe($('.hero'));
  } else $('.mobile-dock').classList.add('shown');
  const dialogs = document.querySelectorAll('dialog');
  function openDialog(d) { d.showModal(); document.body.classList.add('modal-open'); }
  dialogs.forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('close',()=>document.body.classList.remove('modal-open'));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
  const pictures = [...document.querySelectorAll('.gallery-item')]; let photoIndex = 0;
  function showPhoto(index) { photoIndex = (index + pictures.length) % pictures.length;const item=pictures[photoIndex];$('#lightbox img').src=item.dataset.image;$('#lightbox img').alt=item.dataset.caption;$('#lightbox>p').textContent=item.dataset.caption;$('.lightbox-nav span').textContent=`${photoIndex+1} / ${pictures.length}`; }
  pictures.forEach((p,i)=>p.addEventListener('click',()=>{showPhoto(i);openDialog($('#lightbox'));}));
  $('.lightbox-nav button:first-child').addEventListener('click',()=>showPhoto(photoIndex-1));$('.lightbox-nav button:last-child').addEventListener('click',()=>showPhoto(photoIndex+1));
  $('#lightbox').addEventListener('keydown',e=>{if(e.key==='ArrowRight')showPhoto(photoIndex+1);if(e.key==='ArrowLeft')showPhoto(photoIndex-1);});
  document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{$('#interest').value=a.dataset.interest;}));
  let enquiry = '';
  $('#enquiry-form').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const data=new FormData(f);const name=String(data.get('name')).trim();const phone=String(data.get('phone')).trim();if(!name){f.elements.name.setCustomValidity('Please enter your name.');f.elements.name.reportValidity();return;}f.elements.name.setCustomValidity('');if(phone.replace(/\D/g,'').length<10){f.elements.phone.setCustomValidity('Please enter a valid mobile number with at least 10 digits.');f.elements.phone.reportValidity();return;}f.elements.phone.setCustomValidity('');enquiry=`Hello Bhuran Karate Academy!\nI’d like to enquire about classes.\n\nName: ${name}\nMobile: ${phone}\nStudent age: ${data.get('age')}\nInterested in: ${data.get('interest')}${String(data.get('message')).trim() ? '\nMessage: '+String(data.get('message')).trim() : ''}\n\nPlease share suitable class timings and fees.`;$('#enquiry-preview').textContent=enquiry;$('#sms-link').href='sms:+917500345441?body='+encodeURIComponent(enquiry);$('#copy-status').textContent='';openDialog($('#enquiry-dialog'));});
  $('#enquiry-form').addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');});
  $('#copy-enquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(enquiry);$('#copy-status').textContent='Message copied. Paste it into your preferred messaging app.';}catch{$('#copy-status').textContent='Copy is unavailable in this browser. Select and copy the message above.';}});
  $('#privacy-open').addEventListener('click',()=>openDialog($('#privacy-dialog')));
  $('#year').textContent=new Date().getFullYear();
  const video=$('#hero-video'),toggle=$('#video-toggle'),source=window.matchMedia('(max-width: 800px)').matches ? (window.ACADEMY_CONFIG?.heroVideoMobile || window.ACADEMY_CONFIG?.heroVideo) : window.ACADEMY_CONFIG?.heroVideo;
  if(source){video.src=source;video.hidden=false;video.muted=true;let userPaused=false;video.addEventListener('playing',()=>{toggle.hidden=false;toggle.textContent='Ⅱ';toggle.setAttribute('aria-label','Pause background video');});video.addEventListener('pause',()=>{toggle.textContent='▶';toggle.setAttribute('aria-label','Play background video');});video.addEventListener('error',()=>{video.hidden=true;toggle.hidden=true;});toggle.addEventListener('click',()=>{userPaused=!video.paused;if(video.paused)video.play().catch(()=>{});else video.pause();});if(!reduced.matches&&!navigator.connection?.saveData)video.play().catch(()=>{toggle.hidden=false;toggle.textContent='▶';toggle.setAttribute('aria-label','Play background video');});else{toggle.hidden=false;toggle.textContent='▶';toggle.setAttribute('aria-label','Play background video');}reduced.addEventListener('change',e=>{if(e.matches)video.pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(!userPaused&&!reduced.matches&&!navigator.connection?.saveData)video.play().catch(()=>{});});}
})();
