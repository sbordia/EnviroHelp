let actions = {
  result: "",
  description: "",
  img: ""
};
//  trash, plastic, glass, paper, metal
let descriptions = {
  "Trash": "This is trash! You can <b>throw away this item in the trash</b> can, but if it contains batteries, please contact the retailer for more information on how to dispose of the item :)",
  "Plastic": "This is plastic! You can safely <b>recycle this in the blue or green recycle bin</b>. Some grocery stores even offer plastic bag collection, so you can take these items there and get them safely recycled and reused.",
  "Glass": "This is glass! Similar to plastic, glass is typically recyclable. Just <b>place this item in the blue or green recycling bin</b>, and it will be repurposed for another day!",
  "Paper": "This is paper! You can easily recycle paper by <b>putting it in the blue or green recycle bin</b>. Recycled paper is often made into greeting cards, cardboard, and newspaprs!",
  "Metal": "This is metal! Almost all metals are recyclable, just <b>put it in your blue or green recycling bin</b>. Recycled metals are often used extensively in the construction industry in projects such as roads and bridges.",
  "Unknown": "Hmmm, we couldn't detect what that was. Maybe try another image?"
}

let img = {
  "Trash": "../img/trash.png",
  "Plastic": "../img/plastic.png",
  "Glass": "../img/glass.png",
  "Paper": "../img/paper.png",
  "Metal": "../img/metal.png",
  "Unknown": "../img/qmark.png"
}

$('#file-upload').on('change', function() {
  let fileName = $(this).val().split('\\').pop();
  $(this).next('#fileName').addClass("selected").html(fileName);
  console.log("HERE")
});

var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
  document.getElementById("navbar-main").style.top = "0";
} else {
  document.getElementById("navbar-main").style.top = "-100px";
}
  prevScrollpos = currentScrollPos;
}

document.getElementById("result").addEventListener("click", () => {
  const url = "http://127.0.0.1:5000/getPrediction"
  let type;
  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      type = data.result
      setActions(type)
      showElements()
      console.log(type)
    })
})

document.getElementById("again").addEventListener("click", () => {
  scrollTo("navbar-main")
  document.getElementById("results-section").classList.add("hidden");
})


function setActions(type) {
  actions.result = type;
  console.log(type)
  console.log(descriptions[type])
  actions.description = descriptions[type]
  actions.img = img[type]
}

function showElements() {
  let typeShow = document.getElementById("result-type");
  let descripShow = document.getElementById("result-description");
  let imgShow = document.getElementById("result-img");

  typeShow.innerHTML = actions.result;
  descripShow.innerHTML = actions.description;
  imgShow.src = actions.img;

  document.getElementById("results-section").classList.remove("hidden");

  scrollTo("results-section")  
}



function scrollTo(hash) {
  location.hash = "#" + hash;
}


