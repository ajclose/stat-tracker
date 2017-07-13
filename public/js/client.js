function fetchActivities() {
  document.querySelector(".activities").textContent = ""
  fetch("api/activities", {
  credentials: 'include'
})
.then( function(res) {
  return res.json()
})
.then(function(json) {

  for (var i = 0; i < json.length; i++) {
    const activity = json[i]

    const html = `
    <div class="activity" id=${activity._id}>
    <h3>${activity.title}</h3>
    <p>Records: ${activity.stats.length}
    </div>
    `

    document.querySelector(".activities").insertAdjacentHTML("beforeend", html)
  }
})
.then(function() {
  const activities = document.querySelectorAll(".activity")
  for (var j = 0; j < activities.length; j++) {
    const activity = activities[j]
    activity.addEventListener("click", function(event) {
      const id = activity.id
      fetchActivity(id)
    })
  }
})
}

function fetchActivity(id) {
  document.querySelector(".activities").textContent = ""
  fetch(`api/activities/${id}`, {
    credentials: 'include'
  })
  .then(function(res) {
    return res.json()
  })
  .then(function(json) {
    const title = `<h2 class="activity-title">${json.title}</h2>`
    document.querySelector(".activities").insertAdjacentHTML("afterbegin", title)
    const headers = `
    <div class="stats-headers">
    <h3>Date</h3>
    <h3>${json.unit}</h3>
    </div>
    `
    document.querySelector(".activities").insertAdjacentHTML("beforeend", headers)
    const stats = json.stats
    for (var i = 0; i < stats.length; i++) {
      const stat = stats[i]
      const html = `
      <div class="stats">
      <p class="date">${stat.date}</p>
      <p class="number">${stat.data}</p>
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
