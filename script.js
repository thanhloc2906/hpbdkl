// 🎊 Confetti
(function(){
  const c = document.getElementById('confetti');
  const ctx = c.getContext('2d');
  function resize(){c.width = c.offsetWidth * devicePixelRatio; c.height = c.offsetHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio)}
  window.addEventListener('resize', resize); resize();

  const pieces = [];
  const colors = ['#ff4d6d','#ffd166','#6bf178','#6bb7ff','#c08cff'];
  function rand(a,b){return a + Math.random()*(b-a)}
  function spawn(n=40){for(let i=0;i<n;i++){pieces.push({x:rand(0,c.offsetWidth),y:rand(-200,0),w:rand(6,12),h:rand(9,18),vx:rand(-0.5,0.9),vy:rand(1,3),r:rand(0,360),vr:rand(-6,6),color:colors[Math.floor(Math.random()*colors.length)]})}}
  spawn(90);
  let last = performance.now();
  function frame(t){const dt=(t-last)/16; last=t; ctx.clearRect(0,0,c.offsetWidth,c.offsetHeight);
    for(let i=pieces.length-1;i>=0;i--){const p=pieces[i]; p.x += p.vx*dt; p.y += p.vy*dt; p.r += p.vr*dt; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r*Math.PI/180); ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); if(p.y>c.offsetHeight+50||p.x<-50||p.x>c.offsetWidth+50) pieces.splice(i,1)}
    if(pieces.length<40) spawn(8);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// 🎵 Nhạc tự phát
const bgm = document.getElementById('bgm');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');

// tự phát khi load (nếu browser cho phép)
window.addEventListener('load', async ()=>{
  try { await bgm.play(); toggleMusicBtn.textContent = "⏸ Tắt nhạc"; }
  catch(e){ console.log("Trình duyệt chặn autoplay"); }
});

toggleMusicBtn.addEventListener('click', ()=>{
  if(bgm.paused){ bgm.play(); toggleMusicBtn.textContent="⏸ Tắt nhạc"; }
  else { bgm.pause(); toggleMusicBtn.textContent="▶️ Bật nhạc"; }
});

// 🎁 Mở quà
const giftBtn = document.getElementById('giftBtn');
const giftImage = document.getElementById('giftImage');
giftBtn.addEventListener('click', ()=>{
  giftImage.style.display = "block";
  giftBtn.disabled = true;
  giftBtn.textContent = "🎉 Đã mở quà!";
});

// 📤 Chia sẻ link
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', ()=>{
  const url = location.href;
  navigator.clipboard?.writeText(url).then(
    ()=>alert("🔗 Link đã được thành lộc sao chép và ném vào bảng nhớ tạm " + url),
    ()=>alert("Thành Lộc hông thể sao chép link. Hãy copy thủ công.")
  );
});
