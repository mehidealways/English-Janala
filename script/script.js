const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
};
const displayLevelWord = words => {
  console.log(words);
  const wordContainer = document.getElementById('wordContainer');
  wordContainer.innerHTML = '';

  words.forEach(word => {
    // console.log(word);
    const card = document.createElement('div');
    card.innerHTML = `
   <div class="bg-white rounded-md shadow-sm text-center p-10 space-y-4">
  <h2 class="font-bold text-2xl">${word.word}</h2>
  <p class="font-semibold">meaning / pronunciation</p>
  
  <div class="text-2xl font-medium font-bangla">
  "${word.meaning} / ${word.pronunciation}"
  </div>
  
  <div class="flex justify-between items-center ">
  <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info"></i><button>
    <button class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
  </div>

  </div>
  
  `;
    wordContainer.append(card);
  });
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
   <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    //  4. append
    levelContainer.append(btnDive);
  });
};


// Calling Function
loadLessons();

