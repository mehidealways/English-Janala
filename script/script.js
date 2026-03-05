const createElements = arr => {
  const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
  return htmlElements.join(' ');
};

// Loader
const manageLoader = (status) => {
  // console.log(status);
  if (status == true) {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('wordContainer').classList.add('hidden')
  }
  else {
     document.getElementById('wordContainer').classList.remove('hidden');
     document.getElementById('loader').classList.add('hidden');
  }
}

const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data));
};

// lession btn color add and remove
const removeActive = () => {
  const lessonButton = document.querySelectorAll('.lession-btn');
  // console.log(lessonButton);
  lessonButton.forEach(btn => {
    btn.classList.remove('active');
  });
};

const loadLevelWord = id => {
  // console.log(id);
  manageLoader(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const clickBtn = document.getElementById(`lessonBtn-${id}`);
      clickBtn.classList.add('active');
      // clickBtn.className.remove()
      displayLevelWord(data.data);
    });
};

// Modal Details
const loadWordDetail = async id => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = word => {
  console.log(word);
  const detailsBox = document.getElementById('detailsContainer');
  detailsBox.innerHTML = `
       <div class="">
        <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
      </div>

      <div class="">
        <h2 class=" font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>

      <div class="">
        <h2 class=" font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>

      <div class="">
        <h2 class="mb-4 font-bold">Synonym</h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
  `;
  document.getElementById('word_modal').showModal();
};
const displayLevelWord = words => {
  console.log(words);
  const wordContainer = document.getElementById('wordContainer');
  wordContainer.innerHTML = '';
  // Condition
  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full space-y-5 font-bangla ">
  <img class = " mx-auto" src="./assets/alert-error.png" alt="">
  <p class="text-xl text-gray-500 font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="text-2xl font-semibold text-gray-500">নেক্সট Lesson এ যান।</h2>
</div>`;
    return;
  }

  words.forEach(word => {
    // console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
   <div class="bg-white rounded-md shadow-sm text-center p-10 space-y-4">
  <h2 class="font-bold text-2xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
  <p class="font-semibold">meaning / pronunciation</p>
  
  <div class="text-2xl font-medium font-bangla">
  "${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায়নি'}"
  </div>
  
  <div class="flex justify-between items-center ">
  <button onclick ="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info"></i><button>
    <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
  </div>

  </div>
  
  `;
    wordContainer.append(card);
  });
  manageLoader(false)
};

// Vocabularies lessons
const displayLessons = lessons => {
  // 1. get the container
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';
  //2.ge into every lessons
  lessons.forEach(lesson => {
    // console.log(lesson);
    // 3.createElement
    const btnDive = document.createElement('div');
    btnDive.innerHTML = `
   <button id ="lessonBtn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lession-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    //  4. append
    levelContainer.append(btnDive);
  });
};

// Calling Function
loadLessons();
