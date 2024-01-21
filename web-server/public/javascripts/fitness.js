// $: to define/access jQuery, $(selector).action()
// $(document).ready(function())

$(function fitness() {
    function updateWorkout(data) {
        const render = []

        $(".workout-status").empty()

        // All went well
        if (!data.errors && data.workouts) {
            $(".workout-form").trigger("reset")

            console.log(data.workouts)

            $.each(data.workouts, function createHTML(key, item) {
                render.push(`
                <div class="mb-4">
                    <h4 class="workoutlist-title">${item.day_of_week}</h4>
                        <div class="workoutlist-name">
                            <a href="/fitness/${item.type}>">${item.type}</a>
                            <div> rep/duration: ${item.rep_range} </div>
                            <div> sets: ${item.set_range} </div>
                        </div>
                            <div class="row workoutlist-info mt-2">
                                <div class="col-sm-3">
                                <img
                                    class="workoutlist-img rounded-circle img-fluid"
                                    src="/images/fitness/${item.type}.jpg"
                                    alt="Photo of ${item.type}"
                                />
                                </div>
                            <div class="col-sm-9">
                                <ul>
                                    ${generateListExericse(item.exercises)}
                                </ul>

                            </div>
                        </div>
                </div>`)
            })

            // console.log(render.join("\n"))
            $(".workout-info").html(render.join("\n"))

            $(".workout-status").html(
                `<div class="alert alert-success">
                        ${data.successMessage}
                    </div>`,
            )
        } else {
            $.each(data.errors, function createHTML(key, error) {
                render.push(`
                <li>${error.msg}</li>
                `)
            })

            $(".workout-status").html(
                `
                <div class="alert alert-danger"><ul>${render.join(
                    "\n",
                )}</ul></div>
                `,
            )
        }

        function generateListExericse(exercises) {
            const listExercises = []
            $.each(exercises, function (key, item) {
                listExercises.push(`<li>${item}</li>`)
            })
            return listExercises.join("\n")
        }
    }

    $(".workout-form").submit(function submitWorkout(e) {
        e.preventDefault()

        $.post(
            "/fitness/api",
            // data from the form:
            {
                day: $("#workout-form-day").val(),
                type: $("#workout-form-type").val(),
                rep: $("#workout-form-rep").val(),
                sets: $("#workout-form-sets").val(),
                exercises: $("#workout-form-exercises").val(),
            },
            updateWorkout,
        )
    })
})
