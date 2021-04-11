import { selectOption1 } from '../../components/select';


(function () {
    let typeselect: HTMLElement = document.querySelector('.typeselect')

    selectOption1(typeselect, (dom: Element, e: Event, option: HTMLElement) => {

    })
})();



(function () {
    let form: HTMLElement = document.querySelector('.form')
    let submit: HTMLElement = form.querySelector('.submit')
    let popup_succee: HTMLElement = document.querySelector('.popup_succee')

    submit.onclick = function () {
        popup_succee.style.display = 'block'
    }

    popup_succee.querySelector('span').onclick = function () {
        popup_succee.style.display = 'none'
    }

})()