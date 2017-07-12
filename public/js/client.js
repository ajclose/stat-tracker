function fetchActivities() {
  fetch("api/activities", {
  credentials: 'include'
})
.then( function(res) {
  return res.json()
})
.then(function(json) {
  console.log(json);

  for (var i = 0; i < json.length; i++) {
    const activity = json[i]

    const html = `
    <div class="game">
    <a href="/api/activities/${activity._id}">
    <h3>${activity.title}</h3>
    </a>
    </div>
    `

    document.querySelector(".activities").insertAdjacentHTML("beforeend", html)
  }
})
}

const activityContainer = document.querySelector(".activities")
if (activityContainer) {
  fetchActivities()
}
