const experience = document.querySelector("#experience");
const openButton = document.querySelector("#openInvitation");
const openingNote = document.querySelector("#openingNote");
const petalField = document.querySelector("#petals");
const details = document.querySelector("#details");
const languageButtons = document.querySelectorAll(".language-button");

const translations = {
  uz: {
    openingNote: "Taklifnomani ochish uchun bosing",
    openedNote: "Muhabbat bilan…",
    dearGuests: "Hurmatli mehmonlar",
    welcomeCopy: "Sizni hayotimizdagi eng baxtli kun — nikoh to‘yimizga taklif qilamiz. Quvonchimizga sherik bo‘lishingiz biz uchun katta sharaf.",
    signature: "Mehr bilan, Feruzbek & Odina",
    programTitle: "To‘y dasturi",
    month: "Sentabr",
    sunday: "Yakshanba",
    monday: "Dushanba",
    visolEvening: "Visol oqshomi",
    nahorOshi: "Nahor oshi",
    timeLabel: "Boshlanish vaqti",
    countdownTitle: "Bayramgacha qoldi",
    days: "kun",
    hours: "soat",
    minutes: "daqiqa",
    seconds: "soniya",
    locationTitle: "Joylashuv",
    locationCopy: "27-sentabr · soat 18:00",
    mapButton: "Xaritada ko‘rish",
    giftTitle: "Sovg‘a haqida",
    giftCopy: "Biz uchun eng katta sovg‘a — baxtli kunimizda yonimizda bo‘lishingiz.",
  },
  ru: {
    openingNote: "Нажмите, чтобы открыть приглашение",
    openedNote: "С любовью…",
    dearGuests: "Дорогие гости",
    welcomeCopy: "Приглашаем вас разделить с нами самый счастливый день нашей жизни — день нашей свадьбы. Для нас большая честь видеть вас рядом.",
    signature: "С любовью, Ферузбек и Одина",
    programTitle: "Свадебная программа",
    month: "Сентябрь",
    sunday: "Воскресенье",
    monday: "Понедельник",
    visolEvening: "Свадебный вечер",
    nahorOshi: "Утренний плов",
    timeLabel: "Начало",
    countdownTitle: "До торжества осталось",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    locationTitle: "Место проведения",
    locationCopy: "27 сентября · в 18:00",
    mapButton: "Открыть на карте",
    giftTitle: "О подарках",
    giftCopy: "Самый ценный подарок для нас — ваше присутствие в этот счастливый день.",
  },
};

let selectedLanguage = "uz";
let invitationOpened = false;

for (let index = 0; index < 24; index += 1) {
  const petal = document.createElement("i");
  const size = 8 + (index % 4) * 3;
  petal.className = `petal petal-${index % 3}`;
  petal.style.left = `${4 + ((index * 19) % 92)}%`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.animationDelay = `${(index % 12) * 0.3}s`;
  petal.style.animationDuration = `${6.2 + (index % 6) * 0.75}s`;
  petalField.append(petal);
}

openButton.addEventListener("click", () => {
  invitationOpened = true;
  experience.classList.add("is-open");
  openButton.setAttribute("aria-expanded", "true");
  openingNote.textContent = translations[selectedLanguage].openedNote;
  details.setAttribute("aria-hidden", "false");
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedLanguage = button.dataset.language;
    document.documentElement.lang = selectedLanguage;

    languageButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translations[selectedLanguage][element.dataset.i18n];
    });

    if (invitationOpened) openingNote.textContent = translations[selectedLanguage].openedNote;
  });
});

const weddingDate = new Date("2026-09-27T18:00:00+05:00");

function updateCountdown() {
  const remaining = Math.max(0, weddingDate.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  document.querySelector("#days").textContent = String(Math.floor(remaining / day)).padStart(2, "0");
  document.querySelector("#hours").textContent = String(Math.floor((remaining % day) / hour)).padStart(2, "0");
  document.querySelector("#minutes").textContent = String(Math.floor((remaining % hour) / minute)).padStart(2, "0");
  document.querySelector("#seconds").textContent = String(Math.floor((remaining % minute) / 1000)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
