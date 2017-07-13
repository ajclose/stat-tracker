function fetchActivities() {
  document.querySelector(".activities").textContent = ""
  fetch("api/activities", {
  credentials: 'include'
})
.then( function(res) {
  return res.json()
})
.then(function(json) {
  console.log(json);
  const form = `
  <form class="addActivity" action="/api/activities" method="post">
  <fieldset>
  <legend>Add Activity</legend>
    <div class="add-input">
      <label for="actvity">Activity: </label>
      <input type="text" id="activity" name="activity" value="" placeholder="Activity Name">
    </div>

    <div class="add-input">
      <label for="unit">Unit</label>
      <input type="text" id="unit" name="unit" value="" placeholder="Enter Units">
    </div>

    <input type="submit" name="add" value="Add Activity!">
    </fieldset>
  </form>
  `
  document.querySelector(".activities").insertAdjacentHTML("afterbegin", form)

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

  const addActivityForm = document.querySelector("form.addActivity")
  if (addActivityForm){
    addActivityForm.addEventListener("submit", function(event){
      event.preventDefault();
      formData = {
    activity: document.querySelector("#activity").value,
    unit: document.querySelector("#unit").value,
    }

    fetch("/api/activities", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json"
        }
      })
      .then( function(res) {
    return res.json()
  })
  .then( function(json){
    fetchActivities()
  })
  .catch( function(e) {
    console.log("ERROR:", e)
  })
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

    const form = `
    <form class="addStat" action="/api/activities/${json._id}/stats" method="post">
    <fieldset>
    <legend>Add Stat</legend>
      <div class="add-input">
        <label for="date">Date</label>
        <input type="date" id="date" name="date" value="" >
      </div>

      <div class="add-input">
        <label for="data">${json.unit}</label>
        <input type="number" id="data" name="data" value="" placeholder="Enter ${json.unit}">
      </div>

      <input type="submit" name="add" value="Add Stat!">
      </fieldset>
    </form>
    `
    document.querySelector(".activities").insertAdjacentHTML("afterbegin", form)

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
  .then(function(json) {
    const addStatForm = document.querySelector("form.addStat")
    if (addStatForm){
      addStatForm.addEventListener("submit", function(event){
        event.preventDefault();
        formData = {
      date: document.querySelector("#date").value,
      data: document.querySelector("#data").value,
      }

      fetch(`/api/activities/${id}/stats`, {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json"
          }
        })
        .then( function(res) {
      return res.json()
    })
    .then( function(json){
      fetchActivity(id)
    })
    .catch( function(e) {
      console.log("ERROR:", e)
    })
      })
    }
  })
}

const activityContainer = document.querySelector(".activities")
if (activityContainer) {
  fetchActivities()
}
