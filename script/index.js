const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data))
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
};

const displayLevelWord = (words) => {
    const wordContainer=document.getElementById("wordContainer");
    wordContainer.innerHTML="";

    if(words.length===0){
        wordContainer.innerHTML=`
        <div class="bangla-font text-center col-span-full">
                <img class=" mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-[#79716b] mb-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class=" text-3xl font-semibold">নেক্সট Lesson এ যান</h2>
            </div>
        `
        return;
    }
    
    words.forEach(word => {
        // console.log(word)
        const card=document.createElement("div")
        card.innerHTML=`
        <div class="bg-white rounded-3xl shadow-sm text-center p-10">
                <h2 class="font-bold text-3xl">${word.word}</h2>
                <p>Meaning /Pronounciation</p>
                <div class="bangla-font text-3xl text-gray-700 mt-6">"${word.meaning}/ ${word.pronunciation}"</div>
                <div class="flex justify-between mt-10">
                    <button class="bg-blue-200 hover:bg-blue-400 btn h-14 w-14 rounded-2xl flex justify-center items-center"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="bg-blue-200 hover:bg-blue-400 btn h-14 w-14 rounded-2xl flex justify-center items-center"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.append(card);
    });
}

const displayLessons = (Lessons) => {
    const lessonsContainer = document.getElementById("lesson-container")
    lessonsContainer.innerHTML = "";

    for (let lesson of Lessons) {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open">
        </i>
        Lesson - ${lesson.level_no}</button>
        `;

        lessonsContainer.append(btnDiv);
    }

}
loadLessons()