export const machine = {
    value: `neutral`,
    options: {
        neutral: {
            click() {
                machine.value = `happy`
            }
        },
        happy: {
            click() {
                machine.value = `sad`
            }
        },
        sad: {
            click() {
                machine.value = `neutral`
            }
        }
    },
    init(name: string) {
        const action = machine.options[ machine.value][ name ]
        action ? action.call(name) : console.error(`machine`)
    }
};