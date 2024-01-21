// $: to define/access jQuery, $(selector).action()
// $(document).ready(function())

$(function fitness() {
    function updateWorkout(data) {
        const render = []
    }

    $(".workout-form").submit(function submitWorkout(e) {
        e.preventDefault()

        $.post("/fitness/api", {}, updateWorkout)
    })
})
