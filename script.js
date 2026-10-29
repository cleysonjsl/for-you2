/* =====================================================
   FOR YOU.exe — script principal
   ===================================================== */

/* ---------- ✏️ PERSONALIZE AQUI ✏️ ---------- */
const CONFIG = {
  apelido: "meu amor",          // como você a chama
  remetente: "",                // seu nome (opcional; deixe "" para omitir)
  musica: "assets/audio/musica.mp3", // caminho do áudio (só use se tiver autorização)
  fotos: [
    { src: "assets/images/foto1.jpg", titulo: "Um dos meus momentos favoritos",
      legenda: "Existem momentos simples que acabam se tornando especiais só porque estamos ao lado de alguém que faz tudo ter um significado diferente." },
    { src: "assets/images/foto2.jpg", titulo: "Uma lembrança que guardo com carinho",
      legenda: "Entre tantas coisas que a vida pode nos proporcionar, conhecer você e construir nossas próprias lembranças é algo pelo qual sou muito grato." },
    { src: "assets/images/foto3.jpg", titulo: "E que venham muitos outros capítulos",
      legenda: "Que a vida ainda nos presenteie com muitos momentos bonitos, novas histórias, risadas inesperadas e lembranças que mereçam ser guardadas para sempre." }
  ],
  carta: `Hoje é o seu dia, e eu queria encontrar uma forma diferente de te lembrar de algo muito especial: a sua vida merece ser celebrada.

Feliz aniversário! ❤️

Espero que este novo ciclo chegue trazendo paz para o seu coração, saúde, felicidade, sonhos realizados e motivos sinceros para sorrir. Que você tenha coragem para buscar tudo aquilo que deseja e sabedoria para reconhecer a beleza das pequenas coisas pelo caminho.

Que nunca faltem pessoas que te façam bem, oportunidades que te aproximem dos seus sonhos e momentos que façam você perceber o quanto a vida pode ser bonita.

Eu admiro a pessoa que você é e fico feliz por poder compartilhar momentos da minha vida com você. Entre as coisas boas que já aconteceram no meu caminho, ter você fazendo parte da minha história é uma delas.

Hoje, mais do que desejar que você seja feliz ao meu lado, desejo que você seja feliz consigo mesma, com suas conquistas, suas escolhas e tudo aquilo que ainda vai descobrir sobre o mundo e sobre você.

Que você nunca perca esse brilho que faz você ser única. Que seus planos encontrem caminhos, que seus dias tenham leveza e que este novo ano da sua vida seja ainda mais bonito do que você imagina.

E, se eu puder fazer parte de alguns desses momentos, vou ficar muito feliz em continuar criando lembranças especiais com você.

Parabéns pela sua vida.

Que seu novo ciclo seja cheio de amor, descobertas, realizações e felicidade.

Você merece coisas lindas. Hoje e em todos os outros dias.

Com todo o meu carinho. ❤️`,
  finalTexto: "Que a vida seja gentil com você, que seus sonhos encontrem caminhos e que nunca faltem motivos para celebrar quem você é.",
  finalTexto2: "Hoje o presente é seu. Mas ter você na minha vida também é um presente para mim.",
  assinatura: "Feito com carinho, linha por linha, especialmente para você. ♡"
};
/* ---------- fim da personalização ---------- */

const $ = (s, r = document) => r.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let typer = null;

/* ----- Navegação entre etapas ----- */
function go(n) {
  clearInterval(typer);
  document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === "s" + n));
  scrollTo(0, 0);
  const h = $("#s" + n + " h1, #s" + n + " h2, #s" + n + " .lead");
  if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  if (n === 2) { $("#envelope").classList.remove("open"); setTimeout(() => $("#envelope").classList.add("open"), 400); }
  if (n === 4) startLetter();
  if (n === 5) confetti();
}
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));

/* ----- Textos personalizáveis ----- */
const sender = CONFIG.remetente ? `\n${CONFIG.remetente}` : "";
$("#letterTo").textContent = `Para ${CONFIG.apelido},`;
$("#fText").textContent = CONFIG.finalTexto;
$("#fText2").textContent = CONFIG.finalTexto2;
$("#fSign").textContent = CONFIG.assinatura + (CONFIG.remetente ? " — " + CONFIG.remetente : "");

/* ----- Álbum Polaroid (exatamente 3 fotos) ----- */
function polaroid(f, i, big) {
  const b = document.createElement(big ? "div" : "button");
  b.className = "polaroid";
  b.style.setProperty("--r", [-3, 2.5, -1.5][i] + "deg");
  b.style.setProperty("--d", i * 0.25 + "s");
  b.innerHTML = `<span class="tape"></span><div class="photo"><img alt="Foto ${i + 1} do casal" loading="lazy"><div class="ph"><b>♡</b><span>Foto ${i + 1}</span><small>coloque a imagem em<br>${f.src}</small></div></div><h3></h3><p></p>`;
  $("h3", b).textContent = f.titulo; $("p", b).textContent = f.legenda;
  const img = $("img", b), box = $(".photo", b);
  img.onerror = () => box.classList.add("empty");   // sem foto → mostra o espaço reservado
  img.src = f.src;
  if (!big) { b.type = "button"; b.setAttribute("aria-label", "Ampliar foto " + (i + 1)); b.addEventListener("click", () => openLb(f, i)); }
  return b;
}
CONFIG.fotos.slice(0, 3).forEach((f, i) => $("#album").append(polaroid(f, i, false)));

/* ----- Visualização ampliada ----- */
const lb = $("#lightbox");
function openLb(f, i) { $("#lbBody").replaceChildren(polaroid(f, i, true)); lb.hidden = false; $("#lbClose").focus(); }
function closeLb() { lb.hidden = true; }
$("#lbClose").addEventListener("click", closeLb);
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

/* ----- Carta com efeito de escrita ----- */
function startLetter() {
  const full = CONFIG.carta, typed = $("#typed"), btn = $("#toFinal");
  $("#ghost").textContent = full;               // reserva o espaço para a carta nunca ser cortada
  typed.textContent = ""; let i = 0;
  const finish = () => { clearInterval(typer); typed.textContent = full; $("#letterHint").style.visibility = "hidden"; btn.hidden = false; };
  btn.hidden = true; $("#letterHint").style.visibility = "visible";
  if (reduce) return finish();
  typer = setInterval(() => { i += 2; typed.textContent = full.slice(0, i); if (i >= full.length) finish(); }, 45);
  const letter = $("#letter");
  letter.onclick = finish;
  letter.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); finish(); } };
}

/* ----- Confete, corações e estrelas ----- */
function confetti() {
  if (reduce) return;
  const items = ["♡", "★", "❤", "✦", "■"], cols = ["#9c3a2e", "#e9a9b4", "#f2c9cf", "#d9b99b", "#fffdf8"];
  for (let i = 0; i < 50; i++) {
    const e = document.createElement("span"); e.className = "conf";
    e.textContent = items[i % items.length];
    e.style.cssText = `left:${Math.random() * 100}vw;color:${cols[i % cols.length]};font-size:${10 + Math.random() * 14}px;animation-duration:${3 + Math.random() * 3}s;animation-delay:${Math.random() * 1.5}s`;
    document.body.append(e); setTimeout(() => e.remove(), 8000);
  }
}

/* ----- Flutuantes discretos no fundo ----- */
(function () {
  if (reduce) return;
  const box = $(".floaters");
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("span"); s.className = "fl";
    s.textContent = i % 2 ? "♡" : "✦";
    s.style.cssText = `left:${Math.random() * 100}%;font-size:${12 + Math.random() * 14}px;animation-duration:${14 + Math.random() * 12}s;animation-delay:${Math.random() * 12}s`;
    box.append(s);
  }
})();

/* ----- Música (só toca após clique; funciona sem o arquivo) ----- */
const mBtn = $("#music"), toast = $("#toast");
let audio = null, playing = false;
function say(t) { toast.textContent = t; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000); }
function setUi(on) {
  playing = on; mBtn.classList.toggle("on", on); mBtn.setAttribute("aria-pressed", on);
  mBtn.setAttribute("aria-label", on ? "Pausar música" : "Tocar música");
  $("#musicLabel").textContent = on ? "pausar" : "♪ música";
}
mBtn.addEventListener("click", () => {
  if (!CONFIG.musica) return say("A música não está disponível agora ♡");
  if (!audio) {
    audio = new Audio(CONFIG.musica); audio.loop = true; audio.volume = 0.4;
    audio.addEventListener("error", () => { setUi(false); audio = null; say("A música não está disponível agora ♡"); });
  }
  if (playing) { audio.pause(); setUi(false); }
  else audio.play().then(() => setUi(true)).catch(() => { setUi(false); say("A música não está disponível agora ♡"); });
});
