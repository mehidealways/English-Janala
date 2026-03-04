const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data));
};

const displayLessons = lessons => {
  // 1. get the container
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';
  //2.ge into every lessons
  lessons.forEach(lesson => {
    console.log(lesson);
    // 3.createElement
    const btnDive = document.createElement('div');
    btnDive.innerHTML = `
   <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    //  4. append
    levelContainer.append(btnDive);
  });
};


// Calling Function
loadLessons();
