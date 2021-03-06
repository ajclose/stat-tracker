function fetchActivities() {
  document.querySelector(".activities").textContent = ""
  fetch("api/activities", {
      credentials: 'include'
    })
    .then(function(res) {
      return res.json()
    })
    .then(function(json) {
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
    <div class="activity" id="${activity._id}">
    <h3>${activity.title}</h3>
    <p>Records: ${activity.stats.length}
    </div>
    <form class="deleteActivity" action="/api/activities/${activity._id}" method="delete">
    <button class="deleteActivityButton" type="submit" id="${activity._id}">Delete</button>
    </form>

    <form class="editActivity" action="/api/activities/${activity._id}" method="put">
    <button class="editActivityButton" type="submit" id="${activity._id}">Edit</button>
    </form>
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
      if (addActivityForm) {
        addActivityForm.addEventListener("submit", function(event) {
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
            .then(function(res) {
              return res.json()
            })
            .then(function(json) {
              fetchActivities()
            })
            .catch(function(e) {})
        })
      }
      const deleteActivityButtons = document.querySelectorAll("form.deleteActivity")
      if (deleteActivityButtons) {
        for (var i = 0; i < deleteActivityButtons.length; i++) {
          const deleteActivityButton = deleteActivityButtons[i]
          deleteActivityButton.addEventListener("submit", function(event) {
            event.preventDefault()
            const activityId = deleteActivityButton.querySelector("button.deleteActivityButton").id
            if (confirm("Are you sure you want to delete this activity?")) {
              fetch(`/api/activities/${activityId}`, {
                  method: "DELETE",
                  credentials: 'include',
                  headers: {
                    "content-type": "application/json"
                  }
                })
                .then(function(res) {
                  return res.json()
                })
                .then(function(json) {
                  fetchActivities()
                })
            } else {

            }
          })
        }
      }

      const editActivityButtons = document.querySelectorAll("form.editActivity")
      if (editActivityButtons) {
        for (var i = 0; i < editActivityButtons.length; i++) {
          const editActivityButton = editActivityButtons[i]

          editActivityButton.addEventListener("submit", function(event) {
            event.preventDefault()
            const activityId = editActivityButton.querySelector("button.editActivityButton").id
            document.querySelector(".activities").textContent = ""
            fetch(`/api/activities/${activityId}`, {
                credentials: "include"
              })
              .then(function(res) {
                return res.json()
              })
              .then(function(json) {
                console.log(json);

                const form = `
        <form class="editActivity" id="${json._id}" action="/api/activities" method="post">
        <fieldset>
        <legend>Edit Activity</legend>
          <div class="add-input">
            <label for="actvity">Edit Activity Title</label>
            <input type="text" id="activity" name="activity" value="${json.title}">
          </div>

          <div class="add-input">
            <label for="unit">Edit Units</label>
            <input type="text" id="unit" name="unit" value="${json.unit}" >
          </div>

          <input type="submit" name="add" value="Update Activity!">
          </fieldset>
        </form>
         `

                document.querySelector(".activities").insertAdjacentHTML("afterbegin", form)

              })
              .then(function(json) {
                const editActivityForm = document.querySelector("form.editActivity")
                if (editActivityForm) {
                  editActivityForm.addEventListener("submit", function(event) {
                    event.preventDefault()
                    const activityId = editActivityForm.id
                    formData = {
                      activity: document.querySelector("#activity").value,
                      unit: document.querySelector("#unit").value,
                    }
                    fetch(`/api/activities/${activityId}`, {
                        method: "PUT",
                        credentials: 'include',
                        body: JSON.stringify(formData),
                        headers: {
                          "content-type": "application/json"
                        }
                      })
                      .then(function(res) {
                        return res.json()
                      })
                      .then(function(json) {
                        fetchActivities()
                      })
                      .catch(function(e) {
                        console.log("ERROR:", e)
                      })
                  })
                }
              })
          })
        }
      }

    })
}

function fetchActivity(id) {
  const activityId = id
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
      console.log(stats);
      for (var i = 0; i < stats.length; i++) {
        const stat = stats[i]
        const html = `
      <div class="stats" id="stats._id">
      <p class="date">${stat.date}</p>
      <p class="number">${stat.data}</p>
      <form class="deleteStat" action="/api/stats/${stat._id}" method="DELETE">
        <button class="delete" type="submit" id="${stat._id}">Delete</button>
      </form>
      `

        document.querySelector(".activities").insertAdjacentHTML("beforeend", html)
      }

    })
    .then(function(json) {
      const addStatForm = document.querySelector("form.addStat")
      if (addStatForm) {
        addStatForm.addEventListener("submit", function(event) {
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
            .then(function(res) {
              return res.json()
            })
            .then(function(json) {
              fetchActivity(activityId)
            })
            .catch(function(e) {
              console.log("ERROR:", e)
            })
        })
      }

      const deleteStatButtons = document.querySelectorAll("form.deleteStat")
      if (deleteStatButtons) {
        for (var i = 0; i < deleteStatButtons.length; i++) {
          const deleteStatButton = deleteStatButtons[i]

          deleteStatButton.addEventListener("submit", function(event) {
            event.preventDefault()
            const statId = deleteStatButton.querySelector("button.delete").id
            if (confirm("Are you sure you want to delete this stat?")) {

              fetch(`/api/stats/${statId}`, {
                  method: "DELETE",
                  credentials: 'include',
                  body: JSON.stringify({
                    "activityId": activityId
                  }),
                  headers: {
                    "content-type": "application/json"
                  }
                })
                .then(function(res) {
                  return res.json()
                })
                .then(function(json) {
                  fetchActivity(activityId)
                })
                .catch(function(error) {})
            } else {}
          })
        }
      }
    })
}

const activityContainer = document.querySelector(".activities")
if (activityContainer) {
  fetchActivities()
}
