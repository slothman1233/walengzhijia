let win: any
declare let global: any
declare let window: any
declare let self: any
if (typeof window !== 'undefined') {
    win = window
} else if (typeof global !== 'undefined') {
    win = global
} else if (typeof self !== 'undefined') {
    win = self
} else {
    win = {}
}

export default win