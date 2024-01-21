import { promises as fsPromises } from "fs"

const { readFile, writeFile } = fsPromises

class FitnessService {
    constructor(dataFile) {
        this.dataFile = dataFile
    }

    async getData() {
        const data = await readFile(this.dataFile, "utf8")
        if (!data) return []
        return JSON.parse(data)
    }

    async updateData(dayOfWeek, workoutType, rep, sets, exercises) {
        const data = (await this.getData()) || []

        const index = data.findIndex(
            (workout) => workout.day_of_week === dayOfWeek,
        )
        data[index] = {
            day_of_week: dayOfWeek,
            type: workoutType,
            exercises: exercises.split(","),
            rep_range: rep,
            set_range: sets,
        }
        await writeFile(this.dataFile, JSON.stringify(data))
    }
}

export default FitnessService
