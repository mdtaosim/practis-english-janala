const createElement=(arr)=>{
    const htmlElement=arr.map(el=>`<span class="btn bg-blue-100">${el}</span>`);
    return htmlElement.join(" ");
};

const manageSpinner=(status)=>{
    if(status===true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("wordContainer").classList.add("hidden");
    }
    else{
        document.getElementById("wordContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLessons(json.data))
};

const removeActive=()=>{
    const lessonButton= document.querySelectorAll(".lesson-btn");
    lessonButton.forEach(btn=> btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn=document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active")
            
            displayLevelWord(data.data)
        });
};

const loadWordDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    const res=await fetch(url);
    const details= await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails=(word)=>{
    const detailsBox=document.getElementById("modal-container");
    detailsBox.innerHTML=`
        <div>
            <h1 class="text-2xl font-bold">${word.word?word.word:'word পাওয়া যায়নি'}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation? word.pronunciation:'pronunciation পাওয়া যায়নি'})</h1>
        </div>
        <div>
            <h1 class="font-semibold">${word.word?word.word:'word পাওয়া যায়নি'}</h1>
            <p>${word.meaning? word.meaning:'meaning পাওয়া যায়নি'}</p>
        </div>
        <div>
            <h1 class="font-semibold">Example</h1>
            <p>${word.sentence?word.sentence:'sentence পাওয়া যায়নি'}</p>
        </div>
        <div>
            <h1 class="font-semibold mb-2 bangla-font">সমার্থক শব্দ গুলো</h1>   
        </div>
        <div>
         ${createElement(word.synonyms)}
        </div>
    `
    

    document.getElementById("my_modal_5").showModal()
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("wordContainer");
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="bangla-font text-center col-span-full">
                <img class=" mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-[#79716b] mb-2">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class=" text-3xl font-semibold">নেক্সট Lesson এ যান</h2>
            </div>
        `
        manageSpinner()
        return;
    }

    words.forEach(word => {
        // console.log(word)
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white rounded-3xl shadow-sm text-center p-10">
                <h2 class="font-bold text-3xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
                <p>Meaning /Pronounciation</p>
                <div class="bangla-font text-3xl text-gray-700 mt-6">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}/ ${word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায়নি'}"</div>
                <div class="flex justify-between mt-10">
                    <button onclick="loadWordDetails(${word.id})" class="bg-blue-200 hover:bg-blue-400 btn h-14 w-14 rounded-2xl flex justify-center items-center"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="bg-blue-200 hover:bg-blue-400 btn h-14 w-14 rounded-2xl flex justify-center items-center"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.append(card);
    });
    manageSpinner()
};

const displayLessons = (Lessons) => {
    const lessonsContainer = document.getElementById("lesson-container")
    lessonsContainer.innerHTML = "";

    for (let lesson of Lessons) {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open">
        </i>
        Lesson - ${lesson.level_no}</button>
        `;

        lessonsContainer.append(btnDiv);
    }

};
loadLessons()